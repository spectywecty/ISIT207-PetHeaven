import { useState, useMemo } from "react";
import pets from "../data/pets.json";
import PetList from "../components/PetList";
import SearchFilterBar from "../components/SearchFilterBar";

export default function Pets() {
  const [query, setQuery] = useState("");
  const [species, setSpecies] = useState("all");
  const [sort, setSort] = useState("name");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pets
      .filter(p =>
        (species === "all" || p.species === species) &&
        (p.name.toLowerCase().includes(q) || p.breed.toLowerCase().includes(q))
      )
      .sort((a, b) =>
        sort === "age-asc" ? a.age - b.age :
        sort === "age-desc" ? b.age - a.age :
        a.name.localeCompare(b.name)
      );
  }, [query, species, sort]);

  return (
    <>
      <h1>Pets Available for Adoption</h1>
      <SearchFilterBar
        query={query} onQuery={setQuery}
        species={species} onSpecies={setSpecies}
        sort={sort} onSort={setSort}
      />
      <p className="result-count">{visible.length} pet{visible.length !== 1 && "s"} found</p>
      <PetList pets={visible} />
    </>
  );
}
