import { getDataService, getDataServiceLongCashe, postServiceData, postServiceLongCashe } from '@/apiservices/service';
import Blogs from '@/components/blog/Blogs';
import React from 'react'
import { env } from '@/util/constants/common';

export async function generateMetadata() {
    try {
        const seoRes = await postServiceLongCashe('get-seo-by-slug', 'blogs');

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
                description: seometadata?.description || "Explore exciting Blog opportunities with us.",
                images: seometadata?.image
                    && `${env.BACKEND_BASE_URL}${seometadata.image}`,
                // : `${env.BACKEND_BASE_URL}${activeCaseStudy?.image}`,
                url: canonicalUrl,
                type: "website",
                siteName: "Beas Consultancy and Services Pvt. Ltd.",
  
            },
        };
    } catch (error) {
        const baseUrl = env.FRONTEND_BASE_URL;
        return {
            title: "Carrer",
            description: "Explore exciting career opportunities with us.",
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
const page = async () => {
    try {
        const [blogs, commonblog] = await Promise.all([
            getDataServiceLongCashe('get-blogs'),
            getDataServiceLongCashe('get-all-common')
        ]);

        // If data fetching fails during build, return a simple structure
        if (!blogs?.data?.blogs) {
            return (
                <div>
                    <Blogs blogs={[]} commonblog={null} />
                </div>
            );
        }

        return (
            <div>
                <Blogs
                    blogs={blogs.data.blogs}
                    commonblog={commonblog?.data?.common?.find(item => item.slug === 'blog-section-homepage') || null}
                />
            </div>
        );
    } catch (error) {
        console.error('Error fetching blogs:', error);
        // Return empty state during build to prevent build failure
        return (
            <div>
                <Blogs blogs={[]} commonblog={null} />
            </div>
        );
    }
};
export default page
