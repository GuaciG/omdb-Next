import { notFound } from "next/navigation";
import { getMovie } from "@/lib/omdb";
import MovieDetailClient from "./MovieDetailClient";

interface Props {
  params: { id: string };
}

export default async function MoviePage({ params }: Props) {
  const { id } = params;
  const movie = await getMovie(id);

  if (!movie) notFound();

  return <MovieDetailClient movie={movie} />;
}