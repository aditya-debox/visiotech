import React from 'react';
import { gql } from "graphql-request";
import client from '@/utils/graphqlClient';
import CommonHero from '@/components/common/CommonHero';
import FeaturesSection from '@/components/service/FeaturesSection';
import Link from 'next/link';
import ServiceBlock from '@/components/service/ServiceBlock';
import Processes from '@/components/service/Processes';
import FAQSection from '@/components/service/FAQSection';

interface IServiceDetails {
    serviceTitle: string;
    slug: string;
    headline: string;
    serviceIcon: {
        url: string;
    };
    serviceDescription: {
        text: string;
        html: string;
        raw: any;
    };
    features: string[];
    process: {
        processTitle: string;
        processDescription: string;
    }[];
    serviceImpact: string;
    successStory: {
        html: string;
        text: string;
        raw: any;
    };
    highlights: string[];
    faq: {
        faqQuestion: string;
        faqAnswer: string;
    }[];
    serviceImage:{
        url:string
        }
    serviceImageBlurHash: string
    industries: string[]
}

interface PageProps {
    params: { slug: string };
}

export default async function ServiceDetails({ params }: PageProps) {
    console.log('Requested slug:', params.slug); 

    const query = gql`
        query Servicedetial {
            serviceDetails {
                serviceTitle
                slug
                headline
                serviceIcon {
                    url
                }
                serviceDescription {
                    text
                    html
                    raw
                }
                features
                process {
                    processTitle
                    processDescription
                }
                serviceImpact
                successStory {
                    html
                    text
                    raw
                }
                highlights
                faq {
                    faqQuestion
                    faqAnswer
                }
                serviceImage{
                    url
                    }
                serviceImageBlurHash
                industries
            }
        }
    `;

    try {
        const response = await client.request<{serviceDetails: IServiceDetails[]}>(query);
        console.log('Available services:', response.serviceDetails.map(s => s.slug)); // Debug log
        
        const serviceData = response.serviceDetails.find(service => service.slug === params.slug);
        console.log('Found service:', serviceData); // Debug log

        if (!serviceData) {
            return (
                null
            );
        }

        return ( 
            <div>
                <CommonHero 
                    data={{
                        srTitle: serviceData.serviceTitle,
                        title: serviceData.headline,
                        subTitle: serviceData.serviceDescription, // Full rich text object with raw, text, html
                        serviceImage: serviceData.serviceImage, // Add this line
                        serviceDetail: serviceData.process.map(p => ({
                            serviceTitle: p.processTitle,
                            serviceDescription: {
                                raw: null, // Process description might be plain text
                                text: p.processDescription
                            }
                        })),
                    }}
                />

                 <FeaturesSection title= "Key Features:" features={serviceData.features} />

                 <ServiceBlock 
                    introText={serviceData.serviceImpact}
                    authorName=""
                    authorTitle=""
                        />
                         <Processes process={serviceData.process} />

                    <FeaturesSection title= "Industries We Serve:" features={serviceData.industries} />
                    <ServiceBlock 
                    introText={{ raw: serviceData.successStory.raw }}
                    authorName=""
                    authorTitle=""
                        />
                    <FeaturesSection title= "Why Visiotech:" features={serviceData.highlights} />
                    <FAQSection faq= {serviceData.faq}/>
                    </div>
        
          

        );
        
    } catch (error) {
        console.error('GraphQL Error:', error);
        
    }
}