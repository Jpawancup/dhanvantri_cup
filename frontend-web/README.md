This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## FRONTEND LOGIC SYSTEM (PHASE-1 FINAL)
### Overview
This layer simulates backend behavior using frontend logic.
Includes:
* Routing system
* Mock backend services
* State management (Zustand)
* UI interaction logic
* Form handling
* Modal systems

### Routing System
All navigation is handled using:
* Next.js router
* Central routes.ts file

**Fixes:**
* Logo → Home routing fixed
* All buttons connected
* No dead links

### Mock Backend Simulation
**Location:** 
`src/services/mockBackend.ts`

**Simulates:**
* Login
* Doctor fetch
* Hospital fetch
* Appointments
* Feed data

### State Management
**Library:** Zustand

**Handles:**
* User session
* Selected doctor
* Liked posts
* UI state

### UI Interaction Coverage
* 100% buttons functional
* Like / Unlike
* Follow / Unfollow
* Comment modal
* Navigation flows
* Form inputs

### User Flow Simulation
**Example:**
`Login → Dashboard → Doctor → Book → Appointment Page`

### Issues Fixed
* Wrong logo routing → FIXED
* Dead buttons → FIXED
* Missing pages → ADDED
* Navigation gaps → FIXED

### Final Status
**Phase-1 UI + Frontend Logic → 100% COMPLETE**

### 🚀 WHAT YOU HAVE NOW
Now your app is:
`UI + Logic + Routing + State + Flow`

Which means:
**Backend can plug in directly**
