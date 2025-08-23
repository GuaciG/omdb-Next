'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieCard from "./MovieCard";

type UiMovie = {
  id: string;
  title: string;
  year: string;
  poster: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") || "";

  const [q, setQ] = useState(initialQ);
  const [results, setResults] = useState<UiMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async (term: string) => {
    
    if (!term) {
      setResults([]);
      setError("Type a word to search for your movie.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`, { 
        cache: "no-store" 
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Search error. Try again later.");
      setResults(data.items || []);
      if ((data.items || []).length === 0) setError("No results. Try another word.");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Hacer búsqueda automática si hay ?q en la URL
  useEffect(() => {
    if (initialQ) {
      fetchResults(initialQ);
    }
  }, [initialQ]);

  const onSearch = () => {
    if (!q.trim()) return;
    router.push(`/?q=${encodeURIComponent(q)}`);
    fetchResults(q);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  const clearSearch = () => {
    setQ("");
    setResults([]);
    setError(null);
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-4xl text-center font-bold my-4">Movie Searcher<span className="block">🍿🥤🎬</span></h1>

      <div className="w-full flex flex-col md:flex-row gap-2 items-center mb-6 bg-gray-900 p-3 rounded-xl shadow-lg">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a word (e.g. matrix, ring, star)"
          className="w-full md:flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={onSearch}
            disabled={loading}
            className="w-1/2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold uppercase"
          >
            Search
          </button>
          <button
            onClick={clearSearch}
            disabled={loading}
            className="w-1/2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold uppercase"
          >
            Clear
          </button>
          <button
            onClick={clearSearch}
            disabled={loading}
            className="w-1/2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold uppercase"
          >
            Favorites
          </button>
        </div>  
      </div>
      <div>
        <p>This is a very easy-to-use app that allows you to search for any movie by typing any word in its title. This type of app can be used to search for books, recipes, or other items included in an API. Press the &apos;Back&apos; button and the search will remain.</p>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}
      {loading && <p>Give me a second…</p>}

      {!loading && results.length > 0 && (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((m) => (
            <MovieCard key={m.id} movie={m} query={q} />
          ))}
        </section>
      )}
    </main>
  );
}