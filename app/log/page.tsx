'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  SYMPTOMS,
  ACTIVITIES,
  MOOD_TAGS,
  CONDITION_LEVELS,
  type SymptomId,
  type ActivityId,
  type MoodTagId,
} from '@/lib/dailyLogConstants';

export default function DailyLogPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [isComplete, setIsComplete] = useState(false);

  // Form state
  const [condition, setCondition] = useState<number | null>(null);
  const [symptoms, setSymptoms] = useState<SymptomId[]>([]);
  const [symptomIntensity, setSymptomIntensity] = useState<number>(3);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [sleepQuality, setSleepQuality] = useState<number>(3);
  const [activities, setActivities] = useState<ActivityId[]>([]);
  const [moodTags, setMoodTags] = useState<MoodTagId[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleSymptom = (id: SymptomId) => {
    setSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleActivity = (id: ActivityId) => {
    setActivities(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleMood = (id: MoodTagId) => {
    setMoodTags(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!isSupabaseConfigured) {
      // Demo mode
      setTimeout(() => {
        setLoading(false);
        setIsComplete(true);
      }, 1000);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { error } = await supabase.from('daily_logs').upsert({
        user_id: user.id,
        log_date: new Date().toISOString().split('T')[0],
        overall_condition: condition,
        symptoms,
        symptom_intensity: symptoms.length > 0 ? symptomIntensity : null,
        sleep_hours: sleepHours,
        sleep_quality: sleepQuality,
        activities,
        mood_tags: moodTags,
        notes: notes || null,
      });

      if (error) throw error;
      setIsComplete(true);
    } catch (error) {
      console.error('Error saving log:', error);
      alert('저장 중 오류가 발생했어요. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return condition !== null;
      case 2: return true; // symptoms are optional
      case 3: return true; // sleep is optional
      case 4: return true; // activities are optional
      case 5: return true; // mood/notes are optional
      default: return false;
    }
  };

  // 완료 화면
  if (isComplete) {
    const conditionInfo = CONDITION_LEVELS.find(c => c.value === condition);
    const symptomLabels = symptoms.map(s => SYMPTOMS.find(sym => sym.id === s)?.label).filter(Boolean);
    const activityLabels = activities.map(a => ACTIVITIES.find(act => act.id === a)?.label).filter(Boolean);

    return (
      <div className="min-h-screen bg-alma-bg flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center px-5 py-8">
          {/* Success Animation */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-alma-primary to-alma-accent flex items-center justify-center mb-6 animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-alma-text mb-2 text-center">
            오늘의 기록 완료!
          </h1>
          <p className="text-alma-text-secondary text-center mb-8">
            기록을 바탕으로 AI가 맞춤 인사이트를 준비했어요
          </p>

          {/* Summary Card */}
          <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-alma-border mb-8">
            <h2 className="font-semibold text-alma-text mb-4">오늘의 기록 요약</h2>

            <div className="space-y-4">
              {/* Condition */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{conditionInfo?.emoji}</span>
                <div>
                  <p className="text-sm text-alma-text-tertiary">컨디션</p>
                  <p className="font-medium text-alma-text">{conditionInfo?.label}</p>
                </div>
              </div>

              {/* Symptoms */}
              {symptomLabels.length > 0 && (
                <div>
                  <p className="text-sm text-alma-text-tertiary mb-2">오늘의 증상</p>
                  <div className="flex flex-wrap gap-2">
                    {symptomLabels.map((label, i) => (
                      <span key={i} className="px-3 py-1 bg-alma-primary-light text-alma-primary rounded-full text-sm">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sleep */}
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-alma-text-tertiary">수면</p>
                  <p className="font-medium text-alma-text">{sleepHours}시간</p>
                </div>
                <div className="w-px h-8 bg-alma-border" />
                <div>
                  <p className="text-sm text-alma-text-tertiary">수면 품질</p>
                  <p className="font-medium text-alma-text">
                    {sleepQuality === 1 ? '😫' : sleepQuality === 2 ? '😔' : sleepQuality === 3 ? '😐' : sleepQuality === 4 ? '🙂' : '😴'}
                  </p>
                </div>
              </div>

              {/* Activities */}
              {activityLabels.length > 0 && (
                <div>
                  <p className="text-sm text-alma-text-tertiary mb-2">오늘의 활동</p>
                  <div className="flex flex-wrap gap-2">
                    {activityLabels.map((label, i) => (
                      <span key={i} className="px-3 py-1 bg-alma-accent-light text-alma-accent-dark rounded-full text-sm">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps CTA */}
          <div className="w-full max-w-md space-y-3">
            <Link
              href="/insights"
              className="block w-full py-4 bg-white border-2 border-alma-primary text-alma-primary font-bold rounded-xl text-center hover:bg-alma-primary-light transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>내 패턴 분석 보기</span>
              </div>
            </Link>

            <Link
              href="/solutions"
              className="block w-full py-4 bg-gradient-to-r from-alma-primary to-alma-accent text-white font-bold rounded-xl text-center hover:opacity-90 transition-all shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">AI</span>
                <span>맞춤 솔루션 추천받기</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>

            <Link
              href="/match"
              className="block w-full py-4 bg-white border border-alma-border text-alma-text font-medium rounded-xl text-center hover:bg-alma-bg transition-all"
            >
              비슷한 친구 찾아보기
            </Link>

            <Link
              href="/dashboard"
              className="block w-full py-3 text-alma-text-tertiary text-center hover:text-alma-text transition-colors"
            >
              대시보드로 가기
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alma-bg flex flex-col">
      {/* Header */}
      <header className="px-5 py-4 border-b border-alma-border bg-white">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-alma-text-tertiary hover:text-alma-text transition-colors">
            ← 돌아가기
          </Link>
          <span className="text-sm text-alma-text-secondary">
            {step} / {totalSteps}
          </span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-alma-border">
        <div
          className="h-full bg-alma-primary transition-all duration-300"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-8">
        {/* Step 1: Overall Condition */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-alma-text mb-2">
                오늘 컨디션은 어떠세요?
              </h1>
              <p className="text-alma-text-secondary">
                전반적인 오늘의 몸과 마음 상태를 선택해주세요
              </p>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {CONDITION_LEVELS.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setCondition(level.value)}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                    condition === level.value
                      ? 'border-alma-primary bg-alma-primary-light'
                      : 'border-alma-border bg-white hover:border-alma-primary/30'
                  }`}
                >
                  <span className="text-3xl mb-2">{level.emoji}</span>
                  <span className="text-xs text-alma-text-secondary text-center">{level.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Symptoms */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-alma-text mb-2">
                오늘 느낀 증상이 있나요?
              </h1>
              <p className="text-alma-text-secondary">
                해당하는 증상을 모두 선택해주세요 (없으면 건너뛰기)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {SYMPTOMS.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    symptoms.includes(symptom.id)
                      ? 'border-alma-primary bg-alma-primary-light'
                      : 'border-alma-border bg-white hover:border-alma-primary/30'
                  }`}
                >
                  <span className="text-2xl">{symptom.icon}</span>
                  <span className="font-medium text-alma-text">{symptom.label}</span>
                </button>
              ))}
            </div>

            {symptoms.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-alma-border">
                <p className="text-sm font-medium text-alma-text mb-4">증상 강도는 어느 정도인가요?</p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSymptomIntensity(level)}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                        symptomIntensity === level
                          ? 'bg-alma-primary text-white'
                          : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-alma-text-tertiary">
                  <span>약함</span>
                  <span>심함</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Sleep */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-alma-text mb-2">
                어젯밤 수면은 어땠나요?
              </h1>
              <p className="text-alma-text-secondary">
                수면 시간과 품질을 알려주세요
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-alma-border space-y-6">
              <div>
                <p className="text-sm font-medium text-alma-text mb-4">수면 시간</p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="0.5"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-alma-border rounded-lg appearance-none cursor-pointer accent-alma-primary"
                  />
                  <span className="text-2xl font-bold text-alma-primary w-20 text-center">
                    {sleepHours}시간
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-alma-text mb-4">수면 품질</p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSleepQuality(level)}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                        sleepQuality === level
                          ? 'bg-alma-primary text-white'
                          : 'bg-alma-bg text-alma-text-secondary hover:bg-alma-border'
                      }`}
                    >
                      {level === 1 ? '😫' : level === 2 ? '😔' : level === 3 ? '😐' : level === 4 ? '🙂' : '😴'}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-alma-text-tertiary">
                  <span>뒤척임</span>
                  <span>숙면</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Activities */}
        {step === 4 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-alma-text mb-2">
                오늘 어떤 활동을 했나요?
              </h1>
              <p className="text-alma-text-secondary">
                해당하는 활동을 모두 선택해주세요
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {ACTIVITIES.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => toggleActivity(activity.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    activities.includes(activity.id)
                      ? 'border-alma-accent bg-alma-accent-light'
                      : 'border-alma-border bg-white hover:border-alma-accent/30'
                  }`}
                >
                  <span className="text-2xl">{activity.icon}</span>
                  <span className="font-medium text-alma-text">{activity.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Mood & Notes */}
        {step === 5 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-alma-text mb-2">
                오늘의 기분은 어땠나요?
              </h1>
              <p className="text-alma-text-secondary">
                해당하는 기분을 선택하고 메모를 남겨보세요
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {MOOD_TAGS.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => toggleMood(mood.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    moodTags.includes(mood.id)
                      ? mood.color + ' ring-2 ring-offset-2 ring-alma-primary'
                      : mood.color + ' opacity-60 hover:opacity-100'
                  }`}
                >
                  {mood.label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-alma-border">
              <p className="text-sm font-medium text-alma-text mb-3">오늘의 메모 (선택)</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="오늘 특별히 기억하고 싶은 것이 있다면 적어주세요..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-alma-border focus:border-alma-primary focus:ring-2 focus:ring-alma-primary/20 outline-none transition-all resize-none"
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 px-5 py-4 border-t border-alma-border bg-white">
        <div className="max-w-2xl mx-auto flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl border border-alma-border text-alma-text font-medium hover:bg-alma-bg transition-all"
            >
              이전
            </button>
          )}
          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex-1 py-3 bg-alma-primary text-white font-bold rounded-xl hover:bg-alma-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              다음
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-3 bg-alma-primary text-white font-bold rounded-xl hover:bg-alma-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? '저장 중...' : '기록 완료'}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
