# Pet Heaven

React + Vite single-page app for the Pet Heaven charity society.

## Run locally
```bash
npm install
cp .env.example .env   # then fill in your EmailJS values
npm run dev
```

## EmailJS template
Set "To email" to the administrator's address. Use `{{subject}}` as the subject and
`{{form_type}}`, `{{reply_to}}` and `{{message}}` in the body.

## Deploy to Netlify
- **Git route:** push to GitHub, then Netlify > Add new site > Import an existing project.
  Build settings are read from `netlify.toml` (`npm run build`, publish `dist`).
  Add the three `VITE_EMAILJS_*` variables under Site configuration > Environment variables.
- **Drag and drop:** run `npm run build` locally (uses your `.env`), then drag `dist/` onto app.netlify.com/drop.
- `public/_redirects` makes deep links like `/pets` work on refresh.

## Notes
- Pet photos: replace `/images/placeholder.svg` in `src/data/pets.json` with your own files in `public/images/`.
- Membership is simulated with `localStorage` (assumption: no real authentication).
