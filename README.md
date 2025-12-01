# Simple Site Builder

A modern, drag & drop page builder (micro‑CMS) built with React, TypeScript, Tailwind CSS and shadcn/ui.

## Features

- 🎨 **Drag & Drop editor** – block‑based canvas with reordering via drag & drop
- 🧱 **Rich set of blocks** – headings, text, images, buttons, containers, cards, lists, dividers, spacers, video and more
- 🧩 **Properties panel** – full control over content and styles (colors, typography, spacing, borders, shadows, alignment)
- 📄 **Page templates** – ready‑to‑use Landing, About, Contact and Blog templates + blank page
- 👁️ **Live preview** – separate preview route with desktop / tablet / mobile viewport switcher
- 💾 **Autosave** – pages are automatically saved to `localStorage` while you edit
- 📤 **Code export** – generate clean HTML and React (TSX) components for any page
- 💼 **Multi‑page support** – create, switch between and delete multiple pages
- 🎛️ **Containers & nested blocks** – build complex layouts inside container blocks
- 🌙 **Light / Dark theme** – global theme toggle in the editor header (uses `next-themes`)
- 🖥️ **Desktop‑only editor** – mobile / tablet users see a friendly “Desktop only” message, preview still works

## Tech Stack

- **Vite** – fast dev server and bundler
- **React 18 + TypeScript** – modern, type‑safe UI
- **React Router** – routing (`/`, `/editor`, `/preview/:slug`)
- **@tanstack/react-query** – data fetching layer (ready for future backend)
- **shadcn/ui + Radix UI** – accessible, composable UI primitives
- **Tailwind CSS** – utility‑first styling with CSS variables for theming
- **next-themes** – light/dark theme management

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Then open the app in your browser and go to `/editor`.

## How to Use the Editor

1. **Create a page**
   - Click **“New Page”** in the header
   - Choose a template (Landing / About / Contact / Blog / Blank)
   - Set **Page Title** and **URL Slug**

2. **Add blocks**
   - Use the **Blocks** panel on the left
   - Click a block type to add it to the canvas
   - Use container blocks to group other blocks and create columns/sections

3. **Edit content & styles**
   - Click a block on the canvas to select it
   - Use the **Properties** panel on the right to:
     - Change text, links, images, layout
     - Adjust alignment, spacing, font size/weight, colors, borders, shadows, etc.

4. **Reorder & duplicate**
   - Hover a block to reveal the toolbar (drag handle, duplicate, delete)
   - Drag via the handle to change order
   - Use the duplicate button to quickly clone a block

5. **Manage pages**
   - Open the **Pages** panel on the right
   - Click a page to load it into the editor
   - Use the trash icon to delete a page

6. **Preview & export**
   - Click **Preview** in the header to open `/preview/:slug`
   - Switch between **Desktop / Tablet / Mobile** viewports
   - Use **Export Code** to generate HTML or React code and download it as a file

## Project Structure

```bash
src/
  ├── components/
  │   ├── blocks/       # Individual block components (Heading, Text, Image, Button, Card, Container, etc.)
  │   ├── editor/       # Editor UI (header, canvas, blocks palette, pages list, properties panel, mobile guard)
  │   └── theme/        # Theme provider and theme toggle
  ├── contexts/         # Editor context (pages, blocks, selection, CRUD, import/export)
  ├── hooks/            # Custom hooks (e.g. mobile detection)
  ├── lib/              # Utilities and code generators (HTML / React)
  ├── pages/            # Application routes (Index, Editor, Preview, NotFound)
  ├── types/            # Shared TypeScript types for blocks and pages
  └── main.tsx          # App entry with ThemeProvider and Router
```

## License

MIT
