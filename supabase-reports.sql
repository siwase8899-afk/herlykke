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
