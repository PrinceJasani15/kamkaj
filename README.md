# KamKaj — Full-Stack SaaS Productivity Dashboard

KamKaj is a modern full-stack productivity and work-management application. It helps users manage their daily work, tasks, notes, calendar events, expenses, workflow boards, analytics, profile settings, notifications, and AI assistance from one dashboard.

## Features

* JWT-based user authentication
* User-specific dashboard data
* Task management with create, edit, delete, search, and completion status
* Notes management
* Workflow / Kanban board
* Calendar events management
* Expense and income tracking
* Analytics dashboard with charts
* Profile management with phone number and company details
* Settings, theme preferences, and notifications
* AI assistant interface
* Responsive dark mode and light mode UI

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Recharts
* Framer Motion

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* bcrypt
* REST APIs

## Project Structure

```text
Kamkaj/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── migrations/
│   ├── routes/
│   └── server.js
│
├── src/
│   ├── components/
│   ├── context/
│   ├── features/
│   ├── pages/
│   ├── routes/
│   └── services/
│
└── package.json
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/kamkaj.git
cd kamkaj
```

### 2. Install frontend dependencies

```bash
npm install
npm run dev
```

### 3. Install backend dependencies

```bash
cd Backend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the `Backend` folder:

```env
PORT=4000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

## Database

The application uses PostgreSQL. Database migration files are available in:

```text
Backend/migrations/
```

## Author

Built as a full-stack SaaS dashboard project for learning, portfolio, and interview demonstration.
