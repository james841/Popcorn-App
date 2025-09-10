import "../styles/SearchBox.css";

interface Props {
  query: string;
  setQuery: (q: string) => void;
}

export default function SearchBox({ query, setQuery }: Props) {
  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Search movies..."
        className="search-input"
      />
    </div>
  );
}
