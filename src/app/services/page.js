import { getDataService, postService } from '@/apiservices/service';
import ServiceMain from '@/components/servicepage/ServiceMain';
import React from 'react'
import { env } from '@/util/constants/common';

export async function generateMetadata() {
    try {
        const seoRes = await postService('get-seo-by-slug', 'services');

        const seometadata = seoRes?.data?.seometa || null;
        const baseUrl = env.FRONTEND_BASE_URL;

        const canonicalUrl = seometadata?.url
        ? `${baseUrl}${seometadata.url}`
        : baseUrl;

        return {
            title: seometadata?.title || "Service",
            description: seometadata?.description || "Explore our wide range of services tailored to your business needs.",
            keywords: seometadata?.keyword || "services, beas consultancy, business solutions, software development",
            authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
            robots: {
                index: true,
                follow: true,
              },
        
              other: {
                  publisher: "BEAS Consultancy And Services Private Limited",
              },
            alternates: {
                canonical: canonicalUrl,
              },
            openGraph: {
                title: seometadata?.title || "Home",
                description: seometadata?.description || "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
                images: seometadata?.image
                    ? [`${env.BACKEND_BASE_URL}${seometadata?.image}`] : '',
                url: canonicalUrl,
                type: "website",
                siteName: "Beas Consultancy and Services Pvt. Ltd.",
            },
        };
    } catch (error) {
        const baseUrl = env.FRONTEND_BASE_URL;
        return {
            title: "Home",
            description: "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
            robots: {
                index: true,
                follow: true,
              },
        
              other: {
                  publisher: "BEAS Consultancy And Services Private Limited",
              },
            alternates: {
                canonical: baseUrl,
              },
        };
    }
}


const page = async () => {
    const [serviceDataArr] = await Promise.all([getDataService('get-home-services')]);

    if (!serviceDataArr.data) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <ServiceMain services={serviceDataArr?.data?.services?.children} service={serviceDataArr?.data?.services} />
        </div>
    )
}

export default page
