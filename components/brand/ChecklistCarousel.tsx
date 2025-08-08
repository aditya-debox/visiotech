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

  // Group data into pairs for each slide (2 cards per slide)
  const slidesData = [];
  for (let i = 0; i < data.length; i += 2) {
    slidesData.push(data.slice(i, i + 2));
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
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      {title && (
        <h2 className="font-primary text-xl md:text-3xl font-bold text-black  text-center mb-6">{title}</h2>
      )}
      
      {/* Carousel Container */}
      <div className="relative rounded-2xl p-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  {slideCards.map((card, cardIndex) => (
                    <div key={cardIndex} className="bg-white rounded-xl p-6 border border-gray-200 h-full">
                      <h3 className="text-lg font-semibold text-blue-600 mb-4 text-center  font-primary rounded-lg py-2">
                        {card.title}
                      </h3>
                      <div className="space-y-3">
                        {card.description.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-6 h-6  flex items-center justify-center ">
                              <Image
                                src={icon}
                                alt="checklist icon"
                                width={16}
                                height={16}
                                className="w-4 h-4"
                                loading="lazy"
                              />
                            </div>
                            <span className="text-gray-600 font-secondary text-sm flex-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Fill empty space if odd number of cards */}
                  {slideCards.length === 1 && (
                    <div className="hidden md:block"></div>
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
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
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