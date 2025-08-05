import React from 'react';
import { gql } from "graphql-request";
import client from '@/utils/graphqlClient';
import CommonHero from '@/components/common/CommonHero';
import FeaturesSection from '@/components/service/FeaturesSection';
import Link from 'next/link';
import ServiceBlock from '@/components/service/ServiceBlock';
import Processes from '@/components/service/Processes';
import FAQSection from '@/components/service/FAQSection';
import Cta from '@/components/Home/Cta';
import BrandCards from '@/components/Home/brandcards';
import ServiceGrid from '@/components/Home/servicecards';

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



export default async function ServiceDetails() {
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
        
        const serviceData = response.serviceDetails;
        console.log('Found service:', serviceData); // Debug log

        if (!serviceData) {
            return (
                null
            );
        }

        return ( 
            <div className='py-20'>
               <ServiceGrid services={serviceData} />
            </div>
        
          

        );
        
    } catch (error) {
        console.error('GraphQL Error:', error);
        
    }
}