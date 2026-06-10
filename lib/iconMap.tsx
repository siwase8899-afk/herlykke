// 이모지 → 모던 라인 아이콘(lucide) 중앙 매핑.
// 렌더 지점에서 <EmojiIcon emoji={x.emoji} /> 로 교체하면 데이터는 그대로 두고 아이콘만 현대화.
import {
  Moon, Sun, Star, Sparkles, MessageCircle, Leaf, Sprout, Salad, Flame,
  TrendingUp, TrendingDown, ArrowRight, ArrowLeft, ArrowUp, Activity, Footprints,
  Dumbbell, Bike, Waves, Wind, Lightbulb, Check, X, Heart, HeartCrack, Pill,
  BarChart3, PenLine, NotebookPen, ClipboardList, BookOpen, Book, Coffee,
  Smile, Frown, Meh, Annoyed, PartyPopper, AlertTriangle, Brain, Home, Building2,
  Stethoscope, Droplet, Droplets, Scale, Rainbow, Lock, Calendar, Target, Search,
  Crown, Gem, Eye, HelpCircle, User, Users, Cloud, CloudRain, Snowflake, Palette,
  Zap, Bed, Bath, DoorOpen, Wine, Soup, Mic, Train, Fish, Bot, Handshake, Shirt,
  Circle, Music, ThumbsUp, Hand, BatteryLow, Hourglass, Sliders, Wand2, Bandage,
  type LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  // 수면·밤
  '🌙': Moon, '🌑': Moon, '🌘': Moon, '🌗': Moon, '🌖': Moon, '🌕': Moon, '🌓': Moon,
  '😴': Bed, '💤': Moon, '🛏': Bed, '🛏️': Bed, '😪': Moon,
  // 반짝·강조
  '✨': Sparkles, '🌟': Sparkles, '💫': Sparkles, '⭐': Star, '★': Star, '🌠': Sparkles, '🪄': Wand2,
  // 대화·커뮤니티
  '💬': MessageCircle, '💭': MessageCircle, '🗨': MessageCircle,
  // 자연·식물·영양
  '🌿': Leaf, '🌱': Sprout, '🌳': Leaf, '🍂': Leaf, '🥬': Salad, '🥗': Salad, '🌺': Flame, '🥜': Leaf, '🍵': Coffee, '🥑': Salad,
  // 불·열감
  '🔥': Flame, '🌶': Flame, '🌶️': Flame,
  // 추세·차트
  '📈': TrendingUp, '📊': BarChart3, '📉': TrendingDown, '⚖': Scale, '⚖️': Scale, '📅': Calendar, '⏳': Hourglass, '🎚': Sliders,
  // 화살표
  '➡': ArrowRight, '➡️': ArrowRight, '→': ArrowRight, '←': ArrowLeft, '⬅': ArrowLeft, '↑': ArrowUp, '⬆': ArrowUp,
  // 운동·신체활동
  '🏃': Activity, '🚶': Footprints, '🚴': Bike, '🏊': Waves, '🤸': Activity, '💪': Dumbbell, '🧘': Activity, '🙆': Activity, '💆': Hand,
  // 아이디어·뇌
  '💡': Lightbulb, '🧠': Brain,
  // 체크·취소
  '✓': Check, '✅': Check, '✕': X, '❌': X, '☑': Check,
  // 마음·공감
  '❤': Heart, '❤️': Heart, '💜': Heart, '💓': Heart, '💗': Heart, '🩷': Heart, '💛': Heart, '💙': Heart, '🫶': Heart, '🙏': Hand, '💔': HeartCrack, '🤝': Handshake, '🤗': Heart, '🤲': Hand,
  // 의료·건강
  '💊': Pill, '🩺': Stethoscope, '⚕': Stethoscope, '⚕️': Stethoscope, '🏥': Building2, '🤕': Bandage, '🤢': Frown, '🩹': Bandage, '🫁': Activity, '🦴': Activity,
  // 글쓰기·기록
  '✍': PenLine, '✍️': PenLine, '✏': PenLine, '✏️': PenLine, '📝': NotebookPen, '📓': NotebookPen, '📔': Book, '📋': ClipboardList, '📖': BookOpen, '📚': BookOpen, '👁': Eye, '👁️': Eye, '👀': Eye,
  // 음료·기호식품
  '☕': Coffee, '🍷': Wine, '🍜': Soup,
  // 표정 — 긍정
  '😊': Smile, '🙂': Smile, '😄': Smile, '🥰': Smile, '😌': Smile, '😇': Smile, '🙆‍♀️': Smile, '👍': ThumbsUp, '😆': Smile,
  // 표정 — 부정
  '😢': Frown, '😞': Frown, '😔': Frown, '😩': Frown, '😫': Frown, '😰': Frown, '😵': Frown, '🥲': Frown, '😤': Frown, '😟': Frown, '😳': Frown, '🫠': Frown, '😶': Meh, '🫥': Meh, '😪‍': Frown, '🤐': Meh, '😑': Meh, '🙄': Annoyed, '😐': Meh, '😕': Meh, '😮': Meh, '😵‍💫': Frown,
  // 축하·이벤트
  '🎉': PartyPopper, '🎊': PartyPopper,
  // 경고·도움
  '⚠': AlertTriangle, '⚠️': AlertTriangle, '❓': HelpCircle, '❔': HelpCircle, '🆘': AlertTriangle,
  // 날씨·자연현상
  '🌫': Cloud, '🌫️': Cloud, '☁': Cloud, '☁️': Cloud, '🌊': Waves, '🌬': Wind, '🌬️': Wind, '❄': Snowflake, '❄️': Snowflake, '🌈': Rainbow, '💧': Droplet, '💦': Droplets, '🌀': Wind, '🪭': Wind, '🧊': Snowflake,
  // 공간·집
  '🏠': Home, '🏢': Building2, '🚪': DoorOpen, '🛋': Home, '🛋️': Home, '🛁': Bath, '🚻': DoorOpen, '🚇': Train,
  // 사람
  '👩': User, '👧': User, '👭': Users, '👥': Users, '👤': User, '🐑': User, '🐟': Fish, '🤖': Bot, '🙋': Hand, '🙋‍♀️': Hand, '🤷': Hand, '🤷‍♀️': Hand,
  // 잠금·검색·상태
  '🔒': Lock, '🔍': Search, '🎯': Target, '👑': Crown, '💎': Gem, '🪫': BatteryLow, '⚡': Zap, '🎨': Palette, '🎤': Mic, '🍵‍': Coffee,
  // 상태 점
  '🟢': Circle, '🟡': Circle, '🟠': Circle, '🔴': Circle, '🌱‍': Sprout,
  // 의류·기타
  '👕': Shirt, '👚': Shirt, '🎭': Smile, '💼': ClipboardList, '🛍': ClipboardList, '🛍️': ClipboardList, '💰': Gem, '🪞': Eye, '💇': Activity, '💇‍♀️': Activity, '🎢': Activity, '🍂‍': Leaf, '♀': User, '♀️': User, '♂': User, '🎵': Music,
};

export function EmojiIcon({
  emoji,
  className = '',
  size = 18,
}: {
  emoji?: string;
  className?: string;
  size?: number;
}) {
  const Icon = (emoji && MAP[emoji]) || Sparkles;
  return (
    <Icon
      className={`inline-block shrink-0 align-[-0.15em] ${className}`}
      size={size}
      strokeWidth={1.75}
      aria-hidden
    />
  );
}
