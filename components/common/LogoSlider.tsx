"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/legacy/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

interface LogoSliderProps {
  space?: boolean;
}

export const companySliderLogos = [
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/deloitte-logo.png",
    alt: "Deloitte",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/city-furnish-logo.png",
    alt: "City Furnish",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/smaash-logo.png",
    alt: "Smaash",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/lexi-pens-logo.png",
    alt: "Lexi Pens",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/freshbox-media-logo.png",
    alt: "Freshbox Media",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/capgemini-logo.png",
    alt: "Capgemini",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/square-yards-logo.png",
    alt: "Square Yards",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/datamatics-logo.png",
    alt: "Datamatics",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/hella-infratech-logo.png",
    alt: "Hella Infratech",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/tata-capital-logo.png",
    alt: "Tata Capital",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/reliance-logo.png",
    alt: "Reliance",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/toothsi-logo.png",
    alt: "Toothsi",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/unstop-logo.png",
    alt: "Unstop",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/viral-mint-logo.png",
    alt: "Viral Mint",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/conqsys-logo.png",
    alt: "Conqsys",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/hubler-logo.png",
    alt: "Hubler",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/roninbev-logo.png",
    alt: "RoninBev",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/stay-vista-logo.png",
    alt: "Stay Vista",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/neokred-logo.png",
    alt: "Neokred",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/rummyverse-logo.png",
    alt: "Rummyverse",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/think9-logo.png",
    alt: "Think9",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/everest-fleet-logo.png",
    alt: "Everest Fleet",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/4am-worldwide-logo.png",
    alt: "4AM worldwide",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/landmark-group-logo.png",
    alt: "Landmark Group",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/liqui-loans-logo.png",
    alt: "Liqui Loans",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/cai-store-logo.png",
    alt: "Cai Store",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/vashi-logo.png",
    alt: "Vashi",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/schbang-logo.png",
    alt: "Schbang",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/andromeda-logo.png",
    alt: "Andromeda",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/debox-logo.png",
    alt: "Debox",
  },
  {
    img: "https://assets.inradius.in/static/companies-logo-slider/naagin-sauce-logo.png",
    alt: "Naagin Sauce",
  },
];

const LogoSlider: React.FC<LogoSliderProps> = ({ space }) => {
  const [clientLogos, setClientLogos] = useState<
    { img: string; alt: string }[]
  >([]);

  useEffect(() => {
    setClientLogos(companySliderLogos);
  }, []);
  return (
    <>
      <div className={` ${space}`}>
        <div className="text-center mx-auto w-full logo-scroller py-2 md:py-4">
          <Swiper
            slidesPerView={3}
            spaceBetween={5}
            loop={true}
            speed={7000}
            draggable={false}
            allowTouchMove={false}
            grabCursor={false}
            freeMode={true}
            autoplay={{
              delay: 1,
              pauseOnMouseEnter: false,
              disableOnInteraction: false,
            }}
            pagination={false}
            navigation={false}
            modules={[Autoplay]}
            breakpoints={{
              510: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              750: {
                slidesPerView: 6,
                spaceBetween: 12,
              },
            }}
          >
            {clientLogos.map((el, idx) => (
              <SwiperSlide
                key={`${el.alt}-${idx}`}
                className="self-center flex justify-center items-center"
              >
                <div className="w-40 px-4">
                  <Image
                    src={el.img}
                    alt={el.alt}
                    width={100}
                    height={100}
                    className="h-full w-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default LogoSlider;
