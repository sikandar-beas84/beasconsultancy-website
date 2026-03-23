// app/contact/page.js
import {getDataService, postService } from '@/apiservices/service';
import AboutUs from '@/components/About'
import { env } from '@/util/constants/common';

export async function generateMetadata() {
  const seoRes = await postService('get-seo-by-slug', 'about')

  const seo = await seoRes?.data?.seometa
  return {
    title: seo?.title || "About Us",
    description:
      seo?.description ||
      "BEAS Consultancy is a global IT and consulting firm providing information solutions to businesses across industries.",
  
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      images: seo?.image
        ? [`${env.BACKEND_BASE_URL}${seo.image}`]
        : [],
  
      keywords: seo?.keyword
        ? seo?.keyword
        : "About Beas, Meet our team, Software Company, Technology, Experts at Beas, Corporate Profile",
  
      authors: seo?.author
        ? [seo.author]
        : ["BEAS Consultancy And Services Private Limited"]
    }
  };
}

const Page = async () => {

  const [aboutData, commonAboutData] = await Promise.all([getDataService('get-menu-aboutus'), getDataService('get-common-aboutus')]);
  return (
    <div>

      <AboutUs aboutus={aboutData?.data?.aboutus} commonaboutus={commonAboutData?.data?.commonaboutus} />
    </div>
  )
}

export default Page