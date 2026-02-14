'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useCheckinStore } from '../../stores/checkinStore';
import { classifyStage, classifySymptomCluster, classifyLifeContext } from '../../lib/stageClassifier';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const store = useCheckinStore();
  const [hydrated, setHydrated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-alma-bg flex items-center justify-center">
        <div className="text-alma-text-tertiary">로딩 중...</div>
      </div>
    );
  }

  // 체크인 안 했으면 체크인으로
  if (!store.ageRange) {
    router.push('/checkin');
    return null;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isSupabaseConfigured) {
      setError('서비스 준비 중입니다. 잠시 후 다시 시도해주세요.');
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('이미 가입된 이메일이에요. 다른 이메일을 사용해주세요.');
        } else {
          setError('가입 중 문제가 발생했어요. 다시 시도해주세요.');
        }
        setLoading(false);
        return;
      }

      const userId = authData.user?.id;
      if (!userId) {
        setError('가입 처리 중 문제가 발생했어요.');
        setLoading(false);
        return;
      }

      // 2. 분류 결과 계산
      const stageResult = classifyStage({
        ageRange: store.ageRange,
        physicalSymptoms: store.physicalSymptoms,
        emotionalSymptoms: store.emotionalSymptoms,
        symptomSeverity: store.symptomSeverity,
        symptomOnset: store.symptomOnset,
      });
      const cluster = classifySymptomCluster(store.physicalSymptoms, store.emotionalSymptoms);
      const lifeContext = classifyLifeContext(store.employment, store.maritalStatus, store.livingSituation);

      // 3. profiles 테이블 저장
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: userId,
        nickname: store.nickname || '익명의 벗',
        stage: stageResult.stage,
        stage_badge: '',
        auth_level: 'lv2_member',
        age_range: store.ageRange,
        marital_status: store.maritalStatus || null,
        living_situation: store.livingSituation || null,
        employment: store.employment || null,
        primary_symptoms: store.physicalSymptoms,
        symptom_cluster: cluster,
        life_context: lifeContext,
        onboarding_completed: true,
        onboarding_completed_at: new Date().toISOString(),
      });

      if (profileError) {
        console.error('Profile save error:', profileError);
      }

      // 4. checkin_onboarding 테이블 저장
      const { error: checkinError } = await supabase.from('checkin_onboarding').insert({
        user_id: userId,
        physical_symptoms: store.physicalSymptoms,
        worst_physical_symptom: store.worstPhysicalSymptom || null,
        symptom_severity: store.symptomSeverity,
        symptom_onset: store.symptomOnset || null,
        emotional_symptoms: store.emotionalSymptoms,
        worst_emotional_symptom: store.worstEmotionalSymptom || null,
        shared_with: store.sharedWith || null,
        current_management: store.currentManagement,
        management_satisfaction: store.managementSatisfaction,
        most_wanted_info: store.mostWantedInfo || null,
        desired_help: store.desiredHelp,
        willingness_to_pay: store.willingnessToPay || null,
        community_opt_in: store.communityOptIn,
        preferred_group: store.preferredGroup || null,
        computed_stage: stageResult.stage,
        computed_symptom_cluster: cluster,
        computed_life_context: lifeContext,
        completed_at: new Date().toISOString(),
      });

      if (checkinError) {
        console.error('Checkin save error:', checkinError);
      }

      setSuccess(true);

      // 3초 후 커뮤니티로 이동
      setTimeout(() => {
        router.push('/community');
      }, 3000);
    } catch {
      setError('네트워크 오류가 발생했어요. 인터넷 연결을 확인해주세요.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-alma-bg">
        <div className="max-w-lg mx-auto px-5 py-8">
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-alma-text mb-3">
              가입 완료!
            </h1>
            <p className="text-[15px] text-alma-text-secondary leading-relaxed mb-2">
              체크인 결과가 안전하게 저장되었어요.
            </p>
            <p className="text-sm text-alma-text-tertiary">
              잠시 후 커뮤니티로 이동합니다...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alma-bg">
      <div className="max-w-lg mx-auto px-5 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">💌</div>
          <h1 className="text-2xl font-bold text-alma-text mb-2">
            결과 저장하기
          </h1>
          <p className="text-sm text-alma-text-secondary leading-relaxed">
            이메일만 입력하면 체크인 결과를 저장하고<br />
            맞춤 커뮤니티에 참여할 수 있어요
          </p>
        </div>

        {/* 가입 폼 */}
        <form onSubmit={handleSignup} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-alma-text mb-2">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="w-full px-4 py-3.5 rounded-xl border border-alma-border bg-white text-alma-text placeholder:text-alma-text-tertiary focus:outline-none focus:ring-2 focus:ring-alma-primary/30 focus:border-alma-primary transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-alma-text mb-2">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상"
              required
              minLength={6}
              className="w-full px-4 py-3.5 rounded-xl border border-alma-border bg-white text-alma-text placeholder:text-alma-text-tertiary focus:outline-none focus:ring-2 focus:ring-alma-primary/30 focus:border-alma-primary transition-colors"
            />
          </div>

          {error && (
            <div className="bg-alma-error/10 text-alma-error text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading || !email || !password}
          >
            {loading ? '저장 중...' : '결과 저장하고 시작하기'}
          </Button>
        </form>

        {/* 혜택 안내 */}
        <div className="bg-alma-surface rounded-2xl border border-alma-border p-5 mb-6">
          <h3 className="text-sm font-bold text-alma-text mb-3">가입하면 이런 것들이 가능해요</h3>
          <ul className="space-y-2 text-sm text-alma-text-secondary">
            <li className="flex gap-2"><span>📊</span> 체크인 결과 영구 저장</li>
            <li className="flex gap-2"><span>👩‍👩‍👧‍👧</span> 맞춤 커뮤니티 그룹 참여</li>
            <li className="flex gap-2"><span>📈</span> 주간 변화 추적 리포트</li>
            <li className="flex gap-2"><span>💡</span> 맞춤 건강 팁 받기</li>
          </ul>
        </div>

        {/* 개인정보 안내 */}
        <p className="text-xs text-alma-text-tertiary text-center mb-6 px-4">
          입력한 이메일은 결과 저장과 로그인에만 사용됩니다.<br />
          ALMA는 개인정보를 안전하게 보호합니다.
        </p>

        {/* 건너뛰기 */}
        <Link href="/community" className="block">
          <Button variant="ghost" size="md" className="w-full">
            나중에 할게요 → 커뮤니티 먼저 보기
          </Button>
        </Link>
      </div>
    </div>
  );
}
