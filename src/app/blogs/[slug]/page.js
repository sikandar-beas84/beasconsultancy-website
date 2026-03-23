import { getDataService, postService } from '@/apiservices/service';
import Blog from '@/components/blog/Blog';
import React from 'react'
import { env } from '@/util/constants/common';

export const revalidate = 120; // ✅ CACHE PAGE

export async function generateMetadata({ params }) {
    try {
        const {slug}=await params
        
        const seoRes = await postService('get-seo-by-slug', slug);
        const seometadata = seoRes?.data?.seometa || null;

        return {
            title: seometadata?.title || `Blog`,
            description: seometadata?.description || "Explore exciting Blog opportunities with us.",
            keywords: seometadata?.keyword || "Blog, posting",
            authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
            openGraph: {
                title: seometadata?.title || "Blog",
                description: seometadata?.description || "",
                images: seometadata?.image && `${env.BACKEND_BASE_URL}${seometadata.image}`,
                url: seometadata?.url
                    ? `${env.FRONTEND_BASE_URL}${seometadata?.url}`
                    : `${env.FRONTEND_BASE_URL}`,
            },
        };
    } catch (error) {
        return {
            title: "Blog",
            description: "Explore blog content",
        };
    }
}

const page = async ({ params }) => {
    const {slug} =await params;
    const [blogs, commonblog] = await Promise.all([
        postService('get-blog-by-slug', slug),
        getDataService('get-all-common')
    ]);

    // ✅ fallback protection
    if (!blogs.data || !commonblog?.data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Blog
                blog={blogs?.data?.blog || null}
                commonblog={
                    commonblog?.data?.common?.find(item => item.slug === 'blog-section-homepage') || null
                }
            />
        </div>
    )
}

export default page;