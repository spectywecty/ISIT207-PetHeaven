# ISIT207 Assignment 3

Single-page application made using React + Vite for the Pet Heaven charity society.

## Running the app locally
```bash
npm install
cp .env.example .env  # then fill in your EmailJS values
npm run dev
```

Uses EmailJS as a way to send new users their details via email.

## Testing the app
```bash
npm test  # run once
npm run test:watch
```

Integration tests (Vitest + React Testing Library) cover browsing/filters, favourites,
protected routes, login and the forms. The email service is mocked so no real emails are sent.
