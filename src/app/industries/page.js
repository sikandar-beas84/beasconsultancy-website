import React from 'react'
import { env } from '@/util/constants/common';
import { getDataService, postService } from '@/apiservices/service';
import InduIndustriesMain from '@/components/industries/IndustriesMain';

export async function generateMetadata() {
    try {
        const seoRes = await postService('get-seo-by-slug', 'industries');

        const seometadata = seoRes?.data?.seometa || null;
      
        return {
            title: seometadata?.title || "industries",
            description: seometadata?.description || "Explore our wide range of services to empower your business through innovative solutions.",
            keywords: seometadata?.keyword || "services, beas consultancy, business solutions, software development",
            authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
            openGraph: {
                title: seometadata?.title || "Home",
                description: seometadata?.description || "Explore our wide range of services to empower your business through innovative solutions.",
                images: seometadata?.image
                    ? [`${env.BACKEND_BASE_URL}${seometadata?.image}`] : '',
                url: seometadata?.url
                    ? `${env.FRONTEND_BASE_URL}${seometadata?.url}`
                    : `${env.FRONTEND_BASE_URL}`,
            },
        };
    } catch (error) {
      
        return {
            title: "industries",
            description: "Explore our wide range of services to empower your business through innovative solutions.",
        };
    }
}

const page = async() => {
    const industries = await getDataService('get-home-industries');

    return (
        <div>
            <InduIndustriesMain industries={industries?.data?.industries}  />
        </div>
    )     
  
}

export default page
