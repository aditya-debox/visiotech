"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import ModalStore from "@/store/modal";

interface CTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const Cta: React.FC<CTAProps> = ({
  title = "Get started today",
  description = "Join thousands who trust our platform to safeguard their operations and streamline security management",
  buttonText = "Get Started",
  onButtonClick,
  className = "",
}) => {
  const { triggerModal, setTriggerModal } = ModalStore();
  return (
    <section className={`relative py-12 overflow-hidden ${className}`}>
      {/* Background with light blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* White accent circles */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-white/8 blur-3xl"></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Content container */}
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-primary font-bold text-white mb-6 leading-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="text-base md:text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* CTA Button */}
        <button
          onClick={() => setTriggerModal(true)}
          className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 text-lg font-semibold text-blue-600 bg-white rounded-full shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1 transition-all duration-300 ease-out hover:bg-blue-50 cursor-pointer overflow-hidden"
        >
          {/* Button background */}
          <div className="absolute inset-0 bg-white group-hover:bg-blue-50 transition-all duration-300"></div>

          {/* Button content */}
          <span className="relative z-10 font-medium text-base">
            {buttonText}
          </span>
          <ArrowRight className="relative z-10 w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1" />

          {/* Button shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
          </div>
        </button>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
    </section>
  );
};

export default Cta;
