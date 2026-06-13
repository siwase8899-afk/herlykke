'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useCheckinStore } from '../../stores/checkinStore';
import { classifyStage, classifySymptomCluster, classifyLifeContext } from '../../lib/stageClassifier';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { CheckCircle2, LineChart, LockKeyhole, NotebookPen, Users } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const store = useCheckinStore();
  const [fromSleepCheckin] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('from') === 'sleep-checkin' ||
      !!window.sessionStorage.getItem('sleep_checkin_answers');
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false);

  // 체크인 안 했으면 체크인으로
  if (!store.ageRange && !fromSleepCheckin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-hlk-surface to-hlk-primary-light/35">
        <div className="max-w-lg mx-auto px-5 py-16">
          <div className="rounded-3xl border border-hlk-border bg-white p-8 text-center shadow-soft-md">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-hlk-primary-light text-hlk-primary-dark">
              <NotebookPen className="h-8 w-8" aria-hidden />
            </div>
            <h1 className="text-2xl font-bold text-hlk-text mb-3">
              먼저 체크인을 시작해주세요
            </h1>
            <p className="text-sm text-hlk-text-secondary leading-relaxed mb-6">
              결과를 저장하려면 지금의 수면 상태를 먼저 확인해야 해요.
            </p>
            <Link
              href="/checkin"
              className="inline-flex w-full items-center justify-center rounded-full bg-hlk-clay px-6 py-4 text-base font-bold text-white hover:bg-hlk-clay-dark transition-colors"
            >
              1분 체크인 시작하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isSupabaseConfigured) {
      // 데모 모드: 체크인 데이터는 localStorage에 이미 저장됨
      const sleepAnswers = sessionStorage.getItem('sleep_checkin_answers');
      if (sleepAnswers) {
        localStorage.setItem('herlykke_sleep_checkin_answers', sleepAnswers);
      }
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
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

      // 이메일 인증이 켜져 있으면 가입해도 세션(로그인)이 없음.
      // 이 경우 대시보드로 보내면 다시 로그인으로 튕기므로, 메일 확인 안내를 보여준다.
      // (권장: Supabase에서 Confirm email OFF → 세션이 바로 생겨 이 분기로 안 옴)
      if (!authData.session) {
        setNeedsEmailConfirm(true);
        setLoading(false);
        return;
      }

      if (fromSleepCheckin && !store.ageRange) {
        // 수면 체크인 경로 가입자도 최소 프로필 1행 생성 (커뮤니티 등에서 필요)
        const { error: sleepProfileError } = await supabase.from('profiles').upsert({
          id: userId,
          auth_level: 'lv2_member',
          onboarding_completed: true,
          onboarding_completed_at: new Date().toISOString(),
        });
        if (sleepProfileError) {
          console.error('Profile save error:', sleepProfileError);
        }
        const sleepAnswers = sessionStorage.getItem('sleep_checkin_answers');
        if (sleepAnswers) {
          localStorage.setItem('herlykke_sleep_checkin_answers', sleepAnswers);
        }
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
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

      // 3초 후 대시보드로 이동
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    } catch {
      setError('네트워크 오류가 발생했어요. 인터넷 연결을 확인해주세요.');
      setLoading(false);
    }
  };

  if (needsEmailConfirm) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-hlk-surface to-hlk-primary-light/35">
        <div className="max-w-lg mx-auto px-5 py-8">
          <div className="text-center py-16">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-hlk-primary-light text-hlk-primary-dark shadow-soft-md">
              <CheckCircle2 className="h-9 w-9" aria-hidden />
            </div>
            <h1 className="text-2xl font-bold text-hlk-text mb-3">
              인증 메일을 보냈어요
            </h1>
            <p className="text-[15px] text-hlk-text-secondary leading-relaxed mb-2">
              {email} 으로 보낸 메일의 링크를 눌러<br />가입을 완료해 주세요.
            </p>
            <p className="text-sm text-hlk-text-tertiary mb-8">
              메일이 안 보이면 스팸함도 확인해 주세요.
            </p>
            <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-hlk-clay px-6 py-3.5 text-sm font-bold text-white hover:bg-hlk-clay-dark transition-colors">
              인증 후 로그인하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-hlk-surface to-hlk-primary-light/35">
        <div className="max-w-lg mx-auto px-5 py-8">
          <div className="text-center py-16">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-hlk-primary-light text-hlk-primary-dark shadow-soft-md">
              <CheckCircle2 className="h-9 w-9" aria-hidden />
            </div>
            <h1 className="text-2xl font-bold text-hlk-text mb-3">
              가입이 완료됐어요
            </h1>
            <p className="text-[15px] text-hlk-text-secondary leading-relaxed mb-2">
              이제 대시보드에서 수면을 기록하고 이어볼 수 있어요.
            </p>
            <p className="text-sm text-hlk-text-tertiary">
              잠시 후 대시보드로 이동합니다...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-hlk-surface to-hlk-primary-light/35">
      <div className="max-w-lg mx-auto px-5 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] border border-hlk-border bg-white text-hlk-primary-dark shadow-soft-md">
            <NotebookPen className="h-9 w-9" aria-hidden />
          </div>
          <h1 className="text-2xl font-bold text-hlk-text mb-2">
            체크인 결과 저장하기
          </h1>
          <p className="text-sm text-hlk-text-secondary leading-relaxed">
            이메일만 입력하면 방금 확인한 결과를 저장하고<br />
            다음 방문부터 이어서 볼 수 있어요
          </p>
        </div>

        {/* 가입 폼 */}
        <form onSubmit={handleSignup} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-hlk-text mb-2">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="w-full px-4 py-3.5 rounded-xl border border-hlk-border bg-white text-hlk-text placeholder:text-hlk-text-tertiary focus:outline-none focus:ring-2 focus:ring-hlk-primary/30 focus:border-hlk-primary transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-hlk-text mb-2">
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
              className="w-full px-4 py-3.5 rounded-xl border border-hlk-border bg-white text-hlk-text placeholder:text-hlk-text-tertiary focus:outline-none focus:ring-2 focus:ring-hlk-primary/30 focus:border-hlk-primary transition-colors"
            />
          </div>

          {error && (
            <div className="bg-hlk-error/10 text-hlk-error text-sm rounded-xl px-4 py-3">
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
        <div className="card-glass rounded-2xl p-5 mb-6 shadow-soft-sm">
          <h3 className="text-sm font-bold text-hlk-text mb-3">가입하면 이런 것들이 가능해요</h3>
          <ul className="space-y-2 text-sm text-hlk-text-secondary">
            <li className="flex items-center gap-2"><LineChart className="h-4 w-4 text-hlk-primary-dark" aria-hidden /> 체크인 결과 저장</li>
            <li className="flex items-center gap-2"><NotebookPen className="h-4 w-4 text-hlk-primary-dark" aria-hidden /> 내 수면 기록 이어보기</li>
            <li className="flex items-center gap-2"><Users className="h-4 w-4 text-hlk-primary-dark" aria-hidden /> 비슷한 경험의 이야기 보기</li>
            <li className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-hlk-primary-dark" aria-hidden /> 로그인으로 안전하게 보관</li>
          </ul>
        </div>

        {/* 개인정보 안내 */}
        <p className="text-xs text-hlk-text-tertiary text-center mb-6 px-4">
          입력한 이메일은 결과 저장과 로그인에만 사용됩니다.<br />
          HERLYKKE는 개인정보를 안전하게 보호합니다.
        </p>

        <Link href="/login" className="block text-center text-sm font-semibold text-hlk-primary-dark hover:text-hlk-clay transition-colors">
          이미 계정이 있다면 로그인하기
        </Link>
      </div>
    </div>
  );
}
