// 증상별 맞춤 케어 팁 데이터

export interface Tip {
  id: string;
  symptomId: string;
  category: 'lifestyle' | 'nutrition' | 'exercise' | 'mindfulness' | 'medical';
  title: string;
  description: string;
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeToEffect: string; // "즉시", "1-2주", "1개월" 등
}

export const TIPS_DATABASE: Tip[] = [
  // 핫플래시
  {
    id: 'hot_flash_1',
    symptomId: 'hot_flash',
    category: 'lifestyle',
    title: '겹쳐 입기',
    description: '얇은 옷을 여러 겹 입으면 더울 때 바로 벗을 수 있어요. 천연 소재(면, 린넨)가 통기성이 좋아요.',
    emoji: '👕',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'hot_flash_2',
    symptomId: 'hot_flash',
    category: 'nutrition',
    title: '매운 음식, 카페인 줄이기',
    description: '매운 음식과 카페인은 핫플래시를 유발할 수 있어요. 대신 시원한 허브티를 마셔보세요.',
    emoji: '🌿',
    difficulty: 'medium',
    timeToEffect: '1-2주',
  },
  {
    id: 'hot_flash_3',
    symptomId: 'hot_flash',
    category: 'lifestyle',
    title: '선풍기나 부채 휴대하기',
    description: '작은 휴대용 선풍기나 부채를 가방에 넣어두면 갑자기 더워질 때 도움이 돼요.',
    emoji: '🪭',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'hot_flash_4',
    symptomId: 'hot_flash',
    category: 'mindfulness',
    title: '심호흡으로 진정하기',
    description: '핫플래시가 오면 천천히 깊게 숨을 쉬어보세요. 4초 들이쉬고, 4초 참고, 4초 내쉬기.',
    emoji: '🧘',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },

  // 수면장애
  {
    id: 'insomnia_1',
    symptomId: 'insomnia',
    category: 'lifestyle',
    title: '수면 루틴 만들기',
    description: '매일 같은 시간에 자고 일어나세요. 주말에도 1시간 이상 차이나지 않게 유지해보세요.',
    emoji: '🌙',
    difficulty: 'medium',
    timeToEffect: '2-3주',
  },
  {
    id: 'insomnia_2',
    symptomId: 'insomnia',
    category: 'lifestyle',
    title: '침실 온도 낮추기',
    description: '침실 온도를 18-20°C로 시원하게 유지하면 수면의 질이 좋아져요.',
    emoji: '❄️',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'insomnia_3',
    symptomId: 'insomnia',
    category: 'lifestyle',
    title: '잠들기 1시간 전 스크린 끄기',
    description: '블루라이트가 멜라토닌 분비를 방해해요. 대신 책을 읽거나 음악을 들어보세요.',
    emoji: '📵',
    difficulty: 'medium',
    timeToEffect: '1주',
  },
  {
    id: 'insomnia_4',
    symptomId: 'insomnia',
    category: 'nutrition',
    title: '저녁에 카페인 피하기',
    description: '오후 2시 이후에는 카페인을 피해보세요. 커피, 녹차, 초콜릿도 포함이에요.',
    emoji: '☕',
    difficulty: 'medium',
    timeToEffect: '1주',
  },

  // 피로감
  {
    id: 'fatigue_1',
    symptomId: 'fatigue',
    category: 'exercise',
    title: '가벼운 산책하기',
    description: '피곤할 때 오히려 10-15분 산책이 에너지를 높여줘요. 특히 아침 햇살을 받으면 더 좋아요.',
    emoji: '🚶',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'fatigue_2',
    symptomId: 'fatigue',
    category: 'nutrition',
    title: '철분이 풍부한 음식 먹기',
    description: '시금치, 두부, 살코기 등 철분이 풍부한 음식을 챙겨드세요. 비타민C와 함께 먹으면 흡수가 좋아요.',
    emoji: '🥬',
    difficulty: 'easy',
    timeToEffect: '2-4주',
  },
  {
    id: 'fatigue_3',
    symptomId: 'fatigue',
    category: 'lifestyle',
    title: '낮잠은 20분 이내로',
    description: '낮잠이 필요하면 20분을 넘기지 마세요. 너무 길면 밤잠에 영향을 줄 수 있어요.',
    emoji: '⏰',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'fatigue_4',
    symptomId: 'fatigue',
    category: 'nutrition',
    title: '수분 섭취 늘리기',
    description: '가벼운 탈수도 피로감을 유발해요. 하루 8잔(2L) 정도의 물을 마셔보세요.',
    emoji: '💧',
    difficulty: 'easy',
    timeToEffect: '1-2일',
  },

  // 관절통
  {
    id: 'joint_pain_1',
    symptomId: 'joint_pain',
    category: 'exercise',
    title: '스트레칭 습관 들이기',
    description: '아침에 일어나서 5-10분 가벼운 스트레칭을 해보세요. 관절의 뻣뻣함이 줄어들어요.',
    emoji: '🤸',
    difficulty: 'easy',
    timeToEffect: '1주',
  },
  {
    id: 'joint_pain_2',
    symptomId: 'joint_pain',
    category: 'nutrition',
    title: '오메가-3 섭취하기',
    description: '연어, 고등어, 호두 등에 풍부한 오메가-3는 염증을 줄이는 데 도움이 돼요.',
    emoji: '🐟',
    difficulty: 'easy',
    timeToEffect: '4-6주',
  },
  {
    id: 'joint_pain_3',
    symptomId: 'joint_pain',
    category: 'exercise',
    title: '수영이나 수중 운동하기',
    description: '물속에서 하는 운동은 관절에 부담을 줄이면서 근력을 키워줘요.',
    emoji: '🏊',
    difficulty: 'medium',
    timeToEffect: '2-4주',
  },

  // 브레인포그
  {
    id: 'brain_fog_1',
    symptomId: 'brain_fog',
    category: 'lifestyle',
    title: '메모 습관 들이기',
    description: '중요한 것은 바로 메모하세요. 폰 메모장이나 작은 수첩을 활용해보세요.',
    emoji: '📝',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'brain_fog_2',
    symptomId: 'brain_fog',
    category: 'exercise',
    title: '규칙적인 유산소 운동',
    description: '주 3회 이상 30분 걷기나 자전거 타기가 뇌 기능을 개선해요.',
    emoji: '🚴',
    difficulty: 'medium',
    timeToEffect: '4-6주',
  },
  {
    id: 'brain_fog_3',
    symptomId: 'brain_fog',
    category: 'mindfulness',
    title: '명상으로 집중력 높이기',
    description: '하루 10분 명상이 집중력과 기억력을 개선해요. 앱을 활용해보세요.',
    emoji: '🧘',
    difficulty: 'easy',
    timeToEffect: '2-4주',
  },

  // 감정기복
  {
    id: 'mood_swings_1',
    symptomId: 'mood_swings',
    category: 'mindfulness',
    title: '감정 일기 쓰기',
    description: '감정을 기록하면 패턴을 알 수 있어요. 나를 이해하는 첫걸음이에요.',
    emoji: '📔',
    difficulty: 'easy',
    timeToEffect: '1-2주',
  },
  {
    id: 'mood_swings_2',
    symptomId: 'mood_swings',
    category: 'lifestyle',
    title: '혼자만의 시간 갖기',
    description: '하루 15분이라도 나만의 시간을 가져보세요. 좋아하는 음악을 듣거나 차를 마시거나.',
    emoji: '☕',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'mood_swings_3',
    symptomId: 'mood_swings',
    category: 'lifestyle',
    title: '신뢰하는 사람과 대화하기',
    description: '감정을 나누는 것만으로도 마음이 가벼워져요. HERLYKKE 커뮤니티도 좋은 선택이에요.',
    emoji: '💬',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },

  // 불안감
  {
    id: 'anxiety_1',
    symptomId: 'anxiety',
    category: 'mindfulness',
    title: '4-7-8 호흡법',
    description: '4초 들이쉬고, 7초 참고, 8초 내쉬기. 불안할 때 신경을 진정시켜줘요.',
    emoji: '🌬️',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'anxiety_2',
    symptomId: 'anxiety',
    category: 'mindfulness',
    title: '5-4-3-2-1 그라운딩',
    description: '주변에서 5가지 보이는 것, 4가지 만질 수 있는 것... 현재에 집중하는 기법이에요.',
    emoji: '👁️',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'anxiety_3',
    symptomId: 'anxiety',
    category: 'exercise',
    title: '요가나 태극권 시작하기',
    description: '천천히 움직이며 호흡에 집중하는 운동이 불안을 줄여줘요.',
    emoji: '🧘',
    difficulty: 'medium',
    timeToEffect: '2-4주',
  },

  // 짜증
  {
    id: 'irritability_1',
    symptomId: 'irritability',
    category: 'lifestyle',
    title: '잠깐 그 자리를 벗어나기',
    description: '짜증이 올라올 때 5분만 그 상황에서 벗어나보세요. 화장실이나 밖으로 나가도 좋아요.',
    emoji: '🚪',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'irritability_2',
    symptomId: 'irritability',
    category: 'nutrition',
    title: '혈당 안정시키기',
    description: '배가 고프면 짜증이 쉽게 나요. 견과류 같은 건강한 간식을 챙겨드세요.',
    emoji: '🥜',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },

  // 두통
  {
    id: 'headache_1',
    symptomId: 'headache',
    category: 'lifestyle',
    title: '수분 섭취 체크하기',
    description: '탈수가 두통의 흔한 원인이에요. 물을 충분히 마시고 있는지 확인해보세요.',
    emoji: '💧',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'headache_2',
    symptomId: 'headache',
    category: 'lifestyle',
    title: '목과 어깨 스트레칭',
    description: '긴장성 두통은 목과 어깨 긴장에서 올 수 있어요. 틈틈이 스트레칭해주세요.',
    emoji: '🙆',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },

  // 식은땀
  {
    id: 'night_sweat_1',
    symptomId: 'night_sweat',
    category: 'lifestyle',
    title: '통기성 좋은 잠옷 입기',
    description: '면 100% 잠옷이나 수분 흡수가 좋은 기능성 소재를 선택해보세요.',
    emoji: '👚',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'night_sweat_2',
    symptomId: 'night_sweat',
    category: 'lifestyle',
    title: '침대 옆에 물과 수건 준비',
    description: '밤에 땀이 나면 바로 닦고 물을 마실 수 있도록 준비해두세요.',
    emoji: '🧊',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },

  // 피부건조
  {
    id: 'dry_skin_1',
    symptomId: 'dry_skin',
    category: 'lifestyle',
    title: '보습제 바르는 타이밍',
    description: '샤워 후 3분 안에 보습제를 바르면 수분 흡수가 가장 좋아요.',
    emoji: '🧴',
    difficulty: 'easy',
    timeToEffect: '1주',
  },
  {
    id: 'dry_skin_2',
    symptomId: 'dry_skin',
    category: 'nutrition',
    title: '좋은 지방 섭취하기',
    description: '아보카도, 올리브오일, 견과류의 건강한 지방이 피부 장벽을 강화해요.',
    emoji: '🥑',
    difficulty: 'easy',
    timeToEffect: '2-4주',
  },

  // 두근거림
  {
    id: 'palpitation_1',
    symptomId: 'palpitation',
    category: 'mindfulness',
    title: '심호흡으로 진정하기',
    description: '두근거림을 느끼면 천천히 깊게 숨을 쉬어보세요. 부교감신경을 활성화해요.',
    emoji: '🫁',
    difficulty: 'easy',
    timeToEffect: '즉시',
  },
  {
    id: 'palpitation_2',
    symptomId: 'palpitation',
    category: 'nutrition',
    title: '카페인 섭취량 점검',
    description: '커피, 에너지 드링크, 녹차의 카페인이 두근거림을 악화시킬 수 있어요.',
    emoji: '☕',
    difficulty: 'medium',
    timeToEffect: '1-2주',
  },
];

// 카테고리별 아이콘
export const CATEGORY_INFO = {
  lifestyle: { emoji: '🏠', label: '생활습관', color: 'bg-hlk-lavender-light text-hlk-lavender' },
  nutrition: { emoji: '🥗', label: '영양', color: 'bg-hlk-primary-light text-hlk-primary-dark' },
  exercise: { emoji: '🏃', label: '운동', color: 'bg-hlk-clay-light text-hlk-clay-dark' },
  mindfulness: { emoji: '🧘', label: '마음챙김', color: 'bg-hlk-indigo-light text-hlk-indigo' },
  medical: { emoji: '🏥', label: '의료', color: 'bg-hlk-accent-light text-hlk-accent-dark' },
};

// 난이도별 정보 — 의미색(쉬움=success, 보통=warning, 어려움=error)
export const DIFFICULTY_INFO = {
  easy: { label: '쉬움', color: 'text-hlk-success' },
  medium: { label: '보통', color: 'text-hlk-warning' },
  hard: { label: '어려움', color: 'text-hlk-error' },
};
