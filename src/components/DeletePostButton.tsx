"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function DeletePostButton({id,title}:{id:string;title:string}){const router=useRouter();const [loading,setLoading]=useState(false);async function remove(){if(!confirm(`确定删除《${title}》？此操作不能撤销。`))return;setLoading(true);const response=await fetch(`/api/posts/${id}`,{method:"DELETE"});if(response.ok){router.refresh()}else{alert((await response.json()).message||"删除失败");setLoading(false)}}return <button className="danger-link" disabled={loading} onClick={remove}>{loading?"删除中":"删除"}</button>}

