import React from 'react'
import { env } from '@/util/constants/common';
import IndustriesBody from '@/components/industries/IndustriesBody';
import { getDataService, postService, postServiceData } from '@/apiservices/service';

export async function generateMetadata({ params }) {
    try {
        const param = await params;
        const slug = await param.slug;
        const seoRes = await postService('get-seo-by-slug', slug);

        const seometadata = seoRes?.data?.seometa || null;

        return {
            title: seometadata?.title || `Industries`,
            description: seometadata?.description || "Explore the industries we serve with expert solutions tailored to your business needs. Discover how Beas Consultancy empowers various sectors.",
            keywords: seometadata?.keyword || "Industries, IT Services, Beas Consultancy & Services Pvt. Ltd., Software Solutions, Healthcare, Education, Retail, Manufacturing",
            authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
            openGraph: {
                title: seometadata?.title || "Home",
                description: seometadata?.description || "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
                images: seometadata?.image
                    ? [`${env.BACKEND_BASE_URL}${seometadata?.image}`] : '',
                url: seometadata?.url
                    ? `${env.FRONTEND_BASE_URL}${seometadata?.url}`
                    : `${env.FRONTEND_BASE_URL}`,
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: "Home",
            description: "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
        };
    }
}

// Add generateStaticParams to handle static generation
export async function generateStaticParams() {
    // Return empty array to prevent build failures
    // This allows the page to be generated at request time if needed
    return [];
}

const page = async ({ params }) => {
    // Add a timeout to prevent infinite loading
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000);
    });

    try {
        const param = await params;
        const slug = await param.slug;

        // Fetch industries data with timeout and proper error handling
        const industriyPromise = getDataService('get-menu-industries');
        const industriy = await Promise.race([industriyPromise, timeoutPromise]);
        
        // Safe data extraction with multiple fallbacks
        const industriesData = industriy?.data?.industries?.children || [];
        
        // Add a small delay to simulate loading (remove in production)
        // await new Promise(resolve => setTimeout(resolve, 500));

        // Validate industriesData - if empty or invalid, return loading/fallback
        if (!industriesData || !Array.isArray(industriesData) || industriesData.length === 0) {
            console.warn('No industries data available, showing fallback UI');
            return (
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Loading Industries</h1>
                        <p className="text-gray-600">Please wait while we fetch the industry information...</p>
                        <div className="mt-8">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                        </div>
                    </div>
                </div>
            );
        }

        // Helper function to find industry with fallback
        const findIndustry = (industries, slugParts) => {
            if (!industries || !Array.isArray(industries)) return null;

            let currentLevelData = industries;
            let found = null;
            const slugArray = Array.isArray(slugParts) ? slugParts : [slugParts];

            for (const part of slugArray) {
                if (!Array.isArray(currentLevelData)) {
                    return null;
                }

                found = currentLevelData.find(item => item && item.slug === part);
                if (!found) return null;

                currentLevelData = found.children && Array.isArray(found.children) ? found.children : [];
            }

            return found;
        };

        const industry = findIndustry(industriesData, slug);

        // If industry not found, return 404-like fallback
        if (!industry) {
            return (
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Industry Not Found</h1>
                        <p className="text-gray-600 mb-6">
                            The industry you're looking for doesn't exist or has been moved.
                        </p>
                        <a 
                            href="/industries" 
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View All Industries
                        </a>
                    </div>
                </div>
            );
        }

        // Enrich case studies data with fallback for null/undefined values
        const contents = industry?.menu_contents?.contents || [];
        let enrichedContents = [];

        if (Array.isArray(contents) && contents.length > 0) {
            // Process each item with individual error handling
            const enrichmentPromises = contents.map(async (item) => {
                // Skip if no extra_description or if it's null/undefined
                if (!item?.extra_description) {
                    return { ...item, casestudy: null };
                }
                
                try {
                    // Add timeout for each case study request
                    const caseStudyPromise = postServiceData(
                        "get-casestudy-by-slug",
                        env.ACCESS_TOKEN,
                        item.extra_description
                    );
                    
                    const caseStudyData = await Promise.race([
                        caseStudyPromise,
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Case study timeout')), 5000))
                    ]);
                    
                    return { ...item, casestudy: caseStudyData || null };
                } catch (error) {
                    console.error('Error fetching case study for slug:', item.extra_description, error);
                    // Return item with null casestudy instead of failing completely
                    return { ...item, casestudy: null };
                }
            });
            
            // Wait for all promises with fallback for any failures
            enrichedContents = await Promise.allSettled(enrichmentPromises).then(results => {
                return results.map(result => {
                    if (result.status === 'fulfilled') {
                        return result.value;
                    } else {
                        console.error('Failed to process case study:', result.reason);
                        return null;
                    }
                }).filter(item => item !== null); // Remove any completely failed items
            });
        }

        // Prepare the props for the client component with fallbacks
        const industriesProps = {
            slug: slug || [],
            industries: industriesData || [],
            initialIndustry: industry || {},
            initialEnrichedContents: enrichedContents || []
        };

        return (
            <div>
                <IndustriesBody {...industriesProps} />
            </div>
        );

    } catch (error) {
        console.error('Error in industries page:', error);
        
        // Return a user-friendly error page with retry option
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-6">
                        <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold mb-4">Something Went Wrong</h1>
                    <p className="text-gray-600 mb-6">
                        We're having trouble loading this page. Please try again in a few moments.
                    </p>
                    <div className="space-x-4">
                        <button 
                            onClick={() => window.location.reload()}
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                        <a 
                            href="/"
                            className="inline-block bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Go Home
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default page;