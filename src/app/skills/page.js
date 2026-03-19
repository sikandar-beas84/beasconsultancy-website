// app/contact/page.js
import Skills from '@/components/Skills';
import { getDataService, postService } from '@/services/service'


export async function generateMetadata() {
  const seoRes = await postService('get-seo-by-slug', 'skills')

  const seo = await seoRes?.data?.seometa

  // return {
  //   title: seo?.title || "Skills",
  //   description:
  //     seo?.description ||
  //     "Explore the skills and capabilities of Beas Consultancy.",
  
  //   openGraph: {
  //     title: seo?.title,
  //     description: seo?.description,
  //     images: seo?.image
  //       ? [`${env.BACKEND_BASE_URL}${seo.image}`]
  //       : [],
  
  //     keywords: seo?.keyword
  //       ? seometadata.keyword
  //       : "Skills, Expertise, Technologies, Services",
  
  //     authors: seo?.author
  //       ? [seo.author]
  //       : ["BEAS Consultancy And Services Private Limited"]
  //   }
  // };
}

const Page = async () => {

  const [skillData] = await Promise.all([getDataService('get-menu-skills')]);
  return (
    <div>
      <Skills skills={skillData?.data?.skills} />
    </div>
  )
}

export default Page