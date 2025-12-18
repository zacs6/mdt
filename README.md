# MDT (Mobile Dispatch Terminal)

A real-time Computer Aided Dispatch (CAD) web application simulating mission-critical dispatch systems used by first responders. The project focuses on live, multi-user state synchronization in high-priority environments.

🔗 **Live Read-Only Demo:** https://zms-mdt.vercel.app/dashboard

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## Overview

MDT systems require strict consistency across all connected clients. When a dispatcher assigns a unit to a call, every user must see the update immediately without refresh or polling delays.

This project explores how real-world dispatch software handles shared state, access control, and real-time updates while maintaining a clear, information-dense interface.

The public deployment runs in **read-only demo mode**, enforced at the database level.

---

## Core Features

- **Live Dispatch Board**
  Real-time call intake and prioritization without page refreshes.

- **Unit Management**
  Tracks Police, Fire, and EMS unit status (Available, En Route, Busy).

- **Role-Based Views**
  Dispatcher view with full visibility and unit control; unit view focused on current assignments.

- **Real-Time Synchronization**
  WebSocket-powered updates via Supabase Realtime, keeping all clients in sync within milliseconds.

- **Secure Public Demo**
  Separate demo schema with database-enforced read-only access using Row Level Security (RLS).

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **UI:** Tailwind CSS v4, shadcn/ui
- **Backend:** Supabase (PostgreSQL, Auth, Realtime)
- **State Management:** React Context + realtime subscriptions

---

## Architecture Highlights

- Separate `demo` schema for public access
- Database-enforced permissions (no frontend-only security)
- Real-time event-driven state updates
- Production-style data modeling for calls, units, and profiles

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or pnpm

### Installation

1. Clone the repository
   git clone https://github.com/zacs6/mdt.git
   cd mdt

2. Install dependencies
   npm install

### Environment Setup

Create a `.env` file with the following values:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_DEMO_MODE=false

### Run Locally

npm run dev

---

## Future Enhancements

- Interactive map view for active calls and units
- Unit-to-unit and dispatcher messaging
- PDF report generation for closed incidents
