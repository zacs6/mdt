import { Outlet } from "react-router"
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen w-screen bg-slate-900 text-white">
      <Header />
      <main className="flex h-[calc(100vh-8vh)]">
        <Sidebar />
        <div className="flex h-full w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
