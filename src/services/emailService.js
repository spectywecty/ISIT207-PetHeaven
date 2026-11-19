import emailjs from "@emailjs/browser";

const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Turns { name: "Amy", phone: "123" } into "name: Amy\nphone: 123"
const toMessage = values =>
  Object.entries(values).map(([k, v]) => `${k}: ${v}`).join("\n");

export function sendToAdmin({ formType, subject, replyTo, values }) {
  return emailjs.send(
    SERVICE,
    TEMPLATE,
    { form_type: formType, subject, reply_to: replyTo, message: toMessage(values) },
    { publicKey: KEY }
  );
}
