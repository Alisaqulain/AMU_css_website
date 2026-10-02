import { NextResponse } from "next/server";
import { allRequiredEnvConfigured, getEnvVarStatus } from "@/lib/env-check";
import { createAnonSupabase } from "@/lib/supabase/server";

export async function GET() {
  const variables = getEnvVarStatus();
  const envReady = allRequiredEnvConfigured();

  let database: {
    ok: boolean;
    message: string;
  } = {
    ok: false,
    message: "Supabase env vars are not fully configured.",
  };

  if (envReady) {
    try {
      const supabase = createAnonSupabase();
      const { error } = await supabase.from("events").select("id").limit(1);

      if (error) {
        database = {
          ok: false,
          message: `Connected but query failed: ${error.message}`,
        };
      } else {
        database = { ok: true, message: "Anon client can read events table." };
      }
    } catch (err) {
      database = {
        ok: false,
        message:
          err instanceof Error ? err.message : "Unknown database error.",
      };
    }
  }

  return NextResponse.json({
    ok: envReady && database.ok,
    envReady,
    variables: variables.map((v) => ({
      name: v.name,
      configured: v.configured,
      public: v.public,
    })),
    database,
    checkedAt: new Date().toISOString(),
  });
}
