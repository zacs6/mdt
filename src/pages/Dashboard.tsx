import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { IconRefresh, IconX, IconPlus } from "@tabler/icons-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import CallCard from "@/components/call-card";
import UnitsTable from "@/components/units-table";
import { DEPARTMENT_TYPES } from "@/lib/constants";
import type { Call, Unit } from "@/types";

export default function Dashboard() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [isRefreshingCalls, setIsRefreshingCalls] = useState(false);
  const [isRefreshingUnits, setIsRefreshingUnits] = useState(false);
  const [unitFilter, setUnitFilter] = useState("All");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [creatingCall, setCreatingCall] = useState<Partial<Call> | null>(null);

  const filteredUnits = units.filter((unit) => {
    if (unitFilter === "All") return true;
    return DEPARTMENT_TYPES[unitFilter as keyof typeof DEPARTMENT_TYPES]?.includes(unit.department);
  });

  useEffect(() => {
    Promise.all([getCalls(), getUnits()]).finally(() => {
      setIsPageLoading(false);
    });
  }, []);

  async function getCalls() {
    setIsRefreshingCalls(true);
    const { data, error } = await supabase
      .from("calls")
      .select(
        `
      *,
      call_units (
        unit_id,
        units (
          id,
          callsign,
          department
        )
      )
    `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    }

    setCalls(data as Call[]);
    setIsRefreshingCalls(false);
  }

  async function getUnits() {
    setIsRefreshingUnits(true);
    const { data, error } = await supabase.from("units").select();

    if (error) {
      console.error(error);
    }

    setUnits(data as Unit[]);
    setIsRefreshingUnits(false);
  }

  async function updateCall() {
    if (!selectedCall) return;

    const { error } = await supabase
      .from("calls")
      .update({
        code: selectedCall.code,
        title: selectedCall.title,
        location: selectedCall.location,
        status: selectedCall.status,
        priority: selectedCall.priority,
      })
      .eq("id", selectedCall.id);

    if (error) {
      console.error(error);
    } else {
      await getCalls();
      setSelectedCall(null);
    }
  }

  async function addUnitToCall(unitId: number) {
    if (!selectedCall) return;

    const { error } = await supabase.from("call_units").insert({
      call_id: selectedCall.id,
      unit_id: unitId,
      assigned_at: new Date().toISOString(),
    });

    if (error) {
      console.error(error);
    } else {
      await getCalls();
      const { data } = await supabase
        .from("calls")
        .select(
          `
        *,
        call_units (
          unit_id,
          units (
            id,
            callsign,
            department
          )
        )
      `
        )
        .eq("id", selectedCall.id)
        .single();

      if (data) {
        setSelectedCall(data as Call);
      }
    }
  }

  async function removeUnitFromCall(unitId: number) {
    if (!selectedCall) return;

    const { error } = await supabase
      .from("call_units")
      .delete()
      .match({ call_id: selectedCall.id, unit_id: unitId });

    if (error) {
      console.error(error);
    } else {
      await getCalls();
      const { data } = await supabase
        .from("calls")
        .select(
          `
        *,
        call_units (
          unit_id,
          units (
            id,
            callsign,
            department
          )
        )
      `
        )
        .eq("id", selectedCall.id)
        .single();

      if (data) {
        setSelectedCall(data as Call);
      }
    }
  }

  function createCall() {
    setCreatingCall({
      status: "Active",
      code: "",
      title: "",
      location: "",
      priority: 0,
    });
  }

  async function saveNewCall() {
    if (!creatingCall) return;
    setIsRefreshingCalls(true);

    const { error } = await supabase.from("calls").insert({
      code: creatingCall.code,
      title: creatingCall.title,
      location: creatingCall.location,
      status: creatingCall.status,
      priority: creatingCall.priority,
    });

    if (error) {
      console.error(error);
    } else {
      setCreatingCall(null);
      await getCalls();
    }
    setIsRefreshingCalls(false);
  }

  return (
    <div className="h-full w-full flex flex-row p-4 gap-4 relative">
      {isPageLoading && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center rounded-md backdrop-blur-sm">
          <Spinner className="w-12 h-12 text-white" />
        </div>
      )}
      <div className="h-full w-1/2 flex flex-col gap-4">
        <div className="flex flex-col flex-1 min-h-0 w-full bg-white dark:bg-zinc-900 rounded-md border border-zinc-300 dark:border-zinc-700 overflow-hidden">
          <div className="flex flex-row items-center justify-between p-4 h-16 border-b border-zinc-300 dark:border-zinc-700 shrink-0">
            <p className="text-lg font-medium">Active Calls</p>

            <div className="flex flex-row items-center gap-2">
              <Button variant="ghost" size="icon" onClick={createCall} disabled={isRefreshingCalls}>
                <IconPlus />
              </Button>
              <Button variant="ghost" size="icon" onClick={getCalls} disabled={isRefreshingCalls}>
                {isRefreshingCalls ? <Spinner className="animate-spin" /> : <IconRefresh />}
              </Button>
            </div>
          </div>
          <div
            className={`w-full flex-1 overflow-y-auto grid grid-cols-2 gap-2 p-2 content-start ${
              isRefreshingCalls && "opacity-50 pointer-events-none"
            }`}
          >
            {isRefreshingCalls && calls.length === 0 ? (
              <div className="col-span-2 flex justify-center items-center h-full">
                <Spinner className="w-8 h-8" />
              </div>
            ) : (
              calls.map((call: Call) => (
                <ContextMenu key={call.id}>
                  <ContextMenuTrigger>
                    <CallCard
                      key={call.id}
                      code={call.code}
                      timeCreated={new Date(call.created_at)
                        .toLocaleString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(",", "")}
                      label={call.title}
                      location={call.location}
                      units={call.call_units.map((cu) => ({
                        callsign: cu.units.callsign,
                        department: cu.units.department,
                      }))}
                    />
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => setSelectedCall(call)}>Edit</ContextMenuItem>
                    {/* <ContextMenuItem onClick={() => removeCall(call.id)}>Delete</ContextMenuItem> */}
                  </ContextMenuContent>
                </ContextMenu>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 min-h-0 w-full bg-white dark:bg-zinc-900 rounded-md border border-zinc-300 dark:border-zinc-700">
          <div className="flex flex-row items-center justify-between p-4 h-16 border-b border-zinc-300 dark:border-zinc-700">
            <p className="text-lg font-medium">Units</p>

            <div className="flex flex-row gap-2 items-center justify-center">
              <div className="flex flex-row gap-2">
                <Button
                  variant={unitFilter === "All" ? "outline" : "ghost"}
                  onClick={() => setUnitFilter("All")}
                >
                  All
                </Button>
                <Button
                  variant={unitFilter === "Police" ? "outline" : "ghost"}
                  onClick={() => setUnitFilter("Police")}
                >
                  Police
                </Button>
                <Button
                  variant={unitFilter === "FireEMS" ? "outline" : "ghost"}
                  onClick={() => setUnitFilter("FireEMS")}
                >
                  Fire/EMS
                </Button>
              </div>
              <Button variant="ghost" size="icon" onClick={getUnits} disabled={isRefreshingUnits}>
                {isRefreshingUnits ? <Spinner className="animate-spin" /> : <IconRefresh />}
              </Button>
            </div>
          </div>
          <div className={`flex flex-col ${isRefreshingUnits && "opacity-50 pointer-events-none"}`}>
            <UnitsTable units={filteredUnits} />
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full w-1/2 bg-white dark:bg-zinc-900 rounded-md border border-zinc-300 dark:border-zinc-700">
        <div className="flex flex-row items-center justify-between p-4 h-16 border-b border-zinc-300 dark:border-zinc-700">
          <p className="text-lg font-medium">Live Map</p>
          <Button variant="ghost" size="icon">
            <IconRefresh />
          </Button>
        </div>
      </div>

      <Sheet open={!!selectedCall} onOpenChange={(open) => !open && setSelectedCall(null)}>
        <SheetContent className="p-4 bg-white dark:bg-zinc-900 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between mb-2">
              <h1 className="text-lg font-medium">Edit Call</h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Code</Label>
                <Input
                  value={selectedCall?.code || ""}
                  onChange={(e) =>
                    selectedCall && setSelectedCall({ ...selectedCall, code: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Priority</Label>
                <Input
                  type="number"
                  value={selectedCall?.priority || ""}
                  onChange={(e) =>
                    selectedCall &&
                    setSelectedCall({
                      ...selectedCall,
                      priority: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                value={selectedCall?.title || ""}
                onChange={(e) =>
                  selectedCall && setSelectedCall({ ...selectedCall, title: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <Select
                value={selectedCall?.status || ""}
                onValueChange={(value) =>
                  selectedCall && setSelectedCall({ ...selectedCall, status: value || "" })
                }
              >
                <SelectTrigger>
                  <SelectValue className={!selectedCall?.status ? "hidden" : ""} />
                  {!selectedCall?.status && (
                    <span className="flex-1 text-left text-muted-foreground">Select status</span>
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Location</Label>
              <Input
                value={selectedCall?.location ?? ""}
                onChange={(e) =>
                  selectedCall && setSelectedCall({ ...selectedCall, location: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="mb-2 block">Attached Units</Label>
              <div className="flex flex-wrap gap-2 items-center">
                {selectedCall?.call_units.map((cu) => (
                  <div
                    key={cu.units.id}
                    className="group bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm flex items-center gap-2 hover:bg-red-500 hover:text-white cursor-pointer transition-colors"
                    onClick={() => removeUnitFromCall(cu.unit_id)}
                  >
                    {cu.units.callsign}
                    <IconX
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      "h-7 w-7 rounded-md"
                    )}
                  >
                    <IconPlus size={14} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="max-h-60 overflow-y-auto">
                    {units
                      .filter((u) => !selectedCall?.call_units.some((cu) => cu.unit_id === u.id))
                      .map((unit) => (
                        <DropdownMenuItem key={unit.id} onClick={() => addUnitToCall(unit.id)}>
                          {unit.callsign} - {unit.department}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Button onClick={updateCall} disabled={isRefreshingCalls}>
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={!!creatingCall} onOpenChange={(open) => !open && setCreatingCall(null)}>
        <SheetContent className="p-4 bg-white dark:bg-zinc-900 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between mb-2">
              <h1 className="text-lg font-medium">Create New Call</h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Code</Label>
                <Input
                  value={creatingCall?.code || ""}
                  onChange={(e) =>
                    creatingCall && setCreatingCall({ ...creatingCall, code: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Priority</Label>
                <Input
                  type="number"
                  value={creatingCall?.priority || ""}
                  onChange={(e) =>
                    creatingCall &&
                    setCreatingCall({
                      ...creatingCall,
                      priority: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                value={creatingCall?.title || ""}
                onChange={(e) =>
                  creatingCall && setCreatingCall({ ...creatingCall, title: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <Select
                value={creatingCall?.status || "Active"}
                onValueChange={(value) =>
                  creatingCall && setCreatingCall({ ...creatingCall, status: value || "" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Location</Label>
              <Input
                value={creatingCall?.location ?? ""}
                onChange={(e) =>
                  creatingCall && setCreatingCall({ ...creatingCall, location: e.target.value })
                }
              />
            </div>

            <Button onClick={saveNewCall} disabled={isRefreshingCalls}>
              Create Call
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
