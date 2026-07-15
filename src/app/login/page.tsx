import Link from "next/link";
import LoginForm from "@/components/LoginForm";
export default function LoginPage(){return <main className="auth-page"><section className="auth-intro"><Link className="brand" href="/"><span>N</span><strong>Notes</strong></Link><div><h2>安静地写作，<br/>简单地发布。</h2><p>文章存储在 Supabase，页面部署于 Vercel，图片交给 Storage。</p></div></section><LoginForm/></main>}

