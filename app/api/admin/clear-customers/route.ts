import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",").map(e => e.trim()).filter(Boolean);

export async function DELETE() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clerkClient();

  const me = await client.users.getUser(userId);
  const myEmail = me.emailAddresses[0]?.emailAddress ?? "";
  if (!ADMIN_EMAILS.includes(myEmail)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data: users } = await client.users.getUserList({ limit: 500 });

  // Delete every non-admin Clerk account
  const toDelete = users.filter(u => {
    const email = u.emailAddresses[0]?.emailAddress ?? "";
    return !ADMIN_EMAILS.includes(email);
  });

  await Promise.all(toDelete.map(u => client.users.deleteUser(u.id)));

  return NextResponse.json({ deleted: toDelete.length });
}
