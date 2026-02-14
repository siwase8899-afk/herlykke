// Supabase Database 타입 정의
// 추후 supabase gen types 로 자동 생성 가능

export type AuthLevel = 'lv1_visitor' | 'lv2_member' | 'lv3_verified' | 'lv4_selfie' | 'lv5_leader';
export type MenopauseStage = 'preparation' | 'perimenopause' | 'menopause_active' | 'postmenopause_early' | 'postmenopause_stable' | 'unknown';
export type MaritalStatus = 'single' | 'married_together' | 'divorced' | 'widowed' | 'separated' | 'other';
export type EmploymentType = 'fulltime' | 'parttime_contract' | 'selfemployed_freelance' | 'homemaker' | 'job_seeking' | 'retired';

export interface Profile {
  id: string;
  kakao_id: number | null;
  nickname: string;
  stage: MenopauseStage;
  stage_badge: string;
  auth_level: AuthLevel;
  age_range: string | null;
  marital_status: MaritalStatus | null;
  living_situation: string | null;
  employment: EmploymentType | null;
  primary_symptoms: string[] | null;
  symptom_cluster: string | null;
  life_context: string | null;
  phone_verified: boolean;
  selfie_verified: boolean;
  onboarding_completed: boolean;
  onboarding_completed_at: string | null;
  push_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface CheckinOnboarding {
  id: string;
  user_id: string;
  physical_symptoms: string[];
  worst_physical_symptom: string | null;
  symptom_severity: number | null;
  symptom_onset: string | null;
  emotional_symptoms: string[];
  worst_emotional_symptom: string | null;
  shared_with: string | null;
  current_management: string[] | null;
  management_satisfaction: number | null;
  most_wanted_info: string | null;
  desired_help: string[] | null;
  willingness_to_pay: string | null;
  community_opt_in: boolean;
  preferred_group: string | null;
  computed_stage: MenopauseStage | null;
  computed_symptom_cluster: string | null;
  computed_life_context: string | null;
  completed_at: string;
  created_at: string;
}

export interface CheckinDaily {
  id: string;
  user_id: string;
  check_date: string;
  mood: number | null;
  sleep_quality: number | null;
  active_symptoms: string[] | null;
  symptom_intensities: Record<string, number> | null;
  one_line_note: string | null;
  created_at: string;
}
