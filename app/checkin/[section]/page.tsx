'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { OptionButton } from '../../../components/ui/OptionButton';
import { SeverityScale } from '../../../components/ui/SeverityScale';
import { Button } from '../../../components/ui/Button';
import { useCheckinStore } from '../../../stores/checkinStore';
import { getQuestionsBySection, SECTIONS, type QuestionConfig } from '../../../lib/questions';

export default function CheckinSection() {
  const params = useParams();
  const router = useRouter();
  const store = useCheckinStore();
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const sectionNum = Number(params.section);
  const sectionMeta = SECTIONS[sectionNum - 1];
  const questions = getQuestionsBySection(sectionNum);
  const current = questions[step];

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || !current || !sectionMeta) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-alma-text-tertiary">불러오는 중...</div>
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

  // 값 설정
  const setValue = (value: string) => {
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

  return (
    <>
      {/* 헤더 */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="text-alma-primary text-[15px] font-medium mb-3 cursor-pointer hover:opacity-70 py-1"
        >
          ← 뒤로
        </button>
        <ProgressBar current={globalQuestionNum} total={19} />
      </div>

      {/* 섹션 라벨 */}
      <div className="text-sm text-alma-primary font-semibold mb-2">
        {sectionMeta.emoji} 섹션 {sectionNum}: {sectionMeta.label}
      </div>

      {/* 질문 */}
      <h2 className="text-xl font-bold text-alma-text leading-snug mb-2">
        {current.question}
      </h2>
      {current.hint && (
        <p className="text-sm text-alma-text-secondary mb-5">
          {current.hint}
        </p>
      )}

      {/* 답변 영역 */}
      <div className="mb-8">
        {/* 단일 선택 */}
        {current.type === 'single' && current.options && (
          <div className="space-y-3">
            {current.options.map((opt) => (
              <OptionButton
                key={opt.value}
                label={opt.label}
                emoji={opt.emoji}
                selected={getValue() === opt.value}
                onClick={() => setValue(opt.value)}
              />
            ))}
          </div>
        )}

        {/* 다중 선택 */}
        {current.type === 'multi' && current.options && (
          <div className="space-y-3">
            {current.options.map((opt) => (
              <OptionButton
                key={opt.value}
                label={opt.label}
                emoji={opt.emoji}
                selected={(getValue() as string[]).includes(opt.value)}
                onClick={() => setValue(opt.value)}
                multi
              />
            ))}
          </div>
        )}

        {/* 텍스트 입력 */}
        {current.type === 'text' && (
          <textarea
            className="w-full bg-alma-surface border border-alma-border rounded-xl px-4 py-3.5 text-[15px] text-alma-text min-h-[100px] resize-none mt-2 focus:outline-none focus:border-alma-primary transition-colors"
            placeholder={current.placeholder}
            value={getValue() as string}
            onChange={(e) => setTextValue(e.target.value)}
            maxLength={current.maxLength}
          />
        )}

        {/* 스케일 */}
        {current.type === 'scale' && current.scaleLabels && (
          <SeverityScale
            value={getValue() as number}
            onChange={setScaleValue}
            labels={current.scaleLabels}
          />
        )}

        {/* 불리언 (커뮤니티 참여) */}
        {current.type === 'boolean' && current.options && (
          <div className="space-y-3">
            {current.options.map((opt) => (
              <OptionButton
                key={opt.value}
                label={opt.label}
                emoji={opt.emoji}
                selected={String(getValue()) === opt.value}
                onClick={() => setValue(opt.value)}
              />
            ))}
          </div>
        )}

        {/* 닉네임 유효성 */}
        {current.storeField === 'nickname' && (getValue() as string).length > 0 && (getValue() as string).length < 2 && (
          <p className="text-sm text-alma-error mt-2 text-center">
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
      >
        {nextLabel()}
      </Button>
    </>
  );
}
