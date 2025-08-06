import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";

interface IntroSectionProps {
  introText: string | any; // Can be string or rich text object
  authorName: string;
  authorTitle: string;
  className?: string;
 
}

const IntroSection: React.FC<IntroSectionProps> = ({
  introText,
  authorName,
  authorTitle,
  className = " max-w-7xl mx-auto  lg:px-12 relative bg-blue-600 rounded-4xl py-20 md:py-30",

}) => {
  const renderContent = () => {
    // Check if introText is a string (normal text) - keep original behavior
    if (typeof introText === "string") {
      return (
        <p className="text-xl md:text-3xl text-white font-medium leading-relaxed px-4">
          {introText.split(" ").map((word, index) => (
            <React.Fragment key={index}>
              {index === 0 ? (
                <span className="text-white font-semibold">{word}</span>
              ) : (
                word
              )}
              {/* Add space between words */}
              {index < introText.split(" ").length - 1 && " "}
            </React.Fragment>
          ))}
        </p>
      );
    }

    // Check if it's a Hygraph rich text object
    if (introText && (introText.raw || introText.html)) {
      return (
        <RichText
          content={introText.raw || introText}
          renderers={{
            p: ({ children }) => (
              <p className="text-xl md:text-2xl text-white font-medium leading-relaxed px-2 mb-2">
                {children}
              </p>
            ),
          }}
        />
      );
    }

    // Fallback for other types
    return (
      <p className="text-xl md:text-3xl text-white font-medium leading-relaxed px-4">
        {String(introText)}
      </p>
    );
  };

  return (
    <div
      className={` ${className}`}
    >
      {/* Opening Quote Mark */}
      <div className="absolute -top-4 md:top-8 left-0 md:left-20 overflow-hidden z-10">
        <svg
          width="120"
          height="120"
          viewBox="0 0 80 60"
          fill="none"
          className="text-gray-200 w-30 h-30"
        >
          <path
            d="M 18.24 26.88 Z M 28.77 14.04 c 0.624 0.7339 0.7128 1.2456 0.8335 2.1806 c -0.1282 0.8899 -0.4646 1.3306 -1.0435 2.0194 c -0.6821 0.4834 -1.4072 0.8688 -2.1451 1.26 C 23.3696 21.192 19.4544 23.3995 18.24 26.88 c 0.0955 0.5107 0.0955 0.5107 0.24 0.96 c 1.0291 0.2669 2.0414 0.5009 3.09 0.6752 c 2.3345 0.4568 4.2576 1.6368 5.6851 3.5248 c 1.9035 2.8596 2.2546 6.0267 1.6265 9.361 c -0.7668 2.5987 -2.5805 4.7815 -4.8994 6.179 c -2.8176 1.46 -5.7274 1.6776 -8.8003 0.9178 c -1.1962 -0.3944 -2.172 -0.9523 -3.1819 -1.6978 l -0.5148 -0.3741 C 8.9568 44.4098 7.3592 41.101 6.96 37.92 c -0.2124 -3.5294 0.392 -6.6442 1.92 -9.84 l 0.3132 -0.6562 c 2.9532 -5.773 8.8536 -11.3508 15.0619 -13.489 c 0.3136 -0.0895 0.6286 -0.1752 0.9448 -0.2549 l 0.63 -0.18 c 1.0968 -0.1154 1.9624 0.03 2.94 0.54 Z"
            fill="currentColor"
            opacity="0.6"
          />
          <path
            d="M 18.24 26.88 Z M 28.77 14.04 c 0.624 0.7339 0.7128 1.2456 0.8335 2.1806 c -0.1282 0.8899 -0.4646 1.3306 -1.0435 2.0194 c -0.6821 0.4834 -1.4072 0.8688 -2.1451 1.26 C 23.3696 21.192 19.4544 23.3995 18.24 26.88 c 0.0955 0.5107 0.0955 0.5107 0.24 0.96 c 1.0291 0.2669 2.0414 0.5009 3.09 0.6752 c 2.3345 0.4568 4.2576 1.6368 5.6851 3.5248 c 1.9035 2.8596 2.2546 6.0267 1.6265 9.361 c -0.7668 2.5987 -2.5805 4.7815 -4.8994 6.179 c -2.8176 1.46 -5.7274 1.6776 -8.8003 0.9178 c -1.1962 -0.3944 -2.172 -0.9523 -3.1819 -1.6978 l -0.5148 -0.3741 C 8.9568 44.4098 7.3592 41.101 6.96 37.92 c -0.2124 -3.5294 0.392 -6.6442 1.92 -9.84 l 0.3132 -0.6562 c 2.9532 -5.773 8.8536 -11.3508 15.0619 -13.489 c 0.3136 -0.0895 0.6286 -0.1752 0.9448 -0.2549 l 0.63 -0.18 c 1.0968 -0.1154 1.9624 0.03 2.94 0.54 Z"
            fill="currentColor"
            opacity="0.6"
            transform="translate(20, 1)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Main Quote Text */}
        {renderContent()}
      </div>

      {/* Closing Quote Mark */}
      <div className="absolute right-0 md:right-20 bottom-0 md:bottom-10 overflow-hidden z-10 rotate-180">
        <svg
          width="120"
          height="120"
          viewBox="0 0 80 60"
          fill="none"
          className="text-gray-200 w-30 h-30"
        >
          <path
            d="M 18.24 26.88 Z M 28.77 14.04 c 0.624 0.7339 0.7128 1.2456 0.8335 2.1806 c -0.1282 0.8899 -0.4646 1.3306 -1.0435 2.0194 c -0.6821 0.4834 -1.4072 0.8688 -2.1451 1.26 C 23.3696 21.192 19.4544 23.3995 18.24 26.88 c 0.0955 0.5107 0.0955 0.5107 0.24 0.96 c 1.0291 0.2669 2.0414 0.5009 3.09 0.6752 c 2.3345 0.4568 4.2576 1.6368 5.6851 3.5248 c 1.9035 2.8596 2.2546 6.0267 1.6265 9.361 c -0.7668 2.5987 -2.5805 4.7815 -4.8994 6.179 c -2.8176 1.46 -5.7274 1.6776 -8.8003 0.9178 c -1.1962 -0.3944 -2.172 -0.9523 -3.1819 -1.6978 l -0.5148 -0.3741 C 8.9568 44.4098 7.3592 41.101 6.96 37.92 c -0.2124 -3.5294 0.392 -6.6442 1.92 -9.84 l 0.3132 -0.6562 c 2.9532 -5.773 8.8536 -11.3508 15.0619 -13.489 c 0.3136 -0.0895 0.6286 -0.1752 0.9448 -0.2549 l 0.63 -0.18 c 1.0968 -0.1154 1.9624 0.03 2.94 0.54 Z"
            fill="currentColor"
            opacity="0.6"
          />
          <path
            d="M 18.24 26.88 Z M 28.77 14.04 c 0.624 0.7339 0.7128 1.2456 0.8335 2.1806 c -0.1282 0.8899 -0.4646 1.3306 -1.0435 2.0194 c -0.6821 0.4834 -1.4072 0.8688 -2.1451 1.26 C 23.3696 21.192 19.4544 23.3995 18.24 26.88 c 0.0955 0.5107 0.0955 0.5107 0.24 0.96 c 1.0291 0.2669 2.0414 0.5009 3.09 0.6752 c 2.3345 0.4568 4.2576 1.6368 5.6851 3.5248 c 1.9035 2.8596 2.2546 6.0267 1.6265 9.361 c -0.7668 2.5987 -2.5805 4.7815 -4.8994 6.179 c -2.8176 1.46 -5.7274 1.6776 -8.8003 0.9178 c -1.1962 -0.3944 -2.172 -0.9523 -3.1819 -1.6978 l -0.5148 -0.3741 C 8.9568 44.4098 7.3592 41.101 6.96 37.92 c -0.2124 -3.5294 0.392 -6.6442 1.92 -9.84 l 0.3132 -0.6562 c 2.9532 -5.773 8.8536 -11.3508 15.0619 -13.489 c 0.3136 -0.0895 0.6286 -0.1752 0.9448 -0.2549 l 0.63 -0.18 c 1.0968 -0.1154 1.9624 0.03 2.94 0.54 Z"
            fill="currentColor"
            opacity="0.6"
            transform="translate(20, 1)"
          />
        </svg>
      </div>
    </div>
  );
};

export default IntroSection;