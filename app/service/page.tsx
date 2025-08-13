import Cta from "@/components/Home/Cta";
import ServiceGrid from "@/components/Home/servicecards";
import ServicesLayout from "@/components/layouts/ServiceLayout";
import client from "@/utils/graphqlClient";
import { gql } from "graphql-request";
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
  cta: {
    processTitle: string;
    processDescription: string;
  }[];
}

export const metadata: Metadata = {
  metadataBase: new URL("https://visiotechatlanta.com"),
  title: "Security & Low Voltage Services Atlanta | Visiotech Solutions",
  description:
    "Explore Visiotech's services in Atlanta—security cameras, video surveillance, access control, AV, networking, and low-voltage integration for businesses.",
  openGraph: {
    title: "Security & Low Voltage Services Atlanta | Visiotech Solutions",
    description:
      "Explore Visiotech's services in Atlanta—security cameras, video surveillance, access control, AV, networking, and low-voltage integration for businesses.",
    images: [{ url: "/visiotech.png" }],
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Security & Low Voltage Services Atlanta | Visiotech Solutions",
    description:
      "Explore Visiotech's services in Atlanta—security cameras, video surveillance, access control, AV, networking, and low-voltage integration for businesses.",
    images: ["/visiotech.png"],
  },
};

export default async function ServiceDetails() {
  const query = gql`
    query Servicedetial {
      serviceDetails {
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
        cta {
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

    const serviceData = response.serviceDetails;

    if (!serviceData) {
      return (
        <ServicesLayout modalTitle="Services Inquiry">
          <div className="pt-20">
            <p>No services found.</p>
          </div>
        </ServicesLayout>
      );
    }

    return (
      <ServicesLayout>
        <div className="pt-20">
          <ServiceGrid services={serviceData} />
          <Cta />
        </div>
      </ServicesLayout>
    );
  } catch (error) {
    console.error("GraphQL Error:", error);
    return (
      <ServicesLayout modalTitle="Services Inquiry">
        <div className="pt-20">
          <p>Error loading services.</p>
        </div>
      </ServicesLayout>
    );
  }
}
