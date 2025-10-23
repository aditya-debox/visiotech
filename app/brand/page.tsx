import BrandCards from "@/components/brand/brandcards";
import Cta from "@/components/Home/Cta";
import client from "@/utils/graphqlClient";
import { gql } from "graphql-request";
import { Metadata } from "next";

interface IBrandData {
  heading: string;
  slug: string;
  brandOrder: number;
  shortDescription: {
    text: string;
    html: string;
    raw: any;
  };
  brandImage: {
    url: string;
  };
  highlights: {
    processTitle: string;
    processDescription: string;
  };
}

export const metadata: Metadata = {
  metadataBase: new URL("https://visiotechatlanta.com"),
  title: "Trusted Security & Low Voltage Brand Partners | Visiotech Atlanta",
  description:
    "Visiotech partners with leading brands like LTS, Honeywell, Axis, and Bosch to deliver reliable, NDAA-compliant security and low-voltage solutions in Atlanta.",
  openGraph: {
    title: "Trusted Security & Low Voltage Brand Partners | Visiotech Atlanta",
    description:
      "Visiotech partners with leading brands like LTS, Honeywell, Axis, and Bosch to deliver reliable, NDAA-compliant security and low-voltage solutions in Atlanta.",
    images: [{ url: "/visiotech.png" }],
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Trusted Security & Low Voltage Brand Partners | Visiotech Atlanta",
    description:
      "Visiotech partners with leading brands like LTS, Honeywell, Axis, and Bosch to deliver reliable, NDAA-compliant security and low-voltage solutions in Atlanta.",
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
        brandOrder
        shortDescription {
          text
          html
          raw
        }
        brandImage {
          url
        }
        highlights {
          processTitle
          processDescription
        }
      }
    }
  `;

  const response = await client.request<{ brands: IBrandData[] }>(query);

  // Sort brands by brandOrder (1 first, 2 second, etc. - 0 goes to end)
  const brandsdata = response.brands.sort((a, b) => {
    const orderA = a.brandOrder || 0;
    const orderB = b.brandOrder || 0;

    if (orderA === 0 && orderB === 0) return 0;
    if (orderA === 0) return 1;
    if (orderB === 0) return -1;
    return orderA - orderB;
  });

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
