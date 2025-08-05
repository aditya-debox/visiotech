import React from "react";
import Link from "next/link";

interface IBrandData {
  heading: string;
  slug: string;
  shortDescription: {
    text: string;
    html: string;
    raw: any;
  };
  brandImage?: {
    url: string;
  };
  brandImageBlurhash?: string;
  title?: string;
  highlights?: {
    text: string;
    html: string;
    raw: any;
  };
  useCase?: {
    text: string;
    html: string;
    raw: any;
  };
  project?: {
    title: string;
    description: string;
  };
}

interface BrandCardProps {
  brand: IBrandData;
  index: number;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, index }) => {
  // Get description text from available sources
  const getDescriptionText = () => {
    if (brand.shortDescription?.text) return brand.shortDescription.text;
    if (brand.useCase?.text) return brand.useCase.text;
    if (brand.highlights?.text) return brand.highlights.text;
    if (brand.project?.description) return brand.project.description;
    return "Discover more about this service by clicking to learn more.";
  };

  return (
    <Link href={`/brand/${brand.slug}`}>
      <div className="group p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer h-full flex flex-col bg-white text-black hover:bg-[#2d5df5] hover:text-white border border-gray-200">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 text-black group-hover:text-white">
          {brand.heading}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4 flex-grow line-clamp-4 text-black group-hover:text-white/90">
          {getDescriptionText()}
        </p>

        {/* Learn More Link */}
        <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
          <span className="text-sm font-medium text-[#6366f1] group-hover:text-white">
            Learn More
          </span>
          <svg
            className="ml-2 w-4 h-4 text-[#6366f1] group-hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

interface BrandCardsProps {
  brands: IBrandData[];
  title?: string;
  subtitle?: string;
}

const BrandCards: React.FC<BrandCardsProps> = ({
  brands,
  title = "",
  subtitle = "",
}) => {
  // Fallback demo data
  const demoData: IBrandData[] = [
    {
      heading: "Professional Resume Review",
      slug: "resume-review",
      shortDescription: {
        text: "Get expert feedback and ATS-optimization to land more interviews.",
        html: "",
        raw: null,
      },
    },
    {
      heading: "Mock Interview",
      slug: "mock-interview",
      shortDescription: {
        text: "Master your interview skills with personalized 1 on 1 sessions from seasoned professionals.",
        html: "",
        raw: null,
      },
    },
    {
      heading: "LinkedIn Profile Optimization",
      slug: "linkedin-optimization",
      shortDescription: {
        text: "Showcase your professional credibility and enhance the conversation rate with potential employers.",
        html: "",
        raw: null,
      },
    },
  ];

  const displayData = brands && brands.length > 0 ? brands : demoData;

  return (
    <div className="max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 pb-16">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-black max-w-2xl mx-auto">{subtitle}</p>
          )}
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayData.map((brand, index) => (
          <BrandCard key={brand.slug || index} brand={brand} index={index} />
        ))}
      </div>
    </div>
  );
};

export default BrandCards;
