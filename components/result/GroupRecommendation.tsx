'use client';

import { Activity, Heart, Moon, Sparkles, ThermometerSun } from 'lucide-react';

const GROUP_INFO = {
  vasomotor: {
    name: '열감/수면 그룹',
    Icon: ThermometerSun,
    desc: '열감, 안면홍조, 수면 장애를 겪는 분들이 경험과 관리법을 나눠요.',
  },
  emotional_dominant: {
    name: '마음 그룹',
    Icon: Heart,
    desc: '우울, 불안, 감정 기복 등 감정 변화를 겪는 분들이 서로 공감하고 위로해요.',
  },
  musculoskeletal: {
    name: '관절/피로 그룹',
    Icon: Activity,
    desc: '관절통, 만성 피로 등 신체 증상 관리법을 함께 나눠요.',
  },
  mood_focused: {
    name: '감정 변화 그룹',
    Icon: Moon,
    desc: '기분 변화, 짜증, 눈물이 많아진 분들이 서로의 이야기를 나눠요.',
  },
  mixed: {
    name: '종합 그룹',
    Icon: Sparkles,
    desc: '다양한 증상을 겪는 분들이 모여 폭넓게 이야기를 나눠요.',
  },
} as const;

interface GroupRecommendationProps {
  cluster: string;
}

export function GroupRecommendation({ cluster }: GroupRecommendationProps) {
  const group = GROUP_INFO[cluster as keyof typeof GROUP_INFO] || GROUP_INFO.mixed;
  const Icon = group.Icon;

  return (
    <div className="bg-hlk-surface rounded-2xl border-2 border-hlk-primary/30 p-6">
      <p className="text-xs text-hlk-primary font-semibold mb-3">추천 커뮤니티 그룹</p>
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-hlk-primary-light text-hlk-primary">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <h3 className="text-lg font-bold text-hlk-text">{group.name}</h3>
      </div>
      <p className="text-sm text-hlk-text-secondary leading-relaxed">
        {group.desc}
      </p>
    </div>
  );
}
