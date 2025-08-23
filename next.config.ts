import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // activa React Strict Mode
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.media-amazon.com'
      }
    ],
    // OMDb devuelve posters en estos dominios (pueden variar,
    // añade más si hiciera falta)
    domains: [
      'm.media-amazon.com', 
      'img.omdbapi.com', 
      'ia.media-imdb.com',
      'i.pravatar.cc', 
      'images.adsttc.com', 
      'cdn.pixabay.com', 
      'res.cloudinary.com',
      'images.unsplash.com',
      'res.cloudinary.com'
    ],
  },
};

export default nextConfig;
