import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";
import type { College } from "./types";

export function useColleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("colleges")
        .select("*")
        .order("name");

      if (fetchError) {
        setError(fetchError.message);
        setColleges([]);
      } else {
        setColleges((data ?? []) as College[]);
      }
    } catch {
      setError("Unable to load colleges.");
      setColleges([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      if (!mounted) return;
      await load();
    };

    void run();

    return () => {
      mounted = false;
    };
  }, [load]);

  return { colleges, loading, error, reload: load };
}
