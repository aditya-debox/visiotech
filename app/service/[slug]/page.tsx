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
  console.log("Requested slug:", slug);

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
    console.log(
      "Available services:",
      response.serviceDetails.map((s) => s.slug)
    ); // Debug log

    const serviceData = response.serviceDetails.find(
      (service) => service.slug === slug
    );

    if (!serviceData) {
      return null;
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

        {serviceData.features && serviceData.features.length > 0 && (
          <FeaturesSection
            title="Key Features:"
            features={serviceData.features}
          />
        )}

        {serviceData.serviceImpact && (
          <ServiceBlock
          className="my-20"
            introText={serviceData.serviceImpact}
            authorName=""
            authorTitle=""
            title = "Why This Service Matters"
          />
        )}

        {serviceData.process && serviceData.process.length > 0 && (
          <Processes process={serviceData.process} />
        )}

        {serviceData.industries && serviceData.industries.length > 0 && (
          <FeaturesSection
            title="Industries We Serve:"
            features={serviceData.industries}
          />
        )}

        {serviceData.successStory && (
          <ServiceBlock
            className="my-20"
            introText={{ raw: serviceData.successStory.raw }}
            authorName=""
            authorTitle=""
          />
        )}

        

         {serviceData.serviceImpact && (
          <ServiceBlock
          className="my-20 "
            introText={serviceData.highlights}
            authorName=""
            authorTitle=""
            title = "Why Visiotech"
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