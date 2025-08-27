"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export interface UiMovie {
  id: string;
  title: string;
  year: string;
  poster: string;
}

interface FavoriteItemProps {
  movie: UiMovie;
  onRemove: (id: string) => void;
}

export default function FavoriteItem({ movie, onRemove }: FavoriteItemProps) {
  const [imgError, setImgError] = useState(false);
  const posterOk = movie.poster && movie.poster !== "N/A";

  return (
    <div className="relative group">
      <button
        onClick={() => onRemove(movie.id)}
        className="absolute top-1 right-1 z-10 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full text-sm group-hover:opacity-100 transition cursor-pointer"
        title="Eliminar"
      >
        ×
      </button>

      <Link
        href={`/movie/${movie.id}`}
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
    </div>
  );
}