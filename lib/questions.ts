import { PhysicalSymptoms, EmotionalSymptoms } from './constants';

export type QuestionType = 'single' | 'multi' | 'text' | 'scale' | 'boolean' | 'severity';

export interface QuestionOption {
  value: string;
  label: string;
  emoji?: string;
}

export interface QuestionConfig {
  id: number;
  section: number;
  sectionLabel: string;
  type: QuestionType;
  question: string;
  hint?: string;
  placeholder?: string;
  storeField: string;
  storeAction?: string; // toggleSymptom, toggleManagement, toggleDesiredHelp
  storeActionArg?: string; // 'physical', 'emotional'
  options?: QuestionOption[];
  scaleLabels?: string[];
  maxLength?: number;
}

// 섹션 메타데이터
export const SECTIONS = [
  { id: 1, label: '나에 대해', emoji: '👤', questionCount: 4 },
  { id: 2, label: '신체 변화', emoji: '🩺', questionCount: 5 },
  { id: 3, label: '감정 변화', emoji: '💭', questionCount: 3 },
  { id: 4, label: '현재 관리', emoji: '🌿', questionCount: 5 },
  { id: 5, label: '커뮤니티', emoji: '🤝', questionCount: 3 },
];

// 19문항 전체 설정
export const QUESTIONS: QuestionConfig[] = [
  // ── 섹션 1: 나에 대해 (Q1-Q4) ──
  {
    id: 1,
    section: 1,
    sectionLabel: '나에 대해',
    type: 'single',
    question: '연령대가 어떻게 되세요?',
    storeField: 'ageRange',
    options: [
      { value: '40-44', label: '40~44세' },
      { value: '45-49', label: '45~49세' },
      { value: '50-54', label: '50~54세' },
      { value: '55-59', label: '55~59세' },
      { value: '60+', label: '60세 이상' },
    ],
  },
  {
    id: 2,
    section: 1,
    sectionLabel: '나에 대해',
    type: 'single',
    question: '결혼 상태는요?',
    storeField: 'maritalStatus',
    options: [
      { value: 'single', label: '미혼' },
      { value: 'married_together', label: '기혼 (배우자와 동거)' },
      { value: 'divorced', label: '이혼' },
      { value: 'widowed', label: '사별' },
      { value: 'separated', label: '별거' },
      { value: 'other', label: '기타' },
    ],
  },
  {
    id: 3,
    section: 1,
    sectionLabel: '나에 대해',
    type: 'single',
    question: '현재 누구와 함께 살고 계세요?',
    storeField: 'livingSituation',
    options: [
      { value: 'alone', label: '혼자' },
      { value: 'with_spouse', label: '배우자와 둘이' },
      { value: 'spouse_and_children', label: '배우자 + 자녀' },
      { value: 'children_only', label: '자녀와 (배우자 없이)' },
      { value: 'with_parents', label: '부모님과' },
      { value: 'other', label: '기타' },
    ],
  },
  {
    id: 4,
    section: 1,
    sectionLabel: '나에 대해',
    type: 'single',
    question: '현재 직업 상태는요?',
    storeField: 'employment',
    options: [
      { value: 'fulltime', label: '정규직' },
      { value: 'parttime_contract', label: '파트타임 / 계약직' },
      { value: 'selfemployed_freelance', label: '자영업 / 프리랜서' },
      { value: 'homemaker', label: '전업주부' },
      { value: 'job_seeking', label: '구직 중 / 휴직' },
      { value: 'retired', label: '은퇴' },
    ],
  },

  // ── 섹션 2: 신체 변화 (Q5-Q8) ──
  {
    id: 5,
    section: 2,
    sectionLabel: '신체 변화',
    type: 'multi',
    question: '현재 경험하고 있는 신체 증상은요?',
    hint: '해당되는 것 모두 선택해 주세요',
    storeField: 'physicalSymptoms',
    storeAction: 'toggleSymptom',
    storeActionArg: 'physical',
    options: PhysicalSymptoms.map((s) => ({
      value: s.key,
      label: s.label,
      emoji: s.emoji,
    })),
  },
  {
    id: 6,
    section: 2,
    sectionLabel: '신체 변화',
    type: 'severity',
    question: '선택한 증상이 얼마나 자주 나타나나요?',
    hint: '각 증상의 빈도를 선택해 주세요',
    storeField: 'symptomSeverityMap',
    storeAction: 'setSymptomSeverity',
  },
  {
    id: 7,
    section: 2,
    sectionLabel: '신체 변화',
    type: 'text',
    question: '가장 힘든 신체 증상은 무엇인가요?',
    placeholder: '예: 밤에 열감이 심해서 잠을 못 자요',
    storeField: 'worstPhysicalSymptom',
  },
  {
    id: 8,
    section: 2,
    sectionLabel: '신체 변화',
    type: 'scale',
    question: '증상이 일상생활에 얼마나 영향을 미치나요?',
    storeField: 'symptomSeverity',
    scaleLabels: ['전혀 없음', '약간', '보통', '심함', '매우 심함'],
  },
  {
    id: 9,
    section: 2,
    sectionLabel: '신체 변화',
    type: 'single',
    question: '증상이 시작된 건 언제쯤인가요?',
    storeField: 'symptomOnset',
    options: [
      { value: 'less_6months', label: '6개월 이내' },
      { value: '6_12months', label: '6개월~1년' },
      { value: '1_2years', label: '1~2년' },
      { value: '2_3years', label: '2~3년' },
      { value: 'over_3years', label: '3년 이상' },
      { value: 'unsure', label: '잘 모르겠어요' },
    ],
  },

  // ── 섹션 3: 감정 변화 (Q10-Q12) ──
  {
    id: 10,
    section: 3,
    sectionLabel: '감정 변화',
    type: 'multi',
    question: '현재 경험하는 감정/심리 변화는요?',
    hint: '해당되는 것 모두 선택해 주세요',
    storeField: 'emotionalSymptoms',
    storeAction: 'toggleSymptom',
    storeActionArg: 'emotional',
    options: EmotionalSymptoms.map((s) => ({
      value: s.key,
      label: s.label,
      emoji: s.emoji,
    })),
  },
  {
    id: 11,
    section: 3,
    sectionLabel: '감정 변화',
    type: 'text',
    question: '가장 힘든 감정 변화는 무엇인가요?',
    placeholder: '예: 이유 없이 눈물이 나와서 당황스러워요',
    storeField: 'worstEmotionalSymptom',
  },
  {
    id: 12,
    section: 3,
    sectionLabel: '감정 변화',
    type: 'single',
    question: '이런 변화에 대해 누군가와 이야기해 본 적 있나요?',
    storeField: 'sharedWith',
    options: [
      { value: 'family', label: '가족에게 이야기했다' },
      { value: 'friends', label: '친구에게 이야기했다' },
      { value: 'doctor', label: '의사/전문가에게 상담했다' },
      { value: 'wanted_but_didnt', label: '말하고 싶었지만 못 했다' },
      { value: 'no_one', label: '말할 사람이 없다' },
      { value: 'prefer_not', label: '말하고 싶지 않다' },
    ],
  },

  // ── 섹션 4: 현재 관리 (Q13-Q17) ──
  {
    id: 13,
    section: 4,
    sectionLabel: '현재 관리',
    type: 'multi',
    question: '현재 어떻게 관리하고 계세요?',
    hint: '해당되는 것 모두 선택해 주세요',
    storeField: 'currentManagement',
    storeAction: 'toggleManagement',
    options: [
      { value: 'nothing', label: '아무것도 안 하고 있다' },
      { value: 'supplements', label: '영양제/보충제' },
      { value: 'exercise', label: '운동' },
      { value: 'obgyn', label: '산부인과 진료' },
      { value: 'other_doctor', label: '다른 의사 상담' },
      { value: 'hrt', label: '전문의 상담' },
      { value: 'herbal', label: '한약/한방 치료' },
      { value: 'counseling', label: '심리상담' },
      { value: 'internet', label: '인터넷 검색' },
      { value: 'peer_advice', label: '주변 사람 조언' },
    ],
  },
  {
    id: 14,
    section: 4,
    sectionLabel: '현재 관리',
    type: 'scale',
    question: '현재 관리 방법에 만족하시나요?',
    storeField: 'managementSatisfaction',
    scaleLabels: ['매우 불만', '불만', '보통', '만족', '매우 만족'],
  },
  {
    id: 15,
    section: 4,
    sectionLabel: '현재 관리',
    type: 'text',
    question: '이 시기에 대해 가장 알고 싶은 것은?',
    placeholder: '예: 수면 상담가 안전한지 알고 싶어요',
    storeField: 'mostWantedInfo',
  },
  {
    id: 16,
    section: 4,
    sectionLabel: '현재 관리',
    type: 'multi',
    question: '어떤 도움이 있으면 좋겠어요?',
    hint: '해당되는 것 모두 선택해 주세요',
    storeField: 'desiredHelp',
    storeAction: 'toggleDesiredHelp',
    options: [
      { value: 'personalized_info', label: '나에게 맞는 정보/가이드' },
      { value: 'regular_checkin', label: '정기적인 체크인/코칭' },
      { value: 'community', label: '비슷한 사람들과의 대화' },
      { value: 'expert', label: '전문가 연결' },
      { value: 'guidance', label: '뭘 해야 할지 알려주는 가이드' },
    ],
  },
  {
    id: 17,
    section: 4,
    sectionLabel: '현재 관리',
    type: 'single',
    question: '이런 서비스에 비용을 지불할 의향이 있으세요?',
    storeField: 'willingnessToPay',
    options: [
      { value: 'free', label: '무료만 이용' },
      { value: 'under_10k', label: '월 1만원 이하' },
      { value: 'under_30k', label: '월 3만원 이하' },
      { value: 'under_50k', label: '월 5만원 이하' },
      { value: 'any_if_good', label: '좋으면 금액 상관없음' },
    ],
  },

  // ── 섹션 5: 커뮤니티 (Q18-Q20) ──
  {
    id: 18,
    section: 5,
    sectionLabel: '커뮤니티',
    type: 'boolean',
    question: '커뮤니티에 참여하시겠어요?',
    hint: '비슷한 증상/상황의 사람들과 익명으로 이야기를 나눌 수 있어요.',
    storeField: 'communityOptIn',
    options: [
      { value: 'true', label: '네, 참여할게요!', emoji: '🤝' },
      { value: 'false', label: '일단 둘러볼게요', emoji: '👀' },
    ],
  },
  {
    id: 19,
    section: 5,
    sectionLabel: '커뮤니티',
    type: 'single',
    question: '어떤 그룹에 관심이 있으세요?',
    hint: '나중에 변경할 수 있어요',
    storeField: 'preferredGroup',
    options: [
      { value: 'symptom_hot_flash', label: '열감/안면홍조 그룹' },
      { value: 'symptom_insomnia', label: '수면 장애 그룹' },
      { value: 'symptom_emotional', label: '감정 변화 그룹' },
      { value: 'life_working', label: '직장인 그룹' },
      { value: 'life_homemaker', label: '주부 그룹' },
      { value: 'general', label: '자유롭게 배정해 주세요' },
    ],
  },
  {
    id: 20,
    section: 5,
    sectionLabel: '커뮤니티',
    type: 'text',
    question: '커뮤니티에서 사용할 닉네임을 정해 주세요',
    hint: '실명 대신 닉네임으로 활동해요. 다른 사람에게 실명은 공개되지 않아요.',
    placeholder: '2~10자 (예: 봄날의산책)',
    storeField: 'nickname',
    maxLength: 10,
  },
];

// 섹션별 질문 가져오기
export function getQuestionsBySection(section: number): QuestionConfig[] {
  return QUESTIONS.filter((q) => q.section === section);
}

// 섹션 내 질문 인덱스 (0-based)
export function getQuestionIndexInSection(questionId: number): number {
  const sectionQuestions = QUESTIONS.filter(
    (q) => q.section === QUESTIONS.find((qq) => qq.id === questionId)?.section
  );
  return sectionQuestions.findIndex((q) => q.id === questionId);
}
