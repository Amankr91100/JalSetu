# JalSetu

**Turning Flood Data into Faster Decisions**

An intelligent flood monitoring and decision-support platform prototype that combines satellite-based flood mapping, forecast-assisted risk analysis, exposure data, shelters, and evacuation routes.

> **Important:** This is a frontend decision-support **prototype** with **mock / demo data**. It is not connected to live satellite, weather, or routing APIs. Final emergency decisions must always be validated by authorised authorities.

## Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router v6
- MapLibre GL JS (interactive map + mock GeoJSON layers)
- Recharts (analytics charts)
- Lucide React (icons)

## Features

- Marketing / landing page with product narrative
- Emergency dashboard (overview stats, risk distribution, flood trend, alerts)
- Interactive flood map with layer toggles, legend, and info panel
- Risk analysis with forecast windows and exposure charts
- Shelter list with filters and capacity
- Evacuation route planning (mock routes: safe / risky / blocked)
- Alert centre with severity filters
- Report generation UI (preview + simulated PDF/CSV)
- Login / Register with client-side validation (mock auth)
- Fully responsive (mobile → large desktop), works at 320px width

## Getting started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
npm run preview
```

Open `http://localhost:5173`.

## Project structure

```
src/
  components/   # Reusable UI (StatCard, AlertCard, ShelterCard, Navbar, Sidebar…)
  pages/        # Route-level screens
  layouts/      # Dashboard shell
  data/         # Mock JSON / GeoJSON
  services/     # API-ready service layer (flood, alert, shelter, route, report)
  types/        # TypeScript interfaces
  utils/        # Helpers (format, cn)
  hooks/        # (ready for custom hooks)
  assets/
```

## Connecting real APIs

Service modules under `src/services/` are written to be swapped to real backends:

| Service        | Suggested backend                       |
| -------------- | --------------------------------------- |
| floodService   | FastAPI / GEE / Sentinel-1 processing   |
| alertService   | WebSocket or REST + Redis               |
| shelterService | PostgreSQL + PostGIS                    |
| routeService   | OSRM / GraphHopper with flood avoidance |
| reportService  | PDF/CSV generators (reportlab, etc.)    |

1. Copy `.env.example` → `.env`
2. Set `VITE_API_BASE_URL` to your API
3. Replace the mock `Promise.resolve(...)` bodies with `fetch` / client calls
4. Keep API keys **server-side** only

## Design notes

- Navy / flood-blue palette suitable for government & emergency-response use
- Glass-style cards, clear hierarchy, minimal animation
- All statistics labelled **Demo Data**
- Disclaimers on risk and reports pages

## License

Prototype for demonstration and further development.
