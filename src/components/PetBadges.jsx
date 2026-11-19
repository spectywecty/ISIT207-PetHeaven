export default function PetBadges({ pet }) {
  return (
    <div className="badges">
      <span>{pet.gender}</span>
      <span>{pet.size}</span>
      {pet.sterilised && <span>Sterilised</span>}
      {pet.vaccinated && <span>Vaccinated</span>}
    </div>
  );
}
