import { type ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen bg-neutral-900 text-white">
      <Header />
      <main className="flex h-[calc(100vh-8vh)]">
        <Sidebar />
        <div className="flex h-full w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
