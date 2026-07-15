import { notFound } from "next/navigation";
import PostEditor from "@/components/PostEditor";
import { createClient } from "@/lib/supabase/server";
export const dynamic="force-dynamic";
export default async function EditPostPage({params}:{params:Promise<{id:string}>}){const supabase=await createClient();const {data}=await supabase.from("posts").select("*").eq("id",(await params).id).maybeSingle();if(!data)notFound();return <PostEditor post={data}/>}
