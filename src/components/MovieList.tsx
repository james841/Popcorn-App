import type{ MovieSummary } from "../types";

interface Props {
  movies: MovieSummary[];
  onSelect: (id: string) => void;
}

export default function MovieList({ movies, onSelect }: Props) {
  return (
    <ul className="space-y-2">
      {movies.map((movie) => (
        <li
          key={movie.imdbID}
          className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => onSelect(movie.imdbID)}
        >
          <img src={movie.Poster} alt={movie.Title} className="w-12 h-16" />
          <div>
            <h3 className="font-medium">{movie.Title}</h3>
            <p className="text-sm text-gray-600">{movie.Year}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
