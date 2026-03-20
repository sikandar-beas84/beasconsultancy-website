import { getDataService, postService } from '@/apiservices/service';
import SingleCarrerPage from '@/components/carrer/SingleCarrerPage';
import React from 'react'
export async function generateMetadata() {
    try {
        const seoRes = await postService('get-seo-by-slug', 'career');
        

        const seometadata = seoRes?.data?.seometa || null;
        return {
            title: seometadata?.title || `Careers`,
            description: seometadata?.description ||  "Explore exciting career opportunities with us.",
            keywords: seometadata?.keyword || "career, jobs, openings",
            authors: [{ name: seometadata?.author || "BEAS Consultancy And Services Private Limited" }],
            openGraph: {
                title: seometadata?.title || "Home",
                description: seometadata?.description || "Learn about our 25+ years of IT consulting expertise, client stories, and services.",
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
const page = async({params}) => {
    const param=await params;
    const slug=param.slug;
    const [menucareer, careers,contact] = await Promise.all([getDataService('get-menu-careers'), getDataService('get-careers'),getDataService('get-contact')])

    const carrerId = careers?.data?.careers.find((item) => item.title.toString() === slug);
    




  return (
    <div>
      <SingleCarrerPage careerId={carrerId?.id}  career={careers?.data?.careers}  menucareer={menucareer?.data?.career} />
    </div>
  )
}

export default page
