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
import Testimonial from "@/components/service/Testomonial";
import Cta from "@/components/Home/Cta";
import ChecklistCards from "@/components/brand/ChecklistCarousel";
import ServicesLayout from "@/components/layouts/ServiceLayout";

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
  tagline: string;
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
    ctaLink: string; // This is the iframe URL that will be used in the modal
  };
  checklist: {
    title: string;
    description: string[];
  }[];
  checklistIcon: {
    url: string;
  };
  checklistHeading: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetails({ params }: PageProps) {
  const { slug } = await params;

  // GraphQL query to get service details by slug
  const query = gql`
    query ServiceDetail($slug: String!) {
      serviceDetails(where: { slug: $slug }) {
        serviceTitle
        headline
        serviceDescription {
          html
          text
          raw
        }
        slug
        features {
          processTitle
          processDescription
        }
        highlights {
          processTitle
          processDescription
        }
        industries
        testimonial
        values {
          processTitle
          processDescription
        }
        serviceImage {
          url
        }
        
        faq {
          faqQuestion
          faqAnswer
        }
        serviceIcon {
          url
        }
        cta {
          processTitle
          processDescription
          ctaLink
        }
        checklist {
          title
          description
        }
        checklistIcon {
          url
        }
        checklistHeading
      }
    }
  `;

  try {
    // 1. Call GraphQL API with the slug
    const response = await client.request<{
      serviceDetails: IServiceDetails[];
    }>(query, { slug });

    const serviceData = response.serviceDetails[0];

    if (!serviceData) {
      return (
        <ServicesLayout>
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
                  Back to Services
                </button>
              </Link>
            </div>
          </div>
        </ServicesLayout>
      );
    }

    // 2. Wrap everything in ServicesLayout and pass the service data
    // The layout will use serviceData.cta.ctaLink as the iframe URL in the modal
    return (
      <ServicesLayout 
        serviceSlug={slug}
        serviceTitle={serviceData.serviceTitle}
        modalTitle={`${serviceData.serviceTitle} Inquiry`}
        iframeUrl={serviceData.cta.ctaLink} // 3. Pass the ctaLink to the layout
      >
        <div>
          <CommonHero
            data={{
              srTitle: serviceData.serviceTitle,
              title: serviceData.headline,
              subTitle: serviceData.serviceDescription,
              serviceImage: serviceData.serviceImage,
            }}
          />

          {serviceData.features.length > 0 && (
            <FeaturesSection
              title="Key Features"
              features={serviceData.features}
            />
          )}

          {serviceData.tagline && ( 
            <ServiceBlock
              title="Why This Service Matters"
              highlights={serviceData.highlights}
            />
          )}

          <Industries
            title="Industries We Serve"
            items={serviceData.industries}
          />

          <div className="my-10 md:my-10 bg-gray-50">
            {serviceData.features && serviceData.features.length > 0 && (
              <Processes
                bgcolor={false}
                process={serviceData.values}
                title="Why Choose Us"
                desc="Your trusted partner for reliable, cutting-edge security camera solutions with unmatched service and support"
              />
            )}
          </div>

          <ChecklistCards
            title={serviceData.checklistHeading}
            icon={serviceData.checklistIcon?.url}
            data={serviceData.checklist}
          />

          {serviceData.testimonial && (
            <Testimonial
              introText={serviceData.testimonial}
              authorName=""
              authorTitle=""
              className=""
            />
          )}

          {serviceData.faq && serviceData.faq.length > 0 && (
            <FAQSection faq={serviceData.faq} />
          )}

          {/* 4. This CTA button will trigger the modal with the ctaLink iframe */}
          <Cta
            className="mt-10 md:mt-15 "
            title={serviceData.cta.processTitle}
            description={serviceData.cta.processDescription}
          />
        </div>
      </ServicesLayout>
    );
  } catch (error) {
    console.error("GraphQL Error:", error);
    return (
      <ServicesLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Error loading service details</p>
        </div>
      </ServicesLayout>
    );
  }
}