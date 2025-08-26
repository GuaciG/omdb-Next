"use client";

import Link from "next/link";
import Image from "next/image";

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
  const posterOk = movie.poster && movie.poster !== "N/A";

  return (
    <div className="relative group">
      <button
        onClick={() => onRemove(movie.id)}
        className="absolute top-1 right-1 z-10 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full text-sm opacity-0 group-hover:opacity-100 transition"
        title="Eliminar"
      >
        ×
      </button>

      <Link
        href={`/movie/${movie.id}`}
        className="block bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition"
      >
        <div className="relative w-full pt-[150%]">
          {posterOk ? (
            <Image
              src={movie.poster}
              alt={`Cartelera de ${movie.title}`}
              fill
              sizes="180px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-gray-800 text-gray-500 text-sm">
              Sin cartelera
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