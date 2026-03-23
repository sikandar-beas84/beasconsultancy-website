import { getDataService, postService } from '@/apiservices/service';
import Career from '@/components/carrer/Carrer';
import React from 'react'
import { env } from '@/util/constants/common';


export async function generateMetadata() {
    try {
        const seoRes = await postService('get-seo-by-slug', 'career');

        const seometadata = seoRes?.data?.seometa || null;

        return {
            title: seometadata?.title || `Careers`,
            description: seometadata?.description || "Explore exciting career opportunities with us.",
            keywords: seometadata?.keyword || "career, jobs, openings",
            authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
            openGraph: {
                title: seometadata?.title || "Home",
                description: seometadata?.description || "",
                images: seometadata?.image && `${env.BACKEND_BASE_URL}${seometadata.image}`,
                url: seometadata?.url
                    ? `${env.FRONTEND_BASE_URL}${seometadata?.url}`
                    : `${env.FRONTEND_BASE_URL}`,
            },
        };
    } catch (error) {
        return {
            title: "Career",
            description: "Explore exciting career opportunities with us.",
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