import { createClient } from "@/lib/supabase/server";

export async function getPublishedPosts(limit = 24, query?: string) {
  const supabase = await createClient();
  let request = supabase.from("posts").select("*").eq("status", "published").order("published_at", { ascending: false }).limit(limit);
  if (query) request = request.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`);
  const { data, error } = await request;
  if (error) throw error;
  return data;
}

export async function getPublishedPost(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  if (error) throw error;
  return data;
}

export function formatDate(value: string | null) {
  if (!value) return "尚未发布";
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(new Date(value));
}

