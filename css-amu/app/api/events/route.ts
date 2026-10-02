import { NextResponse } from "next/server";
import { createAnonSupabase } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("events fetch:", error);
      return NextResponse.json({ events: [] });
    }

    return NextResponse.json({ events: data ?? [] });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
