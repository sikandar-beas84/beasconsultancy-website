import { getDataService, postService } from '@/apiservices/service';
import ServiceMain from '@/components/servicepage/ServiceMain';
import React from 'react'
export async function generateMetadata() {
    try {
        const seoRes = await postService('get-seo-by-slug', 'services');

        const seometadata = seoRes?.data?.seometa || null;

        return {
            title: seometadata?.title || "Service",
            description: seometadata?.description || "Explore our wide range of services tailored to your business needs.",
            keywords: seometadata?.keyword || "services, beas consultancy, business solutions, software development",
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
        return {
            title: "Home",
            description: "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
        };
    }
}


const page = async () => {
    const [serviceDataArr,service] = await Promise.all([getDataService('get-home-services'),getDataService('get-home-common')]);
    
    return (
        <div>
            <ServiceMain services={serviceDataArr?.data?.services?.children} service={serviceDataArr?.data?.services}/>
        </div>
    )
}

export default page
