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
import AboutUsHero from "@/components/aboutus/AboutusHero";
import OurStory from "@/components/aboutus/AboutusOurStory";
import AboutusHighlights from "@/components/aboutus/Aboutushighlights";
import AboutusOurTeam from "@/components/aboutus/AboutusOurTeam";
import CardSection from "@/components/common/CardSection";
import ServiceBlock from "@/components/service/ServiceBlock";
import Cta from "@/components/Home/Cta";

export interface IAboutUsData {
  title: string;
  heroTitle: string;
  aboutUsImage: {
    url: string;
  };
  aboutusMapimage:{
    url:string
    }
  aboutUsImageBlurHash: string;
  aboutUsDescription: {
    html: string;
    text: string;
    raw: any; // Rich text raw content
  };
  highlights: {
  processTitle:string
  processDescription: string
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
  serviceArea: string[];
}

export default async function AboutUs() {
  const query = gql`
    query GetAboutUs {
    
      aboutuses {
        title
        aboutUsImage {
          url
        }
          aboutusMapimage{
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
      <div className=" mx-auto pt-6 md:pt-6 lg:pt-12">
      <AboutUsHero 
        data={{
          srTitle: aboutusdata.title,
          title: aboutusdata.heroTitle,
          subTitle: aboutusdata.title, // Rich text object
        }}
      />
      </div>
      <OurStory serviceImage={aboutusdata.aboutUsImage} description={aboutusdata.aboutUsDescription} />
      <AboutusHighlights highlights={aboutusdata.highlights} />
      {/* Add your other sections here */}
      <div className="">
       <ServiceAreasSection 
        title="Service Areas"
        description="Serving businesses throughout the Greater Atlanta Metropolitan Area"
        areas={aboutusdata.serviceArea}
        mapImage={aboutusdata.aboutusMapimage}
        />
        </div>
        <AboutusOurTeam 
        title="Meet Our Team"
        members={aboutusdata.teamSection.map(member => ({
          name: member.teamTitle,
          title: member.teamTitle, // You might want to add a separate field for job title
          descriptionRichText: member.teamDescription.raw
        }))}
      />

        <Cta
        description="Want to Work With Atlanta’s Most Trusted Security Experts? Get in Touch Today"
        title="Schedule Your Free Security Consultation"
        buttonText="Get Started"
      />
    </div>
  );
}