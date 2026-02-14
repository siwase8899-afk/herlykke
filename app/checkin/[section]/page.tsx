'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { SeverityScale } from '../../../components/ui/SeverityScale';
import { Button } from '../../../components/ui/Button';
import { useCheckinStore } from '../../../stores/checkinStore';
import { getQuestionsBySection, SECTIONS } from '../../../lib/questions';
import { SYMPTOM_CHARACTERS } from '@/lib/characters';

// 섹션별 유머러스한 응원 메시지
const sectionEncouragement: Record<number, { emoji: string; message: string }> = {
  1: { emoji: '🌱', message: '시작이 반이에요!' },
  2: { emoji: '💪', message: '증상 파악 중... 곧 친구를 찾아드릴게요!' },
  3: { emoji: '🎯', message: '거의 다 왔어요!' },
  4: { emoji: '🧠', message: '마음도 중요해요' },
  5: { emoji: '🎉', message: '마지막 단계!' },
};

export default function CheckinSection() {
  const params = useParams();
  const router = useRouter();
  const store = useCheckinStore();
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [showCharacter, setShowCharacter] = useState<string | null>(null);

  const sectionNum = Number(params.section);
  const sectionMeta = SECTIONS[sectionNum - 1];
  const questions = getQuestionsBySection(sectionNum);
  const current = questions[step];

  useEffect(() => {
    setHydrated(true);
  }, []);

  // 증상 선택 시 캐릭터 표시
  useEffect(() => {
    if (showCharacter) {
      const timer = setTimeout(() => setShowCharacter(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [showCharacter]);

  if (!hydrated || !current || !sectionMeta) {
    return (
      <div className="min-h-screen bg-[#1a2744] flex items-center justify-center">
        <div className="text-white/60">불러오는 중...</div>
      </div>
    );
  }

  // 현재 질문의 글로벌 번호 계산
  const globalQuestionNum = SECTIONS.slice(0, sectionNum - 1)
    .reduce((sum, s) => sum + s.questionCount, 0) + step + 1;

  // 현재 값 가져오기
  const getValue = (): unknown => {
    return store[current.storeField as keyof typeof store];
  };

  // 값 설정 (캐릭터 표시 포함)
  const setValue = (value: string) => {
    // 증상 관련 질문인지 확인
    if (current.storeAction === 'toggleSymptom' || current.storeField?.includes('symptom')) {
      const matchedChar = SYMPTOM_CHARACTERS.find(c =>
        value.toLowerCase().includes(c.id) ||
        c.name.includes(value) ||
        value.includes(c.name)
      );
      if (matchedChar) {
        setShowCharacter(matchedChar.id);
      }
    }

    if (current.type === 'boolean') {
      store.setField(current.storeField as 'communityOptIn', value === 'true');
    } else if (current.storeAction === 'toggleSymptom') {
      store.toggleSymptom(current.storeActionArg as 'physical' | 'emotional', value);
    } else if (current.storeAction === 'toggleManagement') {
      store.toggleManagement(value);
    } else if (current.storeAction === 'toggleDesiredHelp') {
      store.toggleDesiredHelp(value);
    } else {
      store.setField(current.storeField as keyof typeof store, value as never);
    }
  };

  const setScaleValue = (value: number) => {
    store.setField(current.storeField as keyof typeof store, value as never);
  };

  const setTextValue = (value: string) => {
    store.setField(current.storeField as keyof typeof store, value as never);
  };

  // 다음으로 갈 수 있는지 확인
  const canNext = (): boolean => {
    const val = getValue();
    switch (current.type) {
      case 'single':
        return typeof val === 'string' && val.length > 0;
      case 'multi':
        return Array.isArray(val) && val.length > 0;
      case 'text':
        if (current.storeField === 'nickname') {
          return typeof val === 'string' && val.trim().length >= 2;
        }
        return typeof val === 'string' && val.length > 0;
      case 'scale':
        return true;
      case 'boolean':
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else if (sectionNum < 5) {
      store.setSection(sectionNum + 1);
      router.push(`/checkin/${sectionNum + 1}`);
    } else {
      router.push('/result');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else if (sectionNum > 1) {
      router.push(`/checkin/${sectionNum - 1}`);
    } else {
      router.push('/checkin');
    }
  };

  const nextLabel = () => {
    if (step < questions.length - 1) return '다음';
    if (sectionNum < 5) return `섹션 ${sectionNum + 1}로 →`;
    return '결과 보기';
  };

  const activeCharacter = showCharacter
    ? SYMPTOM_CHARACTERS.find(c => c.id === showCharacter)
    : null;

  return (
    <div className="min-h-screen bg-[#1a2744]">
      <div className="max-w-md mx-auto px-5 py-6">
        {/* 헤더 */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="text-alma-accent text-[15px] font-medium mb-3 cursor-pointer hover:opacity-70 py-1"
          >
            ← 뒤로
          </button>
          <ProgressBar current={globalQuestionNum} total={19} />
        </div>

        {/* 섹션 라벨 + 응원 메시지 */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-alma-accent font-semibold">
            {sectionMeta.emoji} 섹션 {sectionNum}: {sectionMeta.label}
          </div>
          <div className="text-xs text-white/50">
            {sectionEncouragement[sectionNum]?.message}
          </div>
        </div>

        {/* 캐릭터 팝업 (증상 선택 시) */}
        {activeCharacter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-[#1a2744]/95 backdrop-blur-sm rounded-3xl p-6 border border-white/20 text-center animate-bounce-in">
              <div className="text-6xl mb-2">{activeCharacter.emoji}</div>
              <p className="text-white font-bold">{activeCharacter.nickname}</p>
              <p className="text-alma-accent text-sm">&ldquo;{activeCharacter.tagline}&rdquo;</p>
            </div>
          </div>
        )}

        {/* 질문 카드 */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6">
          <h2 className="text-xl font-bold text-white leading-snug mb-2">
            {current.question}
          </h2>
          {current.hint && (
            <p className="text-sm text-white/60">
              {current.hint}
            </p>
          )}
        </div>

        {/* 답변 영역 */}
        <div className="mb-8">
          {/* 단일 선택 */}
          {current.type === 'single' && current.options && (
            <div className="space-y-3">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setValue(opt.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                    getValue() === opt.value
                      ? 'bg-alma-accent/20 border-alma-accent text-white'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
                  <span className="text-[15px] text-left">{opt.label}</span>
                  {getValue() === opt.value && (
                    <svg className="w-5 h-5 ml-auto text-alma-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* 다중 선택 */}
          {current.type === 'multi' && current.options && (
            <div className="space-y-3">
              {current.options.map((opt) => {
                const isSelected = (getValue() as string[]).includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => setValue(opt.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-alma-accent/20 border-alma-accent text-white'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
                    <span className="text-[15px] text-left flex-1">{opt.label}</span>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? 'bg-alma-accent border-alma-accent' : 'border-white/30'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* 텍스트 입력 */}
          {current.type === 'text' && (
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[15px] text-white min-h-[100px] resize-none mt-2 focus:outline-none focus:border-alma-accent transition-colors placeholder:text-white/30"
              placeholder={current.placeholder}
              value={getValue() as string}
              onChange={(e) => setTextValue(e.target.value)}
              maxLength={current.maxLength}
            />
          )}

          {/* 스케일 */}
          {current.type === 'scale' && current.scaleLabels && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <SeverityScale
                value={getValue() as number}
                onChange={setScaleValue}
                labels={current.scaleLabels}
              />
            </div>
          )}

          {/* 불리언 (커뮤니티 참여) */}
          {current.type === 'boolean' && current.options && (
            <div className="space-y-3">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setValue(opt.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                    String(getValue()) === opt.value
                      ? 'bg-alma-accent/20 border-alma-accent text-white'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
                  <span className="text-[15px] text-left">{opt.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* 닉네임 유효성 */}
          {current.storeField === 'nickname' && (getValue() as string).length > 0 && (getValue() as string).length < 2 && (
            <p className="text-sm text-red-400 mt-2 text-center">
              2자 이상 입력해 주세요
            </p>
          )}
        </div>

        {/* 다음 버튼 */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!canNext()}
          className="w-full bg-alma-accent hover:bg-alma-accent/90 disabled:bg-white/10 disabled:text-white/30"
        >
          {nextLabel()}
        </Button>

        {/* 유머러스한 하단 텍스트 */}
        <p className="text-center text-white/30 text-xs mt-4">
          {globalQuestionNum <= 5 && '천천히 하셔도 돼요 🐢'}
          {globalQuestionNum > 5 && globalQuestionNum <= 12 && '절반 넘었어요! 👏'}
          {globalQuestionNum > 12 && globalQuestionNum <= 17 && '거의 다 왔어요! 🏃‍♀️'}
          {globalQuestionNum > 17 && '마지막 스퍼트! 🎯'}
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
