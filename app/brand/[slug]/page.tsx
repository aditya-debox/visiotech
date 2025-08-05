import React from "react";
import { gql } from "graphql-request";
import client from "@/utils/graphqlClient";
import BrandDetailPage from "@/components/brand/BrandDetails";
import Link from "next/link";

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
    processTitle: string;
    processDescription: string;
  }[];
  useCase: string[];
  project: {
    title: string;
    description: string;
  }[];
  projects: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  // Await the params promise
  const { slug } = await params;
  console.log("Requested slug:", slug);

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
        title
        highlights {
          processTitle
          processDescription
        }
        useCase
        project {
          title
          description
        }
        projects
      }
    }
  `;

  try {
    const response = await client.request<{ brands: IBrandData[] }>(query);
    console.log(
      "Available brands:",
      response.brands.map((b) => b.slug)
    ); // Debug log

    const brandData = response.brands.find((brand) => brand.slug === slug);
    console.log("Found brand:", brandData); // Debug log

    if (!brandData) {
      return null;
    }

    return <BrandDetailPage brand={brandData} />;
  } catch (error) {
    console.error("GraphQL Error:", error);
  }
}
