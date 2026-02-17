import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 증상별 기본 공감 수 (데모용) — Sol 아시아 여성 증상 빈도순 반영
const BASE_EMPATHY_COUNTS: Record<string, number> = {
  // 몸의 신호
  hot_flash: 1234,
  night_sweat: 567,
  insomnia: 892,
  joint_pain: 1445,    // 아시아 여성 1위 증상 (Sol Research)
  fatigue: 1567,
  headache: 623,
  dry_skin: 734,
  palpitation: 389,
  // 마음의 신호
  brain_fog: 856,
  mood_swings: 1034,
  anxiety: 778,
  irritability: 612,
  low_confidence: 489,
  loneliness: 723,
  // 일상의 변화
  weight_change: 945,
  low_libido: 534,
  hair_change: 412,
  digestion: 367,
  urinary: 298,
  skin_aging: 578,
};

interface SymptomEmpathyState {
  // 오늘 공감한 증상 목록
  todayEmpathized: string[];

  // 증상별 공감 수 (기본값 + 사용자 추가)
  empathyCounts: Record<string, number>;

  // 마지막 리셋 날짜
  lastResetDate: string;

  // Actions
  toggleEmpathy: (symptomId: string) => void;
  getEmpathyCount: (symptomId: string) => number;
  hasEmpathized: (symptomId: string) => boolean;
  resetIfNewDay: () => void;
}

const getToday = () => new Date().toISOString().split('T')[0];

export const useSymptomEmpathyStore = create<SymptomEmpathyState>()(
  persist(
    (set, get) => ({
      todayEmpathized: [],
      empathyCounts: { ...BASE_EMPATHY_COUNTS },
      lastResetDate: getToday(),

      toggleEmpathy: (symptomId: string) => {
        const state = get();
        const isEmpathized = state.todayEmpathized.includes(symptomId);

        if (isEmpathized) {
          // 공감 취소
          set({
            todayEmpathized: state.todayEmpathized.filter((id) => id !== symptomId),
            empathyCounts: {
              ...state.empathyCounts,
              [symptomId]: Math.max(0, (state.empathyCounts[symptomId] || 0) - 1),
            },
          });
        } else {
          // 공감 추가
          set({
            todayEmpathized: [...state.todayEmpathized, symptomId],
            empathyCounts: {
              ...state.empathyCounts,
              [symptomId]: (state.empathyCounts[symptomId] || 0) + 1,
            },
          });
        }
      },

      getEmpathyCount: (symptomId: string) => {
        return get().empathyCounts[symptomId] || 0;
      },

      hasEmpathized: (symptomId: string) => {
        return get().todayEmpathized.includes(symptomId);
      },

      resetIfNewDay: () => {
        const today = getToday();
        const state = get();

        if (state.lastResetDate !== today) {
          // 새로운 날 - 공감 목록 리셋, 카운트는 기본값으로
          set({
            todayEmpathized: [],
            empathyCounts: { ...BASE_EMPATHY_COUNTS },
            lastResetDate: today,
          });
        }
      },
    }),
    {
      name: 'hlk-symptom-empathy',
    }
  )
);
