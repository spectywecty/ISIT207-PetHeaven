import { Link } from "react-router-dom";

export default function PetCard({ pet }) {
  return (
    <article className="pet-card">
      <img src={pet.image} alt={pet.name} />
      <h3>{pet.name}</h3>
      <p>{pet.species} · {pet.age} yrs · {pet.breed}</p>
      <Link to={`/pets/${pet.id}`}>View details</Link>
    </article>
  );
}
