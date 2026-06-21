import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

export type DbOrder = {
  id: string;
  user_id: string | null;
  user_email: string;
  user_name: string;
  phone: string;
  items: { id: string; name: string; qty: number; price: number; category: string }[];
  total: number;
  notes: string | null;
  status: "new" | "pending" | "approved" | "cancelled";
  created_at: string;
};

export type DbService = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  price_label: string;
  badge?: string | null;
  slug: string;
  icon: string;
  details: string[];
  created_at: string;
  deleted_at: string | null;
};
