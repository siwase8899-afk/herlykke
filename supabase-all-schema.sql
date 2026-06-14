-- HERLYKKE 전체 스키마 (setup→community→daily-logs→reviews→seller→reports)

-- ===== supabase-setup.sql =====
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


-- ===== supabase-community.sql =====
-- 커뮤니티 테이블

-- 게시글 테이블
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 익명 닉네임 (자동 생성)
  anonymous_name TEXT NOT NULL,

  -- 게시글 내용
  title TEXT,
  content TEXT NOT NULL,

  -- 카테고리
  category TEXT NOT NULL CHECK (category IN ('daily', 'symptoms', 'tips', 'question', 'support')),

  -- 태그 (증상, 관심사 등)
  tags JSONB DEFAULT '[]',

  -- 통계
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,

  -- 상태
  is_pinned BOOLEAN DEFAULT FALSE,
  is_hidden BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 댓글 테이블
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- 대댓글용

  -- 익명 닉네임
  anonymous_name TEXT NOT NULL,

  -- 내용
  content TEXT NOT NULL,

  -- 통계
  like_count INTEGER DEFAULT 0,

  is_hidden BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 좋아요 테이블
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 하나의 게시글/댓글에 한 번만 좋아요
  UNIQUE(user_id, post_id),
  UNIQUE(user_id, comment_id),

  -- post_id 또는 comment_id 중 하나는 반드시 있어야 함
  CHECK (post_id IS NOT NULL OR comment_id IS NOT NULL)
);

-- RLS 정책
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- 게시글 정책
CREATE POLICY "Anyone can view posts" ON posts
  FOR SELECT USING (is_hidden = FALSE);

CREATE POLICY "Authenticated users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON posts
  FOR DELETE USING (auth.uid() = user_id);

-- 댓글 정책
CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (is_hidden = FALSE);

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" ON comments
  FOR DELETE USING (auth.uid() = user_id);

-- 좋아요 정책
CREATE POLICY "Anyone can view likes" ON likes
  FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can create likes" ON likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes" ON likes
  FOR DELETE USING (auth.uid() = user_id);

-- 인덱스
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);

-- 좋아요 수 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET like_count = like_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_post_like_count
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW
  WHEN (NEW.post_id IS NOT NULL OR OLD.post_id IS NOT NULL)
  EXECUTE FUNCTION update_post_like_count();

-- 댓글 수 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_post_comment_count
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_post_comment_count();


-- ===== supabase-daily-logs.sql =====
-- 매일 증상 기록 테이블
CREATE TABLE daily_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,

  -- 오늘의 컨디션 (1-5)
  overall_condition INTEGER CHECK (overall_condition >= 1 AND overall_condition <= 5),

  -- 주요 증상들 (체크박스 형태로 저장)
  symptoms JSONB DEFAULT '[]',
  -- 예: ["hot_flash", "insomnia", "mood_swing", "fatigue", "brain_fog"]

  -- 증상 강도 (1-5)
  symptom_intensity INTEGER CHECK (symptom_intensity >= 1 AND symptom_intensity <= 5),

  -- 수면 시간
  sleep_hours DECIMAL(3,1),

  -- 수면 품질 (1-5)
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 5),

  -- 오늘 한 활동들
  activities JSONB DEFAULT '[]',
  -- 예: ["exercise", "meditation", "walk", "yoga"]

  -- 메모
  notes TEXT,

  -- 기분 태그
  mood_tags JSONB DEFAULT '[]',
  -- 예: ["happy", "anxious", "calm", "irritable"]

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 하루에 하나의 기록만 가능
  UNIQUE(user_id, log_date)
);

-- RLS 정책
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 기록만 볼 수 있음
CREATE POLICY "Users can view own logs" ON daily_logs
  FOR SELECT USING (auth.uid() = user_id);

-- 사용자는 자신의 기록만 생성할 수 있음
CREATE POLICY "Users can create own logs" ON daily_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 사용자는 자신의 기록만 수정할 수 있음
CREATE POLICY "Users can update own logs" ON daily_logs
  FOR UPDATE USING (auth.uid() = user_id);

-- 사용자는 자신의 기록만 삭제할 수 있음
CREATE POLICY "Users can delete own logs" ON daily_logs
  FOR DELETE USING (auth.uid() = user_id);

-- 인덱스
CREATE INDEX idx_daily_logs_user_date ON daily_logs(user_id, log_date DESC);
CREATE INDEX idx_daily_logs_date ON daily_logs(log_date DESC);

-- updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_daily_logs_updated_at
  BEFORE UPDATE ON daily_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- ===== supabase-reviews.sql =====
-- ================================================
-- HERLYKKE 증상 인증 리뷰 시스템 테이블
-- 체크인 완료자만 작성 가능한 인증 리뷰
-- ================================================

-- 솔루션 리뷰 테이블
CREATE TABLE IF NOT EXISTS solution_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  solution_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  before_symptoms JSONB DEFAULT '[]',
  after_symptoms JSONB DEFAULT '[]',
  usage_duration TEXT NOT NULL,
  content TEXT NOT NULL,
  stage TEXT,
  age_range TEXT,
  is_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS 활성화
ALTER TABLE solution_reviews ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 리뷰 읽기 가능
CREATE POLICY "Anyone can read reviews"
  ON solution_reviews FOR SELECT
  USING (true);

-- 인증된 사용자만 본인 리뷰 작성
CREATE POLICY "Users can write own reviews"
  ON solution_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 인덱스
CREATE INDEX idx_solution_reviews_solution_id ON solution_reviews(solution_id);
CREATE INDEX idx_solution_reviews_user_id ON solution_reviews(user_id);
CREATE INDEX idx_solution_reviews_created_at ON solution_reviews(created_at DESC);
CREATE INDEX idx_solution_reviews_rating ON solution_reviews(rating);


-- ===== supabase-seller.sql =====
-- ================================================
-- HERLYKKE 피어 셀러 사전등록 테이블
-- 동료 셀러 1기 모집을 위한 신청서 저장
-- ================================================

-- 피어 셀러 신청 테이블
CREATE TABLE IF NOT EXISTS seller_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nickname TEXT NOT NULL,
  email TEXT NOT NULL,
  experienced_symptoms TEXT[] NOT NULL DEFAULT '{}',
  helpful_solutions TEXT,
  introduction TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS 활성화
ALTER TABLE seller_applications ENABLE ROW LEVEL SECURITY;

-- 누구나 신청 가능 (인증 불필요)
CREATE POLICY "Anyone can submit seller application"
  ON seller_applications FOR INSERT
  WITH CHECK (true);

-- 인덱스
CREATE INDEX idx_seller_applications_email ON seller_applications(email);
CREATE INDEX idx_seller_applications_created_at ON seller_applications(created_at DESC);


-- ===== supabase-reports.sql =====
-- 신고 테이블 (커뮤니티 안전장치)
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- 신고 대상 (post 또는 comment)
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,

  reason TEXT,            -- 신고 사유(선택)
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed')),

  created_at TIMESTAMPTZ DEFAULT NOW(),

  CHECK (post_id IS NOT NULL OR comment_id IS NOT NULL)
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- 로그인 사용자는 신고 생성 가능
CREATE POLICY "Authenticated users can create reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- 본인 신고 내역만 조회 (운영자 조회는 service_role로)
CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (auth.uid() = reporter_id);

CREATE INDEX idx_reports_post_id ON reports(post_id);
CREATE INDEX idx_reports_status ON reports(status);


