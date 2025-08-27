'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import MovieCard from "./MovieCard";
import IntroNote from "./IntroNote";

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
      <IntroNote />

      <h1 className="text-4xl text-center font-bold mt-4 mb-6">Movie Finder
        <span className="block mt-4">🍿🥤🎬</span>
      </h1>

      <div className="w-full flex flex-col md:flex-row items-center gap-2 mb-6 bg-gray-900 p-3 rounded-xl shadow-lg">
        
        <div className="relative w-full flex-1 flex">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a word (e.g. matrix, ring, star)"
            className="w-full p-3 pr-20 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {q && (
            <button
              onClick={clearSearch}
              disabled={loading}
              className="absolute right-15 top-1/2 -translate-y-1/2 p-1 rounded-full border border-gray-600 hover:bg-gray-600 text-gray-400"
            >
              <X className="w-4 h-4 cursor-pointer" size={16} />
            </button>
          )}          
          <button
            onClick={onSearch}
            disabled={loading}
            className=" absolute right-0 top-0 bottom-0 py-2 px-3 rounded-r-md bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white"
          >
            <Search className="w-7 h-7 cursor-pointer" />
          </button>
        </div>
        
        <button
          onClick={() => router.push("/favorites")}
          className="w-full md:w-1/5 px-4 py-3 rounded-lg bg-red-900 hover:bg-red-950 text-white font-semibold uppercase cursor-pointer"
        >
          Favorites
        </button>

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