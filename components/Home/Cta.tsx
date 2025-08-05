import React from 'react';

interface CTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const Cta: React.FC<CTAProps> = ({
  title = "Get started today",
  description = "",
  buttonText = "",
  onButtonClick,
  className = ""
}) => {
  return (
    <section className={`  relative pb-16 overflow-hidden ${className}`}>
      {/* Main gradient background */}
      <div className="bg-gradient-to-br from-[#2d5df5] via-[#0095d2] to-[#007aff] py-20 px-6 lg:px-8">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-white/10 to-white/5 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-white/8 to-white/3 blur-3xl"></div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-white/3" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
        </div>

        {/* Content container */}
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-3xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          
          {/* CTA Button */}
          <button
            onClick={onButtonClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#2d5df5] bg-white rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-out hover:bg-gray-50"
          >
            <span className="relative z-10">{buttonText}</span>
            
            {/* Button hover effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffffff] to-[#f8faff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button glow effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white/50 to-white/30 blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cta

// Color Palette Component for reference

