import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FileText, Save } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";

export default function Profiles() {
  return (
    <div className="flex flex-row h-[calc(100vh-8vh)] w-[calc(100vw-5vw)] p-4 gap-4">
      <div className="flex flex-col h-full w-1/4 gap-4">
      <div className="flex flex-1 flex-col w-full bg-slate-800 border-2 border-slate-700 rounded-sm p-4">
        <Input
          type="text"
          placeholder="Name"
          className="w-full h-[5vh] border-2 border-slate-700 rounded-sm mb-2 focus:border-0 focus:outline-none"
        />
        <ProfileCard name="Jordan Davis" gender="Male" licenses="No licenses found" />
        <ProfileCard name="Ben Williams" gender="Male" licenses="No licenses found" />
      </div>
      </div>
      <div className="flex flex-col h-full w-3/4">
      <div className="flex flex-1 flex-col w-full bg-slate-800 border-2 border-slate-700 rounded-sm">
        <div className="flex flex-row h-[8vh] w-full justify-between px-4 items-center">
          <div className="flex flex-row">
            <FileText />
            <p className="ml-2">Manage Profile - ID: ZMS011706</p>
          </div>
          <Save />
        </div>
        <Separator className="bg-slate-700 border border-slate-700" />
        <div className="flex flex-row h-full w-full">
          <div className="flex flex-col w-[50%] items-center justify-between p-4">
            <div className="flex flex-row h-[49%] w-full bg-slate-700 rounded-sm border-2 border-slate-600 p-4">
              <div className="flex justify-center items-center bg-slate-600 rounded-sm w-[45%] h-full">
                IMG
              </div>
              <div className="flex flex-col ml-4">
                <p className="font-bold">Full Name</p>
                <p>Jordan Davis</p>
                <p className="font-bold">Birthdate</p>
                <p>01/17/2000</p>
                <p className="font-bold">Gender</p>
                <p>Male</p>
                <p className="font-bold">Phone Number</p>
                <p>123-456-7890</p>
                <p className="font-bold">Job</p>
                <p>LSPD - Officer</p>
              </div>
            </div>
            <div className="flex items-start justify-center p-2 h-[49%] w-full bg-slate-700 rounded-sm border-2 border-slate-600">
              Notes
            </div>
          </div>
          <Separator orientation="vertical" className="bg-slate-700 border border-slate-700" />
          <div className="flex flex-col w-[50%] items-center justify-start p-4">
            <div className="flex items-center justify-center h-[8vh] w-full bg-slate-700 rounded-sm border-2 border-slate-600 mb-2">
              Tags
            </div>
            <div className="flex items-center justify-center h-[8vh] w-full bg-slate-700 rounded-sm border-2 border-slate-600 mb-2">
              Licenses
            </div>
            <div className="flex items-center justify-center h-[8vh] w-full bg-slate-700 rounded-sm border-2 border-slate-600 mb-2">
              Vehicles
            </div>
            <div className="flex items-center justify-center h-[8vh] w-full bg-slate-700 rounded-sm border-2 border-slate-600 mb-2">
              Properties
            </div>
            <div className="flex items-center justify-center h-[8vh] w-full bg-slate-700 rounded-sm border-2 border-slate-600 mb-2">
              Gallery
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
