import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Unit } from "@/types";

const AuthContext = createContext<{ user: User | null; unit: Unit | null; loading: boolean }>({
  user: null,
  unit: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);

  async function getUnit(userId: string) {
    const { data } = await supabase.from("units").select("*").eq("user_id", userId).single();
    if (data) setUnit(data as Unit);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) {
        getUnit(sessionUser.id).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) {
        setLoading(true);
        await getUnit(sessionUser.id);
        setLoading(false);
      } else {
        setUnit(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, unit, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
