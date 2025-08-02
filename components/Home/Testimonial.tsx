"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { fadeIn } from "../../utils/motion";
import { blurHashToDataURL } from "@/utils/blurhash";

const Testimonials = ({
  dentistImage,
  testimonials = [],
  blurHash,
}: {
  dentistImage: string;
  testimonials: {
    name: string;
    description: string;
  }[];
  blurHash: string;
}) => {
  return (
    <motion.div className="bg-bgbottom max-w-7xl mx-auto flex flex-col lg:flex-row h-full w-full py-8 sm:py-12 md:py-24 items-center justify-evenly relative px-4 sm:px-6 lg:px-12">
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute w-full h-[200px] sm:h-[300px] md:w-[481px] md:h-[700px] top-0 left-0 hidden md:block"
      ></motion.div>

      <motion.div
        className="relative mb-6 sm:mb-8 lg:mb-0 w-full max-w-[350px] sm:max-w-none"
        variants={fadeIn("right", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Image
          src={dentistImage}
          alt="dentist testimonial"
          className="w-full h-auto md:w-[563px] md:h-[600px] bg-contain rounded-lg"
          placeholder="blur"
          width={1000}
          height={1000}
          blurDataURL={blurHashToDataURL(blurHash)}
        />
      </motion.div>

      <motion.div
        className="flex flex-col items-start w-full lg:max-w-[50%] lg:ml-10"
        variants={fadeIn("up", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h3 className="text-[20px] sm:text-[24px] md:text-[28px] mb-2 text-toptext font-semibold font-primary md:mb-5">
          {`Our Reviews`}
        </h3>
        <h1 className="text-[32px] sm:text-[40px] md:text-[56px] font-primary md:leading-[50px] leading-[36px] sm:leading-[40px] font-semibold mb-4 sm:mb-5 md:mb-10 text-primary">
          {`What Our Customers Say`}
        </h1>

        {/* Testimonials Carousel */}
        <div className="w-full max-w-[100%] sm:max-w-[600px]">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet testimonial-bullet",
              bulletActiveClass:
                "swiper-pagination-bullet-active testimonial-bullet-active",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  variants={fadeIn("right", "tween", 0.2, 1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="pb-5 md:pb-10"
                >
                  <p className="text-base sm:text-lg md:text-2xl font-secondary text-black/70 mb-4 sm:mb-5 md:mb-10">
                    {testimonial.description}
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-secondary text-toptext">
                    {testimonial.name}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>

      {/* Custom Styles for Swiper Pagination */}
      <style jsx global>{`
        .testimonial-swiper .swiper-pagination {
          position: relative !important;
          margin-top: 16px !important;
          text-align: left !important;
        }

        .testimonial-bullet {
          width: 10px !important;
          height: 10px !important;
          background: rgba(var(--toptext-rgb, 156, 163, 175), 0.5) !important;
          opacity: 1 !important;
          margin: 0 5px !important;
          transition: all 0.3s ease !important;
        }

        .testimonial-bullet-active {
          background: rgb(var(--primary-rgb, 59, 130, 246)) !important;
          transform: scale(1.2);
        }

        @media (min-width: 640px) {
          .testimonial-bullet {
            width: 12px !important;
            height: 12px !important;
            margin: 0 6px !important;
          }

          .testimonial-swiper .swiper-pagination {
            margin-top: 20px !important;
          }
        }

        @media (min-width: 768px) {
          .testimonial-bullet {
            width: 14px !important;
            height: 14px !important;
            margin: 0 8px !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Testimonials;
