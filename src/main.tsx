import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Dashboard from "./pages/Dashboard.tsx";
import Profiles from "./pages/Profiles.tsx";
import Reports from "./pages/Reports.tsx";
import Logs from "./pages/Logs.tsx";
import Settings from "./pages/Settings.tsx";
import AppLayout from "./components/AppLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </AppLayout>
  </StrictMode>
);
