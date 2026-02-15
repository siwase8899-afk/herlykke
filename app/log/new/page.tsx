'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogStore } from '@/stores/logStore';
import { MoodSelector } from '@/components/log/MoodSelector';
import { SymptomPicker } from '@/components/log/SymptomPicker';
import { SleepInput } from '@/components/log/SleepInput';
import { ActivityTags } from '@/components/log/ActivityTags';
import { SYMPTOMS } from '@/lib/logTypes';
import { MOOD_TAGS } from '@/lib/dailyLogConstants';

const STEPS = ['mood', 'symptoms', 'sleep', 'activities', 'note'] as const;
type Step = (typeof STEPS)[number];

export default function NewLogPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('mood');
  const [note, setNote] = useState('');

  const {
    draft,
    setMood,
    toggleMoodTag,
    addSymptom,
    removeSymptom,
    updateSymptomSeverity,
    setSleep,
    toggleActivity,
    saveLog,
  } = useLogStore();

  const currentStepIndex = STEPS.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const canProceed = () => {
    switch (currentStep) {
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
    saveLog();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-alma-primary-light via-alma-bg to-alma-accent-light">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-alma-border">
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            {currentStepIndex > 0 ? (
              <button
                onClick={handleBack}
                className="p-2 -ml-2 text-alma-text-secondary hover:text-alma-text"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <Link
                href="/log"
                className="p-2 -ml-2 text-alma-text-secondary hover:text-alma-text"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
            )}

            <div className="text-center">
              <p className="text-xs text-alma-text-tertiary">{dateStr}</p>
              <p className="text-sm font-semibold text-alma-text">오늘의 기록</p>
            </div>

            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-alma-border rounded-full overflow-hidden">
            <div
              className="h-full bg-alma-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-alma-text-tertiary text-center mt-2">
            {currentStepIndex + 1} / {STEPS.length}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto px-5 py-8">
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

        {currentStep === 'sleep' && (
          <SleepInput value={draft.sleep} onChange={setSleep} />
        )}

        {currentStep === 'activities' && (
          <ActivityTags selected={draft.activities} onToggle={toggleActivity} />
        )}

        {currentStep === 'note' && (
          <div>
            <h2 className="text-2xl font-bold text-alma-text mb-3 text-center">
              오늘 기억하고 싶은 것이 있나요?
            </h2>
            <p className="text-alma-text-secondary mb-8 text-center">
              자유롭게 메모해주세요 (선택)
            </p>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="오늘 특별히 기억하고 싶은 것, 느낀 점 등을 자유롭게 적어주세요..."
              className="w-full h-40 p-4 rounded-2xl border border-alma-border text-alma-text placeholder-alma-text-tertiary focus:outline-none focus:border-alma-primary resize-none"
            />

            {/* 요약 미리보기 */}
            <div className="mt-6 bg-white rounded-2xl p-5 border border-alma-border">
              <p className="text-sm font-semibold text-alma-text mb-4">오늘의 기록 요약</p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-alma-text-tertiary">컨디션</span>
                  <span className="text-alma-text">
                    {draft.mood ? ['😫', '😕', '😐', '🙂', '😊'][draft.mood - 1] : '-'}
                  </span>
                </div>

                {draft.moodTags.length > 0 && (
                  <div className="flex justify-between items-start">
                    <span className="text-alma-text-tertiary flex-shrink-0">감정</span>
                    <div className="flex flex-wrap justify-end gap-1 ml-2">
                      {draft.moodTags.map((tagId) => {
                        const tag = MOOD_TAGS.find((t) => t.id === tagId);
                        return tag ? (
                          <span key={tagId} className="text-xs">{tag.emoji} {tag.label}</span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-alma-text-tertiary">증상</span>
                  <span className="text-alma-text">
                    {draft.symptoms.length > 0
                      ? draft.symptoms
                          .map((s) => SYMPTOMS.find((sym) => sym.id === s.symptomId)?.emoji)
                          .join(' ')
                      : '없음'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-alma-text-tertiary">수면</span>
                  <span className="text-alma-text">
                    {draft.sleep
                      ? `${draft.sleep.bedTime} ~ ${draft.sleep.wakeTime}`
                      : '-'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-alma-text-tertiary">활동</span>
                  <span className="text-alma-text">
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
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-alma-border">
        <div className="max-w-lg mx-auto px-5 py-4">
          {currentStep === 'note' ? (
            <button
              onClick={handleSave}
              className="w-full py-4 bg-alma-accent text-white font-bold rounded-full hover:bg-alma-accent/90 active:scale-[0.98] transition-all"
            >
              기록 완료하기 🎉
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`w-full py-4 font-bold rounded-full transition-all ${
                canProceed()
                  ? 'bg-alma-primary text-white hover:bg-alma-primary-dark active:scale-[0.98]'
                  : 'bg-alma-border text-alma-text-tertiary cursor-not-allowed'
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
