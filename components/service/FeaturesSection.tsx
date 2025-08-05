import React from "react";

interface FeaturesProps {
  title: string;
  features: string[];
}

const FeaturesSection: React.FC<FeaturesProps> = ({ features, title }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-2xl font-semibold font-primary pb-8 text-black">{title}</h2>
     
          <ul className="font-primary text-lg space-y-4 list-disc pl-4">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        
      
    </section>
  );
};

export default FeaturesSection;
