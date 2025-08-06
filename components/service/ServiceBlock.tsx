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
            bold: ({ children }) => (
              <strong className="font-bold">{children}</strong>
            ),
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-black mb-6">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-black mb-5">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-black mb-4">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-semibold text-black mb-3">
                {children}
              </h4>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-black mb-4 space-y-2">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-black mb-4 space-y-2">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="text-black">{children}</li>,
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-blue-200 hover:text-black underline"
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-300 pl-4 italic text-black mb-4">
                {children}
              </blockquote>
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
