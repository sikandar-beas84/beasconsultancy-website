import React from 'react'
import { env } from '@/util/constants/common';
import { getDataService, postService } from '@/apiservices/service';
import InduIndustriesMain from '@/components/industries/IndustriesMain';

export async function generateMetadata() {
    try {
        const seoRes = await postService('get-seo-by-slug', 'industries');
        const seometadata = seoRes?.data?.seometa || null;
        const baseUrl = env.FRONTEND_BASE_URL;

        const canonicalUrl = seometadata?.url
        ? `${baseUrl}${seometadata.url}`
        : baseUrl;

        return {
            title: seometadata?.title || "Industries",
            description: seometadata?.description || "Explore our wide range of services to empower your business through innovative solutions.",
            keywords: seometadata?.keyword || "services, beas consultancy, business solutions, software development",
            authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
            alternates: {
                canonical: canonicalUrl,
              },
            openGraph: {
                title: seometadata?.title || "Industries",
                description: seometadata?.description || "Explore our wide range of services to empower your business through innovative solutions.",
                images: seometadata?.image
                    ? [`${env.BACKEND_BASE_URL}${seometadata?.image}`] : '',
                url: canonicalUrl,
            },
        };
    } catch (error) {
        const baseUrl = env.FRONTEND_BASE_URL;
        return {
            title: "Industries",
            description: "Explore our wide range of services to empower your business through innovative solutions.",
            alternates: {
                canonical: baseUrl,
              },
        };
    }
}

// Add this to generate static params if needed, or to handle build-time data fetching
export async function generateStaticParams() {
    // Return empty array if you don't need to pre-render specific params
    // This ensures the page is generated at build time without requiring API data
    return [];
}

const page = async () => {
    try {
        const response = await getDataService('get-home-industries');
        
        // Safe data extraction with fallbacks
        const industries = response?.data?.industries || null;
        
        // If no industries data, return a fallback UI
        if (!industries) {
           
            return (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">Industries We Serve</h1>
                    <p className="text-gray-600">Unable to load industries at the moment. Please try again later.</p>
                </div>
            );
        }

        return (
            <div>
                <InduIndustriesMain industries={industries} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching industries data:', error);
        
        // Return a fallback UI instead of throwing
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Industries We Serve</h1>
                <p className="text-gray-600">Unable to load industries at the moment. Please try again later.</p>
            </div>
        );
    }
}

export default page;