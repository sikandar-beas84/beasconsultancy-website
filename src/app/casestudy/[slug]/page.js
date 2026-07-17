import { getDataService, postService } from '@/apiservices/service';
import CasestudyGeneric from '@/components/CaseStudy';
import React from 'react'
import { env } from '@/util/constants/common';

export async function generateMetadata({ params }) {
    
    const { slug } = await params;
    try {
        const seoRes = await postService('get-seo-by-slug', slug);
        const seometadata = seoRes?.data?.seometa || null;

        const baseUrl = env.FRONTEND_BASE_URL;
        const backendUrl = env.BACKEND_BASE_URL;

        const canonicalUrl = seometadata?.url
        ? `${baseUrl}casestudy/${seometadata.url}`
        : baseUrl;

        const imageUrl = seometadata?.image
        ? `${backendUrl}${seometadata.image}`
        : `${backendUrl}/assets/img/logo/1765541148_image.png`;

        return {
            title: seometadata?.title || "Home",
            description: seometadata?.description || "Learn how BEAS delivered business impact",
            keywords: seometadata?.keyword || "case study, business solution, project success",
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
                description: seometadata?.description || "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
                images: imageUrl,
                url: canonicalUrl,
                type: "website",
                siteName: "Beas Consultancy and Services Pvt. Ltd.",
            },
        };
    } catch (error) {
        const baseUrl = env.FRONTEND_BASE_URL;
        return {
            title: "Home",
            description: "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
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
const page = async ({ params }) => {


    const { slug } = await params;
    const id = slug;
    const [common, projetcs, caseStudy] = await Promise.all([getDataService('get-home-common'), getDataService('get-projects'), getDataService('get-menu-casestudy')])
    // const currentIndex = projetcs?.data?.projects?.findIndex(
    //     (item) => item?.slug?.toString() === id
    // );
    // const casestudy = projetcs?.data?.projects[currentIndex];
    const menucasestudy = caseStudy.data?.casestudy || [];
    if (!caseStudy.data?.casestudy || !projetcs?.data?.projects) {
        return <div>Loading...</div>;
    }
    const homeData = {
        portfoliohomepage: common.data,
        projects: projetcs?.data?.projects,
    }

    return (
        <div>
            <CasestudyGeneric menucasestudy={menucasestudy} homeData={homeData} projects={projetcs?.data?.projects} slug={id} arrow={true} />
        </div>
    )
}

export default page
