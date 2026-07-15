create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  title varchar(200) not null,
  slug varchar(200) not null unique,
  excerpt varchar(500),
  content text not null,
  cover_url text,
  status varchar(20) not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_published_idx on public.posts(status, published_at desc);
create index if not exists posts_author_idx on public.posts(author_id, updated_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at before update on public.posts for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

create policy "Published posts are public" on public.posts for select to anon using (status = 'published');
create policy "Authors can read own posts" on public.posts for select to authenticated using (author_id = auth.uid());
create policy "Authors can create posts" on public.posts for insert to authenticated with check (author_id = auth.uid());
create policy "Authors can update own posts" on public.posts for update to authenticated using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy "Authors can delete own posts" on public.posts for delete to authenticated using (author_id = auth.uid());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 5242880, array['image/png','image/jpeg','image/webp','image/gif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "Blog images are public" on storage.objects for select to public using (bucket_id = 'blog-images');
create policy "Authors can upload blog images" on storage.objects for insert to authenticated with check (bucket_id = 'blog-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Authors can update own blog images" on storage.objects for update to authenticated using (bucket_id = 'blog-images' and owner_id = auth.uid()::text);
create policy "Authors can delete own blog images" on storage.objects for delete to authenticated using (bucket_id = 'blog-images' and owner_id = auth.uid()::text);

