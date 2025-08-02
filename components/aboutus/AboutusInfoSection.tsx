import React from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';

interface Item {
  name: string;
  title: string;
  image: string;
  imageAlt: string;
  bio?: string[];
  bioRichText?: any; // Rich text raw content from Hygraph
}

interface AboutOwnersProps {
  title?: string;
  items?: Item[];
  className?: string;
}



const AboutOwnersSection: React.FC<AboutOwnersProps> = ({
  title = "ABOUT THE OWNERS",
  items = [],
  className = ""
}) => {
  return (
    <div className={`max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 py-16 ${className}`}>
      {/* Title */}
      <h2 className="text-4xl font-primary text-gray-900 mb-12">
        {title}
      </h2>

      {/* Owners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {items.map((item, index) => (
          <div key={index} className="space-y-6">
            {/* Owner Image */}
            <div className="relative overflow-hidden ">
              <img 
                src={item.image}
                alt={item.imageAlt}
                className="w-full h-8o object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>

            {/* Owner Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-primary text-gray-900 tracking-wide">
                {item.name}
              </h3>
              
              {/* Bio Paragraphs */}
              <div className="space-y-4 font-secondary text-gray-700 leading-relaxed">
                {item.bioRichText ? (
                  <div className="text-base prose prose-sm max-w-none">
                    <RichText content={item.bioRichText} />
                  </div>
                ) : (
                  item.bio?.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="text-sm">
                      {paragraph}
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutOwnersSection;