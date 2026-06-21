import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",").map(e => e.trim()).filter(Boolean);

async function getCallerEmail() {
  const { userId } = await auth();
  if (!userId) return null;
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.emailAddresses[0]?.emailAddress ?? null;
}

export async function GET() {
  const email = await getCallerEmail();
  if (!email || !ADMIN_EMAILS.includes(email))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { data } = await supabase.from("sub_admins").select("*").order("created_at", { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const email = await getCallerEmail();
  if (!email || !ADMIN_EMAILS.includes(email))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { inviteEmail } = await req.json();
  if (!inviteEmail) return NextResponse.json({ error: "Email required" }, { status: 400 });
  if (ADMIN_EMAILS.includes(inviteEmail))
    return NextResponse.json({ error: "Already a main admin" }, { status: 400 });
  const { error } = await supabase.from("sub_admins").insert({ email: inviteEmail, invited_by: email });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const email = await getCallerEmail();
  if (!email || !ADMIN_EMAILS.includes(email))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { inviteEmail } = await req.json();
  await supabase.from("sub_admins").delete().eq("email", inviteEmail);
  return NextResponse.json({ ok: true });
}
