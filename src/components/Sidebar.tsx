import { House, Database, FileText, ScrollText, Cog } from "lucide-react";

const sidebarData = [
  { name: "Dashboard", href: "/", icon: House },
  { name: "Profiles", href: "/profiles", icon: Database },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Logs", href: "/logs", icon: ScrollText },
  { name: "Settings", href: "/settings", icon: Cog },
];

export default function Sidebar() {
  return (
    <div className="flex h-[calc(100vh-8vh)] w-[5vw] bg-slate-800 border-r-2 border-slate-700">
      <ul className="flex flex-col h-full w-full items-center pt-[1vw] gap-2">
        {sidebarData.map((item) => {
          const isActive = window.location.pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.name} className="relative flex w-full items-center justify-center">
              {isActive && (
                <div className="absolute left-0 h-[3vw] w-1 rounded-tr-md rounded-br-md bg-blue-400"></div>
              )}
              <a
                href={item.href}
                className={`flex h-[3vw] w-[3vw] items-center justify-center rounded-sm transition-colors hover:bg-slate-700 ${
                  isActive ? "bg-slate-700" : ""
                }`}
              >
                <Icon className={isActive ? "text-blue-400" : "text-slate-400"} />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
