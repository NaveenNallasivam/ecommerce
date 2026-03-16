flowchart TD
  Browser["User browser"]
  Index["index.html\n(root mount | /src/main.tsx referenced)"]
  Root["<div id=root> (React mount point)"]
  EntryScript["/src/main.tsx\n(ES module entry)"]
  Missing["(File not found in repo)"]
  App["React app bootstrap\n(Providers, Router, App component)"]
  Assets["src/assets\n(images, icons)"]
  Public["public\n(static files)"]
  NodeMods["node_modules\n(vite, react, react-dom, tailwind, etc.)"]
  DevCmd["npm run dev → vite dev server"]
  BuildCmd["npm run build → vite build → dist/"]
  External["External APIs\n(backend, payments, auth)"]

  Browser --> Index
  Index --> Root
  Index --> EntryScript
  EntryScript -->|not present in current tree| Missing
  EntryScript --> App
  App --> Assets
  App --> Public
  App --> External
  DevCmd --> Index
  BuildCmd --> Index
  NodeMods --> DevCmd
  NodeMods --> BuildCmd