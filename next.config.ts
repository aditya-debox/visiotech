import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "dummyimage.com" },
      { protocol: "https", hostname: "media.graphassets.com" },
      { protocol: "https", hostname: "www.facebook.com" },
      { protocol: "https", hostname: "px.ads.linkedin.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
