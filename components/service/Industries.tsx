import React from "react";

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
    "DIGITAL TRANSFORMATION",
  ],
  className = "",
  titleClassName = "",
  itemClassName = "",
  showArrows = true,
  itemHeight = "h-28",
  bgColor = "bg-[#2d5df5]",
  textColor = "text-white",
}) => {
  // Normalize items to FrameworkItem format
  const normalizedItems: FrameworkItem[] = items.map((item) => {
    if (typeof item === "string") {
      return { title: item };
    }
    return item;
  });

  return (
    <div className={`bg-white py-5 md:py-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title */}
        {title && (
          <div className="text-center">
            <h2
              className={`font-primary text-xl md:text-3xl font-bold text-black mb-5 md:mb-10 text-center ${titleClassName}`}
            >
              {title}
            </h2>
          </div>
        )}

        {/* Framework Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:justify-center xl:items-center xl:gap-4 gap-4">
          {normalizedItems.map((item, index) => (
            <div key={index} className="group xl:flex-1 xl:max-w-[280px]">
              {/* Framework Item */}
              <div className={`relative w-full ${itemClassName}`}>
                <div
                  className={`${bgColor} ${textColor} p-6 sm:p-8 ${itemHeight} flex flex-col justify-center items-center text-center rounded-sm shadow-sm`}
                >
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
