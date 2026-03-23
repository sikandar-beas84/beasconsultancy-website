import { getDataService, postService } from '@/apiservices/service';
import CasestudyGeneric from '@/components/CaseStudy';
import React from 'react'
import { env } from '@/util/constants/common';

export async function generateMetadata() {
    try {
        const seoRes = await postService('get-seo-by-slug', 'casestudies');


        const seometadata = seoRes?.data?.seometa || null;
        return {
            title: seometadata?.title || "Home",
            description: seometadata?.description || "Learn how BEAS delivered business impact",
            keywords: seometadata?.keyword || "case study, business solution, project success",
            authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
            openGraph: {
                title: seometadata?.title || "Home",
                description: seometadata?.description || "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
                images: seometadata?.image
                    && `${env.BACKEND_BASE_URL}${seometadata.image}`,
                // : `${env.BACKEND_BASE_URL}${activeCaseStudy?.image}`
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
const page = async({params}) => {
    

    const param = await params;
    const id = param?.slug;

    const [common, projetcs, caseStudy] = await Promise.all([getDataService('get-home-common'), getDataService('get-projects'), getDataService('get-menu-casestudy')])
    // const currentIndex = projetcs?.data?.projects?.findIndex(
    //     (item) => item?.slug?.toString() === id
    // );
    // const casestudy = projetcs?.data?.projects[currentIndex];
    const menucasestudy = caseStudy.data?.casestudy || [];
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
