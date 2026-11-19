import { useState } from "react";
import { useToast } from "../context/ToastContext";

// messages (optional): { success: "...", error: "..." } shown as toasts
export default function useForm(initialValues, validate, onSubmit, messages = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const { showToast } = useToast();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setValues(v => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  };

  const handleBlur = e => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(values).map(k => [k, true])));
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      await onSubmit(values);
      setStatus("success");
      setValues(initialValues);
      setTouched({});
      if (messages.success) showToast(messages.success, "success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      if (messages.error) showToast(messages.error, "error");
    }
  };

  // Spread onto <FormField {...field("email")} />
  const field = name => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] ? errors[name] : "",
  });

  return { values, status, handleSubmit, field };
}
