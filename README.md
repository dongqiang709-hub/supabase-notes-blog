# Notes Blog

Production: https://supabase-notes-blog.vercel.app

一个用于实践 Vercel 与 Supabase 集成的简单博客系统。

## 技术栈

- Next.js App Router + TypeScript
- Supabase Postgres、Auth、Storage、RLS
- Vercel 部署
- Markdown + GFM

## 功能

- 公开首页、文章列表、搜索和文章详情
- 邮箱注册与登录
- 文章草稿、发布、编辑和删除
- Markdown 编辑与实时预览
- 封面图片上传到 Supabase Storage
- Postgres RLS 数据隔离

## 本地运行

复制环境变量：

```bash
copy .env.example .env.local
```

填写 Supabase Project URL 和 Publishable/Anon Key，然后执行：

```bash
npm install
npm run dev
```

数据库结构位于 `supabase/migrations/202607150001_blog.sql`。

## 部署

在 Vercel 中配置：

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
```

部署成功后，将 Vercel 正式域名配置到 Supabase Authentication 的 Site URL 和 Redirect URLs。
