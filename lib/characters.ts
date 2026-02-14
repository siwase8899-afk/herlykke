// 증상별 유머러스 캐릭터 시스템
// 스타일: 플랫 일러스트, 네이비 배경, 코랄/화이트 악센트

export type SymptomId =
  | 'hot_flash'
  | 'insomnia'
  | 'brain_fog'
  | 'mood_swings'
  | 'joint_pain'
  | 'fatigue'
  | 'anxiety'
  | 'weight_change';

export interface SymptomCharacter {
  id: SymptomId;
  name: string;           // 증상 이름
  emoji: string;          // 이모지 (placeholder)
  nickname: string;       // 캐릭터 닉네임
  tagline: string;        // 유머러스한 한 줄
  description: string;    // 공감 가는 설명
  image?: string;         // 일러스트 이미지 경로
  color: string;          // 대표 컬러
}

export const SYMPTOM_CHARACTERS: SymptomCharacter[] = [
  {
    id: 'hot_flash',
    name: '열감',
    emoji: '🔥',
    nickname: '핫플래시 퀸',
    tagline: '에어컨 앞은 내 자리',
    description: '갑자기 확 오르는 열기, 냉장고가 내 베프',
    image: '/characters/hot-flash.png',
    color: '#FF6B6B',
  },
  {
    id: 'insomnia',
    name: '수면장애',
    emoji: '🐑',
    nickname: '새벽 3시 친구',
    tagline: '양들도 다 잠들었는데...',
    description: '999마리 세다가 포기, 천장이 친숙해요',
    image: '/characters/insomnia.png',
    color: '#748FFC',
  },
  {
    id: 'brain_fog',
    name: '브레인포그',
    emoji: '☁️',
    nickname: '안개 속 탐험가',
    tagline: '방금 뭐 하려고 했더라?',
    description: '손에 열쇠 들고 열쇠 찾는 중',
    image: '/characters/brain-fog.png',
    color: '#A9A9A9',
  },
  {
    id: 'mood_swings',
    name: '감정기복',
    emoji: '🎢',
    nickname: '롤러코스터 라이더',
    tagline: '오늘 하루에 사계절',
    description: '웃다가 울다가, 감정이 운전 중',
    image: '/characters/mood-swings.png',
    color: '#F59F00',
  },
  {
    id: 'joint_pain',
    name: '관절통',
    emoji: '🤖',
    nickname: '뻣뻣한 로봇',
    tagline: '기름칠 좀 해주세요',
    description: '아침마다 WD-40 필요, 삐걱삐걱',
    image: '/characters/joint-pain.png',
    color: '#20C997',
  },
  {
    id: 'fatigue',
    name: '피로감',
    emoji: '🪫',
    nickname: '배터리 1% 인간',
    tagline: '충전해도 20%가 맥스',
    description: '풀충전이 뭐였더라, 항상 저전력 모드',
    image: '/characters/fatigue.png',
    color: '#868E96',
  },
  {
    id: 'anxiety',
    name: '불안',
    emoji: '🌀',
    nickname: '걱정 수집가',
    tagline: '새벽 3시 걱정 대잔치',
    description: '별거 아닌 일도 거대하게 느껴져요',
    image: '/characters/anxiety.png',
    color: '#845EF7',
  },
  {
    id: 'weight_change',
    name: '체중변화',
    emoji: '⚖️',
    nickname: '미스터리 체중계',
    tagline: '똑같이 먹었는데?',
    description: '물만 마셔도 늘어나는 신비의 몸',
    image: '/characters/weight-change.png',
    color: '#E64980',
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
