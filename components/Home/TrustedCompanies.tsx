import React from "react";
import Image from "next/image";

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
  className = "",
}) => {
  return (
    <div className={`${className}`}>
      <div className="max-w-7xl mx-auto px-6 pb-10 md:pb-20 lg:px-12 text-center">
        <p className="text-black text-lg mb-2">{title}</p>
        <div className="flex flex-wrap justify-center items-center gap-5 md:gap-10">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex flex-col items-center transition-colors duration-200"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-medium text-sm">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedCompanies;
