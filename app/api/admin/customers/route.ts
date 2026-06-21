import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",").map(e => e.trim()).filter(Boolean);

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clerkClient();

  // Verify the caller is an admin
  const me = await client.users.getUser(userId);
  const myEmail = me.emailAddresses[0]?.emailAddress ?? "";
  if (!ADMIN_EMAILS.includes(myEmail)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data: users } = await client.users.getUserList({ limit: 500 });

  return NextResponse.json(users.map(u => ({
    id: u.id,
    email: u.emailAddresses[0]?.emailAddress ?? "",
    firstName: u.firstName ?? "",
    lastName: u.lastName ?? "",
    imageUrl: u.imageUrl,
    createdAt: u.createdAt,
    lastSignInAt: u.lastSignInAt,
  })));
}
