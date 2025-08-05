import React from "react";
import { gql } from "graphql-request";
import client from "@/utils/graphqlClient";
import BrandCards from "@/components/brand/brandcards";
import Cta from "@/components/Home/Cta";

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
  };
  useCase: string[];
  project: {
    title: string;
    description: string;
  };
  projets: string[];
}

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

  const response = await client.request<{ brands: IBrandData[] }>(query);
  const brandsdata = response.brands;
  if (!brandsdata) {
    console.log("No data found");
  }

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
