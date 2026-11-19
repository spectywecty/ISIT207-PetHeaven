import { useSearchParams } from "react-router-dom";
import pets from "../data/pets.json";
import PetList from "../components/PetList";
import SearchFilterBar from "../components/SearchFilterBar";
import { useFavourites } from "../context/FavouritesContext";
import usePageTitle from "../hooks/usePageTitle";

const DEFAULTS = { q: "", species: "all", gender: "all", size: "all", sort: "name", favs: "" };

export default function Pets() {
  usePageTitle("Pets for adoption");
  const [params, setParams] = useSearchParams();
  const { isFav } = useFavourites();

  // Filters live in the URL, so filtered views can be shared and the back button works
  const filters = {
    q: params.get("q") ?? "",
    species: params.get("species") ?? "all",
    gender: params.get("gender") ?? "all",
    size: params.get("size") ?? "all",
    sort: params.get("sort") ?? "name",
    favs: params.get("favs") === "1",
  };

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    const v = key === "favs" ? (value ? "1" : "") : value;
    if (!v || v === DEFAULTS[key]) next.delete(key);
    else next.set(key, v);
    setParams(next, { replace: true });
  };

  const q = filters.q.trim().toLowerCase();
  const visible = pets
    .filter(p =>
      (filters.species === "all" || p.species === filters.species) &&
      (filters.gender === "all" || p.gender === filters.gender) &&
      (filters.size === "all" || p.size === filters.size) &&
      (!filters.favs || isFav(p.id)) &&
      (p.name.toLowerCase().includes(q) || p.breed.toLowerCase().includes(q))
    )
    .sort((a, b) =>
      filters.sort === "age-asc" ? a.age - b.age :
      filters.sort === "age-desc" ? b.age - a.age :
      a.name.localeCompare(b.name)
    );

  return (
    <>
      <h1>Pets Available for Adoption</h1>
      <SearchFilterBar filters={filters} onChange={update} onReset={() => setParams({}, { replace: true })} />
      <p className="result-count" aria-live="polite">
        {`${visible.length} ${visible.length === 1 ? "pet" : "pets"} found`}
      </p>
      <PetList pets={visible} />
    </>
  );
}
