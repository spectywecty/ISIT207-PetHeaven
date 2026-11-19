import { useFavourites } from "../context/FavouritesContext";

export default function FavouriteButton({ pet }) {
  const { isFav, toggle } = useFavourites();
  const active = isFav(pet.id);

  return (
    <button
      type="button"
      className={`fav-btn${active ? " active" : ""}`}
      aria-pressed={active}
      aria-label={active ? `Remove ${pet.name} from favourites` : `Add ${pet.name} to favourites`}
      onClick={() => toggle(pet.id)}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
