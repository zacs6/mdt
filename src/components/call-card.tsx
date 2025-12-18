import { Badge } from "@/components/ui/badge";
import { IconMapPin, IconShield, IconFlame, IconHeadset, IconUser } from "@tabler/icons-react";

function unitStyle(department: string) {
  switch (department) {
    case "PD":
      return "bg-sky-700 text-white";
    case "FD":
      return "bg-red-800 text-white";
    case "DSP":
      return "bg-green-700 text-white";
    default:
      return "bg-gray-600 text-white";
  }
}

function unitIcon(department: string) {
  switch (department) {
    case "PD":
      return <IconShield />;
    case "FD":
      return <IconFlame />;
    case "DSP":
      return <IconHeadset />;
    default:
      return <IconUser />;
  }
}

export default function CallCard({
  code,
  timeCreated,
  label,
  location,
  units,
  onClick,
}: {
  code: string;
  timeCreated: string;
  label: string;
  location: string;
  units: { callsign: string; department: string }[];
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col h-32 w-full p-2 dark:bg-zinc-900 rounded-md border border-zinc-300 dark:border-zinc-700"
    >
      <div className="flex flex-row items-center justify-between mb-1">
        <p className="text-sm dark:text-zinc-300">{code}</p>
        <p className="text-sm dark:text-zinc-300">{timeCreated}</p>
      </div>
      <div className="flex flex-col flex-1">
        <p className="text-lg dark:text-zinc-200">{label}</p>
        <p className="text-md dark:text-zinc-300 flex flex-row items-center gap-1">
          <IconMapPin size={16} />
          {location}
        </p>
        <div className="flex flex-row gap-2 mt-auto">
          {units.map((unit) => (
            <Badge key={unit.callsign} className={`p-3 ${unitStyle(unit.department)}`}>
              {unitIcon(unit.department)}
              {unit.callsign}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
