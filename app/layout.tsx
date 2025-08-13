"use client";
import Modal from "@/components/common/Modal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ModalStore from "@/store/modal";
import client from "@/utils/graphqlClient";
import { gql } from "graphql-request";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
import "./globals.css";

// const playfairDisplay = Playfair_Display({
//   variable: "--font-primary",
//   weight: ["400", "700", "600", "800", "900"],
//   subsets: ["latin"],
// });

const nunito = Montserrat({
  variable: "--font-primary",
  weight: ["400", "600", "700", "100", "200", "500"],
  subsets: ["latin"],
});

interface HomePageData {
  ctaTitle: string;
  ctaLink: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { triggerModal, setTriggerModal } = ModalStore();
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const query = gql`
          query HomePage {
            homePages {
              ctaTitle
              ctaLink
            }
          }
        `;

        const response = await client.request<{
          homePages: HomePageData[];
        }>(query);

        if (response.homePages && response.homePages.length > 0) {
          setHomePageData(response.homePages[0]);
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  const getIframeUrl = () => {
    if (homePageData?.ctaLink) return homePageData.ctaLink;
    return "";
  };

  const getModalTitle = () => {
    if (homePageData?.ctaTitle) return homePageData.ctaTitle;
    return "";
  };

  return (
    <html lang="en" className={` ${nunito.variable}`}>
      <body className={`antialiased `}>
        <NextTopLoader color="#3182ce" showSpinner={false} />
        <Navbar />
        <Modal
          isOpen={triggerModal}
          onClose={() => setTriggerModal(false)}
          title={getModalTitle()}
          iframeUrl={getIframeUrl()}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
