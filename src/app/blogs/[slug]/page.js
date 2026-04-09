import { getDataService, getDataServiceLongCashe, postService, postServiceLongCashe } from '@/apiservices/service';
import Blog from '@/components/blog/Blog';
import React from 'react'
import { env } from '@/util/constants/common';

export const revalidate = 120; // ✅ CACHE PAGE

export async function generateMetadata({ params }) {
    try {
        const {slug}=await params
        
        const seoRes = await postServiceLongCashe('get-seo-by-slug', slug);
        const seometadata = seoRes?.data?.seometa || null;
        const baseUrl = env.FRONTEND_BASE_URL;

        const canonicalUrl = seometadata?.url
          ? `${baseUrl}${seometadata.url}`
          : baseUrl;
        return {
            title: seometadata?.title || `Blog`,
            description: seometadata?.description || "Explore exciting Blog opportunities with us.",
            keywords: seometadata?.keyword || "Blog, posting",
            authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
            robots: {
                index: true,
                follow: true,
              },
        
              other: {
                  publisher: "BEAS Consultancy And Services Private Limited",
                  "article:author": "BEAS Consultancy And Services Private Limited",
              },
            alternates: {
                canonical: canonicalUrl,
              },
            openGraph: {
                title: seometadata?.title || "Blog",
                description: seometadata?.description || "",
                images: seometadata?.image && `${env.BACKEND_BASE_URL}${seometadata.image}`,
                url: canonicalUrl,
                type: "website",
                siteName: "Beas Consultancy and Services Pvt. Ltd.",
  
            },
        };
    } catch (error) {
        const baseUrl = env.FRONTEND_BASE_URL;
        return {
            title: "Blog",
            description: "Explore blog content",
            robots: {
                index: true,
                follow: true,
              },
        
              other: {
                  publisher: "BEAS Consultancy And Services Private Limited",
                  "article:author": "BEAS Consultancy And Services Private Limited",
              },
            alternates: {
                canonical: baseUrl,
              },
        };
    }
}

const page = async ({ params }) => {
    const {slug} =await params;
    const [blogs, commonblog] = await Promise.all([
        postServiceLongCashe('get-blog-by-slug', slug),
        getDataServiceLongCashe('get-all-common')
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