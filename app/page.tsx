import LogoSlider from "@/components/common/LogoSlider";
import Banner from "@/components/Home/HeroSection";
import Services from "@/components/Home/Services"; // Import your updated Services
import Testimonials from "@/components/Home/Testimonial";
import client from "@/utils/graphqlClient";
import { gql } from "graphql-request";

export interface IHomePage {
  title: string;
  subTitle: string;
  heroVideo: {
    url: string;
  };
  serviceDetail: {
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

export default async function Home() {
  const query = gql`
    query HomePage {
      homePages {
        title
        subTitle
        heroVideo {
          url
        }
        serviceDetail {
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
    }
  `;

  const response = await client.request<{ homePages: IHomePage[] }>(query);
  const homePageData = response.homePages[0];

  if (!homePageData) {
    return null;
  }
  console.log(homePageData.serviceDetail);

  return (
    <div className="font-secondary">
      <Banner
        heroBannerDesktop={homePageData.heroVideo}
        subtilte={homePageData.subTitle}
        title={homePageData.title}
      />
      <Services serviceDetails={homePageData.serviceDetail} />
      <div className="xl:px-12 px-6">
        <LogoSlider />
      </div>
      <Testimonials
        blurHash={homePageData.testimonialBh}
        dentistImage={homePageData.testimonialImage.url}
        testimonials={homePageData.testimonial}
      />
    </div>
  );
}
