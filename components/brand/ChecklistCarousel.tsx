"use client";

import Image from 'next/image';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui/carousel';
import { useState, useEffect } from 'react';

interface IChecklistCard {
  title: string;
  description: string[];
}

interface ChecklistCarouselProps {
  data: IChecklistCard[];
  icon: string;
  title?: string;
}

const ChecklistCarousel: React.FC<ChecklistCarouselProps> = ({ data, icon, title }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Group data differently for mobile vs desktop
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Group data: 1 card per slide on mobile, 2 cards per slide on desktop
  const slidesData = [];
  const cardsPerSlide = isMobile ? 1 : 2;
  for (let i = 0; i < data.length; i += cardsPerSlide) {
    slidesData.push(data.slice(i, i + cardsPerSlide));
  }

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const goToSlide = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
      {title && (
        <h2 className="font-primary text-xl md:text-3xl font-bold text-black  text-center mb-3 md:mb-6">{title}</h2>
      )}
      
      {/* Carousel Container */}
      <div className="relative rounded-2xl  p-8">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {slidesData.map((slideCards, slideIndex) => (
              <CarouselItem key={slideIndex}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6  h-full">
                  {slideCards.map((card, cardIndex) => (
                    <div key={cardIndex} className="bg-white rounded-xl p-4 md:p-6 border shadow-sm border-gray-200 h-full">
                      <h3 className="text-base md:text-lg font-semibold text-blue-600 mb-3 md:mb-4 text-center font-primary rounded-lg py-2">
                        {card.title}
                      </h3>
                      <div className="space-y-2 md:space-y-3">
                        {card.description.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-2 md:space-x-3">
                            <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
                              <Image
                                src={icon}
                                alt="checklist icon"
                                width={16}
                                height={16}
                                className="w-3 h-3 md:w-4 md:h-4"
                                loading="lazy"
                              />
                            </div>
                            <span className="text-gray-600 font-secondary text-sm flex-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Fill empty space if odd number of cards on desktop */}
                  {slideCards.length === 1 && !isMobile && (
                    <div></div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Hide the default arrows by making them invisible */}
          
        </Carousel>
        
        {/* Custom Blue Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer shadow-sm duration-200 ${
                current - 1 === index 
                  ? 'bg-blue-600 ' 
                  : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChecklistCarousel;