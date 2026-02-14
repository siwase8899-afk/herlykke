-- ALMA Supabase 테이블 설정
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- 1. profiles 테이블
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  nickname text default '익명의 벗',
  stage text,
  stage_badge text default '',
  auth_level text default 'lv1_visitor',
  age_range text,
  marital_status text,
  living_situation text,
  employment text,
  primary_symptoms text[] default '{}',
  symptom_cluster text,
  life_context text,
  onboarding_completed boolean default false,
  onboarding_completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. checkin_onboarding 테이블
create table if not exists public.checkin_onboarding (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  physical_symptoms text[] default '{}',
  worst_physical_symptom text,
  symptom_severity integer,
  symptom_onset text,
  emotional_symptoms text[] default '{}',
  worst_emotional_symptom text,
  shared_with text,
  current_management text[] default '{}',
  management_satisfaction integer,
  most_wanted_info text,
  desired_help text[] default '{}',
  willingness_to_pay text,
  community_opt_in boolean default false,
  preferred_group text,
  computed_stage text,
  computed_symptom_cluster text,
  computed_life_context text,
  completed_at timestamptz default now()
);

-- 3. RLS (Row Level Security) 활성화
alter table public.profiles enable row level security;
alter table public.checkin_onboarding enable row level security;

-- 4. RLS 정책: 본인 데이터만 접근 가능
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can view own checkin"
  on public.checkin_onboarding for select
  using (auth.uid() = user_id);

create policy "Users can insert own checkin"
  on public.checkin_onboarding for insert
  with check (auth.uid() = user_id);

-- 5. updated_at 자동 업데이트 트리거
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profile_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();
