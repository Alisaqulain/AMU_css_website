import postgres from "postgres";
import { createServiceSupabase, hasValidServiceRoleKey } from "@/lib/supabase/server";

export type ClubInterestRow = {
  id: string;
  name: string;
  course: string;
  enrollment_number: string;
  phone_number: string;
  semester: string;
  club_name: string;
  club_names: string[] | null;
  not_interested: boolean | null;
  other_club: string | null;
  created_at: string;
};

export type ContactMessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

async function withSql<T>(
  fn: (sql: ReturnType<typeof postgres>) => Promise<T>
): Promise<T | { error: string }> {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    return { error: "DATABASE_URL not configured." };
  }
  const sql = postgres(databaseUrl, {
    ssl: "require",
    max: 1,
    idle_timeout: 5,
    connect_timeout: 10,
  });
  try {
    return await fn(sql);
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Database error.",
    };
  } finally {
    await sql.end({ timeout: 2 });
  }
}

export async function fetchClubInterestsForAdmin(): Promise<{
  data: ClubInterestRow[];
  error?: string;
}> {
  const sqlResult = await withSql(async (sql) =>
    sql<ClubInterestRow[]>`
      select id, name, course, enrollment_number, phone_number, semester, club_name, club_names, not_interested, other_club, created_at
      from public.club_interests
      order by created_at desc
    `
  );

  if (!("error" in sqlResult)) {
    return { data: sqlResult };
  }

  if (!hasValidServiceRoleKey()) {
    return {
      data: [],
      error:
        "Set SUPABASE_SERVICE_ROLE_KEY or DATABASE_URL in .env.local to load submissions.",
    };
  }

  try {
    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("club_interests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return { data: [], error: error.message };
    return { data: (data ?? []) as ClubInterestRow[] };
  } catch (err) {
    return {
      data: [],
      error: err instanceof Error ? err.message : "Server error.",
    };
  }
}

export async function fetchContactMessagesForAdmin(): Promise<{
  data: ContactMessageRow[];
  error?: string;
}> {
  const sqlResult = await withSql(async (sql) =>
    sql<ContactMessageRow[]>`
      select id, name, email, subject, message, created_at
      from public.contact_messages
      order by created_at desc
    `
  );

  if (!("error" in sqlResult)) {
    return { data: sqlResult };
  }

  if (!hasValidServiceRoleKey()) {
    return {
      data: [],
      error:
        "Set SUPABASE_SERVICE_ROLE_KEY or DATABASE_URL in .env.local to load messages.",
    };
  }

  try {
    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return { data: [], error: error.message };
    return { data: (data ?? []) as ContactMessageRow[] };
  } catch (err) {
    return {
      data: [],
      error: err instanceof Error ? err.message : "Server error.",
    };
  }
}

export async function deleteClubInterestById(id: string): Promise<string | null> {
  if (!hasValidServiceRoleKey()) {
    const result = await withSql(
      async (sql) => await sql`delete from public.club_interests where id = ${id}`
    );
    return "error" in result ? result.error : null;
  }

  const supabase = createServiceSupabase();
  const { error } = await supabase.from("club_interests").delete().eq("id", id);
  return error?.message ?? null;
}

export async function deleteContactMessageById(
  id: string
): Promise<string | null> {
  if (!hasValidServiceRoleKey()) {
    const result = await withSql(
      async (sql) =>
        await sql`delete from public.contact_messages where id = ${id}`
    );
    return "error" in result ? result.error : null;
  }

  const supabase = createServiceSupabase();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  return error?.message ?? null;
}
