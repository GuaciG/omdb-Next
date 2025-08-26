import { notFound } from "next/navigation";
import { getMovie } from "@/lib/omdb";
import MovieDetailClient from "./MovieDetailClient";

interface Props {
  params: { id: string };
}

export default async function MoviePage({ params }: Props) {
  const { id } = params;
  const movieData = await getMovie(id);

  if (!movieData) notFound();

  const movie = { ...movieData, id };

  return <MovieDetailClient movie={movie} />;
}