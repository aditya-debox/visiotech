"use client";

import React from "react";
import { Play } from "lucide-react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import ModalStore from "@/store/modal";

export interface ICommonHero {
  srTitle: string;
  title: string;
  subTitle: {
    raw: any;
    text: string;
    html: string;
  };

  heroImage?: {
    url: string;
  };
  serviceImage?: {
    url: string;
  };
}

interface CommonHeroProps {
  data: ICommonHero;
  imageUrl?: string; // Optional prop for custom image
}

const CommonHero: React.FC<CommonHeroProps> = ({ data, imageUrl }) => {
  const { setTriggerModal } = ModalStore();

  return (
    <div className="flex items-center">
      {/* <h1 className="sr-only">{data.srTitle}</h1> */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 md:pt-40 pb-10 md:pb-20">
        <div
          className={`grid gap-12 lg:gap-16 items-center ${
            imageUrl || data.heroImage?.url || data.serviceImage?.url
              ? "lg:grid-cols-2"
              : "lg:grid-cols-1 max-w-4xl mx-auto"
          }`}
        >
          {/* Right Image - Shows first on mobile, second on desktop */}
          {(imageUrl || data.heroImage?.url || data.serviceImage?.url) && (
            <div className="relative order-1 lg:order-2">
              <div className="relative bg-white rounded-2xl overflow-hidden transform">
                <img
                  src={
                    imageUrl || data.heroImage?.url || data.serviceImage?.url
                  }
                  alt="Hero illustration"
                  className="w-full h-[250px] md:h-[350px] object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Left Content - Shows second on mobile, first on desktop */}
          <div className="space-y-4 order-2 lg:order-1">
            <h1 className="text-2xl md:text-4xl font-bold font-primary text-black leading-tight">
              {data.title}
            </h1>

            <div className="text-sm font-secondary md:text-lg text-black leading-relaxed space-y-4">
              {data.subTitle?.raw ? (
                <RichText
                  content={data.subTitle.raw}
                  renderers={{
                    p: ({ children }) => (
                      <p className="text-sm md:text-lg text-black/70 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    bold: ({ children }) => (
                      <strong className="font-semibold text-gray-800">
                        {children}
                      </strong>
                    ),
                    italic: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                  }}
                />
              ) : (
                <p className="text-lg text-gray-600 font-secondary leading-relaxed">
                  {data.subTitle?.text || ""}
                </p>
              )}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => setTriggerModal(true)}
                className="bg-[#2d5df5] text-base text-white px-4 py-2 rounded-full shadow-sm cursor-pointer font-secondary"
              >
                Book A Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonHero;
