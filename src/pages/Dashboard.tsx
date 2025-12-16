import { IconDots } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import CallCard from "@/components/call-card";
import UnitsTable from "@/components/call-row";

const units = [
  {
    badgeNo: "101",
    name: "John Doe",
    status: "Available",
    location: "123 Main St",
  },
  {
    badgeNo: "102",
    name: "Jane Doe",
    status: "Available",
    location: "123 Main St",
  },
];

export default function Dashboard() {
  return (
    <div className="h-full w-full flex flex-row p-4 gap-4">
      <div className="h-full w-1/2 flex flex-col gap-4">
        <div className="flex flex-col flex-1 min-h-0 w-full bg-white dark:bg-zinc-900 rounded-md border border-zinc-300 dark:border-zinc-700 overflow-hidden">
          <div className="flex flex-row items-center justify-between p-4 h-16 border-b border-zinc-300 dark:border-zinc-700 shrink-0">
            <p className="text-lg font-medium">Active Calls</p>

            <Button variant="ghost" size="icon">
              <IconDots />
            </Button>
          </div>
          <div className="w-full flex-1 overflow-y-auto grid grid-cols-2 gap-2 p-2">
            <CallCard
              code="10-10"
              timeCreated="11:32PM"
              label="Fight in Progress"
              location="123 Main St"
              units={["101", "486"]}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 min-h-0 w-full bg-white dark:bg-zinc-900 rounded-md border border-zinc-300 dark:border-zinc-700">
          <div className="flex flex-row items-center justify-between p-4 h-16 border-b border-zinc-300 dark:border-zinc-700">
            <p className="text-lg font-medium">Units</p>

            <div className="flex flex-row gap-2 items-center justify-center">
              <Button variant="ghost">Police</Button>
              <Button variant="ghost">Fire</Button>
              <Button variant="ghost">EMS</Button>
            </div>
          </div>
          <div className="flex flex-col">
            <UnitsTable units={units} />
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full w-1/2 bg-white dark:bg-zinc-900 rounded-md border border-zinc-300 dark:border-zinc-700">
        <div className="flex flex-row items-center justify-between p-4 h-16 border-b border-zinc-300 dark:border-zinc-700">
          <p className="text-lg font-medium">Live Map</p>
          <Button variant="ghost" size="icon">
            <IconDots />
          </Button>
        </div>
      </div>
    </div>
  );
}
