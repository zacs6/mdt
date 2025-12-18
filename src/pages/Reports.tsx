import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Reports() {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    Promise.all([]).finally(() => {
      setIsPageLoading(false);
    });
  }, []);

  return (
    <div className="h-full w-full flex flex-row p-4 gap-4 relative">
      {isPageLoading && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center rounded-md backdrop-blur-sm">
          <Spinner className="w-12 h-12 text-white" />
        </div>
      )}

      <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-900 rounded-md border border-zinc-300 dark:border-zinc-700">
        <div className="flex flex-row items-center justify-between p-4 h-16 border-b border-zinc-300 dark:border-zinc-700">
          <p className="text-lg font-medium">Reports</p>
        </div>
        <div className="flex flex-col h-full w-full p-4 items-start justify-start gap-4"></div>
      </div>
    </div>
  );
}
