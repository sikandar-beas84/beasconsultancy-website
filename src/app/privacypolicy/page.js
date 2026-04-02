// app/contact/page.js
import { getDataService, postService } from '@/apiservices/service';
import { env } from '@/util/constants/common';
import PrivacyPolicy from '@/components/privacypolicy/privacypolicy';


export async function generateMetadata() {
    try {
        const seoRes = await postService('get-seo-by-slug', 'privacypolicy')

        const seo = await seoRes?.data?.seometa
        const baseUrl = env.FRONTEND_BASE_URL;
        console.log("ghghghghgh",seo);
        const canonicalUrl = seo?.url
        ? `${baseUrl}${seo.url}`
        : baseUrl;
        return {
            title: seo?.title || `Privacy Policy`,
            description:
                seo?.description ||
                "Explore the Privacy Policy and capabilities of Beas Consultancy.",
            alternates: {
                canonical: canonicalUrl,
                },
            openGraph: {
                title: seo?.title,
                description: seo?.description ?? 'Explore the Privacy Policy and capabilities of Beas Consultancy.',
                images: seo?.image
                    ? [`${env.BACKEND_BASE_URL}${seo.image}`]
                    : [],

                keywords: seo?.keyword
                    ? seo?.keyword
                    : 'Privacy Policy, Expertise, Technologies, Services',

                authors: seo?.author
                    ? [seo.author]
                    : ["BEAS Consultancy And Services Private Limited"],
                url: canonicalUrl,
            }
        };
    } catch (error) {
        const baseUrl = env.FRONTEND_BASE_URL;
    
        return {
          title: "Privacy Policy",
          description:
            "Explore the Privacy Policy and capabilities of Beas Consultancy.",
    
          alternates: {
            canonical: baseUrl,
          },
        };
      }
}

const Page = async () => {

    const [privacypolicy] = await Promise.all([getDataService('get-all-common')]);
    const privacypolicies = privacypolicy?.data?.common || [];
    const privacyData = privacypolicies.find((temp) => temp.slug === 'privacypolicy');
    return (
        <div>

            <PrivacyPolicy privacypolicy={privacyData} />
        </div>
    )
}

export default Page