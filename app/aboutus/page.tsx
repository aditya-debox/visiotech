import React from "react";
import { gql } from "graphql-request";
import client from '@/utils/graphqlClient';
import WhatMakesUsDifferentSection from "@/components/aboutus/AboutusCommitment";
import TeamSection from "@/components/aboutus/AboutusOurTeam";
import CommitmentSection from "@/components/aboutus/AboutusComittmentsection";
import ServiceAreasSection from "@/components/aboutus/AboutusServiceAreas";
import AboutusHeroSection from "@/components/aboutus/AboutusHeroSection";
import OurStorySection from "@/components/aboutus/AboutusOurStory";
import AboutusCommitment from "@/components/aboutus/AboutusCommitment";

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
    html: string;
    text: string;
    raw: any; // Rich text raw content for highlights
  };
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

// Blue Blob Background Component
const BlueBlobBackground = () => (
  <div className="absolute top-[60px] left-0 w-full -z-10 overflow-hidden">
    <svg
      viewBox="0 0 1440 600"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[1400px] sm:h-[1000px] md:h-[1200px] 2xl:h-[1250px]"
    >
      {/* Base wave */}
      <path
        fill="#3366CC"
        d="M0,400L60,380C120,360,240,320,360,300C480,280,600,280,720,300C840,320,960,360,1080,370C1200,380,1320,350,1380,340L1440,330L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      />

      {/* Top wave */}
      <path
        fill="#3366CC"
        fillOpacity="0.5"
        d="M0,280L80,290C160,300,320,330,480,310C640,290,800,260,960,250C1120,240,1280,280,1360,300L1440,320L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      />
    </svg>
  </div>
);

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
        highlights{
          html
          text
          raw
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
    return (
      <div className="relative min-h-screen">
        {/* Blue Blob Background */}
        <BlueBlobBackground />
        
        {/* Main Content with default data */}
        <div className="relative z-10">
          <AboutusHeroSection 
            title="About Visiotech – Trusted Experts in Security & Low-Voltage Integration"
            headline="Building Safer, Smarter Spaces Since 2016"
          />
          
          <OurStorySection />
          
          <AboutusCommitment />
          
          <TeamSection />
          
          <CommitmentSection />
          
          <ServiceAreasSection />
        </div>
      </div>
    );
  }
  
  // Transform team data
  const transformedTeamMembers = aboutusdata.teamSection?.map(member => ({
    name: member.teamTitle,
    title: "Team Member", 
    description: member.teamDescription.html, 
    descriptionRichText: member.teamDescription.raw, 
    image: member.teamImage?.url || "",
    imageAlt: `${member.teamTitle}, team member`
  })) || [];

  // Extract rich text content - pass raw content for RichText component
  const richTextContent = aboutusdata.aboutUsDescription.raw ? [aboutusdata.aboutUsDescription.raw] : undefined;
  
  // Extract highlights rich text content
  const highlightsContent = aboutusdata.highlights?.raw || null;
  
  return (
    <div className="relative min-h-screen">
      {/* Blue Blob Background */}
      <BlueBlobBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <AboutusHeroSection 
          title={aboutusdata.title || "About Visiotech – Trusted Experts in Security & Low-Voltage Integration"}
          headline={aboutusdata.heroTitle || "Building Safer, Smarter Spaces Since 2016"}
          heroImage={aboutusdata.aboutUsImage?.url}
          heroImageAlt="About us - Professional security installation"
        />
        
        <OurStorySection 
          content={richTextContent}
        />
        
        <AboutusCommitment 
          content={highlightsContent}
        />
        
        <TeamSection 
          members={transformedTeamMembers.length > 0 ? transformedTeamMembers : undefined}
        />
        
        <CommitmentSection 
          content={aboutusdata.commitment || "We don't just install devices—we build long-term partnerships by offering support, maintenance, and upgrades that evolve with your business."}
        />
        
        <ServiceAreasSection 
          areas={aboutusdata.serviceArea ? aboutusdata.serviceArea.split(',').map(area => area.trim()) : undefined}
        />
      </div>
    </div>
  );
}