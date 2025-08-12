"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  faqQuestion: string;
  faqAnswer: string;
}

interface FAQProps {
  faq: FAQ[];
}

const FAQSection: React.FC<FAQProps> = ({ faq }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 cursor-pointer">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-primary text-xl md:text-3xl font-bold text-black mb-5  text-center">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 ">
          {faq.map((item, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden cursor-pointer">
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between pb-6 text-left transition-colors"
              >
                <h3 className="font-primary text-sm md:text-lg font-semibold text-gray-900 cursor-pointer">
                  {item.faqQuestion}
                </h3>
                
                {/* Plus/Minus Icon */}
                <div className="">
                  <motion.div
                    className="w-6 md:w-8 h-6 md:h-8 bg-blue-600 rounded-full flex items-center justify-center"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="relative"
                      animate={{ rotate: openIndex === index ? 0 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Horizontal line */}
                      <div className="w-3 md:w-4 h-0.5 md:h-0.5 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      {/* Vertical line */}
                      <motion.div
                        className="w-0.5 h-3 md:h-4 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        animate={{ 
                          scaleY: openIndex === index ? 0 : 1,
                          opacity: openIndex === index ? 0 : 1 
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className=" pb-6 pt-0">
                      <div className="border-t border-gray-100 pt-6">
                        <p className="font-secondary text-gray-600 leading-relaxed">
                          {item.faqAnswer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;