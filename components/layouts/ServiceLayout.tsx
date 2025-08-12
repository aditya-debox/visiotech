"use client";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalStore from "@/store/modal";
import ServiceModal from "@/components/service/ServiceModal";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
import { gql } from "graphql-request";
import client from "@/utils/graphqlClient";

const nunito = Montserrat({
  variable: "--font-primary",
  weight: ["400", "600", "700", "100", "200", "500"],
  subsets: ["latin"],
});

interface ServicesLayoutProps {
  children: React.ReactNode;
  serviceSlug?: string;
  serviceTitle?: string;
  modalTitle?: string;
  iframeUrl?: string;
}

interface HomePageData {
  ctaTitle: string;
  ctaLink: string;
}

export default function ServicesLayout({
  children,
  serviceSlug,
  serviceTitle,
  modalTitle,
  iframeUrl,
}: ServicesLayoutProps) {
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
        
      }
    };

    fetchHomePageData();
  }, []);

  const getModalTitle = () => {
    if (modalTitle) return modalTitle;
    if (serviceTitle) return `${serviceTitle}`;
    if (homePageData?.ctaTitle) return homePageData.ctaTitle;
    return "";
  };

  const getIframeUrl = () => {
    if (iframeUrl) return iframeUrl;
    if (homePageData?.ctaLink) return homePageData.ctaLink;
    return "";
  };

  return (
    <html lang="en" className={` ${nunito.variable}`}>
      <body className={`antialiased `}>
        <NextTopLoader color="#3182ce" showSpinner={false} />
        <Navbar />
        <ServiceModal
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