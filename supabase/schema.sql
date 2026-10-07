create table public.contributors (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  twitter_handle text,
  payment_id text not null unique,
  order_id text not null,
  display_consent boolean not null default true,
  created_at timestamptz not null default now()
);

create index contributors_created_at_idx on public.contributors (created_at desc);

alter table public.contributors enable row level security;
