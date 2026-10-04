import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "books.google.com",
      },
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
     
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      
      {
        protocol: "https",
        hostname: "*.auth0.com",
      },
    ],
  },
};

export default nextConfig;
