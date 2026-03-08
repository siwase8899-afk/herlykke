'use client';

import { useState } from 'react';
import ExpertProfileCard, { type Expert } from './ExpertProfileCard';
import AnimatedProgress from '@/components/ui/AnimatedProgress';

const EXPERTS: Expert[] = [
  {
    id: '1',
    name: '김수연 전문의',
    specialty: '갱년기 수면장애 · 호르몬 치료',
    experience: '서울대병원 산부인과 15년',
    rating: 4.9,
    photoUrl: '',
    available: true,
  },
  {
    id: '2',
    name: '박지현 상담사',
    specialty: '수면 인지행동치료 (CBT-I)',
    experience: '수면전문센터 임상심리사 10년',
    rating: 4.8,
    photoUrl: '',
    available: true,
  },
  {
    id: '3',
    name: '이은영 약사',
    specialty: '갱년기 영양 · 보충제 상담',
    experience: '약국 상담 12년 · 여성건강 전문',
    rating: 4.7,
    photoUrl: '',
    available: false,
  },
];

const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30',
];

const STEPS = ['전문가 선택', '날짜/시간', '확인'] as const;

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const progressValue = ((step + 1) / STEPS.length) * 100;

  const getAvailableDates = () => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (d.getDay() !== 0) {
        dates.push(d.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${d.getMonth() + 1}/${d.getDate()} (${days[d.getDay()]})`;
  };

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="space-y-3">
        <div className="flex justify-between text-xs text-hlk-text-secondary">
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={i <= step ? 'text-hlk-primary font-semibold' : ''}
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <AnimatedProgress value={progressValue} height={4} />
      </div>

      {/* Step 0: Expert selection */}
      {step === 0 && (
        <div className="space-y-3">
          <p className="text-sm text-hlk-text-secondary">
            상담하고 싶은 전문가를 선택하세요.
          </p>
          {EXPERTS.map((expert) => (
            <ExpertProfileCard
              key={expert.id}
              expert={expert}
              selected={selectedExpert?.id === expert.id}
              onSelect={(e) => setSelectedExpert(e)}
            />
          ))}
          <button
            onClick={() => step === 0 && selectedExpert && setStep(1)}
            disabled={!selectedExpert}
            className="w-full py-3 bg-hlk-primary text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-hlk-primary-dark transition-colors"
          >
            다음: 날짜 선택
          </button>
        </div>
      )}

      {/* Step 1: Date & Time */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-hlk-text mb-3">날짜 선택</h3>
            <div className="grid grid-cols-3 gap-2">
              {getAvailableDates().map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    selectedDate === date
                      ? 'bg-hlk-primary text-white border-hlk-primary'
                      : 'bg-hlk-surface text-hlk-text border-hlk-border hover:border-hlk-primary/40'
                  }`}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div>
              <h3 className="font-semibold text-hlk-text mb-3">시간 선택</h3>
              <div className="grid grid-cols-5 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                      selectedTime === time
                        ? 'bg-hlk-primary text-white border-hlk-primary'
                        : 'bg-hlk-surface text-hlk-text-secondary border-hlk-border hover:border-hlk-primary/40'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(0)}
              className="flex-1 py-3 bg-hlk-surface text-hlk-text font-semibold rounded-xl border border-hlk-border hover:bg-hlk-surface-warm transition-colors"
            >
              이전
            </button>
            <button
              onClick={() => selectedDate && selectedTime && setStep(2)}
              disabled={!selectedDate || !selectedTime}
              className="flex-1 py-3 bg-hlk-primary text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-hlk-primary-dark transition-colors"
            >
              다음: 확인
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Confirmation */}
      {step === 2 && selectedExpert && (
        <div className="space-y-5">
          <div className="bg-hlk-surface rounded-2xl p-6 border border-hlk-border space-y-4">
            <h3 className="font-bold text-hlk-text text-lg">예약 확인</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-hlk-border-light">
                <span className="text-sm text-hlk-text-secondary">전문가</span>
                <span className="text-sm font-semibold text-hlk-text">{selectedExpert.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-hlk-border-light">
                <span className="text-sm text-hlk-text-secondary">분야</span>
                <span className="text-sm text-hlk-text">{selectedExpert.specialty}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-hlk-border-light">
                <span className="text-sm text-hlk-text-secondary">날짜</span>
                <span className="text-sm font-semibold text-hlk-text">{formatDate(selectedDate)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-hlk-text-secondary">시간</span>
                <span className="text-sm font-semibold text-hlk-text">{selectedTime}</span>
              </div>
            </div>

            <div className="bg-hlk-primary-light/50 rounded-xl p-4">
              <p className="text-xs text-hlk-text-secondary leading-relaxed">
                * 상담은 화상 또는 전화로 진행됩니다. 예약 확정 후 안내 메시지가 발송됩니다.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 bg-hlk-surface text-hlk-text font-semibold rounded-xl border border-hlk-border hover:bg-hlk-surface-warm transition-colors"
            >
              이전
            </button>
            <button
              onClick={() => alert('예약이 완료되었습니다! (데모)')}
              className="flex-1 py-3 bg-hlk-primary text-white font-semibold rounded-xl hover:bg-hlk-primary-dark transition-colors"
            >
              예약 확정
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
