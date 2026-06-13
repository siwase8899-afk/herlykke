'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SYMPTOM_CHARACTERS } from '@/lib/characters';
import { useSymptomEmpathyStore } from '@/stores/symptomEmpathyStore';
import { EmojiIcon } from '@/lib/iconMap';

interface TodaySymptomsWidgetProps {
  defaultExpanded?: boolean;
}

export function TodaySymptomsWidget({ defaultExpanded = false }: TodaySymptomsWidgetProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { todayEmpathized, empathyCounts, toggleEmpathy, resetIfNewDay } = useSymptomEmpathyStore();

  useEffect(() => {
    resetIfNewDay();
  }, [resetIfNewDay]);

  // 상위 증상 정렬
  const sortedSymptoms = SYMPTOM_CHARACTERS
    .map((char) => ({
      ...char,
      count: empathyCounts[char.id] || 0,
      isEmpathized: todayEmpathized.includes(char.id),
    }))
    .sort((a, b) => b.count - a.count);

  const topSymptoms = sortedSymptoms.slice(0, 2);
  const remainingCount = sortedSymptoms.length - 2;

  // 전체 공감 수
  const totalCount = Object.values(empathyCounts).reduce((sum, count) => sum + count, 0);

  // 내가 공감한 수
  const myCount = todayEmpathized.length;

  return (
    <div className="card-glass rounded-2xl overflow-hidden">
      {/* 컴팩트 헤더 - 항상 표시 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-hlk-bg/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-hlk-accent/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-hlk-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-hlk-text text-sm">오늘의 증상</span>
              {myCount > 0 && (
                <span className="px-1.5 py-0.5 bg-hlk-primary text-white text-[10px] font-bold rounded-full">
                  {myCount}개 공감
                </span>
              )}
            </div>
            {/* 상위 2개 증상 미리보기 */}
            <div className="flex items-center gap-1.5 mt-1">
              {topSymptoms.map((symptom) => (
                <span
                  key={symptom.id}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                    symptom.isEmpathized
                      ? 'bg-hlk-primary-light text-hlk-primary font-medium'
                      : 'bg-hlk-bg text-hlk-text-secondary'
                  }`}
                >
                  <EmojiIcon emoji={symptom.emoji} size={12} />
                  {symptom.name}
                </span>
              ))}
              <span className="text-xs text-hlk-text-tertiary">
                +{remainingCount}개
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 실시간 참여 수 */}
          <div className="text-right mr-2">
            <div className="flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hlk-success opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-hlk-success" />
              </span>
              <span className="text-xs text-hlk-text-tertiary">
                {totalCount.toLocaleString()}명
              </span>
            </div>
          </div>
          {/* 확장 아이콘 */}
          <svg
            className={`w-5 h-5 text-hlk-text-tertiary transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* 확장된 컨텐츠 */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-hlk-border">
          <p className="text-xs text-hlk-text-secondary py-3">
            탭해서 &quot;나도!&quot; 공감하기
          </p>

          {/* 전체 증상 그리드 */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {sortedSymptoms.slice(0, 8).map((symptom) => (
              <button
                key={symptom.id}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEmpathy(symptom.id);
                }}
                className={`relative p-2.5 rounded-xl text-center transition-all ${
                  symptom.isEmpathized
                    ? 'bg-hlk-primary-light border-2 border-hlk-primary'
                    : 'bg-hlk-bg border-2 border-transparent hover:border-hlk-border'
                }`}
              >
                <div className="mb-1 flex justify-center text-hlk-primary">
                  <EmojiIcon emoji={symptom.emoji} size={18} />
                </div>
                <p className={`text-[10px] font-medium truncate ${
                  symptom.isEmpathized ? 'text-hlk-primary' : 'text-hlk-text-secondary'
                }`}>
                  {symptom.name}
                </p>
                <p className={`text-[9px] ${
                  symptom.isEmpathized ? 'text-hlk-primary' : 'text-hlk-text-tertiary'
                }`}>
                  {symptom.count.toLocaleString()}명
                </p>

                {/* 나도! 표시 */}
                {symptom.isEmpathized && (
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-hlk-primary rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/log/new"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-hlk-accent text-white text-sm font-semibold rounded-xl hover:bg-hlk-accent/90 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            오늘 상세 기록하기
          </Link>
        </div>
      )}
    </div>
  );
}
