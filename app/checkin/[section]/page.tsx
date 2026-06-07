'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SLEEP_QUESTIONS, classifySleepType, SLEEP_PROFILES, SleepQuestion } from '@/lib/sleepQuestions';

const TOTAL = SLEEP_QUESTIONS.length; // 5

// Supportive messages shown between questions
const STEP_MESSAGES: Record<number, { text: string; sub: string }> = {
  1: { text: '편하게 골라주세요', sub: '정답은 없어요' },
  2: { text: '혹시 이런 경험이 있으신가요?', sub: '해당되는 것만 골라주세요' },
  3: { text: '잘하고 있어요', sub: '벌써 절반 왔어요' },
  4: { text: '거의 다 왔어요!', sub: '마지막 두 문항이에요' },
  5: { text: '마지막 질문이에요', sub: '곧 맞춤 결과를 볼 수 있어요' },
};

// Calculate sleep readiness score from answers
function calculateSleepReadiness(answers: Record<string, string | string[]>): number {
  let score = 70; // base

  // Q1: Pattern — worse patterns lower score
  const q1 = answers['q1_pattern'];
  if (q1 === 'not_refreshed') score -= 15;
  else if (q1 === 'wake_up_middle') score -= 12;
  else if (q1 === 'early_wake') score -= 10;
  else if (q1 === 'hard_to_fall') score -= 8;

  // Q2: Menopause signals — each lowers score
  const q2 = answers['q2_menopause_signal'];
  if (Array.isArray(q2)) {
    const signalCount = q2.filter(v => v !== 'none_above').length;
    score -= signalCount * 5;
    if (q2.includes('none_above')) score += 5;
  }

  // Q3: Duration — longer = lower
  const q3 = answers['q3_duration'];
  if (q3 === 'always') score -= 10;
  else if (q3 === 'over_6months') score -= 7;
  else if (q3 === '3to6months') score -= 3;

  // Q4: Tried solutions — effort is positive
  const q4 = answers['q4_tried'];
  if (Array.isArray(q4)) {
    const triedCount = q4.filter(v => v !== 'nothing').length;
    score += triedCount * 3;
  }

  return Math.max(20, Math.min(95, score));
}

// Determine stress level from answers
function calculateStressLevel(answers: Record<string, string | string[]>): { level: string; label: string; color: string } {
  const q2 = answers['q2_menopause_signal'];
  const menopauseSignals = Array.isArray(q2) ? q2.filter(v => v !== 'none_above').length : 0;
  const q3 = answers['q3_duration'];
  const isChronic = q3 === 'over_6months' || q3 === 'always';

  if (menopauseSignals >= 2 && isChronic) {
    return { level: 'high', label: '관리가 필요해요', color: '#D98B8B' };
  } else if (menopauseSignals >= 1 || isChronic) {
    return { level: 'moderate', label: '주의가 필요해요', color: '#E0C49A' };
  }
  return { level: 'low', label: '양호한 편이에요', color: '#6F9CA6' };
}

export default function CheckinSection() {
  const params = useParams();
  const router = useRouter();
  const sectionNum = parseInt(params.section as string, 10);
  const question: SleepQuestion | undefined = SLEEP_QUESTIONS[sectionNum - 1];

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [selected, setSelected] = useState<string | string[]>(
    question?.type === 'multi' ? [] : ''
  );
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, [sectionNum]);

  // Invalid section redirect
  useEffect(() => {
    if (isNaN(sectionNum) || sectionNum < 1 || sectionNum > TOTAL) {
      router.replace('/checkin/1');
    }
  }, [sectionNum, router]);

  // Load previous answers from sessionStorage
  useEffect(() => {
    setFadeIn(false);
    const saved = sessionStorage.getItem('sleep_checkin_answers');
    if (saved) {
      const parsedAnswers = JSON.parse(saved);
      setAnswers(parsedAnswers);
      const currentAnswer = parsedAnswers[question?.id];
      if (currentAnswer) {
        setSelected(currentAnswer);
      } else {
        setSelected(question?.type === 'multi' ? [] : '');
      }
    } else {
      setSelected(question?.type === 'multi' ? [] : '');
    }
  }, [question]);

  if (!question) return null;

  const isMulti = question.type === 'multi';
  const stepMsg = STEP_MESSAGES[sectionNum];

  const handleSelect = (optionId: string) => {
    if (isMulti) {
      if (optionId === 'none_above') {
        setSelected(['none_above']);
        return;
      }
      setSelected((prev) => {
        const arr = Array.isArray(prev) ? prev.filter((v) => v !== 'none_above') : [];
        return arr.includes(optionId)
          ? arr.filter((v) => v !== optionId)
          : [...arr, optionId];
      });
    } else {
      setSelected(optionId);
    }
  };

  const isSelected = (optionId: string) => {
    if (isMulti) return Array.isArray(selected) && selected.includes(optionId);
    return selected === optionId;
  };

  const hasSelection = isMulti
    ? Array.isArray(selected) && selected.length > 0
    : selected !== '';

  const handleNext = () => {
    if (!hasSelection) return;

    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    sessionStorage.setItem('sleep_checkin_answers', JSON.stringify(newAnswers));

    if (sectionNum < TOTAL) {
      setIsAnimating(true);
      setTimeout(() => {
        router.push(`/checkin/${sectionNum + 1}`);
      }, 200);
    } else {
      setShowResult(true);
    }
  };

  // ── Result Screen ──
  if (showResult) {
    const profile = SLEEP_PROFILES[classifySleepType(answers)];
    const sleepReadiness = calculateSleepReadiness(answers);
    const stress = calculateStressLevel(answers);

    // Readiness ring config
    const circumference = 2 * Math.PI * 54;
    const dashOffset = circumference - (sleepReadiness / 100) * circumference;
    const readinessColor = sleepReadiness >= 60 ? '#6F9CA6' : sleepReadiness >= 40 ? '#E0C49A' : '#D98B8B';

    return (
      <div className="min-h-screen bg-gradient-to-b from-hlk-primary-light via-hlk-bg to-hlk-bg">
        <div className="max-w-md mx-auto px-6 py-10">
          {/* Completion message */}
          <div className="text-center mb-10">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-hlk-highlight/20 rounded-full blur-lg" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-hlk-primary-light to-hlk-accent-light rounded-full flex items-center justify-center border border-white/60 shadow-md">
                <svg className="w-8 h-8 text-hlk-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-hlk-text mb-2">수고하셨어요!</h1>
            <p className="text-hlk-text-secondary text-sm">
              당신의 수면 상태를 분석했어요
            </p>
          </div>

          {/* Sleep Readiness Score — circular gauge */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-hlk-border/60 shadow-lg mb-5">
            <p className="text-xs font-semibold text-hlk-text-tertiary tracking-widest uppercase text-center mb-6">
              Sleep Readiness Score
            </p>
            <div className="relative w-36 h-36 mx-auto mb-6">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E5E5" strokeWidth="6" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke={readinessColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-hlk-text">{sleepReadiness}</span>
                <span className="text-xs text-hlk-text-tertiary">/ 100</span>
              </div>
            </div>
            <p className="text-center text-sm text-hlk-text-secondary">
              {sleepReadiness >= 60
                ? '아직 충분히 회복할 수 있어요'
                : sleepReadiness >= 40
                  ? '관리를 시작하면 빨리 좋아질 수 있어요'
                  : '지금부터 함께 관리해요'}
            </p>
          </div>

          {/* Stress Level Indicator */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-hlk-border/60 shadow-lg mb-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-hlk-text">스트레스 수준</p>
              <span
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ backgroundColor: stress.color + '18', color: stress.color }}
              >
                {stress.label}
              </span>
            </div>
            <div className="w-full h-2 bg-hlk-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: stress.level === 'high' ? '85%' : stress.level === 'moderate' ? '55%' : '25%',
                  backgroundColor: stress.color,
                }}
              />
            </div>
            <p className="text-xs text-hlk-text-tertiary mt-2">
              {stress.level === 'high'
                ? '수면과 스트레스가 서로 영향을 줄 수 있어요'
                : stress.level === 'moderate'
                  ? '가벼운 루틴 변화로 개선될 수 있어요'
                  : '좋은 상태예요. 유지가 중요해요'}
            </p>
          </div>

          {/* Sleep Type Result */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-hlk-border/60 shadow-lg mb-5">
            <p className="text-xs text-hlk-text-tertiary mb-1">나의 수면 유형</p>
            <h2 className="text-lg font-bold text-hlk-primary mb-3">{profile.label}</h2>
            <p className="text-sm text-hlk-text-secondary leading-relaxed">{profile.description}</p>
          </div>

          {/* Recommended categories */}
          <div className="bg-hlk-accent-light/50 rounded-3xl p-6 mb-8">
            <p className="text-sm font-semibold text-hlk-text mb-3">맞춤 수면 레시피 카테고리</p>
            <div className="flex flex-wrap gap-2">
              {profile.recommendedCategories.map((cat) => (
                <span key={cat} className="text-xs bg-white/80 text-hlk-text px-3 py-1.5 rounded-full border border-hlk-border/60">
                  {cat === 'nutrition' ? '🌿 영양제·식품' :
                    cat === 'yoga_relax' ? '🧘‍♀️ 요가·이완' :
                    cat === 'environment' ? '🌙 수면 환경' : '📓 잠자리 루틴'}
                </span>
              ))}
            </div>
          </div>

          {/* Gentle supportive message */}
          <div className="bg-hlk-primary-light/50 rounded-2xl p-5 mb-8 text-center">
            <p className="text-sm text-hlk-text-secondary leading-relaxed">
              혼자 고민하지 않아도 돼요.
              <br />
              <span className="font-semibold text-hlk-primary">먼저 겪은 메이트들</span>이 기다리고 있어요.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <Link
              href="/recipes"
              className="group w-full flex items-center justify-center gap-2 py-4 bg-hlk-primary text-white font-semibold rounded-2xl hover:bg-hlk-primary-dark transition-all duration-300 shadow-lg shadow-hlk-primary/15 hover:-translate-y-0.5"
            >
              맞춤 수면 레시피 보기
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/community"
              className="w-full flex items-center justify-center gap-2 py-4 bg-white text-hlk-text font-medium rounded-2xl border border-hlk-border hover:border-hlk-primary/40 transition-all duration-300"
            >
              같은 경험의 동료들과 이야기하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Question Screen ──
  return (
    <div className={`min-h-screen bg-gradient-to-b from-hlk-primary-light/30 via-hlk-bg to-hlk-bg transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
      <div className="max-w-md mx-auto px-6 py-10">
        {/* Top nav */}
        <div className="flex items-center gap-3 mb-6">
          {sectionNum > 1 ? (
            <button
              onClick={() => router.push(`/checkin/${sectionNum - 1}`)}
              className="w-9 h-9 rounded-full bg-white/80 border border-hlk-border/60 flex items-center justify-center text-hlk-text-secondary hover:text-hlk-text transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <Link href="/checkin" className="w-9 h-9 rounded-full bg-white/80 border border-hlk-border/60 flex items-center justify-center text-hlk-text-secondary hover:text-hlk-text transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}

          {/* Progress bar */}
          <div className="flex-1 flex gap-1.5">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i < sectionNum ? 'bg-hlk-primary' : 'bg-hlk-border'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-hlk-text-tertiary font-medium">{sectionNum}/{TOTAL}</span>
        </div>

        {/* Supportive step message */}
        <div className={`mb-6 transition-all duration-500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <p className="text-xs text-hlk-accent font-semibold tracking-wide">{stepMsg.sub}</p>
        </div>

        {/* Question */}
        <div className={`mb-8 transition-all duration-500 delay-100 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <h1 className="text-2xl font-extrabold text-hlk-text leading-snug mb-2">{question.question}</h1>
          {question.subtext && (
            <p className="text-sm text-hlk-text-secondary">{question.subtext}</p>
          )}
        </div>

        {/* Options */}
        <div className={`flex flex-col gap-3 mb-8 transition-all duration-500 delay-200 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {question.options.map((option, i) => {
            const active = isSelected(option.id);
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-200 ${
                  active
                    ? 'border-hlk-primary bg-hlk-primary-light/60 shadow-md shadow-hlk-primary/5'
                    : 'border-hlk-border/60 bg-white/80 backdrop-blur-sm hover:border-hlk-primary/30 hover:bg-white'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {option.emoji && (
                  <span className={`text-2xl flex-shrink-0 transition-transform duration-200 ${active ? 'scale-110' : ''}`}>
                    {option.emoji}
                  </span>
                )}
                <span className={`font-medium text-sm leading-snug ${active ? 'text-hlk-primary' : 'text-hlk-text'}`}>
                  {option.label}
                </span>
                {active && (
                  <span className="ml-auto text-hlk-primary flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <div className={`transition-all duration-500 delay-300 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={handleNext}
            disabled={!hasSelection}
            className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
              hasSelection
                ? 'bg-hlk-primary text-white hover:bg-hlk-primary-dark shadow-lg shadow-hlk-primary/15 hover:-translate-y-0.5'
                : 'bg-hlk-border/50 text-hlk-text-tertiary cursor-not-allowed'
            }`}
          >
            {sectionNum < TOTAL ? '다음' : '결과 확인하기'}
          </button>

          {/* Encouraging micro-text */}
          <p className="text-center text-xs text-hlk-text-tertiary mt-3">
            {stepMsg.text}
          </p>
        </div>
      </div>
    </div>
  );
}
