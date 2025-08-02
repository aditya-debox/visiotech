import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

interface AboutUsSectionProps {
  title?: string;
  heroImage?: string;
  heroImageAlt?: string;
  paragraphs?: string[];
  richTextContent?: any; // Rich text raw content from Hygraph
  features?: FeatureItem[];
  showFeatures?: boolean;
  className?: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Flexible Scheduling",
    description:
      "Convenient appointment times that work with your busy lifestyle",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "Advanced Technology",
    description:
      "State-of-the-art equipment for precise and comfortable treatments",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Multiple Locations",
    description:
      "Convenient locations throughout the community for easy access",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

const defaultParagraphs = [
  "Smile Loft Dental Owners Drs. Laxmi Reddy and Vaibhav Rai believe in a simple mission: to make dental care accessible, high-quality, and convenient for everyone. What began as a vision has grown into a trusted group of practices serving our communities with heart and excellence.",
  "We believe patients deserve more—more personalized care, more time, and more advanced solutions. From flexible scheduling and multiple locations to modern technology and highly skilled professionals, we're here to make your dental experience seamless and comfortable.",
  "At Smile Loft, we're proud to offer care that's within reach, delivered with integrity, and designed around you.",
];

const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  title = "ABOUT US",
  heroImage = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
  heroImageAlt = "Dental professional treating patient in modern clinic",
  paragraphs = defaultParagraphs,
  richTextContent,
  features = defaultFeatures,
  showFeatures = true,
  className = "",
}) => {
  return (
    <div
      className={`max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 py-20  ${className}`}
    >
      {/* Hero Image */}
      <div className="relative mb-12  overflow-hidden">
        <img
          src={heroImage}
          alt={heroImageAlt}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* About Us Content */}
      <div className="space-y-8">
        <h2 className="text-4xl font-primary text-white mb-8">{title}</h2>

        <div className="space-y-6 text-white font-secondary leading-relaxed">
          {richTextContent ? (
            <div className="text-base prose prose-lg max-w-none">
              <RichText content={richTextContent} />
            </div>
          ) : (
            paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg">
                {paragraph}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
