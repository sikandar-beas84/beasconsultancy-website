import { getDataService, postService } from '@/apiservices/service';
import SingleCarrerPage from '@/components/carrer/SingleCarrerPage';
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
            alternates: {
                canonical: canonicalUrl,
            },
            openGraph: {
                title: seometadata?.title || "Home",
                description: seometadata?.description || "",
                images: seometadata?.image && `${env.BACKEND_BASE_URL}${seometadata.image}`,
                url: canonicalUrl,
            },
        };
    } catch (error) {
        const baseUrl = env.FRONTEND_BASE_URL;
        return {
            title: "Career",
            description: "Explore exciting career opportunities with us.",
            alternates: {
                canonical: baseUrl,
            },
        };
    }
}

const page = async ({ params }) => {
    const {slug} =await params;

    const [menucareer, careers] = await Promise.all([
        getDataService('get-menu-careers'),
        getDataService('get-careers')
    ]);

   
    if (!careers || !menucareer) {
        return <div>Loading...</div>;
    }

    const carrerId = careers?.data?.careers.find(
        (item) => item.title?.toLowerCase() === slug?.toLowerCase()
    );

    return (
        <div>
            <SingleCarrerPage
                careerId={carrerId?.id}
                career={careers?.data?.careers}
                menucareer={menucareer?.data?.career}
            />
        </div>
    )
}

export default page;