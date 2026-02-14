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
