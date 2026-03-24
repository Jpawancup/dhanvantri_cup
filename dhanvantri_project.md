# DHANVANTRI PROJECT LOG

## Project Overview
Dhanvantri is a healthcare infrastructure platform combining healthcare services and social media features into a single ecosystem.

The platform integrates:
- Patients
- Doctors
- Hospitals
- Diagnostics
- Blood Centers
- Ambulance Services
- Medicine Ordering
- Social Content (Feed, Clips, Moments, Chats)

This system follows a 3 Phase Development Model.

## DEVELOPMENT PHASES

### Phase 1 — UI Development
**Goal:** Complete UI system, Responsive layouts, Modern animations, 60+ screens, Dummy data, UAT testing
**Technologies used:** Next.js 14, React 18, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion, Zustand, Axios, Lucide Icons

### Phase 2 — Backend Integration
**Will include:** NestJS backend, REST APIs, Prisma ORM, PostgreSQL database, Redis caching, Authentication system, Video consultation, Payment integration

### Phase 3 — Improvements
**Includes:** AI health assistant, Performance optimization, Security, Scalability, Analytics

## SYSTEM ARCHITECTURE
```text
                 DHANVANTRI ECOSYSTEM
                        |
        ----------------------------------------
        |                 |                   |
      Web App          Mobile App          Backend
     (Next.js)       (React Native)        (NestJS)
        |                 |                   |
        --------------------------------------
                       API
                        |
         -------------------------------------
         |                |                  |
      PostgreSQL        Redis          Object Storage
```

## UI DESIGN PRINCIPLES
The UI follows medical + social platform design principles.

**Design goals:** Clean, Calm, Trustworthy, Modern, Responsive
**Visual style:** Rounded cards, Soft shadows, Minimal layout, Friendly icons

### COLOR SYSTEM
Hospital-themed palette.
- **Primary Background:** White `#FFFFFF`
- **Primary Medical Color:** Light Medical Green `#6EC6A8`
- **Secondary Color:** Sky Blue `#7EC8E3`
- **Social Accent Color:** Baby Pink `#F7C6D9`
- **Neutral UI Color:** Soft Grey `#F1F3F5`
- **Emergency Color:** Medical Red `#E63946`

## UI ANIMATION SYSTEM
**Animations used:** Framer Motion, React Spring, Lottie
**Micro-interactions include:** Page transitions, Card hover animations, Button press animations, Story ring animations, Reel swipe animations

## RESPONSIVE UI STRATEGY
The UI adapts to device sizes.
- **Mobile Layout:** Bottom tab navigation, Vertical stacked layout, Full screen reels
- **Desktop Layout:** Sidebar navigation, Top header, Multi-column grid
- **Tablet Layout:** Hybrid layout, Sidebar + tab navigation

## PROJECT FOLDER STRUCTURE
```text
dhanvantri
│
├── .git
├── .gitignore
├── README.md
├── package.json
├── docker-compose.yml
├── dhanvantri_project.md
│
├── docs
│
├── frontend-web
├── mobile-app
└── backend
```

## FRONTEND WEB STRUCTURE
```text
frontend-web
│
├── public
│
├── src
│   ├── animations
│   ├── components
│   ├── layouts
│   ├── hooks
│   ├── services
│   ├── store
│   ├── styles
│   ├── utils
│
└── app
```

## WEB PAGE STRUCTURE
- **Authentication:** login, register, otp-verification, abha-linking, profile-setup
- **Dashboards:** home-dashboard, admin-dashboard, doctor-dashboard, user-dashboard
- **Healthcare Core:** find-doctor, doctor-profile, find-hospital, hospital-profile, book-appointment, video-consultation, my-appointments, medical-records
- **Healthcare Services:** diagnostics, diagnostic-booking, blood-centers, blood-request, ambulance-booking, medicine-ordering, track-medicine
- **Social System:** feed, clips, moments, chitchats, post-create, reel-create, story-create
- **Profile:** profile, insurance, notifications, settings, followers, donation-history

## COMPONENT LIBRARY
Reusable components:
navbar, sidebar, doctor-card, hospital-card, post-card, reel-player, story-viewer, chat-window, appointment-card, notification-toast

## MOBILE APP STRUCTURE
```text
mobile-app
│
├── app
├── components
├── navigation
├── screens
├── hooks
├── services
├── store
├── animations
└── utils
```

## BACKEND STRUCTURE
```text
backend
│
├── src
│   ├── modules
│   ├── controllers
│   ├── services
│   ├── repositories
│   ├── entities
│   ├── dto
│   ├── middleware
│   ├── guards
│   ├── config
│   └── utils
```
**Modules:** auth, users, doctors, hospitals, appointments, diagnostics, blood-centers, ambulance, medicine, social, messages, payments, notifications, ai-assistant

## UI NAVIGATION MAP
**User roles:** Visitor, User (Patient), Doctor, Admin
**Navigation example:** Dashboard -> Find Doctor -> Doctor Profile -> Book Appointment -> Payment -> My Appointments
**Total UI screens:** 60+

---

## AGENT DEVELOPMENT LOG

### Prompt Given
Create a monorepo architecture for the Dhanvantri healthcare platform with Next.js frontend, React Native mobile, NestJS backend. Install Tailwind, ShadCN, Framer Motion, Zustand, Axios. Create folder structure. Implement hospital-themed UI colors and modern fonts. 

### AGENT RESULT
The agent successfully performed the following:
- Initialized Next.js 14 project, React Native (Mobile), NestJS scaffold
- Installed TypeScript and Tailwind
- Installed ShadCN UI components
- Installed Framer Motion, Zustand, Axios, React Spring, Lucide React
- Created folder structure
- Initialized UI design system
- Created landing page skeleton

### CURRENT DEVELOPMENT STAGE
**Phase:** Phase 1 — UI Development
**Stage 1 ✅:** Design System + Project Scaffold — COMPLETE
**Stage 2 ✅:** Navigation + Component Library + Dashboard Layouts — COMPLETE
**Stage 3 ✅:** Healthcare & Social Feature Pages — COMPLETE
**Stage 4 ✅:** UI Logic & Interactions — COMPLETE

**PHASE 1 STATUS: 100% COMPLETE**
Ready for Phase 2: Backend Integration.

### COMPLETED IN STAGE 2
**Layouts created:**
- `MainLayout.tsx` — Public pages
- `AuthLayout.tsx` — Login / Register
- `DashboardLayout.tsx` — Patient dashboard
- `DoctorLayout.tsx` — Doctor portal
- `AdminLayout.tsx` — Admin panel

**Shared Components:**
- `Navbar.tsx` — Public top nav
- `Sidebar.tsx` — Desktop role-based sidebar (User / Doctor / Admin)
- `TopNavbar.tsx` — In-dashboard top bar with search + notifications
- `MobileTabBar.tsx` — Fixed bottom navigation for mobile

**Cards:**
- `DoctorCard.tsx` — Doctor profile card with hover animation
- `HospitalCard.tsx` — Hospital card with image + stats
- `AppointmentCard.tsx` — Appointment with status badge + join button

**Social:**
- `FeedPost.tsx` — Like / Comment / Share feed post
- `ReelPlayer.tsx` — Vertical reel with action sidebar
- `StoryViewer.tsx` — IG-style story with progress bar

**Sections:**
- `StoriesSection.tsx` — Horizontal scrollable story row
- `HealthcareActions.tsx` — Quick service grid
- `FeedSection.tsx` — Tabbed For You / Following feed

**Dashboard Components:**
- `StatCard.tsx` — Animated KPI stat box
- `RecentAppointments.tsx` — Live appointment list

**Pages live:**
- `/` — Premium landing page with hero + feature grid + role CTAs ✅
- `/dashboard` — Full patient dashboard (stories, stats, actions, feed, right panel) ✅
- `/doctor/dashboard` — Doctor portal (schedule, stats, posts) ✅
- `/admin/dashboard` — Admin control panel (verifications, activity) ✅

**Mock Data:** `src/services/mockData.ts` — doctors, hospitals, appointments, feed posts, stories, all stats

### COMPLETED IN STAGE 3 & 4
**Auth Flows:**
- `/login` / `/register` — Completed with form states & loading logic ✅
- `/otp-verification` — Step-by-step verification UI ✅
- `/abha-linking` — Healthcare ID integration UI ✅

**Healthcare Workflows:**
- `/doctors` — Advanced search with specialty chips & filter logic ✅
- `/appointments/book` — 4-step interactive booking flow (Specialist -> Dr -> Slot -> Review) ✅
- `/video-consultation` — Professional tele-consultation room with dual-view ✅
- `/hospitals` / `/hospitals/[id]` — Detailed infrastructure pages & bed availability tracking ✅
- `/diagnostics` / `/ambulance` / `/blood` — Specialized service pages with SOS & booking logic ✅
- `/medicine` — Pharmacy marketplace with cart logic, counters & track-medicine flow ✅

**Social Logic Layer:**
- **Feed Interactions:** Like toggle, Follow/Unfollow, Saved posts, Comment modal system ✅
- **Reel Engine:** Interactive action sidebar, next-video scrolling, doctor profile routing ✅
- **Story System:** Multi-story automated playback, progress indicators, quick-reply UI ✅
- **Messages:** Active conversation routing and message list filtering ✅

**UI Logic Implementation:**
- **Zustand State:** Global store for `user`, `notifications`, `searchSelections`, and `UIModals` ✅
- **Logo Routing:** Dhanvantri logo centralized to route to `/dashboard` across all layouts ✅
- **Button Feedback:** `whileTap` / `whileHover` animations on every functional element ✅
- **Form Validation:** Client-side state handling and loading skeletons for all core forms ✅

---

**Phase 1 — Stage 1 Scaffold ✅ DONE**
**Phase 1 — Stage 2 Navigation + Dashboards ✅ DONE**
**Phase 1 — Stage 3 Healthcare + Social Pages ✅ DONE**
**Phase 1 — Stage 4 UI Logic & Interaction Layer ✅ DONE**

**PHASE 1 (UI SYSTEM) IS NOW 100% COMPLETE.**
Target: Phase 2 — NestJS Backend & API Integration.

---

## HOSPITAL MANAGEMENT SYSTEM

### Overview
Dhanvantri implements a complete digital hospital workflow system.

### Flow
Patient → Appointment → OP Record → Doctor

Doctor →
  Prescription → Pharmacy
  Test Order → Lab

Lab →
  Report → Doctor + Patient

Pharmacy →
  Medicine → Patient

### Modules
- Patients
- Doctors
- Appointments
- OP Records
- Pharmacy
- Lab
- Ambulance
- Billing

### Data Relationships

**USERS TABLE (BASE)**
id (PK) | name | role | phone | email | created_at

**HOSPITAL TABLE**
id (PK) | name | location | admin_id (FK → users.id)

**DOCTORS TABLE**
id (PK) | user_id (FK → users.id) | hospital_id (FK) | specialization | experience

**PATIENT TABLE**
id (PK) | user_id (FK → users.id) | age | gender | blood_group

**APPOINTMENTS**
id (PK) | patient_id (FK) | doctor_id (FK) | hospital_id (FK) | date | status

**OP RECORD (VISIT RECORD)**
id (PK) | patient_id | doctor_id | hospital_id | appointment_id | visit_date | notes

**PRESCRIPTIONS**
id (PK) | op_id (FK) | doctor_id | patient_id | created_at

**PRESCRIPTION ITEMS (MEDICINES)**
id (PK) | prescription_id (FK) | medicine_name | dosage | duration | instructions

**PHARMACY ORDERS**
id (PK) | prescription_id (FK) | patient_id | status

**LAB TEST ORDERS**
id (PK) | op_id (FK) | patient_id | doctor_id | test_name | status

**LAB REPORTS**
id (PK) | lab_order_id (FK) | report_file | result_summary | uploaded_at

**AMBULANCE**
id (PK) | patient_id | hospital_id | pickup_location | status

### Frontend Simulation
- Prescription → auto pharmacy order
- Test → auto lab order
- Report → linked to patient

### Dashboard Integration
- Patient Dashboard
- Doctor Dashboard
- Hospital Dashboard
- Admin Dashboard

### FRONTEND REFINEMENT (FINAL)
- Hospital dashboard added
- Admin dashboard completed
- All buttons mapped to pages
- No 404 errors
### FRONTEND DATABASE SIMULATION SYSTEM
#### Overview
Dhanvantri uses a frontend-based database simulation system using:
`localStorage` + Service Layer + Zustand

#### Data Storage
- users
- posts
- reels
- hospitals
- appointments
- prescriptions
- labReports

#### Asset Management
Images and videos are stored in:
- `public/images/social/posts`
- `public/images/social/reels`
- `public/images/profiles`
- `public/images/hospitals`

#### System Behavior
- Create post → stored in localStorage → visible in feed
- Create reel → loaded from local assets
- Signup/Login → stored in users
- Appointment → stored and linked to user
- Doctor actions → update pharmacy & lab data

#### Flow Simulation
- Doctor → Prescription → Pharmacy Order
- Doctor → Test → Lab Order
- Lab → Report → Patient + Doctor

#### Advantages
- No backend required
- Full working application simulation
- Easy future API integration

#### Status
- Phase-1 Frontend Simulation → ACTIVE
- Backend dependency → NONE

### REAL WORKING SYSTEM (WITHOUT BACKEND)
Now your app becomes a fully operational prototype!

### DATABASE UPDATE
- All major tables now include hospital_id
- Supports multi-hospital architecture

### MOBILE SYSTEM
- Responsive UI completed
- Drawer navigation added
- All features accessible in mobile

### Status
Phase-1 Extended → Hospital System Added
Frontend Logic → Fully Connected
Simulated Backend & DB → Operational
FULL FRONTEND COMPLETE ✅
