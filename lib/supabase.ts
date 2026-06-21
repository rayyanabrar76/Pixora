import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

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
  created_at: string;
};
