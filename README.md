# uniLibrary Management System

A high-performance, centralized library management solution designed for academic institutions. This platform streamlines book inventory management, member circulation, and automated notification workflows through a modern, serverless architecture.

---

## Technical Architecture

The system is built on a modern stack prioritized for type safety, scalability, and developer experience.

### Core Frameworks

- **Frontend:** Next.js 16 (App Router) with React Server Components.
- **Styling:** Tailwind CSS for utility-first styling.
- **Component Library:** shadcn/ui (Radix UI primitives).
- **Form Management:** React Hook Form with Zod schema validation.

### Data & Infrastructure

- **Database:** PostgreSQL hosted on Neon (Serverless).
- **ORM:** Drizzle ORM for type-safe database operations and migrations.
- **Caching & Rate Limiting:** Upstash Redis.
- **Media Management:** ImageKit for optimized image and video hosting/transformations.
- **Automated Workflows:** Upstash Workflow for scheduling SMS and Email reminders.

---

## Core Functionalities

### Admin Intelligence Dashboard

A comprehensive monitoring suite for library administrators to oversee the ecosystem in real-time.

- **Inventory Tracking:** Real-time visibility of total vs. available book copies.
- **Member Management:** Administrative approval pipeline for new user registrations.
- **Circulation Monitoring:** Oversight of active, overdue, and returned book records.

### Advanced Borrowing Engine

A robust logic layer that manages the lifecycle of a book loan.

- **Eligibility Validation:** Automated checks for user status (Pending/Approved) and book availability before processing loans.
- **Inventory Synchronization:** Atomic updates to database records to ensure consistency in stock levels during peak usage.

### Automated Reminder Pipeline

Inspired by gamified retention systems, the platform utilizes Upstash Workflows to handle time-sensitive communication.

- **Scheduled Notifications:** Automated triggers for email and SMS reminders.
- **Due Date Alerts:** Proactive messaging to reduce overdue returns, ensuring higher inventory turnover.

### Performance & Security

- **API Rate Limiting:** Redis-backed rate limiting to protect authentication and borrowing endpoints from abuse.
- **Input Sanitization:** Strict end-to-end type safety using Zod for all client-side forms and server-side actions.

---

## System Infrastructure Diagram

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- A Neon PostgreSQL instance
- Upstash Account (Redis and Workflow)
- ImageKit Account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/unilibrary-system.git
cd unilibrary-system

```

2. Install dependencies:

```bash
npm install

```

3. Configure environment variables:
   Create a `.env.local` file in the root directory and populate it with the following:

```env
DATABASE_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
UPSTASH_WORKFLOW_URL=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

```

4. Synchronize the database schema:

```bash
npx drizzle-kit push

```

5. Run the development server:

```bash
npm run dev

```

---

## Database Schema Design

The database is structured to maintain referential integrity between users, books, and borrowing records.

---

## Contribution Guidelines

For internal development, please ensure all new features are accompanied by Zod schemas for validation and Drizzle migrations for any schema changes. Code style must adhere to the project's ESLint configuration.

---

## License

Copyright © 2025 uniLibrary System. All rights reserved. Professional use only.

---
