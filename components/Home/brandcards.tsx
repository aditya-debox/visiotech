"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

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
      <div className="p-6 rounded-xl transition-all duration-300 cursor-pointer flex flex-col bg-white text-black h-full">
        {/* Title */}
        <div className="w-full flex justify-center">
          <div className="w-44 h-20 overflow-hidden flex items-center justify-center pr-4 mb-4">
            <Image
              src={brand.brandImage ? brand?.brandImage.url : ""}
              alt={brand.heading}
              width="100"
              height="40"
              className="overflow-hidden transition rounded-sm object-cover"
              loading="lazy"
            />
          </div>
        </div>

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
          <ArrowRight className="w-5 h-5 text-primary group-hover:text-white group-hover:rotate-0 transition-all duration-300 -rotate-45 pl-1 flex flex-shrink-0" />
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
  const [current, setCurrent] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isMobile, setIsMobile] = useState(false);

  // Fallback demo data - empty array since no demo data provided
  const demoData: IBrandData[] = [];

  const displayData = brands && brands.length > 0 ? brands : demoData;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 1024);
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const itemsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(displayData.length / itemsPerSlide);
  const slides = Array.from({ length: totalSlides }, (_, i) =>
    displayData.slice(i * itemsPerSlide, (i + 1) * itemsPerSlide)
  );
  const showNavDots = totalSlides > 1;

  return (
    <div className="max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 pb-6 md:pb-16">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-6 md:mb-10">
          {title && (
            <h2 className="text-2xl md:text-4xl font-bold font-primary text-black mb-2 md:mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm md:text-lg text-gray-500 max-w-2xl font-secondary mx-auto">
              {subtitle}
            </p>
          )}
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-3 md:mt-6 rounded-full"></div>
        </div>
      )}

      {/* Carousel for all screen sizes */}
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "start",
          loop: false,
          skipSnaps: false,
          dragFree: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, slideIndex) => (
            <CarouselItem key={slideIndex} className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {slide.map((brand, index) => (
                  <div
                    key={brand.slug || `${slideIndex}-${index}`}
                    className="h-full bg-white hover:text-white border border-gray-200 rounded-lg transition-all duration-300"
                  >
                    <BrandCard
                      brand={brand}
                      index={slideIndex * itemsPerSlide + index}
                    />
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {showNavDots && (
          <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-5 justify-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrent(index);
                  carouselApi?.scrollTo(index);
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all cursor-pointer duration-300 ${
                  current === index ? "bg-blue-600" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default BrandCards;
