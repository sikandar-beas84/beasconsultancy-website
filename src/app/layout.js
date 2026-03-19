import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import { getHomeData } from "@/services/service";
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
  const homeData = await getHomeData('home');

  return (
    <html lang="en">
      <body>

        <Header homeData={homeData.data} loading={false} />
        {children}
        <Footer homeData={homeData.data} />
      </body>
    </html>
  );
}