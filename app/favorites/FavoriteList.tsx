"use client";

import FavoriteItem from "./FavoriteItem";
import { UiMovie } from "./page";

interface FavoriteListProps {
  movies: UiMovie[];
  setMovies: (movies: UiMovie[]) => void;
}

export default function FavoriteList({ movies, setMovies }: FavoriteListProps) {
  if (!movies || movies.length === 0)
    return <p className="text-gray-400">Todavía no has marcado ninguna película como favorita.</p>;

  const handleRemove = (id: string) => {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);
    localStorage.setItem("favoriteMovies", JSON.stringify(updated));
  };

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
      {movies.map((movie) => (
        <FavoriteItem key={movie.id} movie={movie} onRemove={handleRemove} />
      ))}
    </section>
  );
}