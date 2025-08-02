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
}) => {
  return (
    <section className={`relative z-10 text-center ${className}`}>
      <div className="max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 py-30">
        <h1 className="tracking-wide font-primary uppercase py-8 text-white text-4xl font-extrabold">
          {title}
        </h1>
        <p className="text-lg md:text-xl font-secondary text-white/90 max-w-4xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default ContactSection;


