import Skills from '@/components/Skills';
import {getDataServiceLongCashe, postService } from '@/apiservices/service';
import { env } from '@/util/constants/common';


export async function generateMetadata() {

  try {
    const seoRes = await postService('get-seo-by-slug', 'skills');
    const seo = seoRes?.data?.seometa;
    const baseUrl = env.FRONTEND_BASE_URL;
    
    const canonicalUrl = seo?.url
      ? `${baseUrl}${seo.url}`
      : baseUrl;

    return {
      title: seo?.title || "Skills",
      description:
        seo?.description ||
        "Explore the skills and capabilities of Beas Consultancy.",

      keywords:
        seo?.keyword ||
        "Skills, Expertise, Technologies, Services",

      authors: [
        { name: seo?.author || "BEAS Consultancy And Services Private Limited" }
      ],
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: seo?.title || "Skills",
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
      title: "Skills",
      description: "Explore our skills",
      alternates: {
        canonical: baseUrl,
      },
    };
  }
}

const Page = async () => {

  const skillData = await getDataServiceLongCashe('get-menu-skills');

  // ✅ fallback protection
  if (!skillData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Skills skills={skillData?.data?.skills || []} />
    </div>
  )
}

export default Page;