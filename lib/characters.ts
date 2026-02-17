// 증상별 유머러스 캐릭터 시스템
// 3개 카테고리: 몸의 신호 / 마음의 신호 / 일상의 변화

export type SymptomCategory = 'body' | 'mind' | 'life';

export type SymptomId =
  // 몸의 신호
  | 'hot_flash'
  | 'night_sweat'
  | 'insomnia'
  | 'joint_pain'
  | 'fatigue'
  | 'headache'
  | 'dry_skin'
  | 'palpitation'
  | 'paresthesia'
  | 'dizziness'
  | 'formication'
  // 마음의 신호
  | 'brain_fog'
  | 'mood_swings'
  | 'anxiety'
  | 'irritability'
  | 'low_confidence'
  | 'loneliness'
  // 일상의 변화
  | 'weight_change'
  | 'low_libido'
  | 'hair_change'
  | 'digestion'
  | 'urinary'
  | 'skin_aging';

export interface SymptomCharacter {
  id: SymptomId;
  name: string;           // 증상 이름
  emoji: string;          // 이모지 (placeholder)
  nickname: string;       // 캐릭터 닉네임
  tagline: string;        // 유머러스한 한 줄
  description: string;    // 공감 가는 설명
  category: SymptomCategory;
  image?: string;         // 일러스트 이미지 경로
  color: string;          // 대표 컬러
}

export const SYMPTOM_CATEGORIES = [
  { id: 'body' as const, label: '몸의 신호', color: 'hlk-primary' },
  { id: 'mind' as const, label: '마음의 신호', color: 'hlk-accent' },
  { id: 'life' as const, label: '일상의 변화', color: 'hlk-secondary' },
];

export const SYMPTOM_CHARACTERS: SymptomCharacter[] = [
  // ─── 몸의 신호 (Physical) ───
  {
    id: 'hot_flash',
    name: '열감',
    emoji: '🔥',
    nickname: '핫플래시 퀸',
    tagline: '에어컨 앞은 내 자리',
    description: '갑자기 확 오르는 열기, 냉장고가 내 베프',
    category: 'body',
    image: '/characters/hot_flash.png',
    color: '#FF6B6B',
  },
  {
    id: 'night_sweat',
    name: '식은땀',
    emoji: '💦',
    nickname: '한밤의 샤워',
    tagline: '잠옷이 빨래감',
    description: '새벽에 깨보면 이미 흠뻑, 이불도 교체',
    category: 'body',
    image: '/characters/night_sweat.png',
    color: '#4DABF7',
  },
  {
    id: 'insomnia',
    name: '수면장애',
    emoji: '🐑',
    nickname: '새벽 3시 친구',
    tagline: '양들도 다 잠들었는데...',
    description: '999마리 세다가 포기, 천장이 친숙해요',
    category: 'body',
    image: '/characters/insomnia.png',
    color: '#748FFC',
  },
  {
    id: 'joint_pain',
    name: '관절통',
    emoji: '🤖',
    nickname: '뻣뻣한 로봇',
    tagline: '기름칠 좀 해주세요',
    description: '아침마다 WD-40 필요, 삐걱삐걱',
    category: 'body',
    image: '/characters/joint_pain.png',
    color: '#20C997',
  },
  {
    id: 'fatigue',
    name: '피로감',
    emoji: '🪫',
    nickname: '배터리 1% 인간',
    tagline: '충전해도 20%가 맥스',
    description: '풀충전이 뭐였더라, 항상 저전력 모드',
    category: 'body',
    image: '/characters/fatigue.png',
    color: '#868E96',
  },
  {
    id: 'headache',
    name: '두통',
    emoji: '🤕',
    nickname: '머리 안의 드럼',
    tagline: '누가 머리에서 공사를...',
    description: '타이레놀이 친구, 지끈지끈 일상',
    category: 'body',
    image: '/characters/headache.png',
    color: '#FA5252',
  },
  {
    id: 'dry_skin',
    name: '건조함',
    emoji: '🏜️',
    nickname: '사하라 피부',
    tagline: '수분크림이 증발해요',
    description: '피부도 점막도 사막화 진행 중',
    category: 'body',
    image: '/characters/dry_skin.png',
    color: '#E8590C',
  },
  {
    id: 'palpitation',
    name: '두근거림',
    emoji: '💓',
    nickname: '심장 DJ',
    tagline: '설렘이 아닌데 왜 뛰지',
    description: '가만히 있어도 심장이 비트 타는 중',
    category: 'body',
    image: '/characters/palpitation.png',
    color: '#E64980',
  },
  {
    id: 'paresthesia',
    name: '감각이상',
    emoji: '🫠',
    nickname: '저림 요정',
    tagline: '손끝이 남의 손 같아',
    description: '따끔따끔 저릿저릿, 감각이 제멋대로',
    category: 'body',
    image: '/characters/paresthesia.png',
    color: '#9775FA',
  },
  {
    id: 'dizziness',
    name: '어지러움',
    emoji: '💫',
    nickname: '빙글빙글 세상',
    tagline: '세상이 잠깐 흔들려요',
    description: '갑자기 핑~ 도는 느낌, 천천히 일어나야 해요',
    category: 'body',
    image: '/characters/dizziness.png',
    color: '#339AF0',
  },
  {
    id: 'formication',
    name: '피부 감각이상',
    emoji: '✨',
    nickname: '피부 위의 신호',
    tagline: '피부가 간지럽고 뭔가 느껴져요',
    description: '보이지 않는 무언가가 피부를 스치는 느낌',
    category: 'body',
    image: '/characters/formication.png',
    color: '#82C91E',
  },

  // ─── 마음의 신호 (Emotional/Cognitive) ───
  {
    id: 'brain_fog',
    name: '브레인포그',
    emoji: '☁️',
    nickname: '안개 속 탐험가',
    tagline: '방금 뭐 하려고 했더라?',
    description: '손에 열쇠 들고 열쇠 찾는 중',
    category: 'mind',
    image: '/characters/brain_fog.png',
    color: '#A9A9A9',
  },
  {
    id: 'mood_swings',
    name: '감정기복',
    emoji: '🎢',
    nickname: '롤러코스터 라이더',
    tagline: '오늘 하루에 사계절',
    description: '웃다가 울다가, 감정이 운전 중',
    category: 'mind',
    image: '/characters/mood_swings.png',
    color: '#F59F00',
  },
  {
    id: 'anxiety',
    name: '불안',
    emoji: '🌀',
    nickname: '걱정 수집가',
    tagline: '새벽 3시 걱정 대잔치',
    description: '별거 아닌 일도 거대하게 느껴져요',
    category: 'mind',
    image: '/characters/anxiety.png',
    color: '#845EF7',
  },
  {
    id: 'irritability',
    name: '짜증',
    emoji: '😤',
    nickname: '터치 금지',
    tagline: '건드리지 마세요, 제발',
    description: '작은 일에도 화가 폭발, 내 성격이 아닌데',
    category: 'mind',
    image: '/characters/irritability.png',
    color: '#FF922B',
  },
  {
    id: 'low_confidence',
    name: '자신감 저하',
    emoji: '🪞',
    nickname: '거울 회피러',
    tagline: '나... 누구였더라',
    description: '예전의 당당했던 내가 낯설어요',
    category: 'mind',
    image: '/characters/low_confidence.png',
    color: '#DEE2E6',
  },
  {
    id: 'loneliness',
    name: '외로움',
    emoji: '🏝️',
    nickname: '나홀로 섬',
    tagline: '말해도 아무도 모르는 것 같아',
    description: '사람 속에 있어도 혼자인 기분',
    category: 'mind',
    color: '#339AF0',
  },

  // ─── 일상의 변화 (Lifestyle) ───
  {
    id: 'weight_change',
    name: '체중 변화',
    emoji: '⚖️',
    nickname: '미스터리 체중계',
    tagline: '똑같이 먹었는데?',
    description: '물만 마셔도 늘어나는 신비의 몸',
    category: 'life',
    image: '/characters/weight_change.png',
    color: '#E64980',
  },
  {
    id: 'low_libido',
    name: '성욕 변화',
    emoji: '🌙',
    nickname: '조용한 밤',
    tagline: '관심이 사라졌어요',
    description: '파트너에게 미안하지만 어쩔 수 없어요',
    category: 'life',
    image: '/characters/low_libido.png',
    color: '#9775FA',
  },
  {
    id: 'hair_change',
    name: '머리카락 변화',
    emoji: '💇',
    nickname: '빠지는 중',
    tagline: '배수구가 무서워요',
    description: '샤워할 때마다 머리카락이 한 움큼',
    category: 'life',
    image: '/characters/hair_change.png',
    color: '#862E9C',
  },
  {
    id: 'digestion',
    name: '소화 문제',
    emoji: '🫠',
    nickname: '예민한 속',
    tagline: '뭘 먹어도 더부룩',
    description: '속이 부글부글, 장이 파업 중',
    category: 'life',
    image: '/characters/digestion.png',
    color: '#82C91E',
  },
  {
    id: 'urinary',
    name: '빈뇨',
    emoji: '🚻',
    nickname: '화장실 단골',
    tagline: '지도에서 화장실부터 찾아요',
    description: '외출할 때 화장실 위치가 최우선',
    category: 'life',
    color: '#15AABF',
  },
  {
    id: 'skin_aging',
    name: '피부 변화',
    emoji: '🧴',
    nickname: '크림 수집가',
    tagline: '어제까지 없던 주름이...',
    description: '갑자기 달라진 피부결, 기초가 안 먹어요',
    category: 'life',
    color: '#FCC2D7',
  },
];

// 증상 ID로 캐릭터 찾기
export const getCharacterById = (id: SymptomId): SymptomCharacter | undefined => {
  return SYMPTOM_CHARACTERS.find(c => c.id === id);
};

// 증상 이름으로 캐릭터 찾기
export const getCharacterByName = (name: string): SymptomCharacter | undefined => {
  return SYMPTOM_CHARACTERS.find(c => c.name === name);
};

// 랜덤 캐릭터 가져오기
export const getRandomCharacter = (): SymptomCharacter => {
  return SYMPTOM_CHARACTERS[Math.floor(Math.random() * SYMPTOM_CHARACTERS.length)];
};
