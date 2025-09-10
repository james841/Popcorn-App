
import type { MovieSummary } from "../types";

interface Props {
  watchlist: MovieSummary[];
  onRemove: (id: string) => void;
}

export default function Watchlist({ watchlist, onRemove }: Props) {
  if (watchlist.length === 0) return <p>No movies in watchlist.</p>;

  return (
    <ul className="space-y-2">
      {watchlist.map((movie) => (
        <li key={movie.imdbID} className="flex justify-between items-center">
          <span>{movie.Title} ({movie.Year})</span>
          <button
            onClick={() => onRemove(movie.imdbID)}
            className="text-red-600"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

