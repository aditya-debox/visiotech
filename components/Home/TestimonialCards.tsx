"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

interface ITestimonial {
  name: string;
  description: string;
}

interface TestimonialCardProps {
  testimonial: ITestimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  return (
    <div className="group text-black hover:text-white p-8 rounded-2xl hover:bg-[#2d5df5] h-full flex flex-col justify-between min-h-[300px] relative overflow-hidden transition-all duration-300">
      {/* Background gradient overlay */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Quote */}
        <div className="flex-grow mb-8">
          <svg
            className="w-8 h-8 text-blue-400 mb-4"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
          </svg>
          <p className="text-lg md:text-xl leading-relaxed font-medium">
            "{testimonial.description}"
          </p>
        </div>

        {/* Author */}
        <div>
          <h4 className="font-secondary italic text-gray-500 transition-all duration-300 group-hover:text-white text-lg mb-1">
            - {testimonial.name}
          </h4>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
    </div>
  );
};

interface TestimonialCardsProps {
  testimonials: ITestimonial[];
  title?: string;
  subtitle?: string;
}

const TestimonialCards: React.FC<TestimonialCardsProps> = ({
  testimonials,
  title = "What Our Clients Say",
  subtitle = "Don't just take our word for it - hear from our satisfied customers",
}) => {
  // Fallback demo data
  const demoData: ITestimonial[] = [];

  const displayData =
    testimonials && testimonials.length > 0 ? testimonials : demoData;

  const [current, setCurrent] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isMobile, setIsMobile] = useState(false);

  // Fallback demo data - empty array since no demo data provided

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
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto xl:px-12 lg:px-12 px-6">
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
                      key={`${slideIndex}-${index}`}
                      className="h-full bg-white hover:text-white border border-gray-200 shadown-sm rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                      <TestimonialCard
                        key={index}
                        testimonial={brand}
                        index={index}
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
                  className={`w-2 h-2 cursor-pointer sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    current === index ? "bg-blue-600" : "bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </Carousel>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-16">
                    <div className="inline-flex items-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                        <span>See More Reviews</span>
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default TestimonialCards;
