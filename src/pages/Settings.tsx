import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/components/theme-provider";

export default function Settings() {
  const { theme, setTheme } = useTheme();
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
          <p className="text-lg font-medium">Settings</p>
        </div>
        <div className="flex flex-col h-full w-full p-4 items-start justify-start gap-4">
          <div className="flex flex-col gap-2">
            <Label>Color Theme</Label>
            <Select
              value={theme.charAt(0).toUpperCase() + theme.slice(1)}
              onValueChange={(value) => {
                if (value) setTheme(value.toLowerCase() as "light" | "dark" | "system");
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Light">Light</SelectItem>
                <SelectItem value="Dark">Dark</SelectItem>
                <SelectItem value="System">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
