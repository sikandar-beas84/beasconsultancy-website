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

const page = async ({ params }) => {
    try {
        const param = await params;
        const slug = await param.slug;

        // Fetch industries data with proper error handling
        const industriy = await getDataService('get-menu-industries');
        const industriesData = industriy?.data?.industries?.children;

        // Validate industriesData
        if (!industriesData || !Array.isArray(industriesData)) {
            console.error('Invalid industries data received:', industriesData);
            return <div>Unable to load industries data. Please try again later.</div>;
        }

        // Find the specific industry based on slug
        const findIndustry = (industries, slugParts) => {
            // Ensure industries is an array
            if (!industries || !Array.isArray(industries)) return null;

            let currentLevelData = industries;
            let found = null;

            // Ensure slugParts is an array
            const slugArray = Array.isArray(slugParts) ? slugParts : [slugParts];

            for (const part of slugArray) {
                // Check if currentLevelData is an array before using find
                if (!Array.isArray(currentLevelData)) {
                    return null;
                }

                found = currentLevelData.find(item => item && item.slug === part);
                if (!found) return null;

                // Safely access children property
                currentLevelData = found.children && Array.isArray(found.children) ? found.children : [];
            }

            return found;
        };

        const industry = findIndustry(industriesData, slug);

        if (!industry) {
            return <div>Industry not found</div>;
        }

        // Enrich case studies data on the server
        const contents = industry?.menu_contents?.contents || [];

        let enrichedContents = [];

        if (Array.isArray(contents) && contents.length > 0) {
            enrichedContents = await Promise.all(
                contents.map(async (item) => {
                    if (!item.extra_description) return item;
                    try {
                        // Fix: Use postServiceData with token and slug
                        const data = await postServiceData(
                            "get-casestudy-by-slug",
                            env.ACCESS_TOKEN,
                            item.extra_description
                        );
                        return { ...item, casestudy: data };
                    } catch (error) {
                        console.error('Error fetching case study for slug:', item.extra_description, error);
                        return item;
                    }
                })
            );
        }

        

        // Prepare the props for the client component
        const industriesProps = {
            slug,
            industries: industriesData,
            initialIndustry: industry,
            initialEnrichedContents: enrichedContents
        };

        return (
            <div>
                <IndustriesBody {...industriesProps} />
            </div>
        );

    } catch (error) {
        console.error('Error in industries page:', error);
        return <div>An error occurred while loading the page. Please try again later.</div>;
    }
}

export default page;