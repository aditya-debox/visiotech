"use client";
import React, { useState } from "react";
import Icon from "../Icons/icon";
import { div } from "framer-motion/client";

interface contactformProps {
  titleline1?: string;
  titleline2?: string;
  subtitle?: string;
  description?: string;
  helpOptions?: string[];
  priorityOptions?: string[];
  className?: string;
}

const contactform: React.FC<contactformProps> = ({
  titleline1 = "GET IN",
  titleline2 = "TOUCH",
  description = "Thank you for visiting our website. Our dedicated team is here to assist you with any questions you may have. Your messages are important to us, and we aim to respond promptly during our business hours. We appreciate your interest and look forward to hearing from you.",
  className = "",
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
     <div className="relative z-20">
    <div className={`bg-white ${className}`}>
      <div className="max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <div>
              <div className="relative">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-primary font-extrabold text-black leading-tight">
                  <span className="block">{titleline1}</span>
                  <div className="flex items-center">
                    <span>{titleline2}</span>
                  </div>
                </h1>
              </div>
            </div>

            <div className="font-secondary text-black text-lg md:text-xl">
              <p className="leading-relaxed">{description}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:contact@company.com" className="text-blue-600 hover:underline text-lg">
                  contact@company.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-blue-600 text-lg">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="">
           
          </div>
        </div>
      </div>
    </div>
     </div>
  );
};

export default contactform;





