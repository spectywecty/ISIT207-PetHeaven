export default function SearchFilterBar({ query, onQuery, species, onSpecies, sort, onSort }) {
  return (
    <div className="filter-bar" role="search">
      <input
        type="search"
        placeholder="Search by name or breed…"
        value={query}
        onChange={e => onQuery(e.target.value)}
        aria-label="Search pets"
      />
      <select value={species} onChange={e => onSpecies(e.target.value)} aria-label="Filter by species">
        <option value="all">All pets</option>
        <option value="cat">Cats</option>
        <option value="dog">Dogs</option>
      </select>
      <select value={sort} onChange={e => onSort(e.target.value)} aria-label="Sort pets">
        <option value="name">Name (A–Z)</option>
        <option value="age-asc">Youngest first</option>
        <option value="age-desc">Oldest first</option>
      </select>
    </div>
  );
}
