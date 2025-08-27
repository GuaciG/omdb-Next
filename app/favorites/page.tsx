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

  // clear all favorites with confirmation
  const clearAllFavorites = () => {
    if (favorites.length === 0) return;
    const confirmed = window.confirm("Are you sure you want to delete all movies?");
    if (confirmed) {
      setFavorites([]);
      localStorage.removeItem("favoriteMovies");
    }
  };


  return (
    <main className="p-6 max-w-6xl mx-auto flex flex-col items-center">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase"
        >
          &larr; Go Back
        </button>
        {favorites.length > 0 && (
          <button
            onClick={clearAllFavorites}
            className="mb-4 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold uppercase"
          >
            Clear All
          </button>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>

      {favorites.length > 0 ? (
        <FavoriteList movies={favorites} setMovies={setFavorites} />
      ) : (
        <p className="text-gray-400">You don&apos;t have any favorite movies yet.</p>
      )}
    </main>
  );
}

