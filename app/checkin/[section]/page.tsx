'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { SeverityScale } from '../../../components/ui/SeverityScale';
import { Button } from '../../../components/ui/Button';
import { useCheckinStore } from '../../../stores/checkinStore';
import { getQuestionsBySection, SECTIONS } from '../../../lib/questions';
import { SYMPTOM_CHARACTERS } from '@/lib/characters';
import { PhysicalSymptoms } from '@/lib/constants';

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
      <div className="min-h-screen bg-gradient-to-br from-hlk-primary-light via-hlk-bg to-hlk-accent-light flex items-center justify-center">
        <div className="text-hlk-text-secondary">불러오는 중...</div>
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
      case 'severity':
        return true; // 심각도는 기본값 0이므로 항상 진행 가능
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
    <div className="min-h-screen bg-gradient-to-br from-hlk-primary-light via-hlk-bg to-hlk-accent-light">
      <div className="max-w-md mx-auto px-6 md:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="text-hlk-primary text-[15px] font-medium mb-3 cursor-pointer hover:opacity-70 py-1"
          >
            ← 뒤로
          </button>
          <ProgressBar current={globalQuestionNum} total={20} />
        </div>

        {/* Duolingo 인사이트: 섹션 라벨 + 마일스톤 응원 메시지 */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-hlk-primary font-semibold">
            {sectionMeta.emoji} 섹션 {sectionNum}: {sectionMeta.label}
          </div>
          <div className="text-xs text-hlk-text-tertiary">
            {sectionEncouragement[sectionNum]?.message}
          </div>
        </div>

        {/* Duolingo 인사이트: 7일 마일스톤 미리보기 (첫 섹션에서만) */}
        {sectionNum === 1 && step === 0 && (
          <div className="bg-hlk-accent-light rounded-xl p-3 mb-4 flex items-center gap-3">
            <div className="text-2xl">🔥</div>
            <div>
              <p className="text-sm font-semibold text-hlk-text">7일 연속 체크인 챌린지</p>
              <p className="text-xs text-hlk-text-tertiary">매일 체크인하면 특별한 리포트를 드려요</p>
            </div>
          </div>
        )}

        {/* 캐릭터 팝업 (증상 선택 시) */}
        {activeCharacter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-hlk-border shadow-xl text-center animate-bounce-in">
              {activeCharacter.image ? (
                <div className="w-24 h-24 mx-auto mb-2">
                  <Image
                    src={activeCharacter.image}
                    alt={activeCharacter.nickname}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="text-6xl mb-2">{activeCharacter.emoji}</div>
              )}
              <p className="text-hlk-text font-bold">{activeCharacter.nickname}</p>
              <p className="text-hlk-accent text-sm">&ldquo;{activeCharacter.tagline}&rdquo;</p>
            </div>
          </div>
        )}

        {/* 질문 카드 */}
        <div className="bg-white rounded-2xl p-5 border border-hlk-border shadow-sm mb-6">
          <h2 className="text-xl font-bold text-hlk-text leading-snug mb-2">
            {current.question}
          </h2>
          {current.hint && (
            <p className="text-sm text-hlk-text-tertiary">
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
                      ? 'bg-hlk-primary-light border-hlk-primary text-hlk-text'
                      : 'bg-white border-hlk-border text-hlk-text-secondary hover:bg-hlk-bg'
                  }`}
                >
                  {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
                  <span className="text-[15px] text-left">{opt.label}</span>
                  {getValue() === opt.value && (
                    <svg className="w-5 h-5 ml-auto text-hlk-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* 다중 선택 — Noom 인사이트: 증상 선택 시 신호등 힌트 */}
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
                        ? 'bg-hlk-primary-light border-hlk-primary text-hlk-text'
                        : 'bg-white border-hlk-border text-hlk-text-secondary hover:bg-hlk-bg'
                    }`}
                  >
                    {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
                    <span className="text-[15px] text-left flex-1">{opt.label}</span>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? 'bg-hlk-primary border-hlk-primary' : 'border-hlk-border'
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
              className="w-full bg-white border border-hlk-border rounded-xl px-4 py-3.5 text-[15px] text-hlk-text min-h-[100px] resize-none mt-2 focus:outline-none focus:border-hlk-primary transition-colors placeholder:text-hlk-text-tertiary"
              placeholder={current.placeholder}
              value={getValue() as string}
              onChange={(e) => setTextValue(e.target.value)}
              maxLength={current.maxLength}
            />
          )}

          {/* 스케일 */}
          {current.type === 'scale' && current.scaleLabels && (
            <div className="bg-white rounded-xl p-4 border border-hlk-border">
              <SeverityScale
                value={getValue() as number}
                onChange={setScaleValue}
                labels={current.scaleLabels}
              />
            </div>
          )}

          {/* 증상별 심각도 (쿠퍼만 지수용) */}
          {current.type === 'severity' && (() => {
            const selectedSymptoms = store.physicalSymptoms;
            const severityLabels = ['없음', '가끔', '자주', '매일'];
            if (selectedSymptoms.length === 0) {
              return (
                <div className="bg-white rounded-xl p-6 border border-hlk-border text-center">
                  <p className="text-hlk-text-tertiary text-sm">선택한 증상이 없어요. 이전 단계에서 증상을 선택해 주세요.</p>
                </div>
              );
            }
            return (
              <div className="space-y-3">
                {selectedSymptoms.map((symptomKey) => {
                  const symptomInfo = PhysicalSymptoms.find(s => s.key === symptomKey);
                  const currentSeverity = store.symptomSeverityMap[symptomKey] ?? 0;
                  return (
                    <div key={symptomKey} className="bg-white rounded-xl p-4 border border-hlk-border">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{symptomInfo?.emoji}</span>
                        <span className="text-sm font-medium text-hlk-text">{symptomInfo?.label ?? symptomKey}</span>
                      </div>
                      <div className="flex gap-2">
                        {severityLabels.map((label, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => store.setSymptomSeverity(symptomKey, idx)}
                            className={`
                              flex-1 py-2.5 rounded-lg border text-xs font-medium transition-all
                              ${currentSeverity === idx
                                ? 'border-hlk-primary bg-hlk-primary-light text-hlk-primary'
                                : 'border-hlk-border bg-white text-hlk-text-tertiary hover:border-hlk-primary/40'
                              }
                            `}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* 불리언 (커뮤니티 참여) — Bumble BFF 인사이트: 코호트 그룹 설명 */}
          {current.type === 'boolean' && current.options && (
            <div className="space-y-3">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setValue(opt.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                    String(getValue()) === opt.value
                      ? 'bg-hlk-primary-light border-hlk-primary text-hlk-text'
                      : 'bg-white border-hlk-border text-hlk-text-secondary hover:bg-hlk-bg'
                  }`}
                >
                  {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
                  <span className="text-[15px] text-left">{opt.label}</span>
                </button>
              ))}
              {/* Bumble BFF: 6명 코호트 설명 */}
              <p className="text-xs text-hlk-text-tertiary text-center mt-2">
                비슷한 증상의 6명과 함께하는 작은 서클에 배정돼요
              </p>
            </div>
          )}

          {/* 닉네임 유효성 */}
          {current.storeField === 'nickname' && (getValue() as string).length > 0 && (getValue() as string).length < 2 && (
            <p className="text-sm text-hlk-error mt-2 text-center">
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
          className="w-full bg-hlk-accent hover:bg-hlk-accent/90 text-white shadow-lg shadow-hlk-accent/30 disabled:bg-hlk-border disabled:text-hlk-text-tertiary disabled:shadow-none"
        >
          {nextLabel()}
        </Button>

        {/* Duolingo 인사이트: 따뜻한 응원 메시지 (경쟁적 X, 지지적 O) */}
        <p className="text-center text-hlk-text-tertiary text-xs mt-4">
          {globalQuestionNum <= 5 && '천천히, 나의 속도로 해도 괜찮아요 🐢'}
          {globalQuestionNum > 5 && globalQuestionNum <= 12 && '절반 넘었어요! 잘하고 계세요 👏'}
          {globalQuestionNum > 12 && globalQuestionNum <= 18 && '거의 다 왔어요! 조금만 더 🌱'}
          {globalQuestionNum > 18 && '마지막이에요! 곧 리포트를 드릴게요 ✨'}
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
