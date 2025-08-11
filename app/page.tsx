import BrandCards from "@/components/Home/brandcards";
import LogoSlider from "@/components/common/LogoSlider";
import Banner from "@/components/Home/HeroSection";
import IntroSection from "@/components/Home/IntroSection";
import NewHeroSection from "@/components/Home/NewHeroSection";
import ServiceGrid from "@/components/Home/servicecards";
import Services from "@/components/Home/Services";
import Testimonials from "@/components/Home/Testimonial";
import TrustedCompanies from "@/components/Home/TrustedCompanies";
import client from "@/utils/graphqlClient";
import { gql } from "graphql-request";
import Image from "next/image";
import TestimonialCards from "@/components/Home/TestimonialCards";
import Cta from "@/components/Home/Cta";
import { Metadata } from "next";

export interface IHomePage {
  title: string;
  subTitle: string;
  introText: string;
  client: {
    clientLogo: {
      url: string;
    };
    clientName: string;
  }[];
  heroVideo: {
    url: string;
  };
  serviceDetail: {
    slug: string;
    serviceTitle: string;
    serviceDescription: {
      raw: any;
      text: string;
    };
  }[];
  testimonial: {
    name: string;
    description: string;
  }[];
  testimonialImage: {
    url: string;
  };
  testimonialBh: string;
}

export interface ServiceDetail {
  serviceTitle: string;
  serviceDescription: {
    text: string;
    html: string;
    raw: any;
  };
  serviceImage: {
    url: string;
  };
  serviceImageBlurHash: string;
  serviceIcon: {
    url: string;
  };
  slug: string;
}

export interface Brand {
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
}

export const metadata: Metadata = {
  title: "Security Camera Installation in Atlanta | Visiotech",
  description:
    "Visiotech specializes in professional commercial security camera installation, surveillance systems, access control, and structured cabling across Atlanta. Trusted by top businesses including Shell, Circle K, and Havana ATL.",
  openGraph: {
    title: "Security Camera Installation in Atlanta | Visiotech",
    description:
      "Visiotech specializes in professional commercial security camera installation, surveillance systems, access control, and structured cabling across Atlanta. Trusted by top businesses including Shell, Circle K, and Havana ATL.",
    images: [{ url: "/visiotech.png" }],
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Security Camera Installation in Atlanta | Visiotech",
    description:
      "Visiotech specializes in professional commercial security camera installation, surveillance systems, access control, and structured cabling across Atlanta. Trusted by top businesses including Shell, Circle K, and Havana ATL.",
    images: ["/visiotech.png"],
  },
  // alternates: {
  //   canonical: "https://lahoregrill.com/our-story",
  // },
};

export default async function Home() {
  const query = gql`
    query HomePage {
      homePages {
        title
        subTitle
        introText
        client {
          clientLogo {
            url
          }
          clientName
        }
        heroVideo {
          url
        }
        serviceDetail {
          slug
          serviceTitle
          serviceDescription {
            raw
            text
          }
        }
        testimonial {
          name
          description
        }
        testimonialImage {
          url
        }
        testimonialBh
      }
      serviceDetails {
        serviceTitle
        serviceDescription {
          text
          html
          raw
        }
        serviceImage {
          url
        }
        serviceImageBlurHash
        serviceIcon {
          url
        }
        slug
      }
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
      }
    }
  `;

  const response = await client.request<{
    homePages: IHomePage[];
    serviceDetails: ServiceDetail[];
    brands: Brand[];
  }>(query);

  const homePageData = response.homePages[0];
  const serviceDetails = response.serviceDetails;
  const brands = response.brands;

  if (!homePageData) {
    return null;
  }

  const companies = homePageData.client.map((c) => ({
    name: c.clientName,
    logo: c.clientLogo.url,
  }));

  return (
    <div className="font-secondary">
      <NewHeroSection data={homePageData} />
      <TrustedCompanies companies={companies} />
      <IntroSection
        introText="Visiotech specializes in commercial security camera installation, surveillance systems, access control, and network infrastructure in Atlanta and surrounding areas."
        authorName=""
        authorTitle=""
      />
      <ServiceGrid showAll={true} services={serviceDetails} />
      <BrandCards
        title="Brands Partnered"
        subtitle="Partners who we served"
        brands={brands}
      />
      <TestimonialCards testimonials={homePageData.testimonial} />
      <Cta
        title="Schedule Your Free Security Consultation"
        buttonText="Get Started"
      />
    </div>
  );
}
