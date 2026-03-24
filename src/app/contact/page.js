import ContactUs from '@/components/Contact/ContactUs'
import { getDataServiceMidCashe, postServiceLongCashe } from '@/apiservices/service'
import { env } from '@/util/constants/common';


export async function generateMetadata() {
    try {
        const seoRes = await postServiceLongCashe('get-seo-by-slug', 'contact');
        const seo = seoRes?.data?.seometa;

        return {
            title: seo?.title || "Contact us",
            description: seo?.description || "Get in touch with us",

            keywords: seo?.keyword || "contact, support, help",

            authors: [
                { name: seo?.author || "BEAS Consultancy And Services Private Limited" }
            ],

            openGraph: {
                title: seo?.title || "Contact us",
                description: seo?.description || "",
                images: seo?.image
                    ? [`${env.BACKEND_BASE_URL}${seo.image}`] // ✅ FIXED
                    : [],
                url: seo?.url
                    ? `${env.FRONTEND_BASE_URL}${seo.url}`
                    : `${env.FRONTEND_BASE_URL}`,
            },
        }
    } catch (error) {
        console.error('Error fetching contact page SEO:', error);
        return {
            title: "Contact us",
            description: "Get in touch with us",
        }
    }
}

const Page = async () => {
    try {
        const [contact, faqData] = await Promise.all([
            getDataServiceMidCashe('get-contact'),
            getDataServiceMidCashe('get-faq')
        ]);
        if (!contact.data || !faqData?.data) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <ContactUs  
                    contactus={contact?.data?.contact || null} 
                    faqs={faqData?.data?.faqs || []} 
                />
            </div>
        )
    } catch (error) {
        console.error('Error fetching contact page data:', error);

        return (
            <div>
                <ContactUs contactus={null} faqs={[]} />
            </div>
        )
    }
}

export default Page;