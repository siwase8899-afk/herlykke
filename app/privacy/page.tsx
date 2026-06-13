import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | HERLYKKE',
  description: 'HERLYKKE 개인정보처리방침',
};

// ⚠️ 템플릿: 사업자등록 완료 및 법무 검토 후 [ ] 항목을 실제 값으로 확정할 것.
const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: '1. 수집하는 개인정보 항목',
    body: [
      '회원가입·로그인: 이메일 주소, 비밀번호(암호화 저장), 닉네임',
      '온보딩·수면 체크인: 나이대, 수면 패턴 응답, 증상(열감·불면 등 건강 관련 정보), 자기기록(수면 일지)',
      '자동 수집: 서비스 이용 기록, 접속 로그, 쿠키, 기기·브라우저 정보(분석 도구)',
      '※ 증상·수면 등 건강 관련 정보는 「개인정보보호법」상 민감정보로, 이용자의 별도 동의를 받아 수집합니다.',
    ],
  },
  {
    h: '2. 개인정보의 수집·이용 목적',
    body: [
      '회원 식별 및 로그인, 서비스 제공',
      '수면 유형 분석 및 개인화된 콘텐츠·레시피 추천',
      '커뮤니티 운영(익명 닉네임 기반)',
      '서비스 개선을 위한 통계 분석',
    ],
  },
  {
    h: '3. 보유 및 이용 기간',
    body: [
      '회원 탈퇴 시 또는 수집·이용 목적 달성 시 지체 없이 파기합니다.',
      '관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.',
    ],
  },
  {
    h: '4. 제3자 제공',
    body: [
      'HERLYKKE는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.',
      '법령에 근거하거나 이용자가 사전 동의한 경우에 한해 제공할 수 있습니다.',
    ],
  },
  {
    h: '5. 처리 위탁',
    body: [
      '서비스 운영을 위해 아래에 처리를 위탁하고 있습니다.',
      '- Supabase(데이터 저장·인증), Vercel(호스팅), Google Analytics(이용 통계)',
    ],
  },
  {
    h: '6. 이용자의 권리',
    body: [
      '이용자는 언제든지 자신의 개인정보 열람·정정·삭제·처리정지를 요청할 수 있습니다.',
      '요청은 아래 문의처로 접수하며, 지체 없이 처리합니다.',
    ],
  },
  {
    h: '7. 개인정보 보호책임자 및 문의',
    body: [
      '개인정보 보호책임자: [ 대표자명 기입 ]',
      '문의: [ 이메일 기입 ]',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-5 py-12">
        <Link href="/" className="text-sm text-hlk-text-tertiary hover:text-hlk-text">← 홈으로</Link>
        <h1 className="text-2xl font-bold text-hlk-text mt-4 mb-2">개인정보처리방침</h1>
        <p className="text-xs text-hlk-text-tertiary mb-6">시행일: [ 시행일 기입 ]</p>

        <div className="mb-8 p-4 rounded-xl bg-hlk-warning-fill/20 border border-hlk-warning-fill/40 text-xs text-hlk-warning leading-relaxed">
          ⚠️ 본 문서는 표준 템플릿입니다. 사업자등록·법무 검토 후 [ ] 항목(대표자·문의처·시행일 등)을 확정해 정식 게시하세요.
        </div>

        <div className="space-y-7">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="text-base font-semibold text-hlk-text mb-2">{s.h}</h2>
              <ul className="space-y-1.5">
                {s.body.map((line, i) => (
                  <li key={i} className="text-sm text-hlk-text-secondary leading-relaxed">{line}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
