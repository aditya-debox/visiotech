import React from 'react';

interface AboutusHeroHeroSectionProps {
  title?: string;
  headline?: string;
  heroImage?: string;
  heroImageAlt?: string;
  className?: string;
}

const AboutusHeroSection: React.FC<AboutusHeroHeroSectionProps> = ({
  title = "About Visiotech – Trusted Experts in Security & Low-Voltage Integration",
  headline = "Building Safer, Smarter Spaces Since 2016",
  heroImage = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
  heroImageAlt = "Professional security installation team at work",
  className = ""
}) => {
  return (
    <div className={`max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 pb-40 pt-30 ${className}`}>
      {/* Hero Image */}
      <div className="relative mb-12 overflow-hidden rounded-lg">
        <img
          src={heroImage}
          alt={heroImageAlt}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl font-primary font-bold mb-4">
              {headline}
            </h2>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-primary text-white mb-8 leading-tight">
        {title}
      </h1>
    </div>
  );
};

export default AboutusHeroSection;