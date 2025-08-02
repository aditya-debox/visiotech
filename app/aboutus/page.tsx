import React from "react";
import AboutUsSection from "@/components/aboutus/AboutusHeadSection";
import AboutusInfoSection from "@/components/aboutus/AboutusInfoSection";
import { gql } from "graphql-request";
import client from '@/utils/graphqlClient';
import { RichText } from '@graphcms/rich-text-react-renderer';
import CardSection from "@/components/aboutus/AwardsSection";

export interface IAboutUsData {
  aboutUsImage: {
    url: string;
  };
  aboutUsImageBlurHash: string;
  aboutUsDescription: {
    html: string;
    text: string;
    raw: any; // Rich text raw content
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
}

// Blue Blob Background Component
const BlueBlobBackground = () => (
  <div className="absolute top-[60px] left-0 w-full -z-10 overflow-hidden">
    <svg
      viewBox="0 0 1440 600"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[1400px] sm:h-[1000px] md:h-[1200px]"
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
        aboutUsImage {
          url
        }
        aboutUsImageBlurHash
        aboutUsDescription {
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
      }
    }
  `;
 
  const response = await client.request<{ aboutuses: IAboutUsData[] }>(query);
  const aboutusdata = response.aboutuses[0];
  
  if (!aboutusdata) {
    return null;
  }
  
  // Transform team data for AboutusInfoSection (owners)
  const transformedOwners = aboutusdata.teamSection.map(member => ({
    name: member.teamTitle,
    title: "Co-Owner & Dental Professional", // Default title, adjust as needed
    image: member.teamImage.url,
    imageAlt: `${member.teamTitle}, dental professional`,
    bioRichText: member.teamDescription.raw // Pass raw rich text content
  }));
  
  return (
    <div className="relative min-h-screen">
      {/* Blue Blob Background */}
      <BlueBlobBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <AboutUsSection
          title="ABOUT US"
          heroImage={aboutusdata.aboutUsImage.url}
          heroImageAlt="About us - Dental practice"
          richTextContent={aboutusdata.aboutUsDescription.raw}
          showFeatures={true}
          
        />
        <AboutusInfoSection
          title="ABOUT THE OWNERS"
          items={transformedOwners}
        />
        <CardSection 
        title="Why Choose Us" 
        data={[
          {
            title: "Trusted by Top Brands",
            desc: "Shell, Circle K, and Gravity Autos",
          },
          {
            title: "Registered & Insured", 
            desc: "Compliant with Georgia's regulations",
          },
          {
            title: "Certified Expertise",
            desc: "Electro-mechanical engineering, IT integration, and networks",
          },
          {
            title: "Proven Track Record",
            desc: "100+ successful installations",
          },
          {
            title: "Client Satisfaction",
            desc: "5-star ratings across multiple platforms",
          },
        ]} 
/>
      </div>
    </div>
  );
}