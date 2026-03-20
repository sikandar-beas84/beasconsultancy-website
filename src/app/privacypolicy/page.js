// app/contact/page.js
import { getDataService, postService } from '@/apiservices/service';
import AboutUs from '@/components/About'
import PrivacyPolicy from '@/components/privacypolicy/privacypolicy';


export async function generateMetadata() {
    const seoRes = await postService('get-seo-by-slug', 'privacypolicy')

    const seo = await seoRes?.data?.seometa
    return {
        title: seo?.title || `Privacy Policy`,
        description:
            seo?.description ||
            "Explore the Privacy Policy and capabilities of Beas Consultancy.",

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
                : ["BEAS Consultancy And Services Private Limited"]
        }
    };
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