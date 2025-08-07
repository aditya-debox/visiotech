// app/brands/[slug]/page.tsx

import { Metadata } from "next";
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
  highlights: {
    processTitle: string;
    processDescription: string;
  }[];
  highlightTitle: string;
  useCases: {
    title: string;
    image: { url: string };
    hash: string;
  }[];
  cta: string;
}

async function getBrandData(slug: string): Promise<IBrandData | null> {
  const query = gql`
    query GetBrands($slug: String) {
      brands(where: { slug: $slug }) {
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
        highlightTitle
        useCases {
          title
          image {
            url
          }
          hash
        }
        cta
      }
    }
  `;

  const response = await client.request<{ brands: IBrandData[] }>(query, {
    slug,
  });

  return response.brands[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Await the params Promise
  const { slug } = await params;
  const brandData = await getBrandData(slug);

  if (!brandData) {
    return {
      title: "Brand Not Found | Visiotech",
      description: "The brand you are looking for does not exist.",
    };
  }

  const brandName = brandData.heading || "Security Brand";
  const description =
    brandData.shortDescription?.text ||
    "Explore trusted security solutions from leading brands installed by Visiotech in Atlanta.";

  const imageUrl = brandData.brandImage?.url || "/visiotech.png";

  return {
    title: `${brandName} | Security Camera Installation Atlanta | Visiotech`,
    description,
    openGraph: {
      title: `${brandName} | Security Camera Installation Atlanta | Visiotech`,
      description,
      images: [{ url: imageUrl }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${brandName} | Security Camera Installation Atlanta | Visiotech`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params Promise
  const { slug } = await params;
  const brandData = await getBrandData(slug);

  if (!brandData) {
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
          <Link href="/">
            <button className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-full font-semibold transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return <BrandDetailPage brand={brandData} />;
}
