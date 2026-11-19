import { useParams, Link } from "react-router-dom";
import pets from "../data/pets.json";

export default function PetDetail() {
  const { id } = useParams();
  const pet = pets.find(p => p.id === Number(id));

  if (!pet) return <p>Pet not found. <Link to="/pets">Back to all pets</Link></p>;

  return (
    <article className="pet-detail">
      <img src={pet.image} alt={pet.name} />
      <h1>{pet.name}</h1>
      <p>{pet.species} · {pet.age} yrs · {pet.breed}</p>
      <p>{pet.description}</p>
      <Link className="btn btn-primary" to={`/adopt/${pet.id}`}>Adopt {pet.name}</Link>
    </article>
  );
}
