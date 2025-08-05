import React from "react";
import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";

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
        className={`bg-white group cursor-pointer rounded-2xl p-0 md:p-8 duration-300 flex flex-col h-full ${className}`}
      >
        {/* Service Icon */}
        <div className="mb-6">
          <div className="w-fit p-3.5 bg-blue-100 group-hover:bg-blue-400 transition-all duration-300 rounded-2xl flex items-center justify-center">
            <Image
              src={service.serviceIcon.url}
              alt={`${service.serviceTitle} icon`}
              width={32}
              height={32}
              className="w-5 h-5 object-contain"
            />
          </div>
        </div>

        {/* Service Title */}
        <h3 className="text-lg font-medium text-black/60 group-hover:text-black mb-2">
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
      </div>
    </Link>
  );
};

interface ServiceGridProps {
  services: ServiceDetail[];
  className?: string;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({
  services,
  className = "",
}) => {
  return (
    <div className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-primary">
            Our Services
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-secondary">
            See what we offer
          </p>

          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;
