import React from "react";
import { gql } from "graphql-request";
import client from "@/utils/graphqlClient";
import CommonHero from "@/components/common/CommonHero";
import FeaturesSection from "@/components/service/FeaturesSection";
import Link from "next/link";
import ServiceBlock from "@/components/service/ServiceBlock";
import Processes from "@/components/service/Processes";
import FAQSection from "@/components/service/FAQSection";
import Cta from "@/components/Home/Cta";
import BrandCards from "@/components/Home/brandcards";
import ServiceGrid from "@/components/Home/servicecards";
import { Metadata } from "next";

interface IServiceDetails {
  serviceTitle: string;
    headline: string;
    serviceDescription: {
      html: string;
      text: string;
      raw: any;
    };
    slug: string;
    features: {
      processTitle: string;
      processDescription: string;
    }[];
    highlights: {
      processTitle: string;
      processDescription: string;
    }[];
    industries: string[];
    testimonial: string;
    values: {
      processTitle: string;
      processDescription: string;
    }[];
    serviceImage: {
      url: string;
    };
    serviceImageBlurHash: string;
    faq: {
      faqQuestion: string;
      faqAnswer: string;
    }[];
    serviceIcon: {
      url: string;
    };
    cta: {
      processTitle: string;
      processDescription: string;
    }[];
}

export const metadata: Metadata = {
  title:
    "Commercial Security Services in Atlanta | Cameras, Access, Cabling & More",
  description:
    "Discover Visiotech’s full suite of commercial security services in Atlanta—from camera installation and video surveillance to access control, structured cabling, AV systems, and smart integrations tailored to your business.",
  openGraph: {
    title:
      "Commercial Security Services in Atlanta | Cameras, Access, Cabling & More",
    description:
      "Discover Visiotech’s full suite of commercial security services in Atlanta—from camera installation and video surveillance to access control, structured cabling, AV systems, and smart integrations tailored to your business.",
    images: [{ url: "/visiotech.png" }],
    type: "article",
  },
  twitter: {
    card: "summary",
    title:
      "Commercial Security Services in Atlanta | Cameras, Access, Cabling & More",
    description:
      "Discover Visiotech’s full suite of commercial security services in Atlanta—from camera installation and video surveillance to access control, structured cabling, AV systems, and smart integrations tailored to your business.",
    images: ["/visiotech.png"],
  },
  // alternates: {
  //   canonical: "https://lahoregrill.com/our-story",
  // },
};

export default async function ServiceDetails() {
  const query = gql`
 query Servicedetial {
		serviceDetails{
      serviceTitle
      headline
      serviceDescription{
        html
        text
        raw
      }
      slug
      features{
        processTitle
        processDescription
      }
      highlights{
        processTitle
        processDescription
      }
      industries
      testimonial
      tagline
      values{
        processTitle
        processDescription
      }
      serviceImage{
        url
      }
      serviceImageBlurHash
      faq{
        faqQuestion
        faqAnswer
      }
      serviceIcon{
        url
      }
      cta{
        processTitle
        processDescription
      }
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

    const serviceData = response.serviceDetails;
    console.log("Found service:", serviceData); // Debug log

    if (!serviceData) {
      return null;
    }

    return (
      <div className="py-20">
        <ServiceGrid services={serviceData} />
        <Cta />
      </div>
    );
  } catch (error) {
    console.error("GraphQL Error:", error);
  }
}
