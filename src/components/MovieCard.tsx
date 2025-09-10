
import type { Movie } from "../hooks/type";


interface MovieCardProps {
  movie: Movie;
  onSelect: (id: string) => void;
}

function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
      onClick={() => onSelect(movie.imdbID)}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg truncate">{movie.Title}</h2>
        <p className="text-sm text-gray-500">{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
