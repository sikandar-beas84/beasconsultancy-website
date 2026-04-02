import {  getDataServiceMidCashe, postServiceLongCashe } from '@/apiservices/service';
import AboutUs from '@/components/About'
import { env } from '@/util/constants/common';


export async function generateMetadata() {
  try {
    const seoRes = await postServiceLongCashe('get-seo-by-slug', 'about');
    const seo = seoRes?.data?.seometa || null;
    const baseUrl = env.FRONTEND_BASE_URL;

    const canonicalUrl = seo?.url
      ? `${baseUrl}${seo.url}`
      : baseUrl;

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
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: seo?.title || "About Us",
        description: seo?.description || "",
        images: seo?.image
          ? [`${env.BACKEND_BASE_URL}${seo.image}`]
          : [],
        url: canonicalUrl,
      }
    };
  } catch (error) {
    const baseUrl = env.FRONTEND_BASE_URL;
    return {
      title: "About Us",
      description: "About BEAS Consultancy",
      alternates: {
        canonical: baseUrl, 
      },
    };
  }
}

const Page = async () => {

  const [aboutData, commonAboutData] = await Promise.all([
    getDataServiceMidCashe('get-menu-aboutus'),
    getDataServiceMidCashe('get-common-aboutus')
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