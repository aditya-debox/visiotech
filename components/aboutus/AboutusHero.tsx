"use client";
import ModalStore from "@/store/modal";
import React from "react";

interface HeroData {
  srTitle: string;
  title: string;
  subTitle: string;
}

interface AboutUsHeroProps {
  data: HeroData;
}

const AboutUsHero: React.FC<AboutUsHeroProps> = ({ data }) => {
  // Function to highlight specific words (index 2 and 3) in blue
  const highlightTitle = (title: string) => {
    const words = title.split(" ");
    return words.map((word, index) => {
      if (index === 1 || index === 2) {
        return (
          <span key={index} className="text-blue-500">
            {word}{" "}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };
  const { setTriggerModal } = ModalStore();
  return (
    <section className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 font-primary">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-5xl max-w-4xl mx-auto font-bold text-gray-900 mb-6 leading-tight">
            {highlightTitle(data.title)}
          </h1>

          {/* Subtitle */}
          <p className="text-lg  text-gray-600 mb-8 max-w-3xl mx-auto">
            {data.subTitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setTriggerModal(true)}
              className="border-2 text-base border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;
