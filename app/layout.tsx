"use client";
import {
  Montserrat,
  Nunito,
  Playfair_Display,
  Raleway,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import ModalStore from "@/store/modal";
import Modal from "@/components/common/Modal";
import NextTopLoader from "nextjs-toploader";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { triggerModal, setTriggerModal } = ModalStore();

  return (
    <html lang="en" className={` ${nunito.variable}`}>
      <body className={`antialiased `}>
        <NextTopLoader color="#3182ce" showSpinner={false} />
        <Navbar />
        <Modal isOpen={triggerModal} onClose={() => setTriggerModal(false)}>
          <iframe
            className="w-full"
            src="https://creatorapp.zohopublic.in/zoho_tech59/visiotech-lead-management/form-perma/Enquiry_Form/nze0WRwMN2w0GZayQJpvHhekWjMPj40sDQJCtqPe6GNvvfBEJ2fMpG9pMQbqvegt6VRz0xOjNUVAr12ur9xsfAuSkGT21Wzrwewp?Services_Master=34877000007080035"
          />
        </Modal>
        {children}
        <Footer />
      </body>
    </html>
  );
}
