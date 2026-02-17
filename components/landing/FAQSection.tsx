'use client';

import { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// August 인사이트: 가족 참여 콘텐츠 포함
const faqs = [
  {
    q: '이 변화는 언제 시작되나요?',
    a: '보통 45-55세 사이에 시작되지만, 40대 초반부터 증상을 느끼는 분도 많아요. 생리 불규칙, 열감, 수면 장애, 감정 변화 등이 초기 증상일 수 있어요.',
  },
  {
    q: 'HERLYKKE는 의료 서비스인가요?',
    a: '아니요, HERLYKKE는 의료 서비스가 아닌 커뮤니티 플랫폼이에요. 체크인 결과는 참고용이며, 정확한 진단은 전문의 상담을 권장드려요.',
  },
  {
    q: '내 정보는 안전한가요?',
    a: '커뮤니티에서는 닉네임만 공개돼요. 실명, 나이, 개인 정보는 다른 사용자에게 절대 노출되지 않아요. 모든 데이터는 암호화되어 안전하게 보관됩니다.',
  },
  {
    q: '비용이 있나요?',
    a: '체크인, AI 분석, 커뮤니티 참여 모두 무료예요. 앞으로 프리미엄 기능이 추가될 수 있지만, 핵심 기능은 계속 무료로 유지할 예정이에요.',
  },
  {
    q: '남편/가족이 엄마의 변화를 이해하려면?',
    a: '체크인 결과를 가족과 공유하면 "엄마가 왜 그러시는지" 이해하는 데 도움이 돼요. HERLYKKE는 이 시기를 겪는 분만을 위한 공간이지만, 가족이 함께 이해하면 더 큰 힘이 됩니다. 곧 "가족을 위한 가이드" 콘텐츠도 준비 중이에요.',
  },
  {
    q: '한국 여성의 변화 양상은 서양과 다른가요?',
    a: '네, 아시아 여성은 관절통/근육통, 수면 장애가 더 두드러지고, 평균 폐경 연령도 48-49세로 서양(51세)보다 빠른 편이에요. HERLYKKE는 한국 여성의 증상 데이터를 기반으로 맞춤 분석을 제공해요.',
  },
  {
    q: 'AI가 어떻게 맞는 조언을 해주나요?',
    a: '체크인할 때마다 AI가 증상 패턴을 학습해요. 기록이 쌓일수록 더 정확한 맞춤 솔루션을 추천해드려요. 모든 데이터는 익명으로 처리됩니다.',
  },
  {
    q: '어떤 기준으로 그룹이 매칭되나요?',
    a: '증상 유사도, 변화 단계, 관심사를 종합적으로 분석해서 가장 공감할 수 있는 그룹으로 연결해요. 언제든 그룹을 바꿀 수 있어요.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: sectionRef, isVisible: sectionVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className={`px-6 md:px-8 py-24 md:py-32 bg-hlk-bg ${sectionVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-hlk-primary-light text-hlk-primary text-sm font-semibold rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-hlk-text tracking-tight">
            자주 묻는 질문
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="bg-hlk-surface rounded-2xl border border-hlk-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
              >
                <span className="text-[15px] font-semibold text-hlk-text">
                  {faq.q}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    openIndex === index
                      ? 'bg-hlk-primary text-white rotate-180'
                      : 'bg-hlk-primary-light text-hlk-primary'
                  }`}
                  style={{ transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden ${
                  openIndex === index ? 'max-h-48' : 'max-h-0'
                }`}
                style={{ transition: 'max-height 0.5s cubic-bezier(0.19, 1, 0.22, 1)' }}
              >
                <div className="px-6 pb-5 text-sm text-hlk-text-secondary leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
