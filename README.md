# Placeauto by Ashiwin

_This is part of my 2026 GitHub tech refresh._

A single-page application that lets you search for any place in the world, drop a pin on an interactive map, and keep track of your search history.

## Features

- Google Places Autocomplete search using Places API (v2)
- Interactive Google Map with animated drop marker
- Search history panel with focus, remove, and clear actions
- History persisted to localStorage across page refreshes
- Fully responsive layout for desktop and mobile

## Tech Stack

- Framework: Next.js 16 (App Router, Turbopack)
- Language: TypeScript
- State management: Redux Toolkit
- Side effects: RTK Listener Middleware
- Maps and Places: Google Maps JavaScript API
- UI: Material UI v9

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- A Google Cloud project with the following APIs enabled:
    - Maps JavaScript API
    - Places API (New)

### Installation

```bash
git clone https://github.com/ashiwin/placeauto.git
cd placeauto
npm install
```

### Environment Variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and replace `your_google_maps_api_key_here` with your Google Maps API key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Running Locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Notes

This project was built as part of a technical assessment. The assignment originally specified Redux-Observable Epics as the side effects layer. RTK Listener Middleware was used instead as it is the officially maintained modern replacement. Do take note that `redux-observable` does not support React 19 or Redux 5 and is no longer actively maintained.

Thank you.

_Prepared by Ashiwin Kumar_
