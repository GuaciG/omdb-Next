"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

interface Movie {
  title: string;
  year: string;
  genre: string;
  plot: string;
  poster: string;
}


export default function MovieDetailClient({ movie }: { movie: Movie }) {
  //console.log("🎬 Movie en cliente:", movie);
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [imgDetailError, setImgDetailError] = useState(false);
  const posterDetailOk = movie.poster && movie.poster !== "N/A" && !imgDetailError;

  return (
    <div className="p-4 w-full">
      <button
        onClick={() => {
          if (q) {
            router.push(`/?q=${encodeURIComponent(q)}`);
          }
          else { 
            router.push("/");
          }
        }}
        type="button"
        className="mb-4 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold uppercase"
      >
        &larr; Go Back
      </button>

      <div className="flex flex-col justify-center items-center md:flex-row md:items-start gap-4 w-full">
        <div className="w-full md:w-2/4 h-auto flex items-center justify-center bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {movie.poster && movie.poster !== "N/A" && posterDetailOk && !imgDetailError ? (
            <Image
              src={movie.poster}
              alt={movie.title}
              width={300}
              height={450}
              sizes="300px"
              placeholder="blur"
              blurDataURL="/placeholder.png"
              className="w-full h-auto md:max-h-[700px] object-fill"
              priority
              onError={() => setImgDetailError(true)}
            />
          ) : (
            <div className="w-full h-[300px] md:min-w-[300px] md:h-[500px] grid place-items-center bg-gray-700 text-gray-400 text-sm">
              No poster available
            </div>
          )}
        </div>
        <div className="w-full bg-gray-950 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p>{movie.year}</p>
          <p>{movie.genre}</p>
          <p>{movie.plot}</p>
        </div>
      </div>
    </div>
  );
}