import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SiteHeader from "@/components/SiteHeader";
import { formatDate, getPublishedPost } from "@/lib/posts";

export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const post=await getPublishedPost((await params).slug);return post?{title:post.title,description:post.excerpt??undefined,openGraph:{images:post.cover_url?[post.cover_url]:[]}}:{title:"文章不存在"}}
export default async function PostPage({params}:{params:Promise<{slug:string}>}){const post=await getPublishedPost((await params).slug);if(!post)notFound();return <div><SiteHeader/><article><header className="article-main article-header"><span className="article-meta">{formatDate(post.published_at)}</span><h1>{post.title}</h1>{post.excerpt&&<p>{post.excerpt}</p>}</header>{post.cover_url&&<img className="article-cover" src={post.cover_url} alt={post.title}/>}<div className="article-main markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown></div></article><footer className="site-footer"><span>Notes</span><span>{formatDate(post.published_at)}</span></footer></div>}
