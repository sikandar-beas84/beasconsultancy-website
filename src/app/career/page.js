import { getDataService, postService } from '@/apiservices/service';
import Career from '@/components/carrer/Carrer';
import React from 'react'
import { env } from '@/util/constants/common';


export async function generateMetadata() {
    try {
        const seoRes = await postService('get-seo-by-slug', 'career');

        const seometadata = seoRes?.data?.seometa || null;
        const baseUrl = env.FRONTEND_BASE_URL;

        const canonicalUrl = seometadata?.url
        ? `${baseUrl}${seometadata.url}`
        : baseUrl;

        return {
            title: seometadata?.title || `Careers`,
            description: seometadata?.description || "Explore exciting career opportunities with us.",
            keywords: seometadata?.keyword || "career, jobs, openings",
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
            title: "Career",
            description: "Explore exciting career opportunities with us.",
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

    const [menucareer, careers] = await Promise.all([
        getDataService('get-menu-careers'),
        getDataService('get-careers')
    ]);

    // ✅ fallback protection
    if (!careers.data || !menucareer.data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Career
                careers={careers?.data?.careers || []}
                menucareer={menucareer?.data?.career || []}
            />
        </div>
    )
}

export default page;