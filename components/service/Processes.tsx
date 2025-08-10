import React from "react";

interface ProcessStep {
  processTitle: string;
  processDescription: string;
}

interface ProcessesProps {
  process: ProcessStep[]; // Changed to array of process steps
  title?: string;
  desc?: string;
  bgcolor?: boolean;
}

const Processes: React.FC<ProcessesProps> = ({
  process,
  title = "Our Process",
  desc = "From start to finish, we handle every detail professionally",
  bgcolor = true,
}) => {
  return (
    <section className={`py-5 md:py-10 ${bgcolor ? "bg-gray-50" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-xl md:text-3xl font-bold text-black mb-5 text-center">
            {title}
          </h2>
          <p className="font-secondary text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            {desc}
          </p>
        </div>

        {/* Process Steps */}
        {process.length > 0 && (
          <div
            className={`grid grid-cols-1 place-items-center justify-items-center h-full w-full sm:grid-cols-2 ${
              process.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            } gap-6 lg:gap-8`}
          >
            {process.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center flex-1 h-full px-4"
              >
                {/* Step Number */}
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-lg">
                    {index + 1}
                  </span>
                </div>

                {/* Wrap title and description together */}
                <div className="flex flex-col flex-1 justify-start">
                  {/* Step Title */}
                  <h3 className="font-primary text-lg font-semibold text-gray-900 mb-3">
                    {step.processTitle}
                  </h3>

                  {/* Step Description */}
                  <p className="font-secondary mt-auto text-sm text-gray-600 leading-relaxed">
                    {step.processDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Processes;
