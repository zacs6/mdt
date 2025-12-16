import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./index.css";
import Dashboard from "./pages/Dashboard.tsx";
import Profiles from "./pages/Profiles.tsx";
import Reports from "./pages/Reports.tsx";
import Logs from "./pages/Logs.tsx";
import Settings from "./pages/Settings.tsx";
import AppLayout from "./components/AppLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES (No Layout) */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}

          {/* PROTECTED / APP ROUTES (With AppLayout) */}
          {/* All routes inside here will render inside the <Outlet /> of AppLayout */}
          <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      </BrowserRouter>
  </StrictMode>
);
