import type { MenopauseStage } from '../types/database';

interface ClassifierInput {
  ageRange: string;
  physicalSymptoms: string[];
  emotionalSymptoms: string[];
  symptomSeverity: number;
  symptomOnset: string;
}

interface ClassifierResult {
  stage: MenopauseStage;
  confidence: 'high' | 'medium' | 'low';
  description: string;
  tips: string[];
}

// 갱년기 단계 자동 분류 알고리즘
// 연령 + 증상 패턴 + 심각도 + 발현 시기를 종합 분석
export function classifyStage(input: ClassifierInput): ClassifierResult {
  const { ageRange, physicalSymptoms, emotionalSymptoms, symptomSeverity, symptomOnset } = input;

  const totalSymptoms = physicalSymptoms.length + emotionalSymptoms.length;
  const hasHotFlash = physicalSymptoms.includes('hot_flash');
  const hasInsomnia = physicalSymptoms.includes('insomnia');
  const hasMoodSwing = emotionalSymptoms.includes('mood_swing');

  // 점수 기반 분류
  let score = 0;

  // 연령 가중치
  switch (ageRange) {
    case '40-44': score += 1; break;
    case '45-49': score += 2; break;
    case '50-54': score += 3; break;
    case '55-59': score += 4; break;
    case '60+': score += 5; break;
  }

  // 증상 수 가중치
  if (totalSymptoms >= 6) score += 3;
  else if (totalSymptoms >= 3) score += 2;
  else if (totalSymptoms >= 1) score += 1;

  // 핵심 증상 가중치
  if (hasHotFlash) score += 2;
  if (hasInsomnia) score += 1;
  if (hasMoodSwing) score += 1;

  // 심각도 가중치
  if (symptomSeverity >= 4) score += 2;
  else if (symptomSeverity >= 3) score += 1;

  // 발현 기간 가중치
  switch (symptomOnset) {
    case 'over_3years': score += 3; break;
    case '2_3years': score += 2; break;
    case '1_2years': score += 1; break;
  }

  // 단계 결정
  let stage: MenopauseStage;
  let confidence: 'high' | 'medium' | 'low';
  let description: string;
  let tips: string[];

  if (score <= 3) {
    stage = 'preparation';
    confidence = totalSymptoms === 0 ? 'high' : 'medium';
    description = '아직 뚜렷한 갱년기 증상이 나타나기 전이에요. 미리 준비하면 더 수월하게 지날 수 있어요.';
    tips = [
      '규칙적인 운동 습관 만들기',
      '칼슘, 비타민D 섭취 시작',
      '기본 건강 검진 받기',
    ];
  } else if (score <= 7) {
    stage = 'perimenopause';
    confidence = hasHotFlash || hasMoodSwing ? 'high' : 'medium';
    description = '갱년기 전기에 해당해요. 호르몬 변화가 시작되면서 다양한 증상이 나타날 수 있어요.';
    tips = [
      '산부인과 상담으로 현재 상태 확인',
      '증상 일지 작성 시작하기',
      '스트레스 관리에 신경 쓰기',
      '수면 환경 개선하기',
    ];
  } else if (score <= 11) {
    stage = 'menopause_active';
    confidence = 'high';
    description = '갱년기 한가운데에 계세요. 증상이 가장 활발한 시기이지만, 관리하면 충분히 나아질 수 있어요.';
    tips = [
      '호르몬 대체요법(HRT) 상담 고려',
      '증상별 맞춤 관리 시작',
      '같은 경험을 하는 사람들과 대화',
      '무리하지 않기, 나에게 관대하기',
    ];
  } else if (score <= 14) {
    stage = 'postmenopause_early';
    confidence = ageRange === '55-59' || ageRange === '60+' ? 'high' : 'medium';
    description = '폐경 후 초기 단계예요. 증상이 서서히 안정되기 시작하지만, 건강 관리가 더욱 중요해요.';
    tips = [
      '골밀도 검사 받기',
      '심혈관 건강 관리',
      '적절한 운동 (걷기, 요가)',
      '정기 건강 검진 유지',
    ];
  } else {
    stage = 'postmenopause_stable';
    confidence = 'medium';
    description = '폐경 후 안정기에요. 몸이 새로운 균형을 찾아가는 시기, 건강한 노화를 준비해요.';
    tips = [
      '규칙적인 건강 검진',
      '사회 활동 유지하기',
      '근력 운동으로 근감소 예방',
      '인지 활동으로 뇌 건강 관리',
    ];
  }

  return { stage, confidence, description, tips };
}

// 증상 클러스터 분류 (그룹 매칭용)
export function classifySymptomCluster(
  physicalSymptoms: string[],
  emotionalSymptoms: string[],
): string {
  const hasHotFlash = physicalSymptoms.includes('hot_flash');
  const hasInsomnia = physicalSymptoms.includes('insomnia');
  const hasJointPain = physicalSymptoms.includes('joint_pain');
  const hasFatigue = physicalSymptoms.includes('fatigue');
  const hasDepression = emotionalSymptoms.includes('depression');
  const hasAnxiety = emotionalSymptoms.includes('anxiety');
  const hasMoodSwing = emotionalSymptoms.includes('mood_swing');

  const emotionalCount = emotionalSymptoms.length;
  const physicalCount = physicalSymptoms.length;

  if (emotionalCount > physicalCount && emotionalCount >= 3) {
    return 'emotional_dominant';
  }
  if (hasHotFlash && hasInsomnia) {
    return 'vasomotor';
  }
  if (hasJointPain || hasFatigue) {
    return 'musculoskeletal';
  }
  if (hasDepression || hasAnxiety || hasMoodSwing) {
    return 'mood_focused';
  }
  return 'mixed';
}

// 생활 맥락 분류 (그룹 매칭용)
export function classifyLifeContext(
  employment: string,
  maritalStatus: string,
  livingSituation: string,
): string {
  if (employment === 'fulltime' || employment === 'parttime_contract') {
    return 'working';
  }
  if (employment === 'homemaker') {
    return 'homemaker';
  }
  if (livingSituation === 'alone') {
    return 'living_alone';
  }
  if (maritalStatus === 'divorced' || maritalStatus === 'widowed') {
    return 'single_again';
  }
  return 'general';
}
