import { getDataService, postService } from '@/apiservices/service';
import AboutUs from '@/components/About'
import { env } from '@/util/constants/common';


export async function generateMetadata() {
  try {
    const seoRes = await postService('get-seo-by-slug', 'about');
    const seo = seoRes?.data?.seometa;

    return {
      title: seo?.title || "About Us",
      description:
        seo?.description ||
        "BEAS Consultancy is a global IT and consulting firm providing information solutions to businesses across industries.",

      keywords:
        seo?.keyword ||
        "About Beas, Meet our team, Software Company, Technology",

      authors: [
        { name: seo?.author || "BEAS Consultancy And Services Private Limited" }
      ],

      openGraph: {
        title: seo?.title || "About Us",
        description: seo?.description || "",
        images: seo?.image
          ? [`${env.BACKEND_BASE_URL}${seo.image}`]
          : [],
      }
    };
  } catch (error) {
    return {
      title: "About Us",
      description: "About BEAS Consultancy",
    };
  }
}

const Page = async () => {

  const [aboutData, commonAboutData] = await Promise.all([
    getDataService('get-menu-aboutus'),
    getDataService('get-common-aboutus')
  ]);

  // ✅ fallback protection
  if (!aboutData?.data || !commonAboutData?.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AboutUs
        aboutus={aboutData?.data?.aboutus || []}
        commonaboutus={commonAboutData?.data?.commonaboutus || []}
      />
    </div>
  )
}

export default Page;