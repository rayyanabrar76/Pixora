# Client Setup Guide

Everything stays in your accounts. You just give the client access where needed.

---

## STEP 1 — EmailJS (Order Emails)

Client needs their own EmailJS because order emails come from their Gmail.

1. Go to emailjs.com → sign up with client's Gmail
2. Click **Email Services → Add New Service** → connect their Gmail
3. Copy the **Service ID** (looks like `service_xxxxxxx`)
4. Click **Email Templates → Create New Template** → paste in the template HTML
5. Copy the **Template ID** (looks like `template_xxxxxxx`)
6. Go to **Account → General** → copy the **Public Key**

Update these 3 values in Vercel env vars:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

---

## STEP 2 — Clerk (Give client view access)

So the client can see who's signing up on their site.

1. Go to your Clerk Dashboard → your application → **Settings → Members**
2. Click **Invite Member** → enter client's Gmail → set role to **Admin**
3. They accept the invite — done

No key changes needed.

---

## STEP 3 — Supabase (Give client view access)

So the client can see their orders and data if needed.

1. Go to your Supabase Dashboard → your project → **Settings → Team**
2. Click **Invite** → enter client's Gmail → set role to **Developer**
3. They accept the invite — done

No key changes needed.

---

## STEP 4 — Set Admin Email

Update `NEXT_PUBLIC_ADMIN_EMAILS` in Vercel with the client's Gmail so they can access the Admin Panel on the site.

1. Go to Vercel → Project → **Settings → Environment Variables**
2. Edit `NEXT_PUBLIC_ADMIN_EMAILS` → set it to the client's Gmail
3. Redeploy

---

## What the client can do on their own

- Add / edit / delete services (Admin Panel → Services)
- View and manage orders (Admin Panel → Orders)
- Give team members access (Admin Panel → Settings → Team Access)

## What the client contacts you for

- Design changes
- New features
- Something breaks
