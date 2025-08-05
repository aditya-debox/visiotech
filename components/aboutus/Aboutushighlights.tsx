import React from "react";
import { Settings, BarChart3, Clock, Shield } from "lucide-react";

interface Highlight {
  processTitle: string;
  processDescription: string;
}

interface AboutusHighlightsProps {
  highlights: Highlight[];
}

const AboutusHighlights: React.FC<AboutusHighlightsProps> = ({ highlights }) => {
  // Icons array to map with highlights - you can customize these
  const icons = [Settings, BarChart3, Clock, Shield];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 font-primary">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-primary text-gray-900 mb-6">
            What Makes Us Different
          </h2>
          <p className="text-lg text-gray-600 font-secondary max-w-3xl mx-auto">
            We don't just install devices—we build comprehensive security ecosystems that
            evolve with your business.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => {
            const IconComponent = icons[index % icons.length];
            
            return (
              <div key={index} className="text-center">
                {/* Icon */}
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-blue-500" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold font-primary text-gray-900 mb-4">
                  {highlight.processTitle}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed font-secondary">
                  {highlight.processDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutusHighlights;