import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { IconDots } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import CallCard from "@/components/call-card";
import UnitsTable from "@/components/unit-row";

interface Call {
  id: number;
  code: string;
  title: string;
  location: string;
  status: string;
  priority: number;
  created_at: string;
}

export interface Unit {
  id: number;
  callsign: string;
  name: string;
  type: string;
  status: string;
  created_at: string;
}

async function getCalls() {
  const { data, error } = await supabase.from("calls").select();

  console.log(data);

  if (error) {
    console.error(error);
  }

  return data;
}

async function getUnits() {
  const { data, error } = await supabase.from("units").select();

  console.log(data);

  if (error) {
    console.error(error);
  }

  return data;
}

export default function Dashboard() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    getCalls().then((data) => {
      if (data) {
        setCalls(data);
      }
    });

    getUnits().then((data) => {
      if (data) {
        setUnits(data);
      }
    });
  }, []);

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
            {calls.map((call: Call) => (
              <CallCard
                key={call.id}
                code={call.code}
                timeCreated={new Date(call.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                label={call.title}
                location={call.location}
                units={["TBD"]}
              />
            ))}
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
