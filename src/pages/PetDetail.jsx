import { useParams, Link } from "react-router-dom";
import pets from "../data/pets.json";
import FavouriteButton from "../components/FavouriteButton";
import PetBadges from "../components/PetBadges";
import usePageTitle from "../hooks/usePageTitle";

export default function PetDetail() {
  const { id } = useParams();
  const pet = pets.find(p => p.id === Number(id));
  usePageTitle(pet ? pet.name : "Pet not found");

  if (!pet) return <p>Pet not found. <Link to="/pets">Back to all pets</Link></p>;

  return (
    <article className="pet-detail">
      <div className="pet-card-media">
        <img
          src={pet.image}
          alt={pet.name}
          onError={e => {
            if (!e.currentTarget.src.endsWith("placeholder.svg")) {
              e.currentTarget.src = "/images/placeholder.svg";
            }
          }}
        />
        <FavouriteButton pet={pet} />
      </div>
      <h1>{pet.name}</h1>
      <p>{pet.species} · {pet.age} yrs · {pet.breed}</p>
      <PetBadges pet={pet} />
      <p>{pet.description}</p>
      <Link className="btn btn-primary" to={`/adopt/${pet.id}`}>Adopt {pet.name}</Link>
    </article>
  );
}
