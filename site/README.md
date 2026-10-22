# Portfolio site

The site published at https://jessicaanhel.github.io/jessicaanhel/

```bash
npm install
npm run dev     # http://localhost:5174
npm run build   # static site in dist/
```

| What | Where |
|---|---|
| Main page | `src/App.tsx`, styles in `src/index.css` |
| Case studies (plain HTML, CSS, JS, each in the style of its project) | `projects/<name>/` |
| Screenshots of a project | `projects/<name>/assets/shots/` |
| Project list for the menu | `src/portfolioPages.ts` |

To add a project: make a folder `projects/<name>/` with an `index.html`, and add it to `src/portfolioPages.ts`.
`../.github/workflows/pages.yml` publishes the site on every push to `main`.
