import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: { default: "Notes · 简单博客", template: "%s · Notes" }, description: "使用 Next.js、Vercel 与 Supabase 构建的简单博客系统" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}

