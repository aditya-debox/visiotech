'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardSectionProps {
  title: string;
  data: {
    icon?: React.ReactElement;
    title: string;
    desc?: string;
    link?: string; 
  }[];
}

const CardSection: React.FC<CardSectionProps> = ({
  data,
  title,
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  // Sample data if none provided
  const sampleData = [
    {
      title: "Security Camera Installation",
      desc: "Install high-quality cameras for 24/7 protection and remote monitoring.",
    },
    {
      title: "Home & Commercial Theater Systems",
      desc: "Design and install surround sound and projection systems for any space.",
    },
    {
      title: "Network System Setup",
      desc: "Build fast, secure, and reliable wired or wireless network infrastructures.",
    },
    {
      title: "Video Surveillance Systems",
      desc: "Custom surveillance systems designed for full coverage and easy playback.",
    },
  ];

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const displayData = data && data.length > 0 ? data : sampleData;

  return (
    <div className="max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 pb-16">
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-8 md:pb-12">
          <h1 className="justify-start flex-1 pr-4 font-primary text-4xl">
            {title}
          </h1>
        </div>
        
        <Carousel setApi={setApi} className="w-full relative">
          {/* Custom Navigation Buttons */}
          <div className="hidden md:flex absolute -top-16 right-0 gap-2 z-10">
            <button
              onClick={() => api?.scrollPrev()}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              disabled={current === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              disabled={current === count}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </button>
          </div>
          
          <CarouselContent className="-ml-3">
            {displayData.map((item, index) => {
              // Alternating colors based on position
              const isEven = index % 2 === 0;
              const cardColors = isEven 
                ? "bg-[#1e90ff] text-white" 
                : "bg-[#b8d4f0] text-gray-800";
              
              return (
                <CarouselItem key={index} className="pl-3">
                  <div className="h-full">
                    {(() => {
                      const cardContent = (
                        <div className={`${cardColors} rounded-lg p-8 h-full min-h-[280px] flex flex-col justify-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                          <div className="text-center space-y-4">
                            <h3 className="text-xl md:text-2xl leading-tight font-primary">
                              {item.title}
                            </h3>
                            <p className="text-sm md:text-base font-secondary leading-relaxed opacity-90">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );

                      // If there's a link, wrap the entire card in Link
                      

                      return cardContent;
                    })()}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            <button
              onClick={() => api?.scrollPrev()}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              disabled={current === 1}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous slide</span>
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              disabled={current === count}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next slide</span>
            </button>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CardSection;


