export interface MovieSummary {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface MovieDetail extends MovieSummary {
  Plot: string;
  Runtime: string;
  imdbRating: string;
}

