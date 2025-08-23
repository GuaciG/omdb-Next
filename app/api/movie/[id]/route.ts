import { NextResponse } from 'next/server';
import type { OmdbMovieDetail } from '@/types/omdb';

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }
  if (!process.env.OMDB_API_KEY) {
    return NextResponse.json({ error: 'Falta OMDB_API_KEY' }, { status: 500 });
  }

  const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${encodeURIComponent(
    id
  )}&plot=full`;

  const res = await fetch(url, { cache: 'no-store' });
  const data: OmdbMovieDetail = await res.json();

  if (data.Response === 'False') {
    return NextResponse.json({ error: data.Error ?? 'No encontrado' }, { status: 404 });
  }

  const minimal = {
    id,
    title: data.Title,
    year: data.Year,
    genre: data.Genre,
    plot: data.Plot,
    poster: data.Poster,
  };

  return NextResponse.json(minimal, { status: 200 });
}