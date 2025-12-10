import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FileText, Save } from "lucide-react";

export default function Profiles() {
  return (
    <div className="flex flex-row w-full h-full p-8 justify-between">
      <div className="flex flex-col w-[26%] h-full bg-neutral-800 border-2 border-neutral-700 rounded-sm p-4">
        <Input
          type="text"
          placeholder="Name"
          className="w-full h-[5vh] border-2 border-neutral-700 rounded-sm mb-2"
        />
        <div className="bg-neutral-800 border-2 border-neutral-700 rounded-sm p-2 mb-2">
          <p>Jordan Davis (#ZMS011706)</p>
          <p>Male</p>
          <p>No licenses found</p>
        </div>
        <div className="bg-neutral-800 border-2 border-neutral-700 rounded-sm p-2 mb-2">
          <p>John Doe (#ABC012345)</p>
          <p>Male</p>
          <p>No licenses found</p>
        </div>
      </div>
      <div className="flex flex-col w-[72%] h-full bg-neutral-800 border-2 border-neutral-700 rounded-sm">
        <div className="flex flex-row h-[8vh] w-full justify-between px-4 items-center">
          <div className="flex flex-row">
            <FileText />
            <p className="ml-2">Manage Profile - ID: ZMS011706</p>
          </div>
          <Save />
        </div>
        <Separator className="bg-neutral-700 border border-neutral-700" />
        <div className="flex flex-row h-full w-full">
          <div className="flex flex-col w-[50%] items-center justify-between p-4">
            <div className="flex flex-row h-[49%] w-full bg-neutral-700 rounded-sm border-2 border-neutral-600 p-4">
              <div className="flex justify-center items-center bg-neutral-600 rounded-sm w-[45%] h-full">
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
            <div className="flex items-start justify-center p-2 h-[49%] w-full bg-neutral-700 rounded-sm border-2 border-neutral-600">
              Notes
            </div>
          </div>
          <Separator orientation="vertical" className="bg-neutral-700 border border-neutral-700" />
          <div className="flex flex-col w-[50%] items-center justify-start p-4">
            <div className="flex items-center justify-center h-[8vh] w-full bg-neutral-700 rounded-sm border-2 border-neutral-600 mb-2">
              Tags
            </div>
            <div className="flex items-center justify-center h-[8vh] w-full bg-neutral-700 rounded-sm border-2 border-neutral-600 mb-2">
              Licenses
            </div>
            <div className="flex items-center justify-center h-[8vh] w-full bg-neutral-700 rounded-sm border-2 border-neutral-600 mb-2">
              Vehicles
            </div>
            <div className="flex items-center justify-center h-[8vh] w-full bg-neutral-700 rounded-sm border-2 border-neutral-600 mb-2">
              Properties
            </div>
            <div className="flex items-center justify-center h-[8vh] w-full bg-neutral-700 rounded-sm border-2 border-neutral-600 mb-2">
              Gallery
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
