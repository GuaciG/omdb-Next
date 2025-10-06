import { NextResponse } from 'next/server';
import type { OmdbMovieDetail } from '@/types/omdb';


export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }

  if (!process.env.OMDB_API_KEY) {
    return NextResponse.json({ error: 'Falta OMDB_API_KEY' }, { status: 500 });
  }

  const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${encodeURIComponent(
    id
  )}&plot=full`;

  try {
  const res = await fetch(url, { cache: 'no-store' });
  const data: OmdbMovieDetail = await res.json();

  if (data.Response === 'False') {
    return NextResponse.json(
      { error: data.Error ?? 'No encontrado' }, 
      { status: 404 }
    );
  }

  const minimal = {
      id,
      title: data.Title,
      year: data.Year,
      genre: data.Genre,
      plot: data.Plot,
      poster: data.Poster,
      director: data.Director,
      actors: data.Actors,
    };

  return NextResponse.json(
    minimal,
    { status: 200 }
  );
  } catch (err) {
    console.error("Error al obtener película:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}