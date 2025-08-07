import React from "react";

interface Highlight {
  processTitle: string;
  processDescription: string;
}

interface ServiceBlockProps {
  introText?: string; // Keep for backward compatibility - simple string
  highlights?: Highlight[]; // New highlights prop
  authorName?: string;
  authorTitle?: string;
  className?: string;
  title?: string;
}

const ServiceBlock: React.FC<ServiceBlockProps> = ({
  introText,
  highlights,
  className = "",
  title,
}) => {
  const renderLegacyContent = () => {
    if (!introText) return null;
    
    return (
      <p className="text-base text-justify font-semibold font-primary text-black/90 leading-relaxed">
        {introText}
      </p>
    );
  };

  const renderHighlights = () => {
    if (!highlights || highlights.length === 0) return null;

    return (
      <div className="space-y-8">
        {highlights.map((highlight, index) => (
          <div key={index} className="text-left">
            <h3 className="text-lg md:text-2xl font-semibold font-primary text-blue-600 mb-4">
              {highlight.processTitle}
            </h3>
            <p className="text-base font-secondary text-black/70 leading-relaxed text-justify">
              {highlight.processDescription}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`bg-gray-50 relative rounded-2xl md:rounded-4xl py-5 md:py-10 my-5 md:my-10 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title */}
        {title && (
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-primary text-xl md:text-3xl font-bold text-gray-900 mb-5 md:mb-10 text-center">
              {title}
            </h2>
          </div>
        )}

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          {highlights && highlights.length > 0 ? (
            renderHighlights()
          ) : (
            <div className="text-center">
              {renderLegacyContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceBlock;