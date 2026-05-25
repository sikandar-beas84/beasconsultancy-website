import ContactUs from '@/components/Contact/ContactUs'
import { getDataServiceMidCashe, postServiceLongCashe } from '@/apiservices/service'
import { env } from '@/util/constants/common';


export async function generateMetadata() {
    try {
        const seoRes = await postServiceLongCashe('get-seo-by-slug', 'contact');
        const seo = seoRes?.data?.seometa;
        const baseUrl = env.FRONTEND_BASE_URL;

        const canonicalUrl = seo?.url
        ? `${baseUrl}${seo.url}`
        : baseUrl;

        return {
            title: seo?.title || "Contact us",
            description: seo?.description || "Get in touch with us",

            keywords: seo?.keyword || "contact, support, help",

            authors: [
                { name: seo?.author || "BEAS Consultancy And Services Private Limited" }
            ],
            robots: {
                index: true,
                follow: true,
              },
        
              other: {
                  publisher: "BEAS Consultancy And Services Private Limited",
              },
            alternates: {
                canonical: canonicalUrl,
              },
            openGraph: {
                title: seo?.title || "Contact us",
                description: seo?.description || "",
                images: seo?.image
                    ? [`${env.BACKEND_BASE_URL}${seo.image}`] // ✅ FIXED
                    : [],
                url: canonicalUrl,
                type: "website",
                siteName: "Beas Consultancy and Services Pvt. Ltd.",
            },
        }
    } catch (error) {
        const baseUrl = env.FRONTEND_BASE_URL;
        return {
            title: "Contact us",
            description: "Get in touch with us",
            robots: {
                index: true,
                follow: true,
              },
        
              other: {
                  publisher: "BEAS Consultancy And Services Private Limited",
              },
            alternates: {
                canonical: baseUrl,
              },
        }
    }
}
import JsonLd from "@/components/JsonLd"
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
            <>
            {/* JSON-LD SCHEMA (ADD THIS BLOCK) */}
            <JsonLd
                type="ContactUs"
                title="Beas Consultancy and Services Pvt. Ltd."
                description="Reach BEAS Consultancy’s IT professionals for project discussions, cloud consulting, and software solutions built for scalability and performance."
                url="https://www.beasconsultancy.com/contact"
                image="https://www.beasconsultancy.com/assets/images/logo.png"
                publishedDate="2026-04-08"
                />
            <div>
                <ContactUs  
                    contactus={contact?.data?.contact || null} 
                    faqs={faqData?.data?.faqs || []} 
                />
            </div>
            </>
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