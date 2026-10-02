import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { fetchClubInterestsForAdmin } from "@/lib/admin-club-interests";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await fetchClubInterestsForAdmin();

  if (error && data.length === 0) {
    return NextResponse.json({ interests: [], error }, { status: 503 });
  }

  return NextResponse.json({
    interests: data,
    warning: error,
  });
}
