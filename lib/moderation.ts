// 커뮤니티 게시물 1차 모더레이션 (MVP — 클라이언트 사전 필터)
// 목적: 명백한 욕설·혐오·스팸을 작성 단계에서 차단. 의료 조언은 가이드라인+신고로 사후 대응.
// 주의: 과한 필터는 정상 글을 막으므로 보수적으로 운영한다.

// 명백한 비속어/혐오 (부분 일치). 필요 시 운영하며 보강.
const BANNED = [
  '시발', '씨발', '병신', '개새끼', '좆', '썅', '닥쳐', '꺼져',
  '죽어', '꺼지세요', '한남', '김치녀', '맘충',
];

// 스팸 신호
const SPAM = [/https?:\/\/\S+/i, /(010|02|070)[-.]?\d{3,4}[-.]?\d{4}/, /카톡\s*아이디/, /입금/, /수익\s*보장/];

export interface ModerationResult {
  ok: boolean;
  reason?: string;
}

export function checkContent(text: string): ModerationResult {
  const t = (text || '').trim();
  if (t.length < 2) return { ok: false, reason: '내용을 조금만 더 적어주세요.' };
  if (t.length > 1000) return { ok: false, reason: '1000자 이내로 적어주세요.' };

  const lower = t.toLowerCase();
  if (BANNED.some((w) => lower.includes(w))) {
    return { ok: false, reason: '비속어·혐오 표현이 포함되어 있어요. 따뜻한 말로 바꿔주세요.' };
  }
  if (SPAM.some((re) => re.test(t))) {
    return { ok: false, reason: '링크·연락처·홍보성 내용은 올릴 수 없어요.' };
  }
  return { ok: true };
}
