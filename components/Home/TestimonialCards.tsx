import React from 'react';

interface ITestimonial {
    name: string;
    description: string;
}

interface TestimonialCardProps {
    testimonial: ITestimonial;
    index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
    return (
        <div className="group text-black hover:text-white p-8 rounded-2xl hover:bg-[#2d5df5] border border-gray-200 h-full flex flex-col justify-between min-h-[300px] relative overflow-hidden transition-all duration-300">
    {/* Background gradient overlay */}
    <div className="relative z-10 flex flex-col h-full">
        {/* Quote */}
        <div className="flex-grow mb-8">
            <svg className="w-8 h-8 text-blue-400 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z"/>
            </svg>
            <p className="text-lg md:text-xl leading-relaxed font-medium">
                "{testimonial.description}"
            </p>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-black group-hover:bg-white mb-6 transition-colors duration-300"></div>
        
        {/* Author */}
        <div>
            <h4 className="font-semibold text-lg mb-1">
                {testimonial.name}
            </h4>
        </div>
    </div>
    
    {/* Decorative element */}
    <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
</div>
    );
};

interface TestimonialCardsProps {
    testimonials: ITestimonial[];
    title?: string;
    subtitle?: string;
}

const TestimonialCards: React.FC<TestimonialCardsProps> = ({ 
    testimonials, 
    title = "What Our Clients Say",
    subtitle = "Don't just take our word for it - hear from our satisfied customers"
}) => {
    // Fallback demo data
    const demoData: ITestimonial[] = [
        {
            name: "Tina Yards",
            description: "Thanks to Radiant, we're finding new leads that we never would have found with legal methods."
        },
        {
            name: "Conor Neville",
            description: "Radiant made undercutting all of our competitors an absolute breeze."
        },
        {
            name: "Amy Chase",
            description: "We closed a deal in literally a few minutes because we knew their exact budget."
        }
    ];

    const displayData = testimonials && testimonials.length > 0 ? testimonials : demoData;

    return (
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto xl:px-12 lg:px-12 px-6">
                {/* Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-16">
                        {title && (
                            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-primary">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-secondary">
                                {subtitle}
                            </p>
                        )}
                        <div className="w-24 h-1 bg-blue-500 mx-auto mt-8 rounded-full"></div>
                    </div>
                )}

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayData.map((testimonial, index) => (
                        <TestimonialCard 
                            key={index}
                            testimonial={testimonial} 
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                        <span>See More Reviews</span>
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCards;