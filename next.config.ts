import type { NextConfig } from "next";

const hostnames = [
  'm.media-amazon.com', 
  'img.omdbapi.com', 
  'ia.media-imdb.com',
  'i.pravatar.cc', 
  'images.adsttc.com', 
  'cdn.pixabay.com', 
  'res.cloudinary.com',
  'images.unsplash.com',
  'res.cloudinary.com'
]

const nextConfig: NextConfig = {
  reactStrictMode: true, // activa React Strict Mode
  
  images: {
    remotePatterns: hostnames.map(hostname => ({
      protocol: 'https',
      hostname
    })) 
    
  },
};

export default nextConfig;
