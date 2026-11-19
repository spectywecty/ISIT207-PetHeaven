import usePageTitle from "../hooks/usePageTitle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useForm from "../hooks/useForm";
import FormField from "../components/FormField";
import { check, compact, required, email } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

const validate = v => compact({
  email: check(v.email, x => required(x, "Email"), email),
});

export default function Login() {
  usePageTitle("Log in");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/pets";

  const { status, handleSubmit, field } = useForm({ email: "" }, validate, values => {
    if (!login(values.email)) throw new Error("Not a member");
    navigate(from, { replace: true });
  });

  return (
    <>
      <h1>Member Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <FormField label="Email" type="email" {...field("email")} />
        <button type="submit">Log in</button>
        {status === "error" && (
          <p className="error">
            We couldn't find that email. <Link to="/register">Register here</Link>.
          </p>
        )}
      </form>
    </>
  );
}
