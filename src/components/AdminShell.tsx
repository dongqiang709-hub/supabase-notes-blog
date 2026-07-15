"use client";
import { FilePlus2, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function AdminShell({email,children}:{email:string;children:React.ReactNode}){const pathname=usePathname(),router=useRouter();async function logout(){await createClient().auth.signOut();router.replace("/login");router.refresh()}return <div className="admin-layout"><aside className="admin-sidebar"><Link className="admin-brand" href="/"><span>N</span><div><b>Notes</b><small>WRITER</small></div></Link><nav><Link className={pathname==="/admin"?"active":""} href="/admin"><LayoutDashboard size={16}/>文章管理</Link><Link className={pathname.includes("/admin/posts/new")?"active":""} href="/admin/posts/new"><FilePlus2 size={16}/>新建文章</Link></nav><div className="admin-account"><span>{email.slice(0,1).toUpperCase()}</span><div><b>{email}</b><button onClick={logout}><LogOut size={13}/>退出</button></div></div></aside><main className="admin-main">{children}</main></div>}

