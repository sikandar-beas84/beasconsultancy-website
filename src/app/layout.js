import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";

import "../globals.css";
import { getDataService, getDataServiceLongCashe } from "@/apiservices/service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Beas Consultancy",
  description: "Beas Consultancy & Services Pvt. Ltd. - AI-Driven IT Solutions",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  const [getMenus, services, industries, common, projects, contactUs] = await Promise.all([
    getDataServiceLongCashe('get-home-menus'),
    getDataService('get-home-services'),
    getDataService('get-home-industries'),
    getDataServiceLongCashe('get-home-common'),
    getDataServiceLongCashe('get-projects'),
    getDataServiceLongCashe('get-home-contactus')
  ]);

  const mapServices = (services) => {
    return services?.map(service => ({
      slug: service.slug,
      name: service.name,
      children: service.children?.length > 0 ? mapServices(service.children) : []
    }));
  };

  const childrenServices = mapServices(services?.data?.services?.children) || [];

  // Logic extracted from Header/Footer for better performance
  const finalServices = (() => {
    if (!Array.isArray(childrenServices)) return [];
    const expanded = childrenServices.flatMap(item => {
      if (item.slug === "application-solutioning") {
        return item.children?.map(child => ({
          slug: child.slug,
          name: child.name,
        })) || [];
      }
      return [{ slug: item.slug, name: item.name }];
    });
    const bottomSlugs = ["ui-ux", "professional-services"];
    return expanded.sort((a, b) => {
      const aLast = bottomSlugs.includes(a.slug);
      const bLast = bottomSlugs.includes(b.slug);
      if (aLast && !bLast) return 1;
      if (!aLast && bLast) return -1;
      return 0;
    });
  })();

  const casestudy = Array.isArray(projects?.data?.projects) ? projects.data.projects[0] : null;

  const homeData = {
    socials: common?.data?.socials,
    contactus: contactUs?.data?.contactus,
    menus: getMenus?.data?.menus,
    logo: common?.data?.logo,
    certificates: common.data?.certificates,
    services: {
      children: childrenServices,
      finalServices
    },
    industries: industries?.data?.industries,
    projects: projects?.data?.projects ?? [],
    casestudy
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>

        {/* GTM Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-PPFDQXZG');
    `,
          }}
        />

        {/* jQuery for OWL Carousel */}
        <Script
          src="https://code.jquery.com/jquery-3.7.1.min.js"
          strategy="beforeInteractive"
        />

        {/* GTM Noscript */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PPFDQXZG"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <ErrorBoundary/>
        <Header homeData={homeData} loading={false} />
        {children}
        <Footer homeData={homeData} />

      </body>
    </html>
  );
}