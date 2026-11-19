export default function FormField({
  label, name, as = "input", type = "text", options = [], error, ...rest
}) {
  const id = `field-${name}`;
  const common = {
    id,
    name,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    ...rest, // value, onChange, onBlur, placeholder, etc.
  };

  return (
    <div className={`form-field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>

      {as === "textarea" && <textarea rows="4" {...common} />}
      {as === "select" && (
        <select {...common}>
          <option value="">Select…</option>
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )}
      {as === "input" && <input type={type} {...common} />}

      {error && <span id={`${id}-error`} className="error" role="alert">{error}</span>}
    </div>
  );
}
