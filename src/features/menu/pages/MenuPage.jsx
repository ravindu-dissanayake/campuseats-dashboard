import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  // frontend: read the API base URL from the environment
  const API = import.meta.env.VITE_API_URL;
  // use it for requests, fallback to /menu.json if not configured
  const { data: dishes, isLoading, error } = useFetch(API ? `${API}/api/menu` : "/menu.json");

  if (isLoading) return <p>Loading menu...</p>;
  if (error) return <p>Could not load menu: {error}</p>;

  const filtered = (dishes || []).filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search dishes..."
      />
      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;