import type { Profile } from "@/types/index";

export default function ProfileViewer({ selectedProfile }: { selectedProfile: Profile | null }) {
  // TODO: Show own profile on load?
  if (!selectedProfile) {
    return (
      <div className="flex flex-col h-full w-3/4 bg-white dark:bg-zinc-900 rounded-md border border-zinc-300 dark:border-zinc-700">
        <div className="flex flex-row items-center justify-between p-4 h-16 border-b border-zinc-300 dark:border-zinc-700">
          <p className="text-lg font-medium">First Last (#0000)</p>
        </div>
        <div className="flex flex-col h-full w-full p-4 items-start justify-start gap-4">
          <p>Gender</p>
          <p>DOB</p>
          <p>Licenses</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-3/4 bg-white dark:bg-zinc-900 rounded-md border border-zinc-300 dark:border-zinc-700">
      <div className="flex flex-row items-center justify-between p-4 h-16 border-b border-zinc-300 dark:border-zinc-700">
        <p className="text-lg font-medium">
          {selectedProfile?.first_name} {selectedProfile?.last_name} (#{selectedProfile?.id})
        </p>
      </div>
      <div className="flex flex-col h-full w-full p-4 items-start justify-start gap-4">
        <p>{selectedProfile?.gender}</p>
        <p>{selectedProfile?.dob}</p>
        <p>{selectedProfile?.licenses.join(", ")}</p>
      </div>
    </div>
  );
}
