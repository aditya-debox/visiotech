"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fadeIn } from "../../utils/motion";
interface ServiceDetail {
  serviceTitle: string;
  serviceDescription: {
    raw: any;
    text: string;
  };
}

interface ServicesProps {
  serviceDetails: ServiceDetail[];
}

const Services = ({ serviceDetails = [] }: ServicesProps) => {
  const router = useRouter();

  const handleClick = (serviceName: string) => {
    if (typeof window !== "undefined") {
      router.push(`/our-services/${serviceName}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex h-full w-full items-center justify-center py-16 px-6 xl:px-12 !overflow-hidden">
      <div className="grid h-full w-full gap-8 p-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-12 sm:grid-rows-8  lg:grid-rows-4 cmd:grid-rows-6">
        <motion.div
          className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2 flex flex-col items-start"
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h3 className="text-[24px] sm:text-[28px] lg:text-[28px] text-toptext font-semibold font-primary">
            Our Services
          </h3>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[56px] font-primary font-semibold  md:mb-10 mb-1">
            WHAT WE DO
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-secondary max-w-[500px] sm:max-w-[600px]  md:mb-10 mb-5">
            Creating confident smiles with personalized dental care and advanced
            treatments for a healthier, brighter you!
          </p>
          <Link href="/our-services">
            <button className="px-6 sm:px-8 py-3 text-sm sm:text-xl font-secondary transition-all duration-300 hover:bg-box2 hover: text-[#F7F6F3] bg-primary rounded-lg">
              VIEW ALL
            </button>
          </Link>
        </motion.div>

        {/* First Service - Top Right */}
        {serviceDetails[0] && (
          <motion.div
            className="col-span-1 row-span-2 bg-box1 p-4 rounded-lg text-center bg-primary text-white flex flex-col items-center justify-center cursor-pointer"
            variants={fadeIn("left", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleClick(serviceDetails[0].serviceTitle)}
          >
            <h3 className="text-2xl font-primary mb-4 ">
              {serviceDetails[0].serviceTitle}
            </h3>
            <p className="text-[18px] font-secondary text-white/70 text-toptext">
              {serviceDetails[0].serviceDescription.text}
            </p>
          </motion.div>
        )}

        {/* Second Service - Top Far Right */}
        {serviceDetails[1] && (
          <motion.div
            className="col-span-1 row-span-2 bg-box2 p-4 rounded-lg flex flex-col text-center items-center justify-center cursor-pointer bg-primary/50"
            variants={fadeIn("left", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleClick(serviceDetails[1].serviceTitle)}
          >
            <h3 className="text-2xl font-primary mb-4 text-center text-black">
              {serviceDetails[1].serviceTitle}
            </h3>
            <p className="text-[18px] font-secondary text-black/70">
              {serviceDetails[1].serviceDescription.text}
            </p>
          </motion.div>
        )}

        {/* Third Service - Bottom Left */}
        {serviceDetails[2] && (
          <motion.div
            className="col-span-1 row-span-2 bg-primary/50 p-4 rounded-lg flex flex-col text-center items-center justify-center cursor-pointer"
            variants={fadeIn("right", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleClick(serviceDetails[2].serviceTitle)}
          >
            <h3 className="text-2xl font-primary text-center mb-4 text-black">
              {serviceDetails[2].serviceTitle}
            </h3>
            <p className="text-[18px] font-secondary text-black/70">
              {serviceDetails[2].serviceDescription.text}
            </p>
          </motion.div>
        )}

        {/* Fourth Service - Bottom Second */}
        {serviceDetails[3] && (
          <motion.div
            className="col-span-1 row-span-2 bg-primary p-4 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer"
            variants={fadeIn("right", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleClick(serviceDetails[3].serviceTitle)}
          >
            <h3 className="text-2xl font-primary mb-4 text-white">
              {serviceDetails[3].serviceTitle}
            </h3>
            <p className="text-[18px] font-secondary text-white/70">
              {serviceDetails[3].serviceDescription.text}
            </p>
          </motion.div>
        )}

        {/* Fifth Service - Bottom Third */}
        {serviceDetails[4] && (
          <motion.div
            className="col-span-1 row-span-2 bg-primary/50 p-4 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer"
            variants={fadeIn("up", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleClick(serviceDetails[4].serviceTitle)}
          >
            <h3 className="text-2xl font-primary mb-4 text-black">
              {serviceDetails[4].serviceTitle}
            </h3>
            <p className="text-[18px] font-secondary text-black/70">
              {serviceDetails[4].serviceDescription.text}
            </p>
          </motion.div>
        )}

        {/* Sixth Service - Bottom Right */}
        {serviceDetails[5] && (
          <motion.div
            className="col-span-1 row-span-2 bg-primary p-4 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer"
            variants={fadeIn("up", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleClick(serviceDetails[5].serviceTitle)}
          >
            <h3 className="text-2xl font-primary mb-4 text-white">
              {serviceDetails[5].serviceTitle}
            </h3>
            <p className="text-[18px] font-secondary text-white/70">
              {serviceDetails[5].serviceDescription.text}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Services;
