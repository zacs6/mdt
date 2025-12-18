import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-provider";

import "./index.css";
import AppLayout from "@/components/app-layout";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import Profiles from "@/pages/profiles";
import Reports from "@/pages/reports";
import Settings from "./pages/settings";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />

          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
