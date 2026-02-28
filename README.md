# QuickHire

A full-stack job-board application built with **Next.js**, **Node/Express**, and **MongoDB**.

---

## Project Structure

```
QuickHire/
├── backend/                # Express REST API
│   ├── models/             # Mongoose models (Job, Application)
│   ├── routes/             # Route handlers (jobs, applications)
│   ├── middleware/         # Validation helpers
│   ├── server.js           # Entry point
│   ├── .env                # Environment variables (not committed)
│   └── package.json
│
├── src/
│   ├── app/
│   │   ├── jobs/           # Job listings page  (/jobs)
│   │   ├── jobs/[id]/      # Job detail + apply page  (/jobs/:id)
│   │   ├── admin/          # Admin dashboard  (/admin)
│   │   ├── login/          # Login page
│   │   └── signup/         # Sign-up page
│   ├── components/
│   │   ├── jobs/           # JobCard, JobSearch, JobFilter, ApplyForm, AdminJobForm
│   │   ├── authPage/       # login.jsx, signUp.jsx
│   │   └── ...             # Header, Hero, Footer, etc.
│   └── lib/
│       └── api.js          # Fetch helpers for all API calls
└── .env.local              # NEXT_PUBLIC_API_URL
```

---

## Prerequisites

- Node.js >= 18
- MongoDB running locally on port **27017** (or use MongoDB Atlas)
- npm / yarn

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/omarabir/QuickHire-Simple-Job-Board-Application
cd QuickHire
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env    # edit values if needed
npm install
npm run dev             # starts on http://localhost:5000
```

#### Backend environment variables (backend/.env)

| Variable   | Default                               | Description         |
|------------|---------------------------------------|---------------------|
| PORT       | 5000                                  | Express server port |
| MONGO_URI  | mongodb://127.0.0.1:27017/quickhire   | MongoDB connection  |
| CLIENT_URL | http://localhost:3000                 | CORS allowed origin |

### 3. Frontend setup

```bash
# from repo root
npm install
npm run dev             # starts on http://localhost:3000
```

#### Frontend environment variables (.env.local)

| Variable            | Default                     | Description          |
|---------------------|-----------------------------|----------------------|
| NEXT_PUBLIC_API_URL | http://localhost:5000/api   | Backend API base URL |

---

## API Reference

### Jobs

| Method | Endpoint        | Description                                                        |
|--------|-----------------|--------------------------------------------------------------------|
| GET    | /api/jobs       | List jobs (params: search, category, location, type, page, limit) |
| GET    | /api/jobs/:id   | Get single job                                                     |
| POST   | /api/jobs       | Create a job listing                                               |
| DELETE | /api/jobs/:id   | Delete a job listing                                               |

**POST /api/jobs body:**
```json
{
  "title": "Senior UI Designer",
  "company": "Acme Inc.",
  "location": "New York, NY",
  "category": "Design",
  "type": "Full-time",
  "description": "...",
  "requirements": "...",
  "salary": "$80k-$100k"
}
```

### Applications

| Method | Endpoint                       | Description                     |
|--------|--------------------------------|---------------------------------|
| POST   | /api/applications              | Submit a job application        |
| GET    | /api/applications              | List all applications (admin)   |
| GET    | /api/applications/job/:jobId   | Applications for a specific job |

**POST /api/applications body:**
```json
{
  "job": "<jobId>",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "resumeLink": "https://drive.google.com/...",
  "coverNote": "Optional cover note"
}
```

---

## Features

- **Job Listings** - search by keyword, filter by category / type / location, paginated grid
- **Job Detail** - full description, requirements, salary, inline apply form
- **Apply Form** - name, email, resume URL, cover note; client + server-side validation
- **Admin Dashboard** - post new jobs, delete listings, view all applications
- **Auth Pages** - Login and Sign Up with validation and loading states
- **Responsive** - mobile-first Tailwind CSS throughout
- **Landing Page** - hero, categories, featured jobs, latest jobs, CTA, footer

---

## Tech Stack

| Layer      | Tech                                    |
|------------|-----------------------------------------|
| Frontend   | Next.js 14, Tailwind CSS, lucide-react  |
| Backend    | Node.js, Express                        |
| Database   | MongoDB, Mongoose                       |
| Validation | Custom middleware + Mongoose validators |
