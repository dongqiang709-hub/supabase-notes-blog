import PostCard from "@/components/PostCard";
import SiteHeader from "@/components/SiteHeader";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic="force-dynamic";
export default async function PostsPage({searchParams}:{searchParams:Promise<{q?:string}>}){const {q}=await searchParams;const posts=await getPublishedPosts(60,q);return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}><SiteHeader/><main className="container posts-main"><div className="page-heading"><div><span className="home-kicker">Archive</span><h1>全部文章</h1></div><form className="search-form"><input name="q" defaultValue={q} placeholder="搜索标题或摘要"/><button>搜索</button></form></div>{posts.length?<section className="post-grid">{posts.map(post=><PostCard key={post.id} post={post}/>)}</section>:<div className="empty-state">没有找到相关文章。</div>}</main><footer className="site-footer"><span>共 {posts.length} 篇文章</span><span>Notes Archive</span></footer></div>}

