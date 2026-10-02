import postgres from "postgres";
import { createServiceSupabase, hasValidServiceRoleKey } from "@/lib/supabase/server";

export type ClubInterestRow = {
  id: string;
  name: string;
  course: string;
  enrollment_number: string;
  semester: string;
  club_name: string;
  club_names: string[] | null;
  not_interested: boolean | null;
  other_club: string | null;
  created_at: string;
};

export async function fetchClubInterestsForAdmin(): Promise<{
  data: ClubInterestRow[];
  error?: string;
}> {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (databaseUrl) {
    const sql = postgres(databaseUrl, {
      ssl: "require",
      max: 1,
      idle_timeout: 5,
      connect_timeout: 10,
    });

    try {
      const rows = await sql<ClubInterestRow[]>`
        select id, name, course, enrollment_number, semester, club_name, club_names, not_interested, other_club, created_at
        from public.club_interests
        order by created_at desc
      `;
      return { data: rows };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Database connection failed.";
      return { data: [], error: message };
    } finally {
      await sql.end({ timeout: 2 });
    }
  }

  if (!hasValidServiceRoleKey()) {
    return {
      data: [],
      error:
        "Admin cannot read submissions yet. Set SUPABASE_SERVICE_ROLE_KEY (service_role secret) or DATABASE_URL (Supabase → Database → Connection string) in .env.local, then restart the dev server.",
    };
  }

  try {
    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("club_interests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { data: [], error: error.message };
    }

    return { data: (data ?? []) as ClubInterestRow[] };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error.";
    return { data: [], error: message };
  }
}
