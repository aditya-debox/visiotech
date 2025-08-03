import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";

interface DifferentiatorItem {
  title: string;
  description: string;
}

interface AboutusCommitmentProps {
  title?: string;
  content?: any; // Rich text raw content from highlights
  items?: DifferentiatorItem[];
  className?: string;
}

const AboutusCommitment: React.FC<AboutusCommitmentProps> = ({
  title = "What Makes Us Different",
  content, // Rich text content from highlights
  items = [
    {
      title: "End-to-End Solutions",
      description: "From structured cabling to surveillance and access control, we cover the full low-voltage ecosystem."
    },
    {
      title: "Industry-Specific Designs",
      description: "We understand the unique security and communication needs of dealerships, nightclubs, restaurants, warehouses, and more."
    },
    {
      title: "Rapid Turnaround",
      description: "Our lean team structure and hands-on project management ensure fast delivery without compromising quality."
    },
    {
      title: "Certified & Insured",
      description: "We're fully licensed in Georgia and maintain the highest standards in safety and compliance."
    }
  ],
  className = ""
}) => {
  return (
    <div className={`max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 pb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-primary text-gray-900 mb-12">
        {title}
      </h2>
      
      {/* Rich Text Content from Hygraph */}
      {content ? (
        <div>
          <RichText 
            content={content} 
            renderers={{
              ul: ({ children }) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {children}
                </div>
              ),
              li: ({ children }) => (
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  {children}
                </div>
              ),
              p: ({ children }) => (
                <p className="font-secondary text-gray-700 leading-relaxed">
                  {children}
                </p>
              ),
              bold: ({ children }) => (
                <h3 className="text-xl font-primary font-bold text-black mb-3">
                  {children}
                </h3>
              ),
              h1: ({ children }) => (
                <h3 className="text-xl font-primary font-bold text-black mb-3">
                  {children}
                </h3>
              ),
              h2: ({ children }) => (
                <h3 className="text-xl font-primary font-bold text-black mb-3">
                  {children}
                </h3>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-primary font-bold text-black mb-3">
                  {children}
                </h3>
              ),
            }}
          />
        </div>
      ) : (
        /* Fallback to default items */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-primary font-bold text-black mb-3">
                {item.title}
              </h3>
              <p className="font-secondary text-black leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutusCommitment;