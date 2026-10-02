import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  deleteContactMessageById,
  fetchContactMessagesForAdmin,
} from "@/lib/admin-data";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await fetchContactMessagesForAdmin();

  if (error && data.length === 0) {
    return NextResponse.json({ messages: [], error }, { status: 503 });
  }

  return NextResponse.json({ messages: data, warning: error });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  const err = await deleteContactMessageById(id);
  if (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
