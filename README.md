# QuickHire

**Live Demo:** [https://quick-hire-dun-three.vercel.app](https://quick-hire-dun-three.vercel.app)

**Admin Credentials:**
- **Email:** `quickhireadmin@gmail.com`
- **Password:** `adminadmin123`

A full-stack job-board application built with **Next.js**, **Node/Express**, and **MongoDB**.

---

## Project Structure

```
QuickHire/
├── src/
│   ├── app/
│   │   ├── api/            # Next.js Serverless API routes
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
│       ├── models/         # Mongoose models (User, Job, Application)
│       ├── db.js           # Database connection file
│       └── serverAuth.js   # JWT authentication utilities
└── .env                    # Application environment variables
```

---

## Prerequisites

- Node.js >= 18
- MongoDB running locally on port **27017** (or use MongoDB Atlas)
- npm / yarn

---

## Getting Started

### Setup Instructions

```bash
git clone https://github.com/omarabir/QuickHire-Simple-Job-Board-Application
cd QuickHire
npm install
npm run dev
```

#### Environment Variables (.env)

Create a `.env` file in the root of your project:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/quickhire
JWT_SECRET=super_secret_string
JWT_EXPIRES=7d
NEXT_PUBLIC_API_URL=http://localhost:3000/api
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

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
