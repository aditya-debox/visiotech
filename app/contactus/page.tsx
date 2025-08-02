"use client";
import React from "react";
import ContactSection from "@/components/constactus/contactsection";
import ContactFrom from "@/components/constactus/contactform";
import type { Metadata } from 'next';


const BlueBlobBackground = () => (
  <div className="absolute top-[60px] left-0 w-full -z-10 overflow-hidden">
    <svg
      viewBox="0 0 1440 600"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[1500px] sm:h-[1000px] md:h-[1250px]"
    >
      {/* Base wave */}
      <path
        fill="#3366CC"
        d="M0,400L60,380C120,360,240,320,360,300C480,280,600,280,720,300C840,320,960,360,1080,370C1200,380,1320,350,1380,340L1440,330L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      />

      {/* Top wave */}
      <path
        fill="#3366CC"
        fillOpacity="0.5"
        d="M0,280L80,290C160,300,320,330,480,310C640,290,800,260,960,250C1120,240,1280,280,1360,300L1440,320L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      />
    </svg>
  </div>
);

const ContactUs = () => {
  return (
    <div className="relative min-h-screen">
      <BlueBlobBackground />
        <ContactSection />
        <ContactFrom />
      
    </div>
  );
};

export default ContactUs;