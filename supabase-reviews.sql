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
