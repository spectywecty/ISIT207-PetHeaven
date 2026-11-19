import { useState } from "react";

export default function useForm(initialValues, validate, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

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
    } catch (err) {
      console.error(err);
      setStatus("error");
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
