import React from "react";
import { gql } from "graphql-request";
import client from "@/utils/graphqlClient";
import CommonHero from "@/components/common/CommonHero";
import FeaturesSection from "@/components/service/FeaturesSection";
import Link from "next/link";
import ServiceBlock from "@/components/service/ServiceBlock";
import Processes from "@/components/service/Processes";
import FAQSection from "@/components/service/FAQSection";
import Industries from "@/components/service/Industries";
import IntroSection from "@/components/Home/IntroSection";

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
            subTitle: serviceData.serviceDescription,
            serviceImage: serviceData.serviceImage,
          }}
        />

        {serviceData.serviceImpact && (
          <ServiceBlock
            className="mb-10"
            introText={serviceData.serviceImpact}
            authorName=""
            authorTitle=""
            title="Why This Service Matters"
          />
        )}

        {serviceData.features && serviceData.features.length > 0 && (
          <FeaturesSection
            title="Key Features:"
            features={serviceData.features}
          />
        )}

        <Industries title="Industries We Serve" items={serviceData.industries} />

        <div className="my-10 md:my-10">
          {serviceData.process && serviceData.process.length > 0 && (
            <Processes bgcolor={false} process={serviceData.process} />
          )}
        </div>

        {serviceData.successStory && (
          <IntroSection
            introText={serviceData.successStory}
            authorName=""
            authorTitle=""
            className=" max-w-7xl mx-auto  lg:px-12 relative bg-blue-600 rounded-4xl py-20 "
          />
        )}

        {serviceData.serviceImpact && (
          <ServiceBlock
            className="my-20 "
            introText={serviceData.highlights}
            authorName=""
            authorTitle=""
            title="Why Visiotech"
          />
        )}

        {serviceData.faq && serviceData.faq.length > 0 && (
          <FAQSection faq={serviceData.faq} />
        )}
      </div>
    );
  } catch (error) {
    console.error("GraphQL Error:", error);
    return null;
  }
}
