import React from 'react';
import Image from 'next/image';

interface ServiceDetail {
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

const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl p-8 duration-300 ${className}`}>
      {/* Service Icon */}
      <div className="mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
          <Image 
            src={service.serviceIcon.url} 
            alt={`${service.serviceTitle} icon`}
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
      </div>

      {/* Service Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {service.serviceTitle}
      </h3>

      {/* Service Description - Rich Text with Line Clamp */}
      <div 
        className="text-gray-600 leading-relaxed line-clamp-4 prose prose-sm max-w-none prose-p:m-0 prose-p:mb-2 prose-ul:m-0 prose-li:m-0"
        dangerouslySetInnerHTML={{ __html: service.serviceDescription.html }}
      />
    </div>
  );
};

interface ServiceGridProps {
  services: ServiceDetail[];
  className?: string;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services, className = "" }) => {
  return (
    <div className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
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