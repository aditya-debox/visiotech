import React from 'react';
import Link from 'next/link'; // Add this for navigation to slug pages

interface IBrandData {
    heading: string;
    slug: string;
    shortDescription: {
        text: string;
        html: string;
        raw: any;
    };
    brandImage: {
        url: string;
    };
    brandImageBlurhash: string;
    title: string;
    highlights: {
        text: string;
        html: string;
        raw: any;
    };
    useCase: {
        text: string;
        html: string;
        raw: any;
    };
    project: {
        title: string;
        description: string;
    };
}

interface BrandCardProps {
    brand: IBrandData;
    index: number;
    isBlue?: boolean;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, index, isBlue = false }) => {
    const bgColor = isBlue ? 'bg-[#0e8de8]' : 'bg-[#e3f2fd]';
    const textColor = isBlue ? 'text-white' : 'text-gray-800';
    const hoverBg = isBlue ? 'hover:bg-[#0c7bd1]' : 'hover:bg-[#bbdefb]';
    
    // Get description text from available sources
    const getDescriptionText = () => {
        if (brand.shortDescription?.text) return brand.shortDescription.text;
        if (brand.useCase?.text) return brand.useCase.text;
        if (brand.highlights?.text) return brand.highlights.text;
        if (brand.project?.description) return brand.project.description;
        return 'Discover more about this service by clicking to learn more.';
    };
    
    return (
        <Link href={`/brand/${brand.slug}`} className="">
            <div className={`group relative ${bgColor} ${hoverBg} rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer min-h-[300px]  flex flex-col justify-center items-center p-8`}>
                {/* Background Image with Overlay */}
                {brand.brandImage?.url && (
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                        <img 
                            src={brand.brandImage.url} 
                            alt={brand.heading}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                
                {/* Content */}
                <div className="relative z-10 text-center ">
                    {/* Brand Name - Always Visible */}
                    <h3 className={`text:base xl:text-xl line-clamp-2  font-bold ${textColor} mb-4 group-hover:transform group-hover:-translate-y-2  font-primary transition-all duration-300`}>
                        {brand.heading}
                    </h3>
                    
                    {/* Title - Subtitle */}
                  
                    
                    {/* Description - Show on Hover */}
                    <div className="2xl:opacity-0 2xl:group-hover:opacity-100  transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        <p className={`text-base line-clamp-2 ${textColor} font-secondary leading-relaxed max-w-xs mx-auto line-clamp-4`}>
                            {getDescriptionText()}
                        </p>
                        
                        {/* Learn More Button */}
                        <div className="mt-6">
                            <span className={`inline-flex font-secondary items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                isBlue 
                                    ? 'bg-white text-[#0e8de8] hover:bg-gray-100' 
                                    : 'bg-[#0e8de8] text-white hover:bg-[#0c7bd1]'
                            }`}>
                                Learn More
                                <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

interface BrandCardsProps {
    brands: IBrandData[];
    title?: string;
    subtitle?: string;
    showCTA?: boolean;
}

const BrandCards: React.FC<BrandCardsProps> = ({ 
    brands, 
    title = "Our Brands",
    subtitle = "We partner with the best to bring you the best",
    showCTA = true
}) => {
    // Fallback to demo data only if no brands provided
    const demoData: IBrandData[] = [
        {
            heading: "Dental Consultation",
            slug: "dental-consultation",
            title: "Expert Care",
            shortDescription: {
                text: "Comprehensive dental examination and personalized treatment planning for optimal oral health.",
                html: "",
                raw: null
            },
            brandImage: { url: "https://images.unsplash.com/photo-1559157734-a2bb9b0b4d2f?w=400&h=300&fit=crop" },
            brandImageBlurhash: "",
            highlights: { text: "", html: "", raw: null },
            useCase: { text: "", html: "", raw: null },
            project: { title: "", description: "" }
        },
        {
            heading: "Teeth Cleaning",
            slug: "teeth-cleaning",
            title: "Preventive Care",
            shortDescription: {
                text: "Professional dental cleaning to remove plaque, tartar, and stains for a healthier smile.",
                html: "",
                raw: null
            },
            brandImage: { url: "https://images.unsplash.com/photo-1588776814546-1ffcf47da822?w=400&h=300&fit=crop" },
            brandImageBlurhash: "",
            highlights: { text: "", html: "", raw: null },
            useCase: { text: "", html: "", raw: null },
            project: { title: "", description: "" }
        },
        {
            heading: "Orthodontics",
            slug: "orthodontics",
            title: "Smile Alignment",
            shortDescription: {
                text: "Modern orthodontic solutions including braces and clear aligners for perfect smile alignment.",
                html: "",
                raw: null
            },
            brandImage: { url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop" },
            brandImageBlurhash: "",
            highlights: { text: "", html: "", raw: null },
            useCase: { text: "", html: "", raw: null },
            project: { title: "", description: "" }
        }
    ];

    // Use provided brands or fallback to demo data
    const displayData = brands && brands.length > 0 ? brands : demoData;

    return (
        <div className="max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 py-30">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-light text-black font-primary mb-4">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xl text-black mb-6 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                )}
                <div className="w-24 h-1 bg-[#0e8de8] mx-auto rounded-full"></div>
            </div>

            {/* Brand Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayData.map((brand, index) => (
                    <BrandCard 
                        key={brand.slug || index} 
                        brand={brand} 
                        index={index}
                        isBlue={index % 2 === 0} // Every third card will be blue
                    />
                ))}
            </div>

            {/* Bottom CTA Section */}
            {showCTA && (
                <div className="mt-20 text-center">
                    <div className="bg-gradient-to-r from-[#0e8de8] to-[#1976d2] rounded-3xl p-12 text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Transform Your Smile?
                        </h2>
                        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                            Book a consultation today and discover the perfect solution for your dental needs.
                        </p>
                        <Link href="/contact">
                            <button className="bg-white text-[#0e8de8] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                                Schedule Consultation
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrandCards;