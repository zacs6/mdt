import { Outlet } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/auth");
      }
    });
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <main className="flex flex-row h-full w-full">
        <Sidebar />
        <div className="flex h-[calc(100vh-6rem)] w-full bg-zinc-100 dark:bg-zinc-950">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
