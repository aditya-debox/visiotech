import React from "react";
import Link from "next/link"; // Add this for navigation to slug pages
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Cta from "../Home/Cta";

interface IBrandData {
  heading: string;
  slug: string;
  shortDescription: {
    text: string;
    html: string;
    raw: any;
  };
  brandImage: {
    url: string;
  };
  brandImageBlurhash: string;
  title: string;
  highlights: {
    processTitle: string;
    processDescription: string;
  };
  useCase: string[];
  project: {
    title: string;
    description: string;
  };
}

interface BrandCardProps {
  brand: IBrandData;
  index: number;
  isBlue?: boolean;
}

const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  index,
  isBlue = false,
}) => {
  // Get description text from available sources
  const getDescriptionText = () => {
    if (brand.shortDescription?.text) return brand.shortDescription.text;
    // if (brand.useCase?.text) return brand.useCase.text;
    // if (brand.highlights?.text) return brand.highlights.text;
    if (brand.project?.description) return brand.project.description;
    return "Discover more about this service by clicking to learn more.";
  };

  return (
    <Link href={`/brand/${brand.slug}`} className="">
      <div
        className={`group relative overflow-hidden transition-all duration-500 transform cursor-pointer flex flex-col h-full`}
      >
        {/* Background Image with Overlay */}
        {/* {brand.brandImage?.url && (
          <div className="mb-5 transition-opacity duration-500 flex-shrink-0">
            <div className="md:hidden block">
              <Image
                src={brand.brandImage.url}
                alt={brand.heading}
                layout="responsive"
                width="400"
                height="200"
                objectFit="cover"
                className="overflow-hidden transition duration-500 hover:scale-110 rounded-lg hover:rounded-lg"
                // placeholder="blur"
                // blurDataURL={blurHashToDataURL(post?.blurHash)}
                loading="lazy"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 30vw"
              />
            </div>
            <div className="hidden md:block">
              <Image
                src={brand.brandImage.url}
                alt={brand.heading}
                layout="responsive"
                width="450"
                height="320"
                className="overflow-hidden transition duration-500 hover:scale-110 rounded-lg hover:rounded-lg"
                // placeholder="blur"
                objectFit="cover"
                // blurDataURL={blurHashToDataURL(post?.blurHash)}
                loading="lazy"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 30vw"
              />
            </div>
          </div>
        )} */}

        {/* Content Container */}
        <div className="relative z-10 flex flex-col flex-grow">
          {/* Brand Name and Arrow - Always Visible */}
          <div className="flex items-start w-full justify-between">
            <div className="w-24 h-16 pr-4 mb-4">
              <Image
                src={brand.brandImage.url}
                alt={brand.heading}
                layout="responsive"
                width="100"
                height="40"
                objectFit="cover"
                className="overflow-hidden transition rounded-sm"
                // placeholder="blur
                // blurDataURL={blurHashToDataURL(post?.blurHash)}
                loading="lazy"
              />
            </div>
            <h3
              className={`text-lg line-clamp-2 group-hover:underline underline-offset-2 font-medium group-hover:text-black text-black/60 font-secondary transition-all duration-300 flex-grow pr-2`}
            >
              {brand.heading}
            </h3>
            {/* <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-[#0e8de8] transition-transform duration-300 transform rotate-0 group-hover:rotate-45" /> */}
          </div>

          {/* Description - Aligned and Consistent */}
          <div className="flex-grow flex items-end">
            <p
              className={`text-sm text-gray-500 group-hover:text-gray-700 font-secondary leading-relaxed line-clamp-3 text-left w-full`}
            >
              {getDescriptionText()}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <p className="flex text-sm">Learn More</p>
            <ArrowUpRight className="w-4 h-4 group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />{" "}
          </div>
        </div>
      </div>
    </Link>
  );
};

interface BrandCardsProps {
  brands: IBrandData[];
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
}

const BrandCards: React.FC<BrandCardsProps> = ({
  brands,
  title = "Our Brands",
  subtitle = "We partner with the best to bring you the best",
  showCTA = true,
}) => {
  // Fallback to demo data only if no brands provided
  const demoData: IBrandData[] = [];

  // Use provided brands or fallback to demo data
  const displayData = brands && brands.length > 0 ? brands : demoData;

  return (
    <div className="max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 py-30">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl text-black font-primary font-medium mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl mb-6 max-w-3xl font-secondary text-gray-500 mx-auto">
            {subtitle}
          </p>
        )}
        <div className="w-24 h-1 bg-[#0e8de8] mx-auto rounded-full"></div>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-18 md:gap-24">
        {displayData.map((brand, index) => (
          <BrandCard
            key={brand.slug || index}
            brand={brand}
            index={index}
            isBlue={index % 2 === 0} // Every third card will be blue
          />
        ))}
      </div>

      {/* Bottom CTA Section */}
    </div>
  );
};

export default BrandCards;
