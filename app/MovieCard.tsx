"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type UiMovie = {
  id: string;
  title: string;
  year: string;
  poster: string;
};

export default function MovieCard({ movie, query }: { movie: UiMovie; query: string }) {
  const [imgError, setImgError] = useState(false);
  const posterOk = movie.poster && movie.poster !== "N/A";

  return (
    <Link
      key={movie.id}
      href={`/movie/${movie.id}?q=${encodeURIComponent(query)}`}
      className="block bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition"
    >
      <div className="relative w-full pt-[150%]">
        {posterOk && !imgError ? (
          <Image
            src={movie.poster}
            alt={`${movie.title} Poster`}
            fill
            sizes="(max-width: 768px) 50vw, 180px"
            placeholder="blur"
            blurDataURL="/placeholder.png"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gray-800 text-gray-500 text-sm">
            No poster available
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="font-semibold text-lg leading-tight">{movie.title}</div>
        <div className="text-gray-400 text-sm">{movie.year}</div>
      </div>
    </Link>
  );
    
}