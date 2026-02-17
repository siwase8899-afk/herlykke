'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SYMPTOMS } from '@/lib/logTypes';
import { submitSellerApplication } from '@/lib/supabaseSync';

type FormState = 'form' | 'submitting' | 'success';

export default function SellerPage() {
  const [formState, setFormState] = useState<FormState>('form');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [helpfulSolutions, setHelpfulSolutions] = useState('');
  const [introduction, setIntroduction] = useState('');

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const isValid = nickname.trim() && email.trim() && email.includes('@') && selectedSymptoms.length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;
    setFormState('submitting');

    await submitSellerApplication({
      nickname: nickname.trim(),
      email: email.trim(),
      experiencedSymptoms: selectedSymptoms,
      helpfulSolutions: helpfulSolutions.trim(),
      introduction: introduction.trim(),
    });

    setFormState('success');
  };

  if (formState === 'success') {
    return (
      <div className="min-h-screen bg-hlk-bg">
        <header className="sticky top-0 z-50 px-5 py-4 border-b border-hlk-border bg-white/80 backdrop-blur-lg">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <Link href="/dashboard" className="text-hlk-text-tertiary hover:text-hlk-text transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="font-bold text-hlk-text">동료 셀러</h1>
            <div className="w-6" />
          </div>
        </header>

        <main className="max-w-lg mx-auto px-5 py-12 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-hlk-text mb-3">신청이 완료되었어요!</h2>
          <p className="text-hlk-text-secondary leading-relaxed mb-8">
            동료 셀러 1기 모집이 시작되면<br />
            <span className="font-semibold text-hlk-primary">{email}</span>로 안내해드릴게요.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 bg-hlk-primary text-white font-bold rounded-xl hover:bg-hlk-primary-dark transition-all"
          >
            대시보드로 돌아가기
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hlk-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 px-5 py-4 border-b border-hlk-border bg-white/80 backdrop-blur-lg">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-hlk-text-tertiary hover:text-hlk-text transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-bold text-hlk-text">동료 셀러</h1>
          <div className="w-6" />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-6">
        {/* Hero */}
        <div className="bg-gradient-to-br from-hlk-primary to-hlk-accent rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">1기 모집</span>
          </div>
          <h2 className="text-xl font-bold mb-2">
            갱년기를 겪고, 극복한<br />경험이 있으신가요?
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            같은 증상을 겪는 분들에게 나의 경험을 나누고,
            동료 셀러로서 함께 성장해보세요.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-2xl p-4 border border-hlk-border text-center">
            <span className="text-2xl mb-2 block">💬</span>
            <p className="text-xs font-semibold text-hlk-text">경험 공유</p>
            <p className="text-xs text-hlk-text-tertiary mt-1">나의 극복기가 누군가의 희망이 돼요</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-hlk-border text-center">
            <span className="text-2xl mb-2 block">💰</span>
            <p className="text-xs font-semibold text-hlk-text">수익 창출</p>
            <p className="text-xs text-hlk-text-tertiary mt-1">추천 솔루션 판매로 수수료 수익</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-hlk-border text-center">
            <span className="text-2xl mb-2 block">🤝</span>
            <p className="text-xs font-semibold text-hlk-text">동료 연결</p>
            <p className="text-xs text-hlk-text-tertiary mt-1">같은 경험의 동료들과 연결</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-6 border border-hlk-border space-y-5">
          <h3 className="font-bold text-hlk-text text-lg">사전 등록하기</h3>

          {/* Nickname */}
          <div>
            <label className="text-sm font-medium text-hlk-text block mb-2">
              닉네임 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="활동할 닉네임을 입력해주세요"
              className="w-full px-4 py-3 border border-hlk-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-hlk-primary/30 focus:border-hlk-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-hlk-text block mb-2">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="모집 안내를 받을 이메일"
              className="w-full px-4 py-3 border border-hlk-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-hlk-primary/30 focus:border-hlk-primary"
            />
          </div>

          {/* Symptoms */}
          <div>
            <label className="text-sm font-medium text-hlk-text block mb-2">
              경험한 증상 <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-hlk-text-tertiary mb-3">극복했거나 관리 중인 증상을 선택해주세요</p>
            <div className="flex flex-wrap gap-2">
              {SYMPTOMS.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`px-3 py-2 rounded-full text-sm transition-all ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'bg-hlk-primary text-white ring-2 ring-hlk-primary'
                      : 'bg-hlk-bg text-hlk-text-secondary hover:bg-hlk-border'
                  }`}
                >
                  {symptom.emoji} {symptom.name}
                </button>
              ))}
            </div>
          </div>

          {/* Helpful Solutions */}
          <div>
            <label className="text-sm font-medium text-hlk-text block mb-2">
              도움이 된 솔루션
            </label>
            <input
              type="text"
              value={helpfulSolutions}
              onChange={(e) => setHelpfulSolutions(e.target.value)}
              placeholder="예: 이소플라본, 요가, 산책, 명상 등"
              className="w-full px-4 py-3 border border-hlk-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-hlk-primary/30 focus:border-hlk-primary"
            />
          </div>

          {/* Introduction */}
          <div>
            <label className="text-sm font-medium text-hlk-text block mb-2">
              간단 자기소개
            </label>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="나의 갱년기 경험과 동료 셀러가 되고 싶은 이유를 자유롭게 적어주세요"
              rows={4}
              className="w-full px-4 py-3 border border-hlk-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-hlk-primary/30 focus:border-hlk-primary resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || formState === 'submitting'}
            className={`w-full py-4 rounded-xl font-bold transition-all ${
              isValid
                ? 'bg-hlk-primary text-white hover:bg-hlk-primary-dark'
                : 'bg-hlk-border text-hlk-text-tertiary cursor-not-allowed'
            }`}
          >
            {formState === 'submitting' ? '신청 중...' : '동료 셀러 1기 사전 등록하기'}
          </button>

          <p className="text-xs text-hlk-text-tertiary text-center">
            입력하신 정보는 셀러 모집 안내에만 사용됩니다
          </p>
        </div>
      </main>
    </div>
  );
}
