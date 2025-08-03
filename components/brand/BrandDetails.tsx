import React from 'react';
import Link from 'next/link';
import { CheckCircle, Shield, Eye, Zap, Building, Store, Car } from 'lucide-react';
import { RichText } from '@graphcms/rich-text-react-renderer';

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
    }[];
}

interface BrandDetailProps {
    brand: IBrandData;
    className?: string;
}


const BrandDetailPage: React.FC<BrandDetailProps> = ({ brand, className = "" }) => {
    // Use actual API data without defaults
    const brandData = {
        heading: brand.heading,
        tagline: brand.title,
        overview: brand.shortDescription?.text,
        image: brand.brandImage?.url,
        projects: brand.project || [],
    };

    console.log("inside component", brandData)

    return (
        <div className="max-w-7xl mx-auto xl:px-12 lg:px-12 px-6 py-30">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#0e8de8] via-[#1976d2] to-[#0c7bd1] text-white overflow-hidden">
                <div className="absolute inset-0 bg-opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center font-primary">
                        <div>
                            <p className="text-lg opacity-90 mb-4">{brandData.tagline}</p>
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight font-primary">
                                {brandData.heading}
                            </h1>
                            <div className="w-24 h-1 bg-white mb-8"></div>
                            <Link href="#contact">
                                <button className="bg-white text-[#0e8de8] px-8 py-4 font-secondary rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                                    Get Started Today
                                </button>
                            </Link>
                        </div>
                        <div className="relative">
                            {brandData.image && (
                                <img 
                                    src={brandData.image} 
                                    alt={brandData.heading}
                                    className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* About Section */}
            <section className="py-20">
                <div className="">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-primary text-black mb-6">
                            About {brand.heading?.split(' ')[0]} — Trusted Experts in Security
                        </h2>
                        <div className="w-24 h-1 bg-[#0e8de8] mb-8"></div>
                        <div className="bg-white">
                            <h2 className="text-2xl md:text-4xl font-primary text-black mb-4">Our Story</h2>
                            <p className="text-black font-secondary text-lg">
                                {brandData.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What makes us different Section - Using Rich Text */}
            <div className={` ${className}`}>
                <h2 className="text-3xl md:text-4xl font-primary text-black mb-12">
                    Why We Use {brand.heading?.split(' ')[0]}
                </h2>
                
                {brand.highlights?.raw && (
                    <div>
                        <RichText 
                            content={brand.highlights.raw} 
                            renderers={{
                                ul: ({ children }) => (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {children}
                                    </div>
                                ),
                                li: ({ children }) => (
                                    <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                                        {children}
                                    </div>
                                ),
                                p: ({ children }) => (
                                    <p className="font-secondary text-black leading-relaxed">
                                        {children}
                                    </p>
                                ),
                                bold: ({ children }) => (
                                    <h3 className="text-xl font-primary font-bold text-black mb-3">
                                        {children}
                                    </h3>
                                ),
                                h1: ({ children }) => (
                                    <h3 className="text-xl font-primary font-bold text-black mb-3">
                                        {children}
                                    </h3>
                                ),
                                h2: ({ children }) => (
                                    <h3 className="text-xl font-primary font-bold text-black mb-3">
                                        {children}
                                    </h3>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-xl font-primary font-bold text-black mb-3">
                                        {children}
                                    </h3>
                                ),
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Use Cases - Using Rich Text */}
             <section className="py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="">
                        <div>
                            <h2 className="text-4xl font-primary text-black mb-6">Ideal Use Cases</h2>
                            <div className="w-16 h-1 bg-[#0e8de8] mb-8"></div>
                            
                            {brand.useCase?.raw && (
                                <div className="">
                                    <RichText 
                                        content={brand.useCase.raw} 
                                        renderers={{
                                            ul: ({ children }) => (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {children}
                                                </div>
                                            ),
                                            li: ({ children }) => (
                                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                                    <div className="text-[#0e8de8]">
                                                        <Store className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        {children}
                                                    </div>
                                                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                                                </div>
                                            ),
                                            p: ({ children }) => (
                                                <span className="text-gray-700 font-medium font-secondary">
                                                    {children}
                                                </span>
                                            ),
                                            bold: ({ children }) => (
                                                <span className="text-gray-800 font-bold font-primary">
                                                    {children}
                                                </span>
                                            ),
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Cards Section */}
            {brand.project && brand.project.length > 0 && (
                <section className="pb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-16">
                            <h2 className="text-4xl font-primary text-black mb-4">
                                Featured Projects
                            </h2>
                            <div className="w-24 h-1 bg-[#0e8de8]"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {brandData.projects.map((project, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                                    <div className="text-[#0e8de8] mb-4">
                                        <Building className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-black mb-4 font-primary">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed font-secondary text-lg">
                                        {project.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12">
                        <h2 className="text-4xl font-bold text-black mb-6 font-primary">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-secondary">
                            Ready to enhance your security with cutting-edge technology? 
                            Contact us today for a free consultation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <button className="bg-[#0e8de8] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#0c7bd1] transform hover:scale-105 transition-all duration-300 shadow-lg">
                                    Get Free Consultation
                                </button>
                            </Link>
                            <Link href="/portfolio">
                                <button className="border-2 border-[#0e8de8] text-[#0e8de8] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#0e8de8] hover:text-white transition-all duration-300">
                                    View Our Portfolio
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BrandDetailPage;