import React from "react";
import { ArrowRight, Play } from "lucide-react";

export interface INewHeroSection {
  title: string;
  subTitle: string;
  heroVideo: {
    url: string;
  };
  serviceDetail: {
    serviceTitle: string;
    serviceDescription: {
      raw: any;
      text: string;
    };
  }[];
  testimonial: {
    name: string;
    description: string;
  }[];
  testimonialImage: {
    url: string;
  };
  testimonialBh: string;
}

interface NewHeroSectionProps {
  data: INewHeroSection;
}

const NewHeroSection: React.FC<NewHeroSectionProps> = ({ data }) => {
  // Mock company logos for the trusted by section

  return (
    <div className=" bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-50 pb-5 text-center">
        <h1 className="text-3xl md:text-6xl font-bold font-primary text-gray-900  leading-tight">
          {data.title.split(" ").map((word, index) => (
            <React.Fragment key={index}>
              {index === 1 || index === 2 ? (
                <span className="text-blue-600 relative">
                  {word}
                  {index === 2 && (
                    <svg
                      className="absolute top-2/3 h-[0.58em] w-full  left-0 fill-blue-400/70 "
                      viewBox="0 0 418 42"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                    </svg>
                  )}
                </span>
              ) : (
                word
              )}
              {/* Add space after each word */}
              {index < data.title.split(" ").length - 1 && " "}
            </React.Fragment>
          ))}
        </h1>

        <p className="text-base md:mt-0 mt-5 md:text-xl text-gray-600 mb-5 md:mb-10 max-w-2xl mx-auto leading-relaxed">
          {data.subTitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <button className="bg-black cursor-pointer text-white px-8 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
            Get a Free Site Assessment
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewHeroSection;
