import { PenLine } from "lucide-react";
import Link from "next/link";

export default function SiteHeader() {
  return <header className="site-header"><Link className="brand" href="/"><span>N</span><strong>Notes</strong></Link><nav><Link href="/">首页</Link><Link href="/posts">全部文章</Link><Link href="/login">写作后台</Link></nav><Link className="write-link" href="/admin/posts/new"><PenLine size={15}/>写文章</Link></header>;
}

