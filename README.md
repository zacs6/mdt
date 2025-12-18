# MDT (Mobile Dispatch Terminal)

A real-time Computer Aided Dispatch (CAD) web application for first responders. This project focuses on handling live data synchronization between multiple users (dispatchers and field units) in a high-priority environment.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## About

This project explores how mission-critical software handles shared state in a real-time environment. Unlike a standard CRUD app where data is static until refreshed, an MDT (Mobile Dispatch Terminal) needs to stay in sync across all clients instantly. If a dispatcher assigns a unit to a call, that unit needs to see the status update immediately.

The UI is designed to be high-contrast and information-dense, simulating the actual terminals used by police and fire departments, while maintaining modern UX standards.

## Core Features

- **Live Dispatch Board**:

  - Incoming emergency calls appear instantly without refreshing.
  - Calls are sorted effectively by priority and severity.

- **Unit Management**:

  - Tracks status (Available, Busy, En Route) for Police, Fire, and EMS units.
  - Dispatchers can drag-and-drop units to assign them to active incidents.

- **Role-Based Views**:

  - **Dispatcher View**: Full control over all calls and units.
  - **Unit View**: Simplified interface focused on their current assignment and status updates.

- **Real-time Sync**:
  - Powered by Supabase Realtime (WebSockets).
  - State is consistent across multiple connected devices in milliseconds.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Shadcn UI
- **Backend Service**: Supabase (PostgreSQL + Auth)
- **State/Sync**: React Context + Realtime Subscriptions

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/zacs6/mdt.git
   cd mdt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment**
   Create a `.env` file:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Run Locally**
   ```bash
   npm run dev
   ```

## Future Plans

- Interactive Map implementation.
- Unit-to-Unit messaging system.
- PDF Report generation for closed incidents.

---

_Built by Zac Scott as a showcase of modern web development practices._
