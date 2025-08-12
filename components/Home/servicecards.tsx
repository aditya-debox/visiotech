"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceDetail {
  slug: string;
  serviceTitle: string;
  serviceDescription: {
    text: string;
    html: string;
    raw: any;
  };
  serviceImage: {
    url: string;
  };
  serviceImageBlurHash: string;
  serviceIcon: {
    url: string;
  };
}

interface ServiceCardProps {
  service: ServiceDetail;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  className = "",
}) => {
  return (
    <Link href={`service/${service.slug}`}>
      <div
        className={`bg-white group cursor-pointer rounded-2xl overflow-hidden duration-300 flex flex-col h-full ${className}`}
      >
        {/* Full-width Service Image */}
        <div className="relative w-full h-48 md:h-40 overflow-hidden">
          <Image
            src={service.serviceImage.url}
            alt={`${service.serviceTitle} image`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            blurDataURL={service.serviceImageBlurHash}
          />
          {/* Service Icon Overlay */}
          {/* <div className="absolute top-4 left-4">
            <div className="w-fit p-2.5 bg-white/90 backdrop-blur-sm transition-all duration-300 rounded-xl flex items-center justify-center shadow-sm">
              <Image
                src={service.serviceIcon.url}
                alt={`${service.serviceTitle} icon`}
                width={24}
                height={24}
                className="w-4 h-4 object-contain"
              />
            </div>
          </div> */}
        </div>

        {/* Content Section */}
        <div className="py-4 md:py-6  pr-4 lg:pr-6 flex flex-col flex-grow">
          {/* Service Title */}
          <h3 className="text-lg font-bold text-black/70 group-hover:text-black line-clamp-1 mb-3">
            {service.serviceTitle}
          </h3>

          {/* Service Description - Rich Text with Line Clamp */}
          <div className="mt-auto">
            <RichText
              content={service.serviceDescription.raw}
              renderers={{
                p: ({ children }) => (
                  <p className="text-sm line-clamp-2 text-gray-500 group-hover:text-gray-600">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
          
          <div className="flex items-center gap-1 mt-3">
            <p className="flex text-gray-500 group-hover:underline underline-offset-2 text-sm">
              Learn More
            </p>
            <ArrowUpRight className="w-4 h-4 group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

interface ServiceGridProps {
  services: ServiceDetail[];
  className?: string;
  showAll?: boolean;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({
  services,
  className = "",
  showAll = false,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showLimited, setShowLimited] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Reset limited view when resizing
      if (!mobile) setShowLimited(false);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const shouldLimit = isMobile && showAll;
  const visibleServices =
    shouldLimit && showLimited ? services.slice(0, 4) : services;

  return (
    <div className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold font-primary text-black mb-2 md:mb-4">
            Our Services
          </h2>
          <p className="text-sm md:text-lg text-gray-500 max-w-2xl font-secondary mx-auto">
            See what we offer
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-3 md:mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4">
          {visibleServices.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {shouldLimit && (
          <div className="mt-8 text-center">
            <Link href={`/service`}>
              <button className="text-blue-600 border-2 border-blue-400 px-4 items-center rounded-full text-sm py-1.5 hover:text-blue-800 font-medium transition duration-200">
                View All
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceGrid; 