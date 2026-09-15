# Michael Dallman — personal site

Live at https://computedocean.github.io/Website/

A single static page: `index.html`, `css/site.css`, `js/site.js`. No build step.
Pushes to `main` deploy through the Azure Static Web Apps workflow in `.github/workflows/`.

## Visitor counter

The hero panel can show a visitor count from the Azure Function built for the
Azure Resume Challenge. Put the function's URL in the `data-api` attribute of the
`.visits` element in `index.html`; the endpoint should return JSON like
`{"count": 1234}`. When the attribute is empty the line stays hidden.

## To do

- Replace the `#` LinkedIn links in `index.html` (two `TODO` comments) with the profile URL.
