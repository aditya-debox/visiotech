"use client";
import React from "react";

interface IBanner {
  title: string;
  heroBannerDesktop: {
    url: string;
  };
  subtilte: string;
}

const Banner: React.FC<IBanner> = ({ heroBannerDesktop, title, subtilte }) => {
  return (
    <div className="relative w-full h-[90vh] md:h-screen overflow-hidden">
      <video
        className="absolute inset-0 bg-black w-full h-full object-cover"
        src={heroBannerDesktop.url}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="bg-opacity-50 bg-black/65 absolute z-10 w-full h-full">
        <div className="flex items-center justify-center w-full h-full">
          <div className="">
            <h1 className=" max-w-[800px] text-4xl md:text-7xl font-primary text-primary">
              {title}
            </h1>
            <p className="text-white mt-5 text-center text-base md:text-xl font-primary w-full max-w-3xl">
              {/* <FaLocationDot className="text-primaryColor mr-1" /> */}
              {subtilte}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
