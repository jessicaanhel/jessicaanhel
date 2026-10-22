import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// Every folder in projects/ with an index.html is its own page (plain HTML, CSS and JS,
// styled like that project). New project folders are picked up without touching this file.
const projectsDir = path.resolve(import.meta.dirname, 'projects')
const projectPages = Object.fromEntries(
  fs
    .readdirSync(projectsDir)
    .filter((name) => fs.existsSync(path.join(projectsDir, name, 'index.html')))
    .map((name) => [name, path.join(projectsDir, name, 'index.html')]),
)

export default defineConfig({
  // Relative paths, so the built site works under https://jessicaanhel.github.io/jessicaanhel/ and on any domain
  base: './',
  plugins: [react(), tailwindcss()],
  // host: true also serves the site on this computer's Wi-Fi address, for checking it on a phone
  server: { port: 5174, host: true },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        ...projectPages,
      },
    },
  },
})
