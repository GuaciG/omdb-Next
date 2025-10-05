"use client";

import { useState, useEffect } from "react";
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
  const [isFavorite, setIsFavorite] = useState(false);

  const posterOk = movie.poster && movie.poster !== "N/A";

  useEffect(() => {
    const saved = localStorage.getItem("favoriteMovies");
    if (saved) {
      const favorites = JSON.parse(saved);
      setIsFavorite(favorites.some((m: UiMovie) => m.id === movie.id));
    }
  }, [movie.id]);

  const toggleFavorite = () => {
    const saved = localStorage.getItem("favoriteMovies");
    const current: UiMovie[] = saved ? JSON.parse(saved) : [];

    const exists = current.find((m) => m.id === movie.id);

    let updated: UiMovie[];
    if (exists) {
      updated = current.filter((m) => m.id !== movie.id);
      setIsFavorite(false);
    } else {
      updated = [...current, movie]; // ✅ keep the movie object
      setIsFavorite(true);
    }

    localStorage.setItem("favoriteMovies", JSON.stringify(updated));
  };

  return (
    <div className="relative bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition">
      <Link
        key={movie.id}
        href={`/movie/${movie.id}?q=${encodeURIComponent(query)}`}
        className="block h-full"
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
          <div className="text-gray-400 text-sm mb-6">{movie.year}</div>
        </div>
      </Link>
      <div className="bottom-2 right-2 group relative">
        <button
            onClick={toggleFavorite}
            className="absolute bottom-1.5 right-1 p-1 rounded-full text-white bg-gray-700"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
          <span className="absolute bottom-11 right-1 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-1 rounded-md shadow-lg">
            {isFavorite ? "Remove from favourites" : "Add to favourites"}
          </span>
        </div>
    </div>
  );
    
}