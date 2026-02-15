// 맞춤 팁 추천 로직
import { DailyLog } from './logTypes';
import { TIPS_DATABASE, Tip } from './tipsData';
import { SymptomFrequencyData, calculateSymptomFrequency } from './patternAnalysis';

export interface RecommendedTip extends Tip {
  reason: string;
  priority: number; // 높을수록 우선
}

// 증상 빈도 기반 팁 추천
export function getPersonalizedTips(logs: DailyLog[], limit: number = 5): RecommendedTip[] {
  if (logs.length === 0) {
    // 로그가 없으면 일반적인 팁 추천
    return getGeneralTips(limit);
  }

  const symptomFrequency = calculateSymptomFrequency(logs);
  const recommendedTips: RecommendedTip[] = [];

  // 가장 자주 나타나는 증상 순으로 팁 추천
  symptomFrequency.forEach((symptom, index) => {
    const tips = TIPS_DATABASE.filter((tip) => tip.symptomId === symptom.symptomId);

    tips.forEach((tip) => {
      // 우선순위: 빈도 높을수록 + 쉬운 것 우선
      const frequencyScore = (symptomFrequency.length - index) * 10;
      const difficultyScore = tip.difficulty === 'easy' ? 5 : tip.difficulty === 'medium' ? 3 : 1;
      const priority = frequencyScore + difficultyScore;

      recommendedTips.push({
        ...tip,
        reason: `${symptom.name}이(가) ${symptom.count}일 동안 기록되었어요`,
        priority,
      });
    });
  });

  // 우선순위로 정렬하고 중복 제거
  const seen = new Set<string>();
  return recommendedTips
    .sort((a, b) => b.priority - a.priority)
    .filter((tip) => {
      if (seen.has(tip.id)) return false;
      seen.add(tip.id);
      return true;
    })
    .slice(0, limit);
}

// 오늘 기록한 증상 기반 팁
export function getTipsForTodaySymptoms(log: DailyLog | undefined, limit: number = 3): RecommendedTip[] {
  if (!log || log.symptoms.length === 0) {
    return [];
  }

  const recommendedTips: RecommendedTip[] = [];

  log.symptoms.forEach((symptom) => {
    const tips = TIPS_DATABASE.filter((tip) => tip.symptomId === symptom.symptomId);

    // 강도가 높을수록 우선순위 높게
    tips.forEach((tip) => {
      const severityScore = symptom.severity * 3;
      const difficultyScore = tip.difficulty === 'easy' ? 5 : tip.difficulty === 'medium' ? 3 : 1;
      // 즉시 효과가 있는 것 우선
      const immediateScore = tip.timeToEffect === '즉시' ? 10 : 0;

      recommendedTips.push({
        ...tip,
        reason: `오늘 기록한 ${tip.symptomId === symptom.symptomId ? '증상' : ''}에 도움이 돼요`,
        priority: severityScore + difficultyScore + immediateScore,
      });
    });
  });

  const seen = new Set<string>();
  return recommendedTips
    .sort((a, b) => b.priority - a.priority)
    .filter((tip) => {
      if (seen.has(tip.id)) return false;
      seen.add(tip.id);
      return true;
    })
    .slice(0, limit);
}

// 일반적인 팁 (로그가 없을 때)
export function getGeneralTips(limit: number = 5): RecommendedTip[] {
  // 쉽고 일반적으로 도움이 되는 팁들
  const generalSymptoms = ['fatigue', 'insomnia', 'mood_swings'];
  const tips: RecommendedTip[] = [];

  generalSymptoms.forEach((symptomId) => {
    const symptomTips = TIPS_DATABASE
      .filter((tip) => tip.symptomId === symptomId && tip.difficulty === 'easy')
      .slice(0, 2);

    symptomTips.forEach((tip) => {
      tips.push({
        ...tip,
        reason: '많은 분들에게 도움이 되는 팁이에요',
        priority: 1,
      });
    });
  });

  return tips.slice(0, limit);
}

// 카테고리별 팁 가져오기
export function getTipsByCategory(category: Tip['category']): Tip[] {
  return TIPS_DATABASE.filter((tip) => tip.category === category);
}

// 특정 증상의 모든 팁
export function getTipsForSymptom(symptomId: string): Tip[] {
  return TIPS_DATABASE.filter((tip) => tip.symptomId === symptomId);
}
