"use client";

import FavoriteItem from "./FavoriteItem";
import { UiMovie } from "../../types/ui";

interface FavoriteListProps {
  movies: UiMovie[];
  setMovies: (movies: UiMovie[]) => void;
  q?: string;
}

export default function FavoriteList({ movies, setMovies, q }: FavoriteListProps) {
  if (!movies || movies.length === 0)
    return <p className="text-gray-400">You don&apos;t have any favorite movies yet.</p>;

  const handleRemove = (id: string) => {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);
    localStorage.setItem("favoriteMovies", JSON.stringify(updated));
  };

  return (
    <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <FavoriteItem key={movie.id} movie={movie} onRemove={handleRemove} q={q} />
      ))}
    </section>
  );
}