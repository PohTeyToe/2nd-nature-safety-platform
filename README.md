# 2nd Nature Safety Digital Platform

A demo web application built for the Riipen Labs Growth Strategy Project (Team 162, March 2026 cohort). This platform serves as a digital toolkit for **2nd Nature Safety**, an Ottawa-based health and safety training company.

## Features

### 1. Partnership Outreach CRM (`/partnerships`)
- Track 18 target associations across Construction, Industrial, Union, Government, and Business sectors
- Filter by category, status, and search terms
- Sort by priority, fit score, name, or status
- Edit outreach status and add notes inline
- Top 5 priority targets highlighted with star indicators
- Fit score ratings (1-5 stars) for each association

### 2. Certification Tracker (`/certifications`)
- Add employees with role-based certification templates
- 7 position templates: Construction Worker, Electrician, Forklift Operator, General Labourer, Supervisor, Warehouse Worker, Factory Worker
- Color-coded status indicators (Valid / Expiring Soon / Expired / Not Started)
- Dashboard showing compliance percentage, expiring, and expired counts
- Edit certification dates and statuses per employee

### 3. Training Landing Page (`/landing`)
- Demo of a modern customer acquisition website for 2ndnaturesafety.ca
- Course catalog with 8 courses, delivery methods, and durations
- COJG funding banner (Canada-Ontario Job Grant)
- Services overview, testimonials, and contact form
- Fully responsive design

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **localStorage** for data persistence (no backend required)

## Getting Started

```bash
# Install dependencies
cd app
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

This app is ready to deploy on Vercel with zero configuration:

```bash
vercel --prod
```

Or connect the GitHub repository to Vercel for automatic deployments.

## Data

All data is stored in the browser's localStorage and pre-seeded on first visit. To reset the data, clear localStorage in your browser's developer tools.

## Project Structure

```
src/
  app/
    page.tsx              # Home dashboard
    layout.tsx            # Root layout with navbar
    globals.css           # Tailwind theme config
    partnerships/
      page.tsx            # Partnership CRM module
    certifications/
      page.tsx            # Certification tracking module
    landing/
      page.tsx            # Training landing page demo
  components/
    Navbar.tsx            # Navigation bar
  lib/
    data.ts               # Types, seed data, localStorage helpers
```
