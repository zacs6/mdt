import { House, Database, FileText, ScrollText, Cog } from "lucide-react";

const sidebarData = [
  { name: "Dashboard", href: "/", icon: <House />, active: false },
  { name: "Profiles", href: "/profiles", icon: <Database />, active: true },
  { name: "Reports", href: "/reports", icon: <FileText />, active: false },
  { name: "Logs", href: "/logs", icon: <ScrollText />, active: false },
  { name: "Settings", href: "/settings", icon: <Cog />, active: false },
];

export default function Sidebar() {
  return (
    <div className="flex h-[calc(100vh-8vh)] w-[16vw] bg-neutral-800 border-r-2 border-neutral-700">
      <ul>
        {sidebarData.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={`flex flex-row h-[6vh] px-8 w-[15vw] items-center hover:bg-neutral-900 transition-colors ${
                item.active ? "bg-neutral-900" : ""
              }`}
            >
              {item.icon}
              <p className="ml-2">{item.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
