import React from "react";
import Image from "next/image";

interface OurStoryProps {
    serviceImage: {
    url: string;
  };
  description: {
    html: string;
    text: string;
    raw: any;
  };
}

const OurStory: React.FC<OurStoryProps> = ({ description, serviceImage }) => {
  return (
    <section className="pb-5 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 font-primary">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-black mb-6">
              Our Story
            </h2>
            
            {/* Use the HTML content from aboutdata.description */}
            <div 
              className="text-gray-600 text-lg leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: description.html }}
            />
          </div>

          {/* Right Content - Analytics Dashboard */}
          <div className="relative">
            <Image
            src={serviceImage.url}
            alt="Our Story Image"
            width={800}
            height={600}
            
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;