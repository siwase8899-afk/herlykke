import { supabase, isSupabaseConfigured } from './supabase';
import type { DailyLog } from './logTypes';

// Supabase 서버 동기화 유틸리티
// localStorage(Zustand) → Supabase 서버 저장
// Supabase 미설정 시 graceful fallback (아무것도 안 함)

/**
 * 체크인 온보딩 데이터를 Supabase에 저장
 */
export async function syncCheckinToServer(userId: string, data: {
  ageRange: string;
  maritalStatus: string;
  livingSituation: string;
  employment: string;
  physicalSymptoms: string[];
  worstPhysicalSymptom: string;
  symptomSeverity: number;
  symptomOnset: string;
  emotionalSymptoms: string[];
  worstEmotionalSymptom: string;
  sharedWith: string;
  currentManagement: string[];
  managementSatisfaction: number;
  mostWantedInfo: string;
  desiredHelp: string[];
  willingnessToPay: string;
  communityOptIn: boolean;
  preferredGroup: string;
  nickname: string;
  computedStage: string;
  computedSymptomCluster: string;
  computedLifeContext: string;
}) {
  if (!isSupabaseConfigured) return { success: true, demo: true };

  try {
    // 1. checkin_onboarding 테이블에 저장
    const { error: checkinError } = await supabase
      .from('checkin_onboarding')
      .insert({
        user_id: userId,
        physical_symptoms: data.physicalSymptoms,
        worst_physical_symptom: data.worstPhysicalSymptom,
        symptom_severity: data.symptomSeverity,
        symptom_onset: data.symptomOnset,
        emotional_symptoms: data.emotionalSymptoms,
        worst_emotional_symptom: data.worstEmotionalSymptom,
        shared_with: data.sharedWith,
        current_management: data.currentManagement,
        management_satisfaction: data.managementSatisfaction,
        most_wanted_info: data.mostWantedInfo,
        desired_help: data.desiredHelp,
        willingness_to_pay: data.willingnessToPay,
        community_opt_in: data.communityOptIn,
        preferred_group: data.preferredGroup,
        computed_stage: data.computedStage,
        computed_symptom_cluster: data.computedSymptomCluster,
        computed_life_context: data.computedLifeContext,
      });

    if (checkinError) throw checkinError;

    // 2. profiles 테이블 업데이트
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        nickname: data.nickname || '익명의 벗',
        stage: data.computedStage,
        age_range: data.ageRange,
        marital_status: data.maritalStatus,
        living_situation: data.livingSituation,
        employment: data.employment,
        primary_symptoms: [...data.physicalSymptoms, ...data.emotionalSymptoms],
        symptom_cluster: data.computedSymptomCluster,
        life_context: data.computedLifeContext,
        onboarding_completed: true,
        onboarding_completed_at: new Date().toISOString(),
      });

    if (profileError) throw profileError;

    return { success: true };
  } catch (error) {
    console.error('[HERLYKKE] Checkin sync failed:', error);
    return { success: false, error };
  }
}

/**
 * 매일 기록을 Supabase에 저장/업데이트
 */
export async function syncDailyLogToServer(userId: string, log: DailyLog) {
  if (!isSupabaseConfigured) return { success: true, demo: true };

  try {
    const { error } = await supabase
      .from('daily_logs')
      .upsert({
        user_id: userId,
        log_date: log.date,
        overall_condition: log.mood,
        symptoms: log.symptoms,
        symptom_intensity: log.symptoms.length > 0
          ? Math.round(log.symptoms.reduce((sum, s) => sum + s.severity, 0) / log.symptoms.length)
          : null,
        sleep_hours: calculateSleepHours(log.sleep.bedTime, log.sleep.wakeTime),
        sleep_quality: log.sleep.quality,
        activities: log.activities,
        notes: log.note || null,
        mood_tags: log.moodTags,
      }, {
        onConflict: 'user_id,log_date',
      });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('[HERLYKKE] Daily log sync failed:', error);
    return { success: false, error };
  }
}

/**
 * Supabase에서 사용자의 매일 기록 로드
 */
export async function loadLogsFromServer(userId: string): Promise<DailyLog[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', userId)
      .order('log_date', { ascending: false })
      .limit(90); // 최근 90일

    if (error) throw error;
    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      date: row.log_date,
      mood: row.overall_condition as 1 | 2 | 3 | 4 | 5,
      moodTags: (row.mood_tags as string[]) || [],
      symptoms: (row.symptoms as Array<{ symptomId: string; severity: 1 | 2 | 3 | 4 | 5 }>) || [],
      sleep: {
        bedTime: '',
        wakeTime: '',
        quality: (row.sleep_quality as 1 | 2 | 3 | 4 | 5) || 3,
      },
      activities: (row.activities as string[]) || [],
      note: row.notes || undefined,
      createdAt: row.created_at,
    }));
  } catch (error) {
    console.error('[HERLYKKE] Load logs failed:', error);
    return [];
  }
}

/**
 * Supabase에서 프로필 로드
 */
export async function loadProfileFromServer(userId: string) {
  if (!isSupabaseConfigured) return null;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('[HERLYKKE] Load profile failed:', error);
    return null;
  }
}

// 수면 시간 계산 헬퍼
function calculateSleepHours(bedTime: string, wakeTime: string): number | null {
  if (!bedTime || !wakeTime) return null;

  const [bedH, bedM] = bedTime.split(':').map(Number);
  const [wakeH, wakeM] = wakeTime.split(':').map(Number);

  let hours = wakeH - bedH + (wakeM - bedM) / 60;
  if (hours < 0) hours += 24; // 자정 넘긴 경우

  return Math.round(hours * 10) / 10;
}
