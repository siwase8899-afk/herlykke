'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SLEEP_QUESTIONS, classifySleepType, SLEEP_PROFILES, SleepQuestion } from '@/lib/sleepQuestions';

const TOTAL = SLEEP_QUESTIONS.length; // 5

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

  // 유효하지 않은 섹션이면 1로 리다이렉트
  useEffect(() => {
    if (isNaN(sectionNum) || sectionNum < 1 || sectionNum > TOTAL) {
      router.replace('/checkin/1');
    }
  }, [sectionNum, router]);

  // 이전 답변 불러오기 (sessionStorage)
  useEffect(() => {
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

  const handleSelect = (optionId: string) => {
    if (isMulti) {
      // '해당 없음' 선택 시 나머지 해제
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

    // 답변 저장
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    sessionStorage.setItem('sleep_checkin_answers', JSON.stringify(newAnswers));

    if (sectionNum < TOTAL) {
      setIsAnimating(true);
      setTimeout(() => {
        router.push(`/checkin/${sectionNum + 1}`);
      }, 200);
    } else {
      // 마지막 문항 → 결과 표시
      setShowResult(true);
    }
  };

  // 결과 화면
  if (showResult) {
    const profile = SLEEP_PROFILES[classifySleepType(answers)];
    return (
      <div className="min-h-screen bg-gradient-to-br from-hlk-primary-light via-hlk-bg to-hlk-accent-light">
        <div className="max-w-md mx-auto px-6 py-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✨</div>
            <h1 className="text-2xl font-bold text-hlk-text mb-2">체크인 완료!</h1>
            <p className="text-hlk-text-secondary">내 수면 유형을 확인했어요</p>
          </div>

          {/* 결과 카드 */}
          <div className="bg-white rounded-2xl p-6 border border-hlk-border shadow-lg mb-6">
            <div className="text-sm text-hlk-text-tertiary mb-1">나의 수면 유형</div>
            <h2 className="text-xl font-bold text-hlk-primary mb-3">{profile.label}</h2>
            <p className="text-hlk-text-secondary leading-relaxed">{profile.description}</p>
          </div>

          {/* 추천 레시피 안내 */}
          <div className="bg-hlk-accent-light rounded-2xl p-5 mb-8">
            <p className="text-sm font-medium text-hlk-accent mb-2">✨ 추천 수면 레시피 카테고리</p>
            <div className="flex flex-wrap gap-2">
              {profile.recommendedCategories.map((cat) => (
                <span key={cat} className="text-xs bg-white text-hlk-text px-3 py-1.5 rounded-full border border-hlk-border">
                  {cat === 'nutrition' ? '🌿 영양제·식품' :
                    cat === 'yoga_relax' ? '🧘‍♀️ 요가·이완' :
                    cat === 'environment' ? '🌙 수면 환경' : '📓 잠자리 루틴'}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <Link
              href="/recipes"
              className="w-full flex items-center justify-center gap-2 py-4 bg-hlk-primary text-white font-semibold rounded-2xl hover:bg-hlk-primary-dark transition-colors shadow-lg shadow-hlk-primary/20"
            >
              ✨ 맞춤 수면 레시피 보기
            </Link>
            <Link
              href="/community"
              className="w-full flex items-center justify-center gap-2 py-4 bg-white text-hlk-primary font-semibold rounded-2xl border-2 border-hlk-primary/20 hover:border-hlk-primary transition-colors"
            >
              💬 갱년기 동기들과 이야기하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-hlk-bg transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-md mx-auto px-6 py-10">
        {/* 상단 네비 */}
        <div className="flex items-center gap-3 mb-8">
          {sectionNum > 1 ? (
            <button
              onClick={() => router.push(`/checkin/${sectionNum - 1}`)}
              className="text-hlk-text-secondary hover:text-hlk-text"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <Link href="/checkin" className="text-hlk-text-secondary hover:text-hlk-text">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          {/* 진행률 바 */}
          <div className="flex-1 flex gap-1.5">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i < sectionNum ? 'bg-hlk-primary' : 'bg-hlk-border'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-hlk-text-tertiary">{sectionNum}/{TOTAL}</span>
        </div>

        {/* 질문 */}
        <div className="mb-8">
          <p className="text-sm text-hlk-text-tertiary mb-2">Q{sectionNum}</p>
          <h1 className="text-2xl font-bold text-hlk-text mb-1">{question.question}</h1>
          {question.subtext && (
            <p className="text-sm text-hlk-text-secondary">{question.subtext}</p>
          )}
        </div>

        {/* 선택지 */}
        <div className="flex flex-col gap-3 mb-10">
          {question.options.map((option) => {
            const active = isSelected(option.id);
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                  active
                    ? 'border-hlk-primary bg-hlk-primary-light text-hlk-primary'
                    : 'border-hlk-border bg-white text-hlk-text hover:border-hlk-primary/40'
                }`}
              >
                {option.emoji && <span className="text-2xl flex-shrink-0">{option.emoji}</span>}
                <span className="font-medium text-sm leading-snug">{option.label}</span>
                {active && (
                  <span className="ml-auto text-hlk-primary">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          disabled={!hasSelection}
          className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
            hasSelection
              ? 'bg-hlk-primary text-white hover:bg-hlk-primary-dark shadow-lg shadow-hlk-primary/20'
              : 'bg-hlk-border text-hlk-text-tertiary cursor-not-allowed'
          }`}
        >
          {sectionNum < TOTAL ? '다음 →' : '결과 확인하기 ✨'}
        </button>
      </div>
    </div>
  );
}
