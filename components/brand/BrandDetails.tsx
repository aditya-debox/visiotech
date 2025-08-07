import React from "react";
import Link from "next/link";
import {
  CheckCircle,
  Shield,
  Eye,
  Zap,
  Building,
  Store,
  Car,
} from "lucide-react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import CommonHero from "../common/CommonHero";
import Processes from "../service/Processes";
import CardSection from "../common/CardSection";
import Cta from "../Home/Cta";
import SliderScroll from "../common/SlideScroll";

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
  highlights: {
    processTitle: string;
    processDescription: string;
  }[];
  highlightTitle: string;
  useCases: {
    title: string;
    image: { url: string };
    hash: string;
  }[];
  cta: string;
}

interface BrandDetailProps {
  brand: IBrandData;
  className?: string;
}

const BrandDetailPage: React.FC<BrandDetailProps> = ({
  brand,
  className = "",
}) => {
  // Use actual API data without defaults
  const brandData = {
    heading: brand.heading,
    tagline: brand.heading,
    overview: brand.shortDescription,
    image: brand.brandImage,
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <CommonHero
          data={{
            srTitle: brandData.heading,
            title: brandData.tagline,
            subTitle: brandData.overview, // Full rich text object with raw, text, html
            serviceImage: brandData.image, // Add this line
          }}
        />
      </div>
      <Processes process={brand.highlights} title={brand.highlightTitle} />
      <div className="mx-auto max-w-7xl">
        {/* What makes us different Section - Using Rich Text */}
        {/* <CardSection data={brand.useCase} title="Ideal Use Cases" /> */}
        <SliderScroll data={brand.useCases} />
        {/* Use Cases - Using Rich Text */}

        {/* Project Cards Section */}
        {/* <FeaturesSection
          title="Visiotech Projects"
          features={brand.projects}
          pb
        /> */}
        {/* CTA Section */}
      </div>
      <Cta title={brand.cta} />
    </div>
  );
};

export default BrandDetailPage;
