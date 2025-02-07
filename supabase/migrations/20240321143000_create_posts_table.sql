-- Create posts table with proper RLS
create table public.posts (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null check (char_length(content) > 0 and char_length(content) <= 500),
  likes_count integer default 0 not null check (likes_count >= 0),
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Add indexes for performance
create index posts_user_id_idx on public.posts (user_id);
create index posts_created_at_idx on public.posts (created_at desc);

-- Add helpful comments
comment on table public.posts is 'User posts/status updates in the social network.';
comment on column public.posts.content is 'The main text content of the post. Limited to 500 characters.';
comment on column public.posts.likes_count is 'Counter cache for number of likes on the post.';

-- Enable RLS
alter table public.posts enable row level security;

-- Create RLS policies
-- Allow anyone to read posts
create policy "Posts are viewable by everyone."
  on public.posts
  for select
  to authenticated, anon
  using (true);

-- Allow authenticated users to create posts
create policy "Users can create their own posts."
  on public.posts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Allow users to update their own posts
create policy "Users can update their own posts."
  on public.posts
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Allow users to delete their own posts
create policy "Users can delete their own posts."
  on public.posts
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger handle_posts_updated_at
  before update on public.posts
  for each row
  execute function public.handle_updated_at(); 