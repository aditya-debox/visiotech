import React from "react";
import { gql } from "graphql-request";
import client from "@/utils/graphqlClient";
import CommonHero from "@/components/common/CommonHero";
import FeaturesSection from "@/components/service/FeaturesSection";
import Link from "next/link";
import ServiceBlock from "@/components/service/ServiceBlock";
import Processes from "@/components/service/Processes";
import FAQSection from "@/components/service/FAQSection";

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
  serviceImage: {
    url: string;
  };
  serviceImageBlurHash: string;
  industries: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetails({ params }: PageProps) {
  // Await the params promise
  const { slug } = await params;

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
        serviceImage {
          url
        }
        serviceImageBlurHash
        industries
      }
    }
  `;

  try {
    const response = await client.request<{
      serviceDetails: IServiceDetails[];
    }>(query);

    const serviceData = response.serviceDetails.find(
      (service) => service.slug === slug
    );

    if (!serviceData) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="text-6xl mb-8">🔍</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or may have been moved.
            </p>
            <Link href="/service">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold cursor-pointer transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
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
          }}
        />

        <FeaturesSection
          title="Key Features:"
          features={serviceData.features}
        />

        <ServiceBlock
          introText={serviceData.serviceImpact}
          authorName=""
          authorTitle=""
        />
        <Processes process={serviceData.process} />

        <FeaturesSection
          title="Industries We Serve:"
          features={serviceData.industries}
        />
        <ServiceBlock
          introText={{ raw: serviceData.successStory.raw }}
          authorName=""
          authorTitle=""
        />
        <FeaturesSection
          title="Why Visiotech:"
          features={serviceData.highlights}
        />
        <FAQSection faq={serviceData.faq} />
      </div>
    );
  } catch (error) {
    console.error("GraphQL Error:", error);
  }
}
