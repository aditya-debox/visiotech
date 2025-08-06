import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";

interface ServiceBlockProps {
  introText: any;
  authorName: string;
  authorTitle: string;
  className?: string;
  title?: string;
}

const ServiceBlock: React.FC<ServiceBlockProps> = ({
  introText,
  className = "",
  title,
}) => {
  const renderContent = () => {
    // Check if introText is a string (normal text)
    if (typeof introText === "string") {
      return (
        <p className="text-base text-justify font-semibold font-primary text-black/90 leading-relaxed md:px-4 ">
          {introText}
        </p>
      );
    }

    // Check if it's a Hygraph rich text object
    if (introText && (introText.raw || introText.html)) {
      return (
        <RichText
          content={introText.raw || introText}
          renderers={{
            p: ({ children }) => (
              <p className="text-xl  font-primary text-black leading-relaxed px-4 mb-4">
                {children}
              </p>
            ),
          }}
        />
      );
    }

    // Fallback for other types
    return (
      <p className="text-base text-justify   font-semibold font-primary text-black leading-relaxed px-4">
        {String(introText)}
      </p>
    );
  };

  return (
    <div
      className={` bg-gray-50  relative  rounded-2xl md:rounded-4xl py-10 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid gap-12 lg:gap-16 items-center lg:grid-cols-2 ">
        <h2 className="  text-start  font-primary text-xl md:text-3xl font-bold text-blue-600 mb-6">
          {title}
        </h2>
        <div className=" max-w-7xl mx-auto text-center">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ServiceBlock;
