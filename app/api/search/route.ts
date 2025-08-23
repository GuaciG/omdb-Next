import { NextResponse } from 'next/server';
import type { OmdbSearchResponse } from '@/types/omdb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim();

  if (!q) {
    return NextResponse.json({ error: 'Parámetro "q" requerido' }, { status: 400 });
  }
  if (!process.env.OMDB_API_KEY) {
    return NextResponse.json({ error: 'Falta OMDB_API_KEY' }, { status: 500 });
  }

  const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(
    q
  )}&type=movie&page=1`;

  const res = await fetch(url, { cache: 'no-store' });
  const data: OmdbSearchResponse = await res.json();

  if (data.Response === 'False') {
    return NextResponse.json({ items: [], message: data.Error ?? 'Sin resultados' }, { status: 200 });
  }

  const items =
    data.Search?.map(({ Title, Year, Poster, imdbID }) => ({
      id: imdbID,
      title: Title,
      year: Year,
      poster: Poster,
    })) ?? [];

  return NextResponse.json({ items }, { status: 200 });
}