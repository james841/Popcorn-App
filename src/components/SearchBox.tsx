interface Props {
  query: string;
  setQuery: (q: string) => void;
}

export default function SearchBox({ query, setQuery }: Props) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search movies..."
      className="border rounded p-2 w-full"
    />
  );
}

