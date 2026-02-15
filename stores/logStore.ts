import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DailyLog, SymptomEntry, SleepEntry } from '@/lib/logTypes';

interface LogState {
  // 저장된 모든 로그
  logs: DailyLog[];

  // 현재 작성 중인 로그 (임시)
  draft: {
    mood: 1 | 2 | 3 | 4 | 5 | null;
    moodTags: string[];
    symptoms: SymptomEntry[];
    sleep: SleepEntry | null;
    activities: string[];
    note: string;
  };

  // 스트릭 카운트
  streakCount: number;

  // Actions
  setMood: (mood: 1 | 2 | 3 | 4 | 5) => void;
  toggleMoodTag: (tagId: string) => void;
  addSymptom: (symptomId: string, severity: 1 | 2 | 3 | 4 | 5) => void;
  removeSymptom: (symptomId: string) => void;
  updateSymptomSeverity: (symptomId: string, severity: 1 | 2 | 3 | 4 | 5) => void;
  setSleep: (sleep: SleepEntry) => void;
  toggleActivity: (activityId: string) => void;
  setNote: (note: string) => void;
  saveLog: () => void;
  resetDraft: () => void;
  getTodayLog: () => DailyLog | undefined;
  getLogsByDateRange: (startDate: string, endDate: string) => DailyLog[];
  calculateStreak: () => number;
}

const getToday = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

const generateId = () => {
  return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useLogStore = create<LogState>()(
  persist(
    (set, get) => ({
      logs: [],

      draft: {
        mood: null,
        moodTags: [],
        symptoms: [],
        sleep: null,
        activities: [],
        note: '',
      },

      streakCount: 0,

      setMood: (mood) => {
        set((state) => ({
          draft: { ...state.draft, mood },
        }));
      },

      toggleMoodTag: (tagId) => {
        set((state) => {
          const tags = state.draft.moodTags.includes(tagId)
            ? state.draft.moodTags.filter((t) => t !== tagId)
            : [...state.draft.moodTags, tagId];
          return { draft: { ...state.draft, moodTags: tags } };
        });
      },

      addSymptom: (symptomId, severity) => {
        set((state) => ({
          draft: {
            ...state.draft,
            symptoms: [
              ...state.draft.symptoms.filter((s) => s.symptomId !== symptomId),
              { symptomId, severity },
            ],
          },
        }));
      },

      removeSymptom: (symptomId) => {
        set((state) => ({
          draft: {
            ...state.draft,
            symptoms: state.draft.symptoms.filter((s) => s.symptomId !== symptomId),
          },
        }));
      },

      updateSymptomSeverity: (symptomId, severity) => {
        set((state) => ({
          draft: {
            ...state.draft,
            symptoms: state.draft.symptoms.map((s) =>
              s.symptomId === symptomId ? { ...s, severity } : s
            ),
          },
        }));
      },

      setSleep: (sleep) => {
        set((state) => ({
          draft: { ...state.draft, sleep },
        }));
      },

      toggleActivity: (activityId) => {
        set((state) => {
          const activities = state.draft.activities.includes(activityId)
            ? state.draft.activities.filter((a) => a !== activityId)
            : [...state.draft.activities, activityId];
          return { draft: { ...state.draft, activities } };
        });
      },

      setNote: (note) => {
        set((state) => ({
          draft: { ...state.draft, note },
        }));
      },

      saveLog: () => {
        const state = get();
        const { draft } = state;

        if (!draft.mood) return;

        const today = getToday();
        const existingLogIndex = state.logs.findIndex((l) => l.date === today);

        const newLog: DailyLog = {
          id: existingLogIndex >= 0 ? state.logs[existingLogIndex].id : generateId(),
          date: today,
          mood: draft.mood,
          moodTags: draft.moodTags,
          symptoms: draft.symptoms,
          sleep: draft.sleep || { bedTime: '', wakeTime: '', quality: 3 },
          activities: draft.activities,
          note: draft.note || undefined,
          createdAt: new Date().toISOString(),
        };

        let newLogs: DailyLog[];
        if (existingLogIndex >= 0) {
          // 오늘 기록이 이미 있으면 업데이트
          newLogs = [...state.logs];
          newLogs[existingLogIndex] = newLog;
        } else {
          // 새 기록 추가
          newLogs = [...state.logs, newLog];
        }

        set({
          logs: newLogs,
          draft: {
            mood: null,
            moodTags: [],
            symptoms: [],
            sleep: null,
            activities: [],
            note: '',
          },
          streakCount: get().calculateStreak(),
        });
      },

      resetDraft: () => {
        set({
          draft: {
            mood: null,
            moodTags: [],
            symptoms: [],
            sleep: null,
            activities: [],
            note: '',
          },
        });
      },

      getTodayLog: () => {
        const today = getToday();
        return get().logs.find((l) => l.date === today);
      },

      getLogsByDateRange: (startDate, endDate) => {
        return get().logs.filter((l) => l.date >= startDate && l.date <= endDate);
      },

      calculateStreak: () => {
        const logs = get().logs;
        if (logs.length === 0) return 0;

        // 날짜순 정렬
        const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));

        const today = new Date();
        let streak = 0;
        let currentDate = new Date(today);

        for (let i = 0; i < 365; i++) {
          const dateStr = currentDate.toISOString().split('T')[0];
          const hasLog = sortedLogs.some((l) => l.date === dateStr);

          if (hasLog) {
            streak++;
          } else if (i > 0) {
            // 오늘은 아직 기록 안 해도 됨, 어제부터 체크
            break;
          }

          currentDate.setDate(currentDate.getDate() - 1);
        }

        return streak;
      },
    }),
    {
      name: 'alma-log-storage',
      merge: (persisted, current) => {
        const p = persisted as Partial<LogState> | undefined;
        return {
          ...current,
          ...p,
          draft: {
            ...current.draft,
            ...(p?.draft ?? {}),
            moodTags: p?.draft?.moodTags ?? [],
          },
        };
      },
    }
  )
);
