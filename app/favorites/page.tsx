"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FavoriteList from "./FavoriteList";

export interface UiMovie {
  id: string;
  title: string;
  year: string;
  poster: string;
}

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<UiMovie[]>([]);

  // load favorites from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem("favoriteMovies");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);


  return (
    <main className="p-6 max-w-6xl mx-auto flex flex-col items-center">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase"
      >
        &larr; Go Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Películas Favoritas</h1>

      {favorites.length > 0 ? (
        <FavoriteList movies={favorites} setMovies={setFavorites} />
      ) : (
        <p className="text-gray-400">You don&apos;t have any favorite movies yet.</p>
      )}
    </main>
  );
}

