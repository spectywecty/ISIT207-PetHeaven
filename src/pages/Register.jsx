import useForm from "../hooks/useForm";
import FormField from "../components/FormField";
import { check, compact, required, email, phone } from "../utils/validators";
import { sendToAdmin } from "../services/emailService";
import { useAuth } from "../context/AuthContext";

const initial = { fullName: "", email: "", phone: "", reason: "" };

const validate = v => compact({
  fullName: check(v.fullName, x => required(x, "Full name")),
  email: check(v.email, x => required(x, "Email"), email),
  phone: check(v.phone, x => required(x, "Phone"), phone),
});

export default function Register() {
  const { register } = useAuth();

  const { status, handleSubmit, field } = useForm(initial, validate, async values => {
    await sendToAdmin({
      formType: "Member registration",
      subject: `New member: ${values.fullName}`,
      replyTo: values.email,
      values,
    });
    register(values); // only runs if the email succeeded
  });

  return (
    <>
      <h1>Become a Supporter</h1>
      <form onSubmit={handleSubmit} noValidate>
        <FormField label="Full name" {...field("fullName")} />
        <FormField label="Email" type="email" {...field("email")} />
        <FormField label="Phone" type="tel" {...field("phone")} />
        <FormField label="Why do you want to join? (optional)" as="textarea" {...field("reason")} />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Register"}
        </button>
        {status === "success" && <p className="success">Thank you! We'll be in touch.</p>}
        {status === "error" && <p className="error">Something went wrong. Please try again.</p>}
      </form>
    </>
  );
}
