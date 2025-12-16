import { useLocation, useNavigate } from "react-router";
import { IconHome, IconUsers, IconFileText, IconSettings } from "@tabler/icons-react";

const SidebarItems = [
  { name: "Dashboard", page: "/dashboard", icon: <IconHome /> },
  { name: "Profiles", page: "/profiles", icon: <IconUsers /> },
  { name: "Reports", page: "/reports", icon: <IconFileText /> },
  { name: "Settings", page: "/settings", icon: <IconSettings /> },
];

function SidebarItem({
  active = false,
  item,
  onClick,
}: {
  active?: boolean;
  item: { name: string; page: string; icon: React.ReactNode };
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative h-12 flex flex-row items-center pl-4 cursor-pointer transition-all duration-300 ease-in-out ${
        active ? "" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
      }`}
    >
      <div
        className={`absolute inset-0 bg-linear-to-r from-emerald-300/40 to-white dark:to-zinc-900 transition-opacity duration-300 ease-in-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute left-0 w-1 h-full bg-emerald-500 dark:bg-emerald-400 transition-opacity duration-300 ease-in-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <p className="relative z-10 flex flex-row items-center gap-2">
        {item.icon}
        {item.name}
      </p>
    </div>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-zinc-900 border-r border-zinc-300 dark:border-zinc-700 h-[calc(100vh-6rem)] w-64 shrink-0 flex flex-col">
      {SidebarItems.map((item, index) => (
        <SidebarItem
          key={index}
          active={location.pathname === item.page}
          item={item}
          onClick={() => navigate(item.page)}
        />
      ))}
    </div>
  );
}
