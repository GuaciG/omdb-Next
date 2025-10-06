"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FavoriteList from "./FavoriteList";

export interface UiMovie {
  id: string;
  title: string;
  year: string;
  poster: string;
}

export default function FavoritesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [favorites, setFavorites] = useState<UiMovie[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favoriteMovies");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Clear all favorites with confirmation
  const clearAllFavorites = () => {
    if (favorites.length === 0) return;
    const confirmed = window.confirm("Are you sure you want to delete all movies?");
    if (confirmed) {
      setFavorites([]);
      localStorage.removeItem("favoriteMovies");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 py-4 sm:p-6">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => {
            if (q) {
              router.push(`/?q=${encodeURIComponent(q)}`);
            } else {
              router.push("/");
            }
          }}
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
        <FavoriteList movies={favorites} setMovies={setFavorites} q={q} />
      ) : (
        <p className="text-gray-400">You don&apos;t have any favorite movies yet.</p>
      )}
    </main>
  );
}