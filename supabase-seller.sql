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
