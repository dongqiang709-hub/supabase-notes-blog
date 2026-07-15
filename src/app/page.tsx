import Link from "next/link";
import PostCard from "@/components/PostCard";
import SiteHeader from "@/components/SiteHeader";
import { formatDate, getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const posts = await getPublishedPosts(7);
  const [featured, ...latest] = posts;
  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}><SiteHeader/><main className="container home-content"><section className="home-hero"><span className="home-kicker">Thoughts · Work · Life</span><h1>记录思考，也记录正在发生的生活。</h1><p>一个使用 Next.js、Vercel 与 Supabase 构建的轻量博客。专注内容，保持简单。</p>{featured&&<article className="featured-post"><Link className="featured-cover" href={`/posts/${featured.slug}`}>{featured.cover_url?<img src={featured.cover_url} alt={featured.title}/>:<span>{featured.title.slice(0,1)}</span>}</Link><div className="featured-body"><time>{formatDate(featured.published_at)}</time><h2><Link href={`/posts/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><Link className="primary-link" href={`/posts/${featured.slug}`}>阅读文章 →</Link></div></article>}</section><div className="section-heading"><h2>最新文章</h2><Link href="/posts">浏览全部 →</Link></div>{latest.length?<section className="post-grid">{latest.map(post=><PostCard key={post.id} post={post}/>)}</section>:<div className="empty-state">还没有已发布的文章，登录后台写下第一篇吧。</div>}</main><footer className="site-footer"><span>© 2026 Notes</span><span>Powered by Vercel + Supabase</span></footer></div>;
}

