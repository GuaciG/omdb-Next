export interface OmdbSearchItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string; // "N/A" si no hay
  Actors: string;
  Director: string;
}

export interface OmdbSearchResponse {
  Search?: OmdbSearchItem[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface OmdbMovieDetail {
  Title: string;
  Year: string;
  Genre: string;
  Plot: string;
  Poster: string; // "N/A" si no hay
  Actors: string;
  Director: string; 
  Response: 'True' | 'False';
  Error?: string;
  [key: string]: string | undefined;
}