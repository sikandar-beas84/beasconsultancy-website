import Skills from '@/components/Skills';
import {getDataServiceLongCashe, postService } from '@/apiservices/service';
import { env } from '@/util/constants/common';


export async function generateMetadata() {
  try {
    const seoRes = await postServiceLongCashe('get-seo-by-slug', 'skills');
    const seo = seoRes?.data?.seometa;

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

      openGraph: {
        title: seo?.title || "Skills",
        description: seo?.description || "",
        images: seo?.image
          ? [`${env.BACKEND_BASE_URL}${seo.image}`]
          : [],
      }
    };
  } catch (error) {
    return {
      title: "Skills",
      description: "Explore our skills",
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