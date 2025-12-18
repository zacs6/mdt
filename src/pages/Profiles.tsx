import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import ProfileListItem from "@/components/profiles/profile-list-item";
import ProfileViewer from "@/components/profiles/profile-viewer";
import type { Profile } from "@/types/index";

export default function Profiles() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    Promise.all([getProfiles()]).finally(() => {
      setIsPageLoading(false);
    });
  }, []);

  async function getProfiles() {
    const { data, error } = await supabase
      .from("profiles")
      .select(`*`)
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
    }

    setProfiles(data as Profile[]);
  }

  return (
    <div className="h-full w-full flex flex-row p-4 gap-4 relative">
      {isPageLoading && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center rounded-md backdrop-blur-sm">
          <Spinner className="w-12 h-12 text-white" />
        </div>
      )}

      <div className="flex flex-col h-full w-1/4 bg-white dark:bg-zinc-900 rounded-md border border-zinc-300 dark:border-zinc-700">
        <div className="flex flex-row items-center justify-between p-4 h-16 border-b border-zinc-300 dark:border-zinc-700">
          {/* // TODO: Search profiles functionality */}
          <Input className="w-full h-10" placeholder="Search profiles..." />
        </div>
        <div className="flex flex-col h-full w-full p-2 items-start justify-start gap-2">
          {profiles.map((profile) => (
            <ProfileListItem
              onClick={() => {
                setSelectedProfile(profile);
              }}
              key={profile.id}
              {...profile}
            />
          ))}
        </div>
      </div>
      <ProfileViewer selectedProfile={selectedProfile} />
    </div>
  );
}
