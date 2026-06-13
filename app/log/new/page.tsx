'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogStore } from '@/stores/logStore';
import { useAuth } from '@/lib/authContext';
import { MoodSelector } from '@/components/log/MoodSelector';
import { SymptomPicker } from '@/components/log/SymptomPicker';
import { SleepInput } from '@/components/log/SleepInput';
import { ActivityTags } from '@/components/log/ActivityTags';
import { SYMPTOMS } from '@/lib/logTypes';
import { MOOD_TAGS } from '@/lib/dailyLogConstants';
import { EmojiIcon } from '@/lib/iconMap';

// 수면을 첫 번째 스텝으로 재배치
const STEPS = ['sleep', 'mood', 'symptoms', 'activities', 'note'] as const;
type Step = (typeof STEPS)[number];

const STEP_LABELS: Record<Step, string> = {
  sleep: '어젯밤 수면',
  mood: '아침 컨디션',
  symptoms: '수면 방해 증상',
  activities: '어제 활동',
  note: '수면 메모',
};

export default function NewLogPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>('sleep');
  const {
    draft,
    setMood,
    toggleMoodTag,
    addSymptom,
    removeSymptom,
    updateSymptomSeverity,
    setSleep,
    toggleActivity,
    setNote,
    saveLog,
  } = useLogStore();

  // 비로그인 게스트는 로그인으로 (대시보드와 동일 가드)
  useEffect(() => {
    if (!authLoading && !isLoggedIn) router.replace('/login');
  }, [authLoading, isLoggedIn, router]);

  const currentStepIndex = STEPS.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 'sleep':
        return true; // 기본값이 있으므로 항상 진행 가능
      case 'mood':
        return draft.mood !== null;
      default:
        return true;
    }
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]);
    }
  };

  const handleSave = () => {
    saveLog(user?.id);
    router.push('/log?saved=true');
  };

  // 오늘 날짜 포맷
  const today = new Date();
  const dateStr = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  if (authLoading || !isLoggedIn) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-hlk-primary-light via-hlk-bg to-hlk-accent-light relative">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-hlk-border">
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            {currentStepIndex > 0 ? (
              <button
                onClick={handleBack}
                className="p-2 -ml-2 text-hlk-text-secondary hover:text-hlk-text"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <Link
                href="/log"
                className="p-2 -ml-2 text-hlk-text-secondary hover:text-hlk-text"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
            )}

            <div className="text-center">
              <p className="text-xs text-hlk-text-tertiary">{dateStr}</p>
              <p className="text-sm font-semibold text-hlk-text">수면 일지</p>
            </div>

            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-hlk-border rounded-full overflow-hidden">
            <div
              className="h-full bg-hlk-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] text-hlk-text-tertiary">
              {STEP_LABELS[currentStep]}
            </p>
            <p className="text-xs text-hlk-text-tertiary">
              {currentStepIndex + 1} / {STEPS.length}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto px-5 py-8">
        {currentStep === 'sleep' && (
          <SleepInput value={draft.sleep} onChange={setSleep} />
        )}

        {currentStep === 'mood' && (
          <MoodSelector
            value={draft.mood}
            onChange={setMood}
            selectedTags={draft.moodTags}
            onToggleTag={toggleMoodTag}
          />
        )}

        {currentStep === 'symptoms' && (
          <SymptomPicker
            selected={draft.symptoms}
            onAdd={addSymptom}
            onRemove={removeSymptom}
            onUpdateSeverity={updateSymptomSeverity}
          />
        )}

        {currentStep === 'activities' && (
          <ActivityTags selected={draft.activities} onToggle={toggleActivity} />
        )}

        {currentStep === 'note' && (
          <div>
            <h2 className="text-2xl font-bold text-hlk-text mb-3 text-center">
              수면에 대해 기억하고 싶은 것이 있나요?
            </h2>
            <p className="text-hlk-text-secondary mb-8 text-center">
              꿈, 야간 각성, 기분 등 자유롭게 메모해주세요 (선택)
            </p>

            <textarea
              value={draft.note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="예: 새벽 3시에 한 번 깼다, 꿈을 많이 꿨다, 코골이가 있었다..."
              className="w-full h-40 p-4 rounded-2xl border border-hlk-border text-hlk-text placeholder-hlk-text-tertiary focus:outline-none focus:border-hlk-primary resize-none"
            />

            {/* 요약 미리보기 */}
            <div className="mt-6 card-glass rounded-2xl p-5">
              <p className="text-sm font-semibold text-hlk-text mb-4">오늘의 수면 일지 요약</p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-hlk-text-tertiary">수면</span>
                  <span className="text-hlk-text">
                    {draft.sleep
                      ? `${draft.sleep.bedTime} ~ ${draft.sleep.wakeTime}`
                      : '-'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-hlk-text-tertiary">아침 컨디션</span>
                  <span className="text-hlk-text">
                    {draft.mood ? <EmojiIcon emoji={['😫', '😕', '😐', '🙂', '😊'][draft.mood - 1]} size={18} /> : '-'}
                  </span>
                </div>

                {draft.moodTags.length > 0 && (
                  <div className="flex justify-between items-start">
                    <span className="text-hlk-text-tertiary flex-shrink-0">기상 후 기분</span>
                    <div className="flex flex-wrap justify-end gap-1 ml-2">
                      {draft.moodTags.map((tagId) => {
                        const tag = MOOD_TAGS.find((t) => t.id === tagId);
                        return tag ? (
                          <span key={tagId} className="text-xs inline-flex items-center gap-0.5"><EmojiIcon emoji={tag.emoji} size={12} /> {tag.label}</span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-hlk-text-tertiary">수면 방해 증상</span>
                  <span className="text-hlk-text">
                    {draft.symptoms.length > 0
                      ? <span className="inline-flex gap-1">{draft.symptoms.map((s) => <EmojiIcon key={s.symptomId} emoji={SYMPTOMS.find((sym) => sym.id === s.symptomId)?.emoji} size={14} />)}</span>
                      : '없음'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-hlk-text-tertiary">어제 활동</span>
                  <span className="text-hlk-text">
                    {draft.activities.length > 0
                      ? `${draft.activities.length}개`
                      : '없음'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/82 backdrop-blur-lg border-t border-hlk-border">
        <div className="max-w-lg mx-auto px-5 py-4">
          {currentStep === 'note' ? (
            <button
              onClick={handleSave}
              className="w-full py-4 bg-hlk-accent text-white font-bold rounded-full hover:bg-hlk-accent/90 active:scale-[0.98] transition-all"
            >
              수면 일지 완료
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`w-full py-4 font-bold rounded-full transition-all ${
                canProceed()
                  ? 'bg-hlk-primary text-white hover:bg-hlk-primary-dark active:scale-[0.98]'
                  : 'bg-hlk-border text-hlk-text-tertiary cursor-not-allowed'
              }`}
            >
              다음
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
