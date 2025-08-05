import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";

interface ServiceBlockProps {
  introText: any;
  authorName: string;
  authorTitle: string;
  className?: string;
}

const ServiceBlock: React.FC<ServiceBlockProps> = ({
  introText,
  className = "my-20",
}) => {
  const renderContent = () => {
    // Check if introText is a string (normal text)
    if (typeof introText === 'string') {
      return (
        <p className="text-xl font-semibold font-primary text-white leading-relaxed px-4">
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
              <p className="text-xl font-semibold font-primary text-white leading-relaxed px-4 mb-4">
                {children}
              </p>
            ),
            bold: ({ children }) => <strong className="font-bold">{children}</strong>,
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-white mb-6">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-white mb-5">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-white mb-4">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-semibold text-white mb-3">{children}</h4>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-white mb-4 space-y-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-white mb-4 space-y-2">{children}</ol>
            ),
            li: ({ children }) => <li className="text-white">{children}</li>,
            a: ({ children, href }) => (
              <a href={href} className="text-blue-200 hover:text-white underline">
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-300 pl-4 italic text-white mb-4">
                {children}
              </blockquote>
            ),
          }}
        />
      );
    }

    // Fallback for other types
    return (
      <p className="text-xl font-semibold font-primary text-white leading-relaxed px-4">
        {String(introText)}
      </p>
    );
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-6 lg:px-12 relative bg-blue-600 rounded-4xl py-20 ${className}`}
    >
      <div className="max-w-6xl mx-auto text-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default ServiceBlock;