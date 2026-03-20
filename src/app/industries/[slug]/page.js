import React from 'react'
import { env } from '@/util/constants/common';
import IndustriesBody from '@/components/industries/IndustriesBody';
import { getDataService } from '@/apiservices/service';
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
        return {
            title: "Home",
            description: "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
        };
    }
}
const page = async ({ params }) => {
    const param = await params;
    const slug = await param.slug;

    const [industries] = await Promise.all([
        getDataService('get-menu-industries'),
    ]);

   
    return (
        <div>
            <IndustriesBody slug={[slug]} industries={industries?.data?.industries?.children} />
        </div>
    )
}

export default page
