# Simple tasks todo app

## Setting up (with docker)

1. make sure you have docker installed
2. create a copy of `.env.example` to `.env`
3. start the apps with `docker compose up`
4. navigate to `http://localhost` or `http://127.0.0.1`

## Setting up (without docker)

1. make sure you have nodejs installed
2. create a copy of `apps/client/.env.example` to `apps/client/.env` and fill it
3. go to `apps/client` and type `npm install && npm run dev`
4. create a copy of `apps/server/.env.example` to `apps/server/.env` and fill it
5. go to `apps/server` and type `npm install && npm run build && npm run start`
6. navigate to `http://localhost:5173` or `http://127.0.0.1:5173` (default vite dev server port)
