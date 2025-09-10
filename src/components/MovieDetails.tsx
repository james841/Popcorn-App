import { useEffect, useState } from "react";
import type { MovieDetail as DetailType } from "../types";

const API_KEY = "46bdbe2b";

interface Props {
  id: string;
  onAdd: (movie: DetailType) => void;
  onClose: () => void;
}

export default function MovieDetail({ id, onAdd, onClose }: Props) {
  const [movie, setMovie] = useState<DetailType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setMovie(data);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();

    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (loading) return <p>Loading movie...</p>;
  if (!movie) return null;

  return (
    <div>
      <button
        onClick={onClose}
        className="mb-2 bg-gray-200 px-2 py-1 rounded"
      >
        ⬅ Back
      </button>
      <h2 className="text-xl font-bold">{movie.Title}</h2>
      <p>{movie.Runtime} | ⭐ {movie.imdbRating}</p>
      <p className="italic">{movie.Plot}</p>
      <button
        onClick={() => onAdd(movie)}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
      >
        + Add to Watchlist
      </button>
    </div>
  );
}
