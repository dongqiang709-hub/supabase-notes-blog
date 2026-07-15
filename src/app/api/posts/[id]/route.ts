import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { postInputSchema } from "@/lib/validation";
type Context={params:Promise<{id:string}>};
export async function PUT(request:Request,{params}:Context){const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)return NextResponse.json({message:"请先登录"},{status:401});const parsed=postInputSchema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({message:parsed.error.issues[0]?.message??"数据校验失败"},{status:400});const input=parsed.data;const {data,error}=await supabase.from("posts").update({...input,excerpt:input.excerpt||null,cover_url:input.cover_url||null,published_at:input.status==="published"?new Date().toISOString():null}).eq("id",(await params).id).select().single();if(error)return NextResponse.json({message:error.code==="23505"?"Slug 已被使用":error.message},{status:400});revalidatePath("/");revalidatePath("/posts");revalidatePath(`/posts/${input.slug}`);return NextResponse.json(data)}
export async function DELETE(_request:Request,{params}:Context){const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)return NextResponse.json({message:"请先登录"},{status:401});const {error}=await supabase.from("posts").delete().eq("id",(await params).id);if(error)return NextResponse.json({message:error.message},{status:400});revalidatePath("/");revalidatePath("/posts");return NextResponse.json({ok:true})}

