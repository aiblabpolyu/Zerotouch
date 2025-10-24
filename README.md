# ZeroTouch - AI-Powered Customer Service Platform

A three‑panel "Problem — AI — Solution" collaboration workspace tailored for retail customer support. It translates raw customer intent into professional, actionable requirements and generates solution options and follow‑ups to reach alignment faster and move decisions forward.

## Features

- Three‑panel workflow: Problem, AI Hub, Solution
- Multi‑scenario presets: Retail / Enterprise / Education
- Local development proxy to Alibaba Cloud DashScope (OpenAI Chat Completions compatible) at `/api/dashscope`
- Production uses `Express` to serve static assets and proxy (see `server.js`)

## Quick Start

Prerequisites: Node >= 18, npm >= 8.

1) Install dependencies

```bash
npm install
```

2) Configure API key (do NOT hard‑code)

- Create a `.env` file (or export in shell) with your key:

```bash
# macOS/Linux (temporary for current shell)
export DASHSCOPE_API_KEY="sk-***your_key***"

# Or create .env in project root (if you use dotenv tooling)
DASHSCOPE_API_KEY=sk-***your_key***
```

- Dev server: Vite proxy injects the `Authorization` header from `DASHSCOPE_API_KEY` automatically.
- Production: `server.js` proxy injects `Authorization` from process env. Set the variable on your hosting platform.

3) Start the development server (Vite)

```bash
npm run dev
# defaults to http://localhost:3000
```

## Build & Run (Production)

```bash
npm run build
npm start
# Express starts on $PORT (default 8080), serving dist/ and the /api/dashscope proxy
```

## How to Use

1) Enter the raw request in the Problem panel and send
2) Review the AI Hub’s need translation, solution suggestions, and intelligent follow‑ups
3) Draft and refine the outward reply in the Solution panel; optionally send it back to the Problem panel

## Environment Variables

- `DASHSCOPE_API_KEY`: DashScope API key (recommended to inject via platform env in deployments)
- `PORT`: Server port when using `server.js` in production (default 8080)

Security note: The client no longer sends a hard‑coded key. Both dev and prod proxies attach the key from environment. Never commit secrets to the repository.

## Tech Stack

- React 18 + Vite 4 + Tailwind CSS
- Express (production static hosting and proxy)
- http-proxy-middleware (DashScope proxy)
