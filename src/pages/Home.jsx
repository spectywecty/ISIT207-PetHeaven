import pets from "../data/pets.json";
import PetList from "../components/PetList";
import Button from "../components/Button";

const facilities = [
  { icon: "🏠", title: "Comfortable shelters", text: "Clean, air-conditioned kennels and cat rooms." },
  { icon: "🩺", title: "Veterinary care", text: "Every pet is health-checked, vaccinated and sterilised." },
  { icon: "🌳", title: "Play areas", text: "Outdoor run and indoor playroom for daily exercise." },
  { icon: "🤝", title: "Adoption counselling", text: "Our staff match pets to the right homes." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Every pet deserves a loving home</h1>
        <p>
          Pet Heaven is a charity society caring for abandoned cats and dogs
          until they find a family who will love them.
        </p>
        <div className="hero-actions">
          <Button to="/pets">Meet our pets</Button>
          <Button to="/register" variant="secondary">Become a supporter</Button>
        </div>
      </section>

      <section>
        <h2>About us</h2>
        <p>
          We take in pets whose owners can no longer keep them, care for them,
          and carefully interview every adopter to find a suitable home.
        </p>
      </section>

      <section>
        <h2>Our facilities</h2>
        <div className="feature-grid">
          {facilities.map(f => (
            <div key={f.title} className="feature">
              <span className="feature-icon" aria-hidden="true">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>How it works</h2>
        <ol className="steps">
          <li><strong>Browse</strong> the pets waiting for a home.</li>
          <li><strong>Join</strong> as a member and submit an adoption request.</li>
          <li><strong>Interview:</strong> our staff will contact you to find the best match.</li>
        </ol>
        <p>Need to give up a pet? <Button to="/release" variant="secondary">Release a pet</Button></p>
      </section>

      <section>
        <h2>Pets waiting for you</h2>
        <PetList pets={pets.slice(0, 3)} />
        <Button to="/pets" variant="secondary">See all pets</Button>
      </section>
    </>
  );
}
