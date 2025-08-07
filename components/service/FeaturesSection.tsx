"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";

interface Feature {
  processTitle: string;
  processDescription: string;
}

interface FeaturesSecitonProps {
  title: string;
  features: Feature[];
}

const FeaturesSeciton: React.FC<FeaturesSecitonProps> = ({ features, title }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [visibleItems, setVisibleItems] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateVisibleItems = () => {
      const container = carouselApi.containerNode();
      const item = container.querySelector('[data-carousel-item]');
      if (item) {
        const containerWidth = container.clientWidth;
        const itemWidth = (item as HTMLElement).offsetWidth;
        const itemsPerView = Math.floor(containerWidth / itemWidth);
        setVisibleItems(Math.max(1, itemsPerView));
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    setCurrentPage(Math.floor(carouselApi.selectedScrollSnap() / visibleItems));

    carouselApi.on("select", () => {
      const newCurrent = carouselApi.selectedScrollSnap();
      setCurrentPage(Math.floor(newCurrent / visibleItems));
    });

    return () => {
      window.removeEventListener('resize', updateVisibleItems);
    };
  }, [carouselApi]);

  // Show navigation when there are more slides than visible items
  const shouldShowNavigation = features.length > visibleItems;

  // Calculate number of dots based on pages needed
  const totalPages = Math.ceil(features.length / visibleItems);

  const handleDotClick = (pageIndex: number) => {
    if (carouselApi) {
      const targetIndex = pageIndex ;
      setCurrentPage(pageIndex); 
      carouselApi.scrollTo(targetIndex);
    }
  };

  return (
    <div className="w-full px-6 py-5 md:py-10 overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-primary text-xl md:text-3xl font-bold text-black mb-5  text-center">
          {title}
        </h2>

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
            {features.map((feature, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
                data-carousel-item
              >
                <div className="p-1 h-full">
                  <Card className="group h-full bg-white hover:bg-blue-600 transition-all duration-300 flex">
                    <CardContent className="flex flex-col justify-center items-center text-center p-6 w-full">
                      <div className="flex flex-col flex-grow justify-center space-y-3">
                        <h3 className="text-lg sm:text-xl font-bold font-secondary text-gray-900 group-hover:text-white transition-colors duration-300">
                          {feature.processTitle}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-100 transition-colors duration-300">
                          {feature.processDescription}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Show dots only when there are actual pages to navigate */}
        {shouldShowNavigation && totalPages > 1 && (
          <div className="flex gap-2 sm:gap-4 mt-8 justify-center">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentPage === index ? "bg-blue-600" : "bg-gray-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturesSeciton; 