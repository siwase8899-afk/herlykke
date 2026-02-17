import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MaritalStatus, EmploymentType } from '../types/database';

interface CheckinState {
  // 현재 섹션 (1-5)
  currentSection: number;

  // 섹션 1: 인구통계 (Q1-Q4)
  ageRange: string;
  maritalStatus: MaritalStatus | '';
  livingSituation: string;
  employment: EmploymentType | '';

  // 섹션 2: 신체 증상 (Q5-Q8)
  physicalSymptoms: string[];
  symptomSeverityMap: Record<string, number>; // 증상별 심각도 (0-3)
  worstPhysicalSymptom: string;
  symptomSeverity: number;
  symptomOnset: string;

  // 섹션 3: 감정 변화 (Q9-Q11)
  emotionalSymptoms: string[];
  worstEmotionalSymptom: string;
  sharedWith: string;

  // 섹션 4: 현재 관리 (Q12-Q16)
  currentManagement: string[];
  managementSatisfaction: number;
  mostWantedInfo: string;
  desiredHelp: string[];
  willingnessToPay: string;

  // 섹션 5: 커뮤니티 + 닉네임 (Q17-Q19)
  communityOptIn: boolean;
  preferredGroup: string;
  nickname: string;

  // 액션
  setSection: (section: number) => void;
  setField: <K extends keyof CheckinState>(key: K, value: CheckinState[K]) => void;
  toggleSymptom: (type: 'physical' | 'emotional', symptom: string) => void;
  setSymptomSeverity: (symptom: string, severity: number) => void;
  toggleManagement: (item: string) => void;
  toggleDesiredHelp: (item: string) => void;
  reset: () => void;
}

const initialState = {
  currentSection: 1,
  ageRange: '',
  maritalStatus: '' as const,
  livingSituation: '',
  employment: '' as const,
  physicalSymptoms: [] as string[],
  symptomSeverityMap: {} as Record<string, number>,
  worstPhysicalSymptom: '',
  symptomSeverity: 3,
  symptomOnset: '',
  emotionalSymptoms: [] as string[],
  worstEmotionalSymptom: '',
  sharedWith: '',
  currentManagement: [] as string[],
  managementSatisfaction: 3,
  mostWantedInfo: '',
  desiredHelp: [] as string[],
  willingnessToPay: '',
  communityOptIn: false,
  preferredGroup: '',
  nickname: '',
};

export const useCheckinStore = create<CheckinState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSection: (section) => set({ currentSection: section }),

      setField: (key, value) => set({ [key]: value } as Partial<CheckinState>),

      toggleSymptom: (type, symptom) => {
        const key = type === 'physical' ? 'physicalSymptoms' : 'emotionalSymptoms';
        const current = get()[key];
        const updated = current.includes(symptom)
          ? current.filter((s) => s !== symptom)
          : [...current, symptom];
        // 증상 제거 시 심각도도 제거
        if (type === 'physical' && current.includes(symptom)) {
          const { [symptom]: _, ...rest } = get().symptomSeverityMap;
          set({ [key]: updated, symptomSeverityMap: rest });
        } else {
          set({ [key]: updated });
        }
      },

      setSymptomSeverity: (symptom, severity) => {
        set({
          symptomSeverityMap: { ...get().symptomSeverityMap, [symptom]: severity },
        });
      },

      toggleManagement: (item) => {
        const current = get().currentManagement;
        const updated = current.includes(item)
          ? current.filter((m) => m !== item)
          : [...current, item];
        set({ currentManagement: updated });
      },

      toggleDesiredHelp: (item) => {
        const current = get().desiredHelp;
        const updated = current.includes(item)
          ? current.filter((h) => h !== item)
          : [...current, item];
        set({ desiredHelp: updated });
      },

      reset: () => set(initialState),
    }),
    {
      name: 'hlk-checkin',
    }
  )
);
