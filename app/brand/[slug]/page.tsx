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
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  console.log("Requested slug:", params.slug);

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

    const brandData = response.brands.find(
      (brand) => brand.slug === params.slug
    );
    console.log("Found brand:", brandData); // Debug log

    if (!brandData) {
      return null;
    }

    return <BrandDetailPage brand={brandData} />;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-8">⚠️</div>
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Error Loading Brand
          </h1>
          <p className="text-gray-600 mb-8">
            GraphQL Error:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#0e8de8] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0c7bd1] transition-colors"
            >
              Try Again
            </button>
            <Link href="/brand">
              <button className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:border-gray-400 transition-colors">
                Back to Brands
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
