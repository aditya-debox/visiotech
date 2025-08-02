"use client"
import React from 'react';
import Heading from '@/components/common/Heading';

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  useCustomHeading?: boolean;
  customHeadingTag?: React.ElementType;
  showButton?: boolean;
  buttonProps?: {
    title: string;
    linkHref?: string;
    className?: string;
    theme?: 'light' | 'dark';
  };
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title = "CONTACT US",
  subtitle = "We value your inquiries, feedback, and the opportunity to connect with you.",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  useCustomHeading = false,
  customHeadingTag: CustomHeadingTag = "h1",
}) => {
  return (
    <div className={`relative z-10 text-center ${className}`}>
      <div className="max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 py-20">
        {useCustomHeading ? (
          <h2
            className={`tracking-wide uppercase py-8 text-4xl font-primary font-extrabold text-white ${titleClassName}`}
          >
            {title}
          </h2>
        ) : (
          <Heading
            className={`tracking-wide uppercase py-8 text-white text-4xl md:text-5xl lg:text-6xl font-extrabold ${titleClassName}`}
          >
            {title}
          </Heading>
        )}
        <p className={`text-lg md:text-xl font-secondary text-white/90 max-w-4xl mx-auto leading-relaxed ${subtitleClassName}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
