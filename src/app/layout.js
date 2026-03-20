import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import { getDataService } from "@/apiservices/service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Beas consltancy",
  description: "Beas",
};

export default async function RootLayout({ children }) {

  const [getMenus, services, industries,common,projects] = await Promise.all([
    getDataService('get-home-menus'),
    getDataService('get-home-services'),
    getDataService('get-home-industries'),
    getDataService('get-home-common'),
     getDataService('get-projects'),

  ]);
  const mapServices = (services) => {
    return services?.map(service => ({
      slug: service.slug,
      name: service.name,
      children: service.children?.length > 0 ? mapServices(service.children) : []
    }));
  };
  const homeData = {
    // Menus data (the array of menu items)
    menus: getMenus?.data?.menus,
    logo:common?.data?.logo,
    certificates:common.data?.certificates,
    // Services data (the array of service objects)
    services: {
      children: mapServices(services?.data?.services?.children)

    },

    // Industries data
    industries: industries.data.industries, // This already has the complete structure with children

    // Contact info (you'll need to add this from somewhere)
    contactus: {
      email: "beas@beas.co.in", // Add from your data source
      mobile: "+91-9433068494"   // Add from your data source
    },

   

    // Projects data (for case studies)
    projects:projects?.data?.projects??[] // Add from your data source if available
  };
  
  return (
    <html lang="en">
      <body>

        <Header homeData={homeData} loading={false} />
        {children}
        <Footer homeData={homeData} />
      </body>
    </html>
  );
}