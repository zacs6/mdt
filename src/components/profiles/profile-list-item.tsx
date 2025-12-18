import { Badge } from "@/components/ui/badge";
import { IconGenderFemale, IconGenderMale, IconCalendarEvent } from "@tabler/icons-react";

export default function ProfileListItem({
  first_name,
  last_name,
  id,
  gender,
  dob,
  licenses,
  onClick,
}: {
  first_name: string;
  last_name: string;
  id: number;
  gender: string;
  dob: string;
  licenses: string[];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row justify-between cursor-pointer h-auto w-full border border-zinc-300 dark:border-zinc-700 hover:dark:bg-zinc-800 hover:bg-zinc-100 p-2 rounded-md"
    >
      <div className="flex flex-col">
        <p>
          {first_name} {last_name} (#{id})
        </p>
        <p className="text-sm dark:text-zinc-300 flex flex-row items-center gap-1">
          {gender === "Male" ? <IconGenderMale size={18} /> : <IconGenderFemale size={18} />}
          {gender}
        </p>
        <p className="text-sm dark:text-zinc-300 flex flex-row items-center gap-1">
          <IconCalendarEvent size={18} />
          {dob}
        </p>
        <div className="flex flex-row gap-2 mt-2">
          <Badge
            className={`p-2 ${
              licenses.includes("driver") ? "bg-emerald-600 text-white" : "bg-gray-600 text-white"
            }`}
          >
            Driver
          </Badge>
          <Badge
            className={`p-2 ${
              licenses.includes("weapon") ? "bg-emerald-600 text-white" : "bg-gray-600 text-white"
            }`}
          >
            Weapon
          </Badge>
          <Badge
            className={`p-2 ${
              licenses.includes("hunting") ? "bg-emerald-600 text-white" : "bg-gray-600 text-white"
            }`}
          >
            Hunting
          </Badge>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center text-sm text-zinc-300 h-auto aspect-square bg-zinc-600 rounded-md">
        PFP
      </div>
    </div>
  );
}
