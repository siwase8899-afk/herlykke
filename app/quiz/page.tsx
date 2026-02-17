'use client';

import { useState } from 'react';
import Link from 'next/link';
import { classifyPattern, QUIZ_SYMPTOMS, type QuizAnswers, type PatternResult } from '@/lib/quizLogic';

// Hims 인사이트: 퀴즈 = 전환 퍼널 (심리적 매몰 비용 → 전환률 증가)
// Noom 인사이트: 2단계 온보딩 (가치 먼저, 등록 나중에)
// Headspace 인사이트: Anti-anxiety 디자인 (뒤로가기 + 건너뛰기 + 안심 문구)

const AGE_RANGES = ['40-45세', '45-50세', '50-55세', '55세 이상'];
const COPING_OPTIONS = [
  { id: 'alone', label: '혼자 참고 있어요' },
  { id: 'hospital', label: '병원 진료를 받고 있어요' },
  { id: 'exercise', label: '운동으로 관리해요' },
  { id: 'supplement', label: '보조제/건기식 먹고 있어요' },
  { id: 'none', label: '아직 아무것도 안 했어요' },
];
const GROUP_OPTIONS = [
  { id: 'very', label: '매우 관심 있어요' },
  { id: 'somewhat', label: '조금 관심 있어요' },
  { id: 'unsure', label: '잘 모르겠어요' },
];

export default function QuizPage() {
  const [step, setStep] = useState(0); // 0-4: questions, 5: result
  const [answers, setAnswers] = useState<QuizAnswers>({
    ageRange: '',
    topSymptoms: [],
    dailyImpact: 3,
    currentCoping: '',
    groupInterest: '',
  });
  const [result, setResult] = useState<PatternResult | null>(null);

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Calculate result
      const patternResult = classifyPattern(answers);
      setResult(patternResult);
      setStep(5);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 0: return answers.ageRange !== '';
      case 1: return answers.topSymptoms.length >= 1 && answers.topSymptoms.length <= 3;
      case 2: return true; // slider always has value
      case 3: return answers.currentCoping !== '';
      case 4: return answers.groupInterest !== '';
      default: return false;
    }
  };

  const toggleSymptom = (id: string) => {
    setAnswers(prev => {
      const current = prev.topSymptoms;
      if (current.includes(id)) {
        return { ...prev, topSymptoms: current.filter(s => s !== id) };
      }
      if (current.length >= 3) return prev;
      return { ...prev, topSymptoms: [...current, id] };
    });
  };

  // Result screen
  if (step === 5 && result) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-hlk-primary-light via-white to-hlk-accent-light">
        <div className="max-w-lg mx-auto px-5 py-12">
          {/* Result Card */}
          <div className="bg-white rounded-3xl p-8 border border-hlk-border shadow-xl text-center">
            <p className="text-sm text-hlk-text-tertiary mb-2">나의 변화 패턴</p>
            <div className="text-6xl mb-4">{result.icon}</div>
            <h1 className="text-2xl font-bold text-hlk-text mb-2">{result.name}</h1>
            <p className="text-sm text-hlk-text-secondary leading-relaxed mb-6">
              {result.description}
            </p>

            {/* Stat */}
            <div className="bg-hlk-primary-light rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-hlk-primary">{result.stat}</p>
            </div>

            {/* Recommendation */}
            <div className="bg-hlk-bg rounded-xl p-4 mb-6 text-left">
              <p className="text-xs font-bold text-hlk-text-tertiary mb-2">맞춤 추천</p>
              <p className="text-sm text-hlk-text">{result.recommendation}</p>
            </div>

            {/* Social proof */}
            <p className="text-xs text-hlk-text-tertiary mb-8">
              같은 {result.name} <span className="font-bold text-hlk-accent">{result.userCount}명</span>이 HERLYKKE에서 케어 중
            </p>

            {/* CTAs */}
            <Link
              href="/checkin"
              className="block w-full px-8 py-4 bg-hlk-accent text-white text-lg font-bold rounded-full hover:bg-hlk-accent/90 active:scale-[0.98] transition-all shadow-lg shadow-hlk-accent/30 mb-3"
            >
              체크인으로 알아보기
            </Link>

            <a
              href="#kakao-channel"
              className="block w-full px-8 py-3 bg-[#FEE500] text-[#3C1E1E] text-sm font-medium rounded-full hover:bg-[#FDD835] transition-colors"
            >
              카카오톡에서 먼저 알림 받기
            </a>

            <Link
              href="/"
              className="block mt-4 text-sm text-hlk-text-tertiary hover:text-hlk-text transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-hlk-primary-light via-white to-hlk-accent-light">
      <div className="max-w-lg mx-auto px-5 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-xl font-bold text-hlk-primary">
            HERLYKKE
          </Link>
          <p className="text-sm text-hlk-text-tertiary mt-2">변화 패턴 분석</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-hlk-text-tertiary mb-2">
            <span>{step + 1}/{totalSteps}</span>
            <span>정답은 없어요, 솔직하게 답해주세요</span>
          </div>
          <div className="h-2 bg-hlk-border rounded-full overflow-hidden">
            <div
              className="h-full bg-hlk-primary rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-8 border border-hlk-border shadow-lg mb-6">
          {/* Step 1: Age */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-hlk-text mb-6">연령대를 알려주세요</h2>
              <div className="grid grid-cols-2 gap-3">
                {AGE_RANGES.map((age) => (
                  <button
                    key={age}
                    onClick={() => setAnswers({ ...answers, ageRange: age })}
                    className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                      answers.ageRange === age
                        ? 'border-hlk-primary bg-hlk-primary-light text-hlk-primary'
                        : 'border-hlk-border bg-white text-hlk-text hover:border-hlk-primary/30'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Symptoms */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-hlk-text mb-2">가장 힘든 증상을 골라주세요</h2>
              <p className="text-sm text-hlk-text-tertiary mb-6">최대 3개까지 선택 가능해요</p>
              <div className="grid grid-cols-2 gap-3">
                {QUIZ_SYMPTOMS.map((symptom) => {
                  const selected = answers.topSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selected
                          ? 'border-hlk-primary bg-hlk-primary-light'
                          : 'border-hlk-border bg-white hover:border-hlk-primary/30'
                      }`}
                    >
                      <span className="text-xl">{symptom.emoji}</span>
                      <p className={`text-sm font-medium mt-1 ${selected ? 'text-hlk-primary' : 'text-hlk-text'}`}>
                        {symptom.name}
                      </p>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-hlk-text-tertiary mt-3 text-center">
                선택: {answers.topSymptoms.length}/3
              </p>
            </div>
          )}

          {/* Step 3: Daily Impact */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-hlk-text mb-2">일상에 얼마나 영향을 주나요?</h2>
              <p className="text-sm text-hlk-text-tertiary mb-8">1(거의 없음) ~ 5(매우 심함)</p>
              <div className="flex justify-between gap-3">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setAnswers({ ...answers, dailyImpact: level })}
                    className={`flex-1 py-4 rounded-xl border-2 text-center font-bold transition-all ${
                      answers.dailyImpact === level
                        ? 'border-hlk-primary bg-hlk-primary text-white'
                        : 'border-hlk-border bg-white text-hlk-text hover:border-hlk-primary/30'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-hlk-text-tertiary mt-2">
                <span>거의 없음</span>
                <span>매우 심함</span>
              </div>
            </div>
          )}

          {/* Step 4: Current Coping */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-hlk-text mb-6">현재 어떻게 대처하고 있나요?</h2>
              <div className="space-y-3">
                {COPING_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setAnswers({ ...answers, currentCoping: option.id })}
                    className={`w-full p-4 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                      answers.currentCoping === option.id
                        ? 'border-hlk-primary bg-hlk-primary-light text-hlk-primary'
                        : 'border-hlk-border bg-white text-hlk-text hover:border-hlk-primary/30'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Group Interest */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-hlk-text mb-2">비슷한 여성들과의 그룹 프로그램에 관심이 있으신가요?</h2>
              <p className="text-sm text-hlk-text-tertiary mb-6">6명의 소규모 그룹으로 운영돼요</p>
              <div className="space-y-3">
                {GROUP_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setAnswers({ ...answers, groupInterest: option.id })}
                    className={`w-full p-4 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                      answers.groupInterest === option.id
                        ? 'border-hlk-primary bg-hlk-primary-light text-hlk-primary'
                        : 'border-hlk-border bg-white text-hlk-text hover:border-hlk-primary/30'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className={`text-sm text-hlk-text-tertiary hover:text-hlk-text transition-colors ${
              step === 0 ? 'invisible' : ''
            }`}
          >
            ← 뒤로
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
              canProceed()
                ? 'bg-hlk-primary text-white hover:bg-hlk-primary-dark active:scale-[0.98] shadow-lg'
                : 'bg-hlk-border text-hlk-text-tertiary cursor-not-allowed'
            }`}
          >
            {step === totalSteps - 1 ? '결과 보기' : '다음'}
          </button>
        </div>

        {/* Skip option — Headspace 인사이트: 언제든 건너뛸 수 있음 */}
        <div className="text-center mt-6">
          <Link
            href="/checkin"
            className="text-xs text-hlk-text-tertiary hover:text-hlk-text transition-colors"
          >
            퀴즈 건너뛰고 바로 체크인하기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
