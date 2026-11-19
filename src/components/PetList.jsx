import PetCard from "./PetCard";

export default function PetList({ pets }) {
  if (pets.length === 0) {
    return <p className="empty">No pets match your search. Try changing the filters.</p>;
  }
  return (
    <div className="pet-grid">
      {pets.map(p => <PetCard key={p.id} pet={p} />)}
    </div>
  );
}
