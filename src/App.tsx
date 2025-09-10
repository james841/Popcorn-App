import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetails";
import Watchlist from "./components/WatchList";
import type { MovieSummary } from "./types";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "46bdbe2b";

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=46bdbe2b&s=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        const data = await res.json();

        if (data.Response === "False") {
          setError(data.Error);
          setMovies([]);
        } else {
          setMovies(data.Search);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return (
    <div className="app-container">
      {/* Animated background elements */}
      <div className="background-animation">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1 className="main-title">
            🍿 UsePopcorn
          </h1>
          <p className="subtitle">
            Discover, explore, and curate your favorite movies
          </p>
        </div>

        {/* Search Box Container */}
        <div className="search-container">
          <div className="search-wrapper">
            <SearchBox query={query} setQuery={setQuery} />
          </div>
        </div>

        {/* Error and Loading States */}
        {error && (
          <div className="error-container">
            <div className="error-content">
              <div className="error-indicator"></div>
              <p className="error-text">{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-spinner-wrapper">
                <div className="loading-spinner"></div>
              </div>
              <p className="loading-text">
                Loading movies...
              </p>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Movies List */}
          <div className="movies-section">
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="status-dot status-dot-yellow"></span>
                  <span>Search Results</span>
                </h2>
                {movies.length > 0 && (
                  <span className="badge badge-purple">
                    {movies.length} movies found
                  </span>
                )}
              </div>
              <MovieList movies={movies} onSelect={setSelectedId} />
            </div>
          </div>

          {/* Movie Detail / Watchlist */}
          <div className="details-section">
            <div className="section-card details-card">
              {selectedId ? (
                <div className="card-content">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="status-dot status-dot-green"></span>
                      <span>Movie Details</span>
                    </h2>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="close-button"
                    >
                      <svg className="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <MovieDetail
                    id={selectedId}
                    onAdd={(movie) => setWatchlist([...watchlist, movie])}
                    onClose={() => setSelectedId(null)}
                  />
                </div>
              ) : (
                <div className="card-content">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="status-dot status-dot-blue"></span>
                      <span>My Watchlist</span>
                    </h2>
                    {watchlist.length > 0 && (
                      <span className="badge badge-blue">
                        {watchlist.length} movies saved
                      </span>
                    )}
                  </div>
                  <Watchlist
                    watchlist={watchlist}
                    onRemove={(id) =>
                      setWatchlist(watchlist.filter((m) => m.imdbID !== id))
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-content">
            <span className="footer-dot"></span>
            <p className="footer-text">
              Powered by OMDb API • Built with React & TypeScript
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


