import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | HERLYKKE',
  description: 'HERLYKKE 이용약관',
};

// ⚠️ 템플릿: 사업자등록 완료 및 법무 검토 후 [ ] 항목을 실제 값으로 확정할 것.
const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: '제1조 (목적)',
    body: [
      '본 약관은 HERLYKKE(이하 "서비스")가 제공하는 수면·웰니스 정보 및 커뮤니티 서비스의 이용 조건과 절차를 규정합니다.',
    ],
  },
  {
    h: '제2조 (서비스의 성격)',
    body: [
      '본 서비스는 수면·건강 관련 경험 공유와 정보 제공을 위한 커뮤니티 서비스이며, 의료 서비스가 아닙니다.',
      '서비스에서 제공·공유되는 정보는 참고용이며, 의학적 진단·치료를 대체하지 않습니다. 정확한 진단은 전문의 상담을 권장합니다.',
    ],
  },
  {
    h: '제3조 (회원가입)',
    body: [
      '이용자는 약관 및 개인정보처리방침에 동의하고 가입 절차를 완료함으로써 회원이 됩니다.',
      '커뮤니티 활동은 닉네임 기반의 익명으로 이루어집니다.',
    ],
  },
  {
    h: '제4조 (이용자의 의무 — 금지 행위)',
    body: [
      '타인을 사칭하거나 허위 정보를 게시하는 행위',
      '의약품 처방·복용을 단정적으로 권유하는 등 의료 행위에 해당할 수 있는 게시',
      '욕설·비방·차별·혐오 표현, 타인의 권리 침해',
      '광고·스팸, 상업적 도용, 서비스 운영 방해',
    ],
  },
  {
    h: '제5조 (게시물의 관리)',
    body: [
      '운영자는 금지 행위에 해당하거나 신고된 게시물을 사전 통지 없이 숨김·삭제할 수 있습니다.',
      '게시물의 책임은 작성자에게 있으며, 운영자는 이를 보증하지 않습니다.',
    ],
  },
  {
    h: '제6조 (면책)',
    body: [
      '서비스는 이용자 간 공유 정보의 정확성·완전성을 보증하지 않습니다.',
      '건강 관련 의사결정은 이용자 본인의 책임이며, 전문가 상담을 권장합니다.',
    ],
  },
  {
    h: '제7조 (약관의 변경)',
    body: [
      '운영자는 관련 법령을 위배하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 서비스 내 공지합니다.',
    ],
  },
  {
    h: '제8조 (문의)',
    body: ['문의: [ 이메일 기입 ]'],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-hlk-bg">
      <div className="max-w-2xl mx-auto px-5 py-12">
        <Link href="/" className="text-sm text-hlk-text-tertiary hover:text-hlk-text">← 홈으로</Link>
        <h1 className="text-2xl font-bold text-hlk-text mt-4 mb-2">이용약관</h1>
        <p className="text-xs text-hlk-text-tertiary mb-6">시행일: [ 시행일 기입 ]</p>

        <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-relaxed">
          ⚠️ 본 문서는 표준 템플릿입니다. 사업자등록·법무 검토 후 [ ] 항목을 확정해 정식 게시하세요. 유료 거래·제휴 수익이 발생하면 전자상거래법에 따른 사업자정보·청약철회 조항을 추가해야 합니다.
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
