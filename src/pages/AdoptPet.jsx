import { useParams, Link } from "react-router-dom";
import pets from "../data/pets.json";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import FormField from "../components/FormField";
import { check, compact, required, minLength } from "../utils/validators";
import { sendToAdmin } from "../services/emailService";

const validate = v => compact({
  housing: check(v.housing, x => required(x, "Housing type")),
  otherPets: check(v.otherPets, x => required(x, "This answer")),
  experience: check(v.experience, x => required(x, "Experience"), minLength(10)),
});

export default function AdoptPet() {
  const { id } = useParams();
  const { member } = useAuth();
  const pet = pets.find(p => p.id === Number(id));

  const initial = {
    petId: pet?.id ?? "",
    petName: pet?.name ?? "",
    memberName: member.fullName,
    memberEmail: member.email,
    memberPhone: member.phone,
    housing: "",
    otherPets: "",
    experience: "",
  };

  const { status, handleSubmit, field } = useForm(initial, validate, values =>
    sendToAdmin({
      formType: "Adoption request",
      subject: `Adoption request for ${values.petName} (#${values.petId})`,
      replyTo: values.memberEmail,
      values,
    })
  );

  if (!pet) return <p>Pet not found. <Link to="/pets">Back to all pets</Link></p>;

  return (
    <>
      <h1>Adopt {pet.name}</h1>
      <p>Applying as <strong>{member.fullName}</strong> ({member.email})</p>

      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Type of housing"
          as="select"
          options={[
            { value: "hdb", label: "HDB flat" },
            { value: "condo", label: "Condominium" },
            { value: "landed", label: "Landed property" },
          ]}
          {...field("housing")}
        />
        <FormField
          label="Do you have other pets?"
          as="select"
          options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
          {...field("otherPets")}
        />
        <FormField
          label="Tell us about your experience with pets"
          as="textarea"
          {...field("experience")}
        />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Submit request"}
        </button>
        {status === "success" && (
          <p className="success">Request sent! Our staff will contact you for an interview.</p>
        )}
        {status === "error" && <p className="error">Something went wrong. Please try again.</p>}
      </form>
    </>
  );
}
