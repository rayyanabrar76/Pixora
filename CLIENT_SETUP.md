# Client Setup Guide

When handing this project to a client, they need to create 4 accounts and send you the keys.
Replace the placeholders in .env.local, then redeploy to Vercel.

---

## STEP 1 — Clerk (User Login System)

Tell the client to:
1. Go to clerk.com and create a free account
2. Click "Create Application" → name it anything (e.g. Pixora)
3. Enable "Google" as a sign in option
4. Go to "API Keys" from the left sidebar
5. Copy the "Publishable Key" and "Secret Key"

---

## STEP 2 — EmailJS (Order Emails)

Tell the client to:
1. Go to emailjs.com and create a free account
2. Click "Email Services" → "Add New Service" → connect their Gmail
3. Copy the Service ID (looks like service_xxxxxxx)
4. Click "Email Templates" → "Create New Template"
5. Copy the HTML from the existing template and paste it in
6. Copy the Template ID (looks like template_xxxxxxx)
7. Go to "Account" → "General" → copy the Public Key

---

## STEP 3 — Supabase (Service Management Database)

Tell the client to:
1. Go to supabase.com and create a free account
2. Click "New Project" → name it anything (e.g. Pixora)
3. Choose a region (Singapore is closest to Pakistan)
4. Once the project loads, go to "SQL Editor" in the left sidebar
5. Paste and run this SQL to create the services table:

```sql
create table services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  description text not null,
  price integer not null,
  price_label text not null,
  badge text,
  slug text unique not null,
  icon text default 'star',
  created_at timestamptz default now()
);

alter table services enable row level security;

create policy "Public read" on services for select using (true);
create policy "Admin insert" on services for insert with check (true);
create policy "Admin update" on services for update using (true);
create policy "Admin delete" on services for delete using (true);
```

6. Go to "Settings" → "API Keys" → copy the Project URL and anon public key

---

## STEP 4 — Admin Emails

Decide which Gmail accounts should have admin access to the site.
These emails will see the "Admin Panel" option in the profile dropdown.
Can be one email or multiple (comma-separated).

---

## CLIENT INFO — Fill in below when client sends details

Once you have all info, update .env.local with these values:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=     <-- Clerk Publishable Key
CLERK_SECRET_KEY=                      <-- Clerk Secret Key
CLERK_TELEMETRY_DISABLED=1

NEXT_PUBLIC_ADMIN_EMAILS=              <-- Admin Gmail(s), comma-separated e.g. owner@gmail.com,partner@gmail.com

NEXT_PUBLIC_EMAILJS_SERVICE_ID=        <-- EmailJS Service ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=       <-- EmailJS Template ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=        <-- EmailJS Public Key

NEXT_PUBLIC_SUPABASE_URL=              <-- Supabase Project URL (https://xxxx.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=         <-- Supabase anon public key
```

---

## STEP 5 — Apply the changes

1. Open .env.local and fill in all values above
2. Go to Vercel dashboard → Project → Settings → Environment Variables
3. Add every variable from .env.local to Vercel (same names, same values)
   - Vercel may show a warning for NEXT_PUBLIC_ variables saying they are visible in the browser
   - This is expected — just click "Mark as Safe" and continue
4. Redeploy: Vercel dashboard → Deployments → Redeploy

Done. The site is fully connected to the client's accounts.

---

## How the admin panel works

- Sign in with an admin Gmail → profile dropdown shows "Admin Panel"
- Go to /admin to add, edit, or delete services
- Services added here appear live on the shop for all visitors instantly
- Orders from customers are emailed to the admin Gmail via EmailJS
- Cancelled orders also trigger an email notification
