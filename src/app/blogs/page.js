import { getDataService, postServiceData } from '@/apiservices/service';
import Blogs from '@/components/blog/Blogs';
import React from 'react'
export async function generateMetadata() {
    try {
        const seoRes = await postServiceData('get-seo-by-slug', 'blogs');
        

        const seometadata = seoRes?.data?.seometa || null;
        return {
            title: seometadata?.title || `Blog`,
            description: seometadata?.description || "Explore exciting Blog opportunities with us.",
            keywords: seometadata?.keyword || "Blog, posting",
            authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
            openGraph: {
                title: seometadata?.title || "Blog",
                description: seometadata?.description || "Explore exciting Blog opportunities with us.",
                images: seometadata?.image
                    && `${env.BACKEND_BASE_URL}${seometadata.image}`,
                // : `${env.BACKEND_BASE_URL}${activeCaseStudy?.image}`,
                url: seometadata?.url
                    ? `${env.FRONTEND_BASE_URL}${seometadata?.url}`
                    : `${env.FRONTEND_BASE_URL}`,

            },
        };
    } catch (error) {

        return {
            title: "Carrer",
            description: "Explore exciting career opportunities with us.",
        };
    }
}
const page = async () => {

    const [blogs, commonblog] = await Promise.all([getDataService('get-blogs'), getDataService('get-all-common')])
    return (
        <div>
            <Blogs blogs={blogs?.data?.blogs} commonblog={commonblog?.data?.common.find(item => item.slug === 'blog-section-homepage') || null} />
        </div>
    )
}

export default page
