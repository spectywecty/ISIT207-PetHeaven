import { Link } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import PetBadges from "./PetBadges";

export default function PetCard({ pet }) {
  return (
    <article className="pet-card">
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
      <h3>{pet.name}</h3>
      <p>{pet.species} · {pet.age} yrs · {pet.breed}</p>
      <PetBadges pet={pet} />
      <Link to={`/pets/${pet.id}`}>View details</Link>
    </article>
  );
}
