export const required = (v, label = "This field") =>
  !String(v ?? "").trim() ? `${label} is required` : "";

export const email = v =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address";

export const phone = v =>
  /^[0-9+\-\s]{8,15}$/.test(v) ? "" : "Enter a valid phone number (8–15 digits)";

export const minLength = n => v =>
  String(v).length >= n ? "" : `Must be at least ${n} characters`;

// Run rules in order and return the first error message
export const check = (value, ...rules) => {
  for (const rule of rules) {
    const msg = rule(value);
    if (msg) return msg;
  }
  return "";
};

// Remove empty messages so only real errors remain
export const compact = errors =>
  Object.fromEntries(Object.entries(errors).filter(([, msg]) => msg));
