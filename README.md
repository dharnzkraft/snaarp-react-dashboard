# Snaarp Dashboard

A drag-and-drop analytics dashboard built with React, replicating the Snaarp dashboard design.

# Tech Stacks

- **React 18** + **Vite** — fast dev/build tooling
- **@hello-pangea/dnd** — drag and drop (actively maintained fork of react-beautiful-dnd)
- **Tailwind CSS** — utility-first styling
- **Recharts** — composable charting library
- **Lucide React** — icon library

##  Getting Started

### Prerequisites
- Node.js >= 18

### Installation

```bash
# Clone the repo
git clone https://github.com/dharnzkraft/snaarp-react-dashboard.git
cd snaarp-react-dashboard

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

##  Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx           — Left navigation sidebar
│   ├── Topbar.jsx            — Top search/notification bar
│   ├── DashboardGrid.jsx     — DnD context + widget ordering
│   └── widgets/
├── App.jsx
├── main.jsx
└── index.css
```

##  Drag & Drop Implementation

Drag-and-drop is powered by `@hello-pangea/dnd`:

- **`DragDropContext`** wraps the whole dashboard and handles the `onDragEnd` callback
- **`Droppable`** defines the grid zone where widgets can be dropped
- **`Draggable`** wraps each widget — drag handles are passed down as props
- Widget order is stored in React state as an array of IDs; `onDragEnd` reorders it with `splice`

##  Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

## Challenges & Notes

- `react-beautiful-dnd` is deprecated for React 18+ strict mode, so `@hello-pangea/dnd` was used instead — it's API-compatible and actively maintained.
- Drag handles are forwarded as props from `DashboardGrid` into each widget, allowing the grip icon to be the handle without the whole card acting as a handle.
- Two-column widget groups (File Sharing + Active Users, App + Web Activity) are treated as a single draggable unit to maintain visual layout integrity.