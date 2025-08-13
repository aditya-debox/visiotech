import AboutUsHero from "@/components/aboutus/AboutusHero";
import AboutusHighlights from "@/components/aboutus/Aboutushighlights";
import OurStory from "@/components/aboutus/AboutusOurStory";
import AboutusOurTeam from "@/components/aboutus/AboutusOurTeam";
import ServiceAreasSection from "@/components/aboutus/AboutusServiceAreas";
import Cta from "@/components/Home/Cta";
import client from "@/utils/graphqlClient";
import { gql } from "graphql-request";
import { Metadata } from "next";

export interface IAboutUsData {
  title: string;
  ctaCardTitle: string
  ctaCardDescription: string;
  heroTitle: string;
  aboutUsImage: {
    url: string;
  };
    aboutUsDescription: {
    html: string;
    text: string;
    raw: any; // Rich text raw content
  };
  highlights: {
    title: string;
    description: string;
    iconImage: {
      url: string;
    };

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
  aboutusMapimage:{
    url:string
  }
}

export const metadata: Metadata = {
  metadataBase: new URL("https://visiotechatlanta.com"),
  title:
    "About Visiotech - Trusted Experts in Security & Low-Voltage Integration",
  description:
    "Learn about Visiotech, Atlanta's trusted provider of commercial security systems, low-voltage design, and smart building integrations since 2016.",
  openGraph: {
    title:
      "About Visiotech - Trusted Experts in Security & Low-Voltage Integration",
    description:
      "Learn about Visiotech, Atlanta's trusted provider of commercial security systems, low-voltage design, and smart building integrations since 2016.",
    images: [{ url: "/visiotech.png" }],
    type: "article",
  },
  twitter: {
    card: "summary",
    title:
      "About Visiotech - Trusted Experts in Security & Low-Voltage Integration",
    description:
      "Learn about Visiotech, Atlanta's trusted provider of commercial security systems, low-voltage design, and smart building integrations since 2016.",
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
        ctaCardTitle
        ctaCardDescription
        aboutUsImage {
          url
        }
        
        heroTitle
        aboutUsDescription {
          html
          text
          raw
        }
        highlights {
          title
          description
          iconImage{
          url
          }
        }
        teamSection {
          teamTitle
          teamDescription {
            html
            raw
          }
        }
        commitment
        serviceArea
        aboutusMapimage{
          url
        }
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

      <ServiceAreasSection 
        title="Our Service Areas"
        description = "Serving businesses throughout the Greater Atlanta Metropolitan Area"
        areas={aboutusdata.serviceArea }
        mapImage={aboutusdata.aboutusMapimage}
      />
      <Cta title={aboutusdata.ctaCardTitle} description={aboutusdata.ctaCardDescription} />
    </div>
  );
}
