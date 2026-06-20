# Client Setup Guide

When handing this project to a client, they need to create 2 accounts and send you the keys.
Replace the placeholders below with their info, then copy into .env.local

---

## STEP 1 — Clerk (User Login System)

Tell the client to:
1. Go to clerk.com and create a free account
2. Click "Create Application"
3. Name it anything (e.g. Pixora)
4. Enable "Google" as a sign in option
5. Go to "API Keys" from the left sidebar
6. Copy the "Publishable Key" and "Secret Key"

---

## STEP 2 — EmailJS (Order Emails)

Tell the client to:
1. Go to emailjs.com and create a free account
2. Click "Email Services" → "Add New Service" → connect their Gmail
3. Copy the Service ID (looks like service_xxxxxxx)
4. Click "Email Templates" → "Create New Template"
5. Set it up exactly like the current template (copy the HTML from the existing template)
6. Copy the Template ID (looks like template_xxxxxxx)
7. Go to "Account" → "General" → copy the Public Key

---

## CLIENT INFO — Fill in below when client sends details

Once you have all info from the client, fill it in here then copy to .env.local

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=     <-- paste client Clerk Publishable Key here
CLERK_SECRET_KEY=                      <-- paste client Clerk Secret Key here
CLERK_TELEMETRY_DISABLED=1

NEXT_PUBLIC_EMAILJS_SERVICE_ID=        <-- paste client EmailJS Service ID here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=       <-- paste client EmailJS Template ID here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=        <-- paste client EmailJS Public Key here
```

---

## STEP 3 — Apply the changes

1. Open .env.local
2. Replace all values with the client values above
3. Restart the dev server: npm run dev
4. Redeploy to Vercel (if live)

Done. The site is now fully connected to the client's accounts.
