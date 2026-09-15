# Michael Dallman — personal site

Live at https://computedocean.github.io/Website/

A single static page: `index.html`, `css/site.css`, `js/site.js`. No build step.
GitHub Pages redeploys it on every push to `main`.

## Visitor counter

The hero panel shows a running visit total from [GoatCounter](https://www.goatcounter.com/)
(free for personal sites, no cookies).

1. Create a GoatCounter site and note its code — the part before `.goatcounter.com`.
2. In the GoatCounter settings, turn on **Allow adding visitor counts to your site**.
3. In `index.html`, set `data-goatcounter="<code>"` on the `.visits` element.

While the attribute is empty nothing is loaded and the line stays hidden.
