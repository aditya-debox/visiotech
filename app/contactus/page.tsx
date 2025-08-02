
import React from "react";
import ContactSection from "@/components/constactus/contactsection";
import ContactFrom from "@/components/constactus/contactform";
import type { Metadata } from 'next';


const BlueBlobBackground = () => (
  <div className="absolute top-[60px] left-0 w-full -z-10 overflow-hidden">
    <svg
      viewBox="0 0 1440 800"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto min-h-[600px]"
      preserveAspectRatio="none"
    >
      {/* Main flowing blob */}
      <path
        fill="#3366CC"
        d="M0,0 L1440,0 L1440,200 C1380,220 1320,240 1200,250 C1080,260 960,240 840,220 C720,200 600,180 480,190 C360,200 240,230 120,240 C60,245 30,242 0,240 L0,0 Z"
      />

      {/* Extended flowing section */}
     <path
        fill="#3366CC"
        fillOpacity="0.4"
        d="M0,280L80,290C160,300,320,330,480,310C640,290,800,260,960,250C1120,240,1280,280,1360,300L1440,320L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      />
    </svg>
  </div>
);

const ContactUs = () => {
  return (
    <div className="relative min-h-screen">
      <BlueBlobBackground />
      <div className=" relative z-10  ">
        <ContactSection />
        <ContactFrom />
      </div>
    </div>
  );
};

export default ContactUs;