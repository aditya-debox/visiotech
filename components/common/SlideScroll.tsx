"use client";

import { blurHashToDataURL } from "@/utils/blurhash";
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface SlideData {
  title: string;
  image: {
    url: string;
  };
  hash: string;
}

interface SlideScrollProps {
  data: SlideData[];
}

const SliderScroll: React.FC<SlideScrollProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [contentHeight, setContentHeight] = useState<number[]>(
    new Array(data.length).fill(40)
  );

  // Add inView hook
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger when 20% of the component is visible
    triggerOnce: true, // Only trigger once
  });

  const resetTimer = useCallback(() => {
    setProgress(0);
  }, []);

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;

    if (inView) {
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Don't update progress here, let it handle in the next effect
            return 100;
          }
          return prev + 1;
        });
      }, 35); // Faster timer: 50% of original (80ms -> 40ms)
    }

    return () => {
      if (progressTimer) {
        clearInterval(progressTimer);
      }
    };
  }, [inView, activeIndex]); // Add activeIndex as dependency

  // Separate effect to handle slide transition when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
        setProgress(0);
      }, 40); // Match the timer interval

      return () => clearTimeout(timeout);
    }
  }, [progress, data.length]);

  const handleClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
      resetTimer();
    },
    [resetTimer]
  );

  useEffect(() => {
    const updateHeight = () => {
      const newHeights = data.map((_, index) => {
        const element = document.getElementById(`content-${index}`);
        return element ? element.scrollHeight : 40;
      });
      setContentHeight(newHeights);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, [activeIndex, data]);

  return (
    <div className="md:py-20 py-10 lg:px-16 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <h2 className="font-primary text-xl md:text-3xl font-bold text-gray-900 mb-5 md:mb-16 text-center">
          {`Ideal Use Cases`}
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2 md:gap-12 max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          {data.map((item, index) => (
            <div key={index} className="flex gap-4 w-full">
              <div className="w-[2px] bg-gray-200 relative shrink-0">
                {activeIndex === index && (
                  <motion.div
                    className="w-full bg-[#5b43e2] absolute top-0 rounded-full"
                    initial={{ height: "0%" }}
                    animate={{ height: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                )}
              </div>

              <motion.div
                className="cursor-pointer w-full overflow-hidden"
                onClick={() => handleClick(index)}
                animate={{
                  height: activeIndex === index ? contentHeight[index] : 40,
                  scale: activeIndex === index ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div id={`content-${index}`}>
                  <motion.h3
                    className={`text-base lg:text-lg font-medium leading-6 transition-all duration-300 ${
                      activeIndex === index
                        ? "text-gray-900 opacity-100"
                        : "text-gray-400 opacity-60"
                    }`}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.title}
                  </motion.h3>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/2 h-[300px] lg:h-[400px] relative mt-8 lg:mt-0 rounded-xl overflow-hidden shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <Image
                src={data[activeIndex].image.url}
                alt={data[activeIndex].title}
                className="w-full h-full"
                placeholder="blur"
                blurDataURL={blurHashToDataURL(data[activeIndex].hash)}
                priority
                style={{ objectFit: "cover" }}
                height={400}
                width={600}
              />

              {/* Image overlay with title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6">
                <motion.h4
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-lg font-medium"
                >
                  {data[activeIndex].title}
                </motion.h4>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SliderScroll;
