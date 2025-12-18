import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { IconSearch, IconBell, IconClock, IconChevronUp } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-provider";

export default function Header() {
  const navigate = useNavigate();
  const { user, unit } = useAuth();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateString = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="flex flex-row h-24 items-center justify-between px-4 bg-white dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-700">
      <div
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer flex flex-row w-36 -ml-5.5 items-center justify-center gap-2"
      >
        <svg
          width="44"
          height="45"
          viewBox="0 0 44 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.00052 6.3584H16.3467V20.2046C16.3467 23.8864 13.3619 26.8712 9.68002 26.8712H6.50053V8.8584C6.50053 7.47769 7.61981 6.3584 9.00052 6.3584ZM35.32 17.8456C31.6381 17.8456 28.6533 20.8303 28.6533 24.5122V38.3584H35.9995C37.3802 38.3584 38.4995 37.2391 38.4995 35.8584V17.8456H35.32ZM24.654 16.2046C20.9721 16.2046 17.9873 13.2198 17.9873 9.53792V6.35844L36.0001 6.35844C37.3808 6.35844 38.5001 7.47772 38.5001 8.85844L38.5001 16.2046H24.654ZM6.5 35.8584C6.5 37.2391 7.61929 38.3584 9 38.3584H27.0128V35.1789C27.0128 31.497 24.0281 28.5122 20.3462 28.5122H6.5V35.8584Z"
            className="fill-black dark:fill-white"
          />
        </svg>
        <p className="text-2xl font-semibold">MDT</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Button variant="ghost" size="icon">
          <IconBell className="h-[1.2rem] w-[1.2rem] transition-all text-black dark:text-white" />
        </Button>
        <Separator orientation="vertical" />
        <div className="flex flex-row items-center gap-4">
          <IconClock className="h-[1.2rem] w-[1.2rem] transition-all text-black dark:text-white" />
          <div className="flex flex-col items-start justify-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{dateString}</p>
            <p className="">{timeString}</p>
          </div>
        </div>
        <Separator orientation="vertical" />

        <DropdownMenu>
          <DropdownMenuTrigger className="group outline-none">
            <div className="flex flex-row items-center gap-2 rounded-md p-2 cursor-pointer dark:hover:bg-zinc-800 transition-colors">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start justify-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{unit?.role || "User"}</p>
                <p>{unit?.name || user?.email || "Guest"}</p>
              </div>
              <IconChevronUp className="h-[1.2rem] w-[1.2rem] text-black dark:text-white transition-transform duration-200 group-hover:rotate-180 group-aria-expanded:rotate-180" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
