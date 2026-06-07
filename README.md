# TaskFlow — MERN Task Management App

A production-ready, full-stack task management application built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js). Users can register, log in, and manage their personal tasks with secure JWT authentication, protected routes, search/filter/pagination, and a responsive UI with dark mode.

## Features

- **Authentication** — Register / Login with JWT, password hashing (bcrypt), protected routes
- **Task management** — Create, read, update, delete tasks; mark Complete / Pending
- **Dashboard** — Welcome banner, statistics cards (Total / Pending / Completed)
- **Search & filter** — Search by title/description, filter by status
- **Pagination** — 10 tasks per page with Previous / Next controls
- **UX** — Toast notifications, loading spinners, empty states, dark mode, fully responsive
- **Security** — bcrypt hashing, JWT auth, input validation (express-validator + react-hook-form), centralized error middleware, environment variables

## Tech Stack

| Layer    | Technologies |
| -------- | ------------ |
| Frontend | React 18, React Router DOM, Axios, Context API, Tailwind CSS, React Hook Form, react-hot-toast, Vite |
| Backend  | Node.js, Express.js, JWT, bcryptjs, express-validator |
| Database | MongoDB (Atlas) with Mongoose |

## Project Structure

```
task-manager-mern/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route handlers (auth, tasks)
│   ├── middleware/       # auth, validation, error handling
│   ├── models/           # Mongoose schemas (User, Task)
│   ├── routes/           # Express routers
│   ├── utils/            # JWT + async helpers
│   ├── server.js         # App entry point
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/        # Login, Register, Dashboard, NotFound
│   │   ├── components/   # TaskCard, TaskFormModal, Navbar, etc.
│   │   ├── context/      # AuthContext, ThemeContext
│   │   ├── services/     # Axios API layer
│   │   ├── hooks/        # useDebounce
│   │   ├── layouts/      # MainLayout
│   │   └── App.jsx
│   └── .env.example
├── render.yaml           # Backend deploy (Render)
└── README.md
```

## Getting Started (Local)

### Prerequisites

- Node.js 18+ and npm
- A MongoDB database — either a local instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Backend

```bash
cd backend
cp .env.example .env        # then edit values (see below)
npm install
npm run dev                 # starts on http://localhost:5000
```

`.env` values:

| Variable        | Description                                              |
| --------------- | -------------------------------------------------------- |
| `PORT`          | Server port (default `5000`)                             |
| `NODE_ENV`      | `development` or `production`                            |
| `MONGO_URI`     | MongoDB connection string (Atlas or local)              |
| `JWT_SECRET`    | Long random secret for signing tokens                   |
| `JWT_EXPIRES_IN`| Token lifetime, e.g. `7d`                               |
| `CLIENT_URL`    | Allowed frontend origin(s), comma-separated, for CORS    |

### 2. Frontend

```bash
cd frontend
cp .env.example .env        # VITE_API_URL defaults to /api (proxied to :5000)
npm install
npm run dev                 # starts on http://localhost:5173
```

The Vite dev server proxies `/api` to `http://localhost:5000`, so no extra config is needed locally.

## MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user and allow your IP (or `0.0.0.0/0` for testing).
3. Copy the connection string and set it as `MONGO_URI` in `backend/.env`, e.g.
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/taskmanager`.

## API Reference

Base URL: `/api`

### Auth

| Method | Endpoint          | Access  | Body |
| ------ | ----------------- | ------- | ---- |
| POST   | `/auth/register`  | Public  | `{ name, email, password }` |
| POST   | `/auth/login`     | Public  | `{ email, password }` |
| GET    | `/auth/profile`   | Private | — |

### Tasks (all private — require `Authorization: Bearer <token>`)

| Method | Endpoint            | Description |
| ------ | ------------------- | ----------- |
| GET    | `/tasks`            | List tasks. Query: `search`, `status`, `page`, `limit`. Returns tasks, pagination and stats. |
| GET    | `/tasks/:id`        | Get one task |
| POST   | `/tasks`            | Create a task `{ title, description, status? }` |
| PUT    | `/tasks/:id`        | Update a task |
| PATCH  | `/tasks/:id/status` | Toggle status, or set with `{ status }` |
| DELETE | `/tasks/:id`        | Delete a task |

## Deployment

### Database → MongoDB Atlas
Provision a cluster and grab the `MONGO_URI` (see above).

### Backend → Render
This repo includes [`render.yaml`](./render.yaml). On [Render](https://render.com):

1. New → Blueprint → connect this repo.
2. Set the `MONGO_URI` and `CLIENT_URL` (your Vercel URL) env vars. `JWT_SECRET` is auto-generated.
3. Deploy. The service exposes a health check at `/api/health`.

### Frontend → Vercel
This repo includes [`frontend/vercel.json`](./frontend/vercel.json). On [Vercel](https://vercel.com):

1. Import the repo and set the **Root Directory** to `frontend`.
2. Add env var `VITE_API_URL=https://<your-render-app>.onrender.com/api`.
3. Deploy.

> After both are live, set the backend's `CLIENT_URL` to your Vercel domain so CORS allows the frontend.

## Scripts

| Location  | Command         | Description |
| --------- | --------------- | ----------- |
| backend   | `npm run dev`   | Start API with nodemon |
| backend   | `npm start`     | Start API |
| backend   | `npm run lint`  | Lint backend |
| frontend  | `npm run dev`   | Start Vite dev server |
| frontend  | `npm run build` | Production build |
| frontend  | `npm run lint`  | Lint frontend |

## License

MIT
