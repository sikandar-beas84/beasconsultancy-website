// app/contact/page.js
import ContactUs from '@/components/Contact/ContactUs'
import { getDataService, postService } from '@/apiservices/service'


export async function generateMetadata() {
    const seoRes = await postService('get-seo-by-slug', 'contact')
    
    const seo =await seoRes?.data?.seometa
   
    return {
        title: seo?.title || "Contact us",
        description: seo?.description || "Get in touch with us",
        openGraph: {
            title: seo?.meta_title,
            description: seo?.description,
            images: [seo?.meta_image],
        },
    }
}

const Page = async () => {

    const [contact, faqData] = await Promise.all([getDataService('get-contact'),getDataService('get-faq')]);
    return (
        <div>

        <ContactUs  contactus={contact?.data?.contact} faqs={faqData?.data?.faqs} />
        

        </div>
    )
}

export default Page