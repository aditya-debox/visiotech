import React from "react";

interface ProcessStep {
  processTitle: string;
  processDescription: string;
}

interface ProcessesProps {
  process: ProcessStep[]; // Changed to array of process steps
  title?: string;
  desc?: string;
}

const Processes: React.FC<ProcessesProps> = ({
  process,
  title = "Our Process",
  desc = "From start to finish, we handle every detail professionally",
}) => {
  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-xl md:text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="font-secondary text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            {desc}
          </p>
        </div>

        {/* Process Steps */}
        {process.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center flex-1 ">
                {/* Step Number */}
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-lg">
                    {index + 1}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="font-primary text-lg font-semibold text-gray-900 mb-3">
                  {step.processTitle}
                </h3>

                {/* Step Description */}
                <p className="font-secondary text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {step.processDescription}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Processes;
