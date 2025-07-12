# Odoo Hackathon 2025 Frontend

This is the React frontend for the Odoo Hackathon 2025 project, built with Vite and TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` and will proxy API requests to the Django backend at `https://588085211e2e.ngrok-free.app`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check

## API Configuration

The frontend is configured to communicate with the Django backend. All API requests are proxied through Vite's development server to avoid CORS issues.

The API base URL is set to: `https://588085211e2e.ngrok-free.app`

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- React Router (Wouter)
- React Query
- Zustand for state management 