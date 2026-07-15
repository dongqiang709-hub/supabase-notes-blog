import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import { createClient } from "@/lib/supabase/server";
export const dynamic="force-dynamic";
export default async function AdminLayout({children}:{children:React.ReactNode}){const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/login");return <AdminShell email={user.email??"writer"}>{children}</AdminShell>}

