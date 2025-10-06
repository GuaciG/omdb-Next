import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getMovie } from "@/lib/omdb";
import MovieDetailClient from "./MovieDetailClient";


export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const movieData = await getMovie(id);

  if (!movieData) notFound();

  const movie = { ...movieData, id };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MovieDetailClient movie={movie} />
    </Suspense>
  )
}