import useForm from "../hooks/useForm";
import FormField from "../components/FormField";
import { check, compact, required, email, phone, minLength } from "../utils/validators";
import { sendToAdmin } from "../services/emailService";

const initial = {
  ownerName: "", email: "", phone: "",
  species: "", petName: "", age: "", reason: "",
};

const validate = v => compact({
  ownerName: check(v.ownerName, x => required(x, "Your name")),
  email: check(v.email, x => required(x, "Email"), email),
  phone: check(v.phone, x => required(x, "Phone"), phone),
  species: check(v.species, x => required(x, "Species")),
  petName: check(v.petName, x => required(x, "Pet name")),
  reason: check(v.reason, x => required(x, "Reason"), minLength(10)),
});

export default function ReleasePet() {
  const { status, handleSubmit, field } = useForm(initial, validate, values =>
    sendToAdmin({
      formType: "Pet release request",
      subject: `Release request: ${values.petName} (${values.species})`,
      replyTo: values.email,
      values,
    })
  );

  return (
    <>
      <h1>Release a Pet</h1>
      <p>Can no longer keep your pet? Tell us about them and our staff will follow up.</p>
      <form onSubmit={handleSubmit} noValidate>
        <FormField label="Your name" {...field("ownerName")} />
        <FormField label="Email" type="email" {...field("email")} />
        <FormField label="Phone" type="tel" {...field("phone")} />
        <FormField
          label="Species"
          as="select"
          options={[{ value: "cat", label: "Cat" }, { value: "dog", label: "Dog" }]}
          {...field("species")}
        />
        <FormField label="Pet name" {...field("petName")} />
        <FormField label="Pet age in years (optional)" type="number" min="0" {...field("age")} />
        <FormField label="Why are you releasing this pet?" as="textarea" {...field("reason")} />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Submit request"}
        </button>
        {status === "success" && <p className="success">Request sent! Our staff will contact you soon.</p>}
        {status === "error" && <p className="error">Something went wrong. Please try again.</p>}
      </form>
    </>
  );
}
