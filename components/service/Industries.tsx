import React from 'react';

interface FrameworkItem {
  title: string;
  subtitle?: string;
  icon?: string;
}

interface IndustriesProps {
  title?: string;
  items?: FrameworkItem[] | string[];
  className?: string;
  titleClassName?: string;
  itemClassName?: string;
  showArrows?: boolean;
  itemHeight?: string;
  bgColor?: string;
  textColor?: string;
}

const Industries: React.FC<IndustriesProps> = ({
  title = "Industries",
  items = [
    "OBJECTIVE & VALUE SETTING",
    "PEOPLE & CULTURE", 
    "EFFICIENT SYSTEM & PROCESSES",
    "EFFECTIVE COMMUNICATION",
    "DIGITAL TRANSFORMATION"
  ],
  className = "",
  titleClassName = "",
  itemClassName = "",
  showArrows = true,
  itemHeight = "h-28",
  bgColor = "bg-[#2d5df5]",
  textColor = "text-white"
}) => {
  // Normalize items to FrameworkItem format
  const normalizedItems: FrameworkItem[] = items.map(item => {
    if (typeof item === 'string') {
      return { title: item };
    }
    return item;
  });



  return (
    <div className={`bg-white pt-16  ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        {title && (
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-extrabold font-primary text-black ${titleClassName}`}>
              {title}
            </h2>
          </div>
        )}

        {/* Framework Items */}
        <div className={`flex gap-4 items-center justify-center  flex-wrap max-w-7xl mx-auto px-6 lg:px-12 `}>
          {normalizedItems.map((item, index) => (
            <div key={index} className="group">
              {/* Framework Item */}
              <div className={`relative   w-[200px] ${itemClassName}`}>
                <div className={`${bgColor} ${textColor} p-8 ${itemHeight} flex flex-col justify-center items-center text-center rounded-sm shadow-sm`}>
                  {/* Icon if provided */}
                  {item.icon && (
                    <div className="mb-3">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                  )}
                  
                  {/* Title */}
                  <h3 className="text-sm md:text-base font-extrabold font-primary leading-tight mb-2 break-words">
                    {item.title}
                  </h3>
                  
                  {/* Subtitle */}
                  {item.subtitle && (
                    <p className="text-sm md:text-base font-bold leading-tight opacity-90">
                      {item.subtitle}
                    </p>
                  )}
                  
                  {/* Arrow Icon */}
                  {showArrows && (
                    <div className="absolute bottom-4 right-4 ">
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Industries;