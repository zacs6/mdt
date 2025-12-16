import CallCard from "@/components/CallCard";
import UnitRow from "@/components/UnitRow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const units = [
    {
        type: "Police",
        badge: "101",
        name: "Ofc. J. Davis",
        status: "Available",
        location: "South Rockford Drive"
    },
    {
        type: "Police",
        badge: "102",
        name: "Ofc. B. Williams",
        status: "Available",
        location: "South Rockford Drive"
    },
    {
        type: "Fire",
        badge: "E-11",
        name: "J. Green",
        status: "Available",
        location: "South Rockford Drive"
    }
]

const unitTypes = [
    "All",
    "Police",
    "Fire",
    "EMS",
]

export default function Dashboard() {
  const [unitFilter, setUnitFilter] = useState("All");
  const filteredUnits = units.filter((unit) => unit.type === unitFilter || unitFilter === "All");

  return (
    <div className="flex flex-row h-[calc(100vh-8vh)] w-[calc(100vw-5vw)] p-4 gap-4">
      <div className="flex flex-col h-full w-1/2 gap-4">
        <div className="flex flex-1 flex-col w-full bg-slate-800 border-2 border-slate-700 rounded-sm">
          <h1 className="p-4 text-xl">ACTIVE CALLS</h1>
          <div className="p-4 grid grid-cols-2 gap-4">
            <CallCard callCode="10-10" callType="Fight in Progress" callCreated="12:34 AM" callLocation="123 Main St" callUnits={[
                {
                    type: "Police",
                    badge: "101",
                    name: "Ofc. J. Davis",
                    status: "Available",
                    location: "South Rockford Drive"
                },
                {
                    type: "EMS",
                    badge: "E-11",
                    name: "EMT B. Williams",
                    status: "Available",
                    location: "South Rockford Drive"
                }
            ]} />
            <CallCard callCode="10-90" callType="Bank Robbery" callCreated="12:34 AM" callLocation="123 Main St" callUnits={[
                {
                    type: "Police",
                    badge: "101",
                    name: "Ofc. J. Davis",
                    status: "Available",
                    location: "South Rockford Drive"
                },
                {
                    type: "Police",
                    badge: "102",
                    name: "Ofc. B. Williams",
                    status: "Available",
                    location: "South Rockford Drive"
                }
            ]} />
            <CallCard callCode="10-13" callType="Shots Fired" callCreated="12:34 AM" callLocation="123 Main St" callUnits={[
                {
                    type: "Police",
                    badge: "101",
                    name: "Ofc. J. Davis",
                    status: "Available",
                    location: "South Rockford Drive"
                },
                {
                    type: "Police",
                    badge: "102",
                    name: "Ofc. B. Williams",
                    status: "Available",
                    location: "South Rockford Drive"
                }
            ]} />
          </div>
        </div>
        <div className="flex flex-1 flex-col w-full bg-slate-800 border-2 border-slate-700 rounded-sm">
          <h1 className="p-4 text-xl">UNITS</h1>
          <div className="flex flex-row gap-4 ml-4">
            {unitTypes.map((unitType) => (
                <div className="">
                  <button key={unitType} className={`text-slate-400 hover:text-slate-200 cursor-pointer transition-colors ${unitFilter === unitType ? "text-white" : ""}`} onClick={() => setUnitFilter(unitType)}>{unitType}</button>
                  {unitFilter === unitType && <div className="h-[3px] rounded-md bg-blue-400"></div>}
                </div>
            ))}
          </div>
          <div className="p-4 flex flex-col gap-1 h-full">
            <UnitRow header={true} />
            <ScrollArea className="h-70">
              {filteredUnits.map((unit) => (
                <div className="flex flex-col">
                    <UnitRow key={unit.badge} unitBadge={unit.badge} unitName={unit.name} unitStatus={unit.status} unitLocation={unit.location} />
                    <div className="h-[2px] bg-slate-700"></div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full w-1/2">
        <div className="flex h-full w-full bg-slate-800 border-2 border-slate-700 rounded-sm">
          <h1 className="p-4 text-xl">LIVE MAP</h1>
        </div>
      </div>
    </div>
  );
}
