-- Drop existing table and related objects
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.profiles;

-- Create a table for public profiles
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Add indexes for performance
create index profiles_username_idx on public.profiles (username);
create index profiles_email_idx on public.profiles (email);

comment on table public.profiles is 'Holds public profile information for each user, including their username, full name, and profile details.';

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." 
on public.profiles for select 
to anon, authenticated 
using ( true );

create policy "Users can insert their own profile."
on public.profiles for insert 
to authenticated 
with check ( auth.uid() = id );

create policy "Users can update their own profile."
on public.profiles for update
to authenticated
using ( auth.uid() = id )
with check ( auth.uid() = id );

-- Create a trigger to automatically create a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, username, full_name)
  values (
    new.id,
    new.email,
    lower(new.raw_user_meta_data->>'username'),
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$;

-- Set up the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user(); 