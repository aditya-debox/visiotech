"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CardProps {
  title: string;
  data: string[];
}

const CardSection: React.FC<CardProps> = ({ data, title }) => {
  const [current, setCurrent] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isMobile, setIsMobile] = useState(false);

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
  const totalSlides = Math.ceil(data.length / itemsPerSlide);
  const slides = Array.from({ length: totalSlides }, (_, i) =>
    data.slice(i * itemsPerSlide, (i + 1) * itemsPerSlide)
  );
  const showNavDots = totalSlides > 1;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-16 py-6 md:py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-primary text-xl md:text-3xl font-bold text-gray-900 mb-5 md:mb-10 text-center">
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
            {slides.map((slide, slideIndex) => (
              <CarouselItem key={slideIndex} className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 h-full">
                  {slide.map((data, index) => (
                    <Card
                      key={index}
                      className="h-full bg-white hover:text-white hover:bg-blue-600 transition-all duration-300"
                    >
                      <CardContent className="lex flex-row items-center gap-4 sm:gap-6">
                        {/* <div className="w-full sm:w-[160px] h-[200px] sm:h-full flex-shrink-0">
                          <Image
                            src={data.image}
                            alt={data.name}
                            className="rounded-lg object-contain sm:object-cover w-full h-full"
                            width={560}
                            height={560}
                          />
                        </div> */}

                        <div className="flex flex-col flex-grow space-y-2 ">
                          <p className="text-base sm:text-xl font-secondary text-center">
                            {data}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {showNavDots && (
            <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-5 justify-center ">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index);
                    carouselApi?.scrollTo(index);
                  }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    current === index ? "bg-blue-600" : "bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default CardSection;
