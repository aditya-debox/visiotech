import React from "react";
import { gql } from "graphql-request";
import client from "@/utils/graphqlClient";
import WhatMakesUsDifferentSection from "@/components/aboutus/AboutusCommitment";
import TeamSection from "@/components/aboutus/AboutusOurTeam";
import CommitmentSection from "@/components/aboutus/AboutusComittmentsection";
import ServiceAreasSection from "@/components/aboutus/AboutusServiceAreas";
import AboutusHeroSection from "@/components/aboutus/AboutusHeroSection";
import OurStorySection from "@/components/aboutus/AboutusOurStory";
import AboutusCommitment from "@/components/aboutus/AboutusCommitment";
import AboutUsHero from "@/components/aboutus/AboutusHero";
import OurStory from "@/components/aboutus/AboutusOurStory";
import AboutusHighlights from "@/components/aboutus/Aboutushighlights";
import AboutusOurTeam from "@/components/aboutus/AboutusOurTeam";
import { Metadata } from "next";

export interface IAboutUsData {
  title: string;
  heroTitle: string;
  aboutUsImage: {
    url: string;
  };
  aboutUsImageBlurHash: string;
  aboutUsDescription: {
    html: string;
    text: string;
    raw: any; // Rich text raw content
  };
  highlights: {
    processTitle: string;
    processDescription: string;
  }[];
  teamSection: {
    teamImage: {
      url: string;
    };
    teamImageBlurHash: string;
    teamTitle: string;
    teamDescription: {
      html: string;
      raw: any; // Rich text raw content
    };
  }[];
  commitment: string;
  serviceArea: string;
}

export const metadata: Metadata = {
  title: "About Visiotech | Atlanta’s Security Experts",
  description:
    "Learn about Visiotech’s mission to build safer, smarter commercial spaces in Atlanta. Since 2016, we’ve delivered end-to-end security, surveillance, AV, and cabling solutions with certified expertise and rapid execution.",
  openGraph: {
    title: "About Visiotech | Atlanta’s Security Experts",
    description:
      "Learn about Visiotech’s mission to build safer, smarter commercial spaces in Atlanta. Since 2016, we’ve delivered end-to-end security, surveillance, AV, and cabling solutions with certified expertise and rapid execution.",
    images: [{ url: "/visiotech.png" }],
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "About Visiotech | Atlanta’s Security Experts",
    description:
      "Learn about Visiotech’s mission to build safer, smarter commercial spaces in Atlanta. Since 2016, we’ve delivered end-to-end security, surveillance, AV, and cabling solutions with certified expertise and rapid execution.",
    images: ["/visiotech.png"],
  },
  // alternates: {
  //   canonical: "https://lahoregrill.com/our-story",
  // },
};

export default async function AboutUs() {
  const query = gql`
    query GetAboutUs {
      aboutuses {
        title
        aboutUsImage {
          url
        }
        aboutUsImageBlurHash
        heroTitle
        aboutUsDescription {
          html
          text
          raw
        }
        highlights {
          processTitle
          processDescription
        }
        teamSection {
          teamImage {
            url
          }
          teamImageBlurHash
          teamTitle
          teamDescription {
            html
            raw
          }
        }
        commitment
        serviceArea
      }
    }
  `;

  const response = await client.request<{ aboutuses: IAboutUsData[] }>(query);
  const aboutusdata = response.aboutuses[0];

  if (!aboutusdata) {
    return <div>No data found</div>;
  }

  return (
    <div className="relative min-h-screen">
      <AboutUsHero
        data={{
          srTitle: aboutusdata.title,
          title: aboutusdata.heroTitle,
          subTitle: aboutusdata.title, // Rich text object
        }}
      />
      <OurStory
        serviceImage={aboutusdata.aboutUsImage}
        description={aboutusdata.aboutUsDescription}
      />

      <AboutusHighlights highlights={aboutusdata.highlights} />
      {/* Add your other sections here */}
      <AboutusOurTeam
        title="Meet Our Team"
        members={aboutusdata.teamSection.map((member) => ({
          name: member.teamTitle,
          title: member.teamTitle, // You might want to add a separate field for job title
          descriptionRichText: member.teamDescription.raw,
        }))}
      />
    </div>
  );
}
