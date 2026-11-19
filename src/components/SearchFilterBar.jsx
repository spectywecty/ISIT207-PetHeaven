export default function SearchFilterBar({ filters, onChange, onReset }) {
  const { q, species, gender, size, sort, favs } = filters;

  return (
    <div className="filter-bar" role="search">
      <input
        type="search"
        placeholder="Search by name or breed…"
        value={q}
        onChange={e => onChange("q", e.target.value)}
        aria-label="Search pets"
      />
      <select value={species} onChange={e => onChange("species", e.target.value)} aria-label="Filter by species">
        <option value="all">All species</option>
        <option value="cat">Cats</option>
        <option value="dog">Dogs</option>
      </select>
      <select value={gender} onChange={e => onChange("gender", e.target.value)} aria-label="Filter by gender">
        <option value="all">Any gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select value={size} onChange={e => onChange("size", e.target.value)} aria-label="Filter by size">
        <option value="all">Any size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <select value={sort} onChange={e => onChange("sort", e.target.value)} aria-label="Sort pets">
        <option value="name">Name (A–Z)</option>
        <option value="age-asc">Youngest first</option>
        <option value="age-desc">Oldest first</option>
      </select>
      <label className="check">
        <input type="checkbox" checked={favs} onChange={e => onChange("favs", e.target.checked)} />
        Favourites only
      </label>
      <button type="button" className="link-btn" onClick={onReset}>Clear filters</button>
    </div>
  );
}
