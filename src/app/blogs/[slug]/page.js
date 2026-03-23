import { getDataService, postService } from '@/apiservices/service';
import Blog from '@/components/blog/Blog';
import React from 'react'
import { env } from '@/util/constants/common';

export async function generateMetadata({params}) {

    try {
        const param=await params;
        const slug=param?.slug;
        const seoRes = await postService('get-seo-by-slug', slug);
        
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
            console.log(error)
        return {
            title: "Carrer",
            description: "Explore exciting career opportunities with us.",
        };
    }
}
const page = async ({params}) => {
    const param=await params;
    const slug=param?.slug;
    const [blogs, commonblog] = await Promise.all([postService('get-blog-by-slug',slug), getDataService('get-all-common')])
    return (
        <div>
            <Blog blog={blogs?.data?.blog} commonblog={commonblog?.data?.common?.find(item => item.slug === 'blog-section-homepage') || null} />
        </div>
    )
}

export default page
