import React from 'react';
import Image from 'next/image';

interface Company {
  name: string;
  logo: string;
}

interface TrustedCompaniesProps {
  companies: Company[];
  title?: string;
  className?: string;
}

const TrustedCompanies: React.FC<TrustedCompaniesProps> = ({ 
  companies, 
  title = "Trusted by these companies so far",
  className = ""
}) => {
  return (
    <div className={`${className}`}>
      <div className="max-w-7xl mx-auto px-6 pb-20 lg:px-12 text-center">
        <p className="text-black text-lg">{title}</p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center gap-2 transition-colors duration-200">
              <div className="relative w-35 h-25 ">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain grayscale"
                />
              </div>
              <span className="font-bold text-base md:text-lg">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedCompanies;