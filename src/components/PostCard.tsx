import Link from "next/link";
import type { Post } from "@/types/database";
import { formatDate } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return <article className="post-card"><Link className="post-card-cover" href={`/posts/${post.slug}`}>{post.cover_url?<img src={post.cover_url} alt={post.title}/>:<span>{post.title.slice(0,1)}</span>}</Link><div className="post-card-body"><time>{formatDate(post.published_at)}</time><h2><Link href={`/posts/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt || "阅读这篇文章，了解更多内容。"}</p><Link className="read-more" href={`/posts/${post.slug}`}>继续阅读 <span>→</span></Link></div></article>;
}

