import React from "react";
import { gql } from "graphql-request";
import client from "@/utils/graphqlClient";
import BrandCards from "@/components/brand/brandcards";
import Cta from "@/components/Home/Cta";
import { Metadata } from "next";

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
  highlights: {
    processTitle: string;
    processDescription: string;
  };
}

export const metadata: Metadata = {
  title: "Security Camera Installation in Atlanta | Visiotech",
  description:
    "Explore the trusted brands we install—LTS, Hikvision, Honeywell, Axis, Bosch, and Dahua. Visiotech is a certified dealer offering NDAA-compliant, enterprise-grade security and surveillance technology in Atlanta.",
  openGraph: {
    title: "Security Camera Installation in Atlanta | Visiotech",
    description:
      "Explore the trusted brands we install—LTS, Hikvision, Honeywell, Axis, Bosch, and Dahua. Visiotech is a certified dealer offering NDAA-compliant, enterprise-grade security and surveillance technology in Atlanta.",
    images: [{ url: "/visiotech.png" }],
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Security Camera Installation in Atlanta | Visiotech",
    description:
      "Explore the trusted brands we install—LTS, Hikvision, Honeywell, Axis, Bosch, and Dahua. Visiotech is a certified dealer offering NDAA-compliant, enterprise-grade security and surveillance technology in Atlanta.",
    images: ["/visiotech.png"],
  },
  // alternates: {
  //   canonical: "https://lahoregrill.com/our-story",
  // },
};

export default async function Brand() {
  const query = gql`
    query GetBrands {
      brands {
        heading
        slug
        shortDescription {
          text
          html
          raw
        }
        brandImage {
          url
        }
        brandImageBlurhash
        highlights {
          processTitle
          processDescription
        }
      }
    }
  `;

  const response = await client.request<{ brands: IBrandData[] }>(query);
  const brandsdata = response.brands;

  return (
    <div>
      <BrandCards brands={brandsdata} />

      <Cta
        title="Schedule Your Free Security Consultation"
        buttonText="Get Started"
      />
    </div>
  );
}
