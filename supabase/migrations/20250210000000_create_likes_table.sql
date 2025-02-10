-- Create likes table
create table public.likes (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  post_id bigint references public.posts on delete cascade not null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  -- Ensure a user can only like a post once
  unique(user_id, post_id)
);

-- Add indexes
create index likes_user_id_idx on public.likes (user_id);
create index likes_post_id_idx on public.likes (post_id);

-- Enable RLS
alter table public.likes enable row level security;

-- Create policies
create policy "Users can view any likes"
  on public.likes for select
  to authenticated
  using (true);

create policy "Users can create their own likes"
  on public.likes for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can delete their own likes"
  on public.likes for delete
  to authenticated
  using (auth.uid() = user_id);

-- Create function to update post likes count
create or replace function public.handle_like_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (TG_OP = 'INSERT') then
    update posts
    set likes_count = likes_count + 1
    where id = NEW.post_id;
  elsif (TG_OP = 'DELETE') then
    update posts
    set likes_count = likes_count - 1
    where id = OLD.post_id;
  end if;
  return null;
end;
$$;

-- Create triggers
create trigger on_like_change
  after insert or delete on public.likes
  for each row execute function public.handle_like_count(); 