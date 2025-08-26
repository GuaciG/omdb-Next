const API_KEY = process.env.OMDB_API_KEY; 

if (!API_KEY) {
  throw new Error("Missing OMDB_API_KEY in environment variables");
}

export async function searchMovies(query: string) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
);
  const data = await res.json();
  return data.Search || [];
}

export async function getMovie(id: string) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
  const data = await res.json();
  if (data.Response === "False") return null;
  return {
    title: data.Title,
    year: data.Year,
    genre: data.Genre,
    plot: data.Plot,
    poster: data.Poster,
    actors: data.Actors,
    director: data.Director,
    rating: data.Rating,
    runtime: data.Runtime,
  };
}