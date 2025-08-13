import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ServiceAreasSectionProps {
  title?: string;
  description?: string;
  areas?: string[];
  mapImage?: {
    url: string;
    alt?: string;
  };
  className?: string;
}

const ServiceAreasSection: React.FC<ServiceAreasSectionProps> = ({
  title = "Service Areas",
  description = "Serving businesses throughout the Greater Atlanta Metropolitan Area",
  areas,
  mapImage,
  className = "",
}) => {
  return (
    <section className={`${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-30 ">
          {/* Left Content */}
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-black mb-6">
              {title}
            </h2>
            <p className="font-primary text-base md:text-lg text-gray-600 mb-8">
              {description}
            </p>

            {/* Areas List */}
            {areas && areas.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
                {areas.map((area, index) => (
                  <div key={index} className="flex items-center">
                    <MapPin className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="font-primary text-base text-gray-700">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Content - Map Image */}
          <div className="relative">
            <div className="h-96 flex items-center overflow-hidden">
              {mapImage?.url ? (
                <div className="relative w-full h-full ">
                  <Image
                    src={mapImage.url}
                    alt={mapImage.alt || "Service area map"}
                    fill
                    className="object-contain w-[500px] h-[300px] lg:h-[60vh] lg:w-[70vw]"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="text-gray-400 text-center">
                  <p className="text-sm">Map image not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
