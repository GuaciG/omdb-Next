"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Movie {
  id: string;
  title: string;
  year: string;
  genre: string;
  plot: string;
  poster: string;
  actors: string;
  director: string;
}

export default function MovieDetailClient({ movie }: { movie: Movie }) {
  //console.log("Movie in client:", movie);
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const from = searchParams.get("from") || "";
  
  const [imgDetailError, setImgDetailError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const posterDetailOk = movie.poster && movie.poster !== "N/A" && !imgDetailError;

  // check if is favorite
  useEffect(() => {
    const saved = localStorage.getItem("favoriteMovies");
    if (saved) {
      const favorites = JSON.parse(saved);
      setIsFavorite(favorites.some((m: Movie) => m.id === movie.id));
    }
  }, [movie.id]);

  // store/remove from favorites
  const toggleFavorite = () => {
    const saved = localStorage.getItem("favoriteMovies");
    const current: Movie[] = saved ? JSON.parse(saved) : [];

    const exists = current.find((m) => m.id === movie.id);
    let updated: Movie[];

    if (exists) {
      updated = current.filter((m) => m.id !== movie.id);
      setIsFavorite(false);
    } else {
      updated = [...current, movie];
      setIsFavorite(true);
    }

    localStorage.setItem("favoriteMovies", JSON.stringify(updated));
  };
  
  
  return (
    <div className="p-4 w-full">
      <button
        onClick={() => {
          if (from === "favorites") {
            // if you came from Favorites → go back to Favorites (with ?q if any)
            router.push(q ? `/favorites?q=${encodeURIComponent(q)}` : "/favorites");
          } else if (q) {
            // if no from Favorites but with ?q → go back to Search with ?q
            router.push(`/?q=${encodeURIComponent(q)}`);
          } else {
            // else go back to Home
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
        <div className="w-full bg-gray-950 p-6 rounded-lg shadow-md relative">
          <h1 className="text-2xl font-bold pb-2">{movie.title}</h1>
          <p><span className="text-gray-400">Release Year: </span>{movie.year}</p>
          <p><span className="text-gray-400">Genre: </span>{movie.genre}</p>
          <p><span className="text-gray-400">Director: </span>{movie.director}</p>
          <p><span className="text-gray-400">Actors: </span>{movie.actors}</p>
          <p><span className="text-gray-400">Synopsis: </span>{movie.plot}</p>
          <div className="absolute top-3 right-3 group">
            <button
              onClick={toggleFavorite}
              className="p-2 rounded-full text-white bg-gray-700 cursor-pointer"
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>            
            <span className="absolute bottom-11 right-1 scale-0 group-hover:scale-100 transition-transform w-[140px] bg-black text-white text-center text-xs px-2 py-1 rounded-md shadow-lg">
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </span>
          </div>
        </div>        
      </div>
    </div>
  );
}