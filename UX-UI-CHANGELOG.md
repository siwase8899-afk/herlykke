# HERLYKKE UX/UI 변경 이력 & 디자인 시스템 레퍼런스

> 이 문서는 세션 간 연속성을 위한 살아있는 레퍼런스입니다.
> 새로운 변경 시 해당 Phase에 추가하세요.

---

## 디자인 원칙 (Design Principles)

| 원칙 | 설명 |
|------|------|
| **Calm Aesthetics** | 파스텔, 낮은 대비, 부드러운 모션 — 40~55세 여성 타겟 |
| **C2MTL Physics** | 모든 애니메이션에 `cubic-bezier(0.19, 1, 0.22, 1)` 적용 |
| **Accessible Motion** | `prefers-reduced-motion` 전체 대응 |
| **Empathy-Centered** | "혼자가 아니에요" 내러티브, 존댓말, 가르치지 않는 톤 |
| **framer-motion 금지** | CSS + rAF만 사용 |

---

## 색상 시스템

| 역할 | 이름 | Hex | 용도 |
|------|------|-----|------|
| Primary | Soft Sage Blue | `#6F9CA6` | CTA, 활성 상태, 주요 UI |
| Primary Light | | `#C8DFE4` | 배지 배경, 선택 배경 |
| Primary Dark | | `#5A8590` | 호버, 강조 |
| Accent | Calm Lavender | `#C9A6C9` | 보조 CTA, 감정 강조 |
| Highlight | Soft Mint | `#B8E0C6` | 성공, 웰니스 지표 |
| Background | Warm Grey | `#F3F6F7` | 페이지 배경 |
| Surface | White | `#FFFFFF` | 카드, 섹션 |
| Surface Warm | | `#EAF0F2` | 따뜻한 섹션 배경 |
| Text | Dark Slate | `#2F3A3D` | 본문 |
| Text Secondary | | `#6B7C80` | 부가 텍스트 |
| Text Tertiary | | `#95A3A7` | 힌트, 메타 |

---

## 타이포그래피

- **본문**: Pretendard Variable (line-height 1.8)
- **디스플레이**: Nunito (헤더 로고 "HERLYKKE")
- **헤딩 h1/h2**: line-height 1.15, letter-spacing -0.02em
- **최소 입력 폰트**: 16px (40~50대 접근성)

---

## 섀도우 시스템

```
shadow-soft-sm: 0 1px 3px rgba(111,156,166,0.06)
shadow-soft:    0 4px 12px rgba(111,156,166,0.08)
shadow-soft-md: 0 8px 24px rgba(111,156,166,0.10)
shadow-soft-lg: 0 16px 40px rgba(111,156,166,0.12)
```

---

## 랜딩 페이지 섹션 순서 (`app/page.tsx`)

1. **SleepHero** — 히어로 (배경 이미지 + 단어 순환)
2. **ContentQuickAccess** — 탭 허브 (컬럼/레시피/솔루션)
3. **RecipeShowcase** — 수면 레시피 6장 (AnniePick)
4. **FeaturedColumns** — 전문가 컬럼 4장
5. **SleepStats** — 수면-치매 데이터 (벤토 그리드 + 카운트업)
6. **SleepHowItWorks** — 3스텝 플로우
7. **FounderSection** — 창업자 스토리
8. **CTAFooter** — 마무리 CTA

---

## 구현 완료 Phase 기록

### Phase A+B+C (기반 구현)

**카운트업 애니메이션**
- `useCountUp` 훅 — easeOutExpo, 2s, 스크롤 트리거
- SleepStats 벤토 그리드에 적용 (44.7%, 40% 등)

**카드 호버 인터랙션**
- `.card-healthcare` — translateY(-4px) + 소프트 섀도우 + 보더 변화
- `.card-hover` — translateY(-2px) + 섀도우
- RecipeCard, ExpertProfileCard에 적용

**전문가 상담 플로우**
- ExpertProfileCard 선택 UI
- BookingFlow 프로그레스 바
- AnimatedProgress 컴포넌트

**스크롤 트리거**
- `useIntersectionObserver` 훅 (threshold 0.1, triggerOnce)
- `.scroll-hidden` → `.scroll-visible` (fadeUp 30px, 0.8s)
- 방향 변형: scroll-hidden-left/right, scroll-hidden-scale

**기본 애니메이션 라이브러리**
- breathe (4-7-8 호흡 리듬, 8s)
- floatY/floatXY (장식 요소)
- glowPulse (커뮤니티 반응)
- shimmer (AnniePick 카드)
- slowFadeIn (페이지 진입, 1.2s)
- reactionPop (공감 버튼)
- btn-fill-hover (배경 채우기 효과 3종)

**커스텀 훅**
- `useIntersectionObserver` — 뷰포트 감지
- `useCountUp` — 숫자 카운트업
- `useMouseGlow` — 마우스 추적 글로우
- `useParallax` — 미세 패럴랙스

---

### Phase D (마이크로 인터랙션 확장) — 2026-03-08

| ID | 항목 | 파일 | 상태 |
|----|------|------|------|
| D1 | 스크롤 프로그레스 바 (2px) | `ScrollProgress.tsx` (신규) | ✅ |
| D2 | 헤더 스크롤 반응 (배경 진해짐 + 그림자) | `Header.tsx` | ✅ |
| D3 | Testimonials 자동 슬라이드 (5초 + fade) | `Testimonials.tsx` | ✅ |
| D4 | HowItWorks 아이콘 호버 bounce + 연결선 stagger | `SleepHowItWorks.tsx` | ✅ |
| D5 | 버튼 press 피드백 (active scale 0.97) | `globals.css` | ✅ |
| D6 | RecipeShowcase → `.card-healthcare` 통일 | `RecipeShowcase.tsx` | ✅ |
| D7 | ContentQuickAccess 탭 전환 fade-in (key 재트리거) | `ContentQuickAccess.tsx` | ✅ |
| D8 | ExpertProfileCard 선택 시 scale(1.02) | `ExpertProfileCard.tsx` | ✅ |
| D9 | FounderSection 값 칩 stagger 진입 (100ms) | `FounderSection.tsx` | ✅ |

**D Phase 세부 구현**

- **D1 ScrollProgress**: `window.scrollY / docHeight * 100` → width%, `scroll-progress-bar` 클래스 (그래디언트), ARIA progressbar
- **D2 Header scroll**: `isScrolled` state (>50px), `bg-hlk-bg/80` → `/95`, `shadow-soft-sm` 추가
- **D3 Testimonials auto**: `setInterval(5000)`, `isFading` state로 200ms cross-fade, 클릭 시 타이머 리셋, `prefers-reduced-motion` 시 비활성화
- **D4 icon-bounce**: `.group:hover .icon-bounce { translateY(-4px) }`, 연결선 arrow opacity stagger
- **D5 active press**: `button:active, a:active { scale(0.97) }`
- **D6 RecipeShowcase**: 인라인 hover → `.card-healthcare` 클래스 교체
- **D7 탭 전환**: 각 탭 그리드에 `key` prop + `animate-slow-fade-in` → 탭 변경 시 re-mount
- **D8 ExpertProfileCard**: 선택 시 `scale-[1.02]`, 300ms transition
- **D9 FounderSection chips**: `chipsRef` + IntersectionObserver, `opacity-0 translate-y-4` → `opacity-100 translate-y-0`, 100ms stagger

---

### 카피 변경 이력

| 날짜 | 위치 | Before | After |
|------|------|--------|-------|
| 2026-03-08 | Columns 페이지 히어로 | "전문가가 알려주는 / 두번째 봄 이야기" | "전문가가 들려주는 / 수면 회복 이야기" |
| 2026-03-08 | Columns 페이지 설명 | "산부인과...쉽고 따뜻하게 풀어드려요. 검색하면 광고뿐인..." | "산부인과, 정신건강의학과, 수면의학 전문의가 몸의 변화와 수면에 대해 쉽고 따뜻하게 설명합니다." |
| 2026-03-08 | FeaturedColumns 랜딩 | "전문가가 알려주는 이야기" | "전문가가 들려주는 / 수면 회복 이야기" |

**카피 톤 방향**: "숙면 여정 / 수면 회복 / 나의 밤을 되찾기" — 따뜻하고 개인적인 회복 내러티브

---

## 주요 컴포넌트 인벤토리

### UI 컴포넌트 (`components/ui/`)
| 컴포넌트 | 용도 |
|----------|------|
| Button | 3 variants (primary/secondary/ghost), 3 sizes |
| Card | 범용 카드 래퍼 |
| BreathingLoader | 4-7-8 호흡 리듬 로딩 |
| FloatingOrbs | 장식용 부유 구체 (aria-hidden) |
| SunsetScroll | 스크롤 연동 배경색 전환 |
| GlowReaction | 커뮤니티 공감 버튼 (글로우 + 팝) |
| SleepCycleViz | 달 위상 수면 품질 시각화 |
| OptionButton | 다중/단일 선택 |
| ProgressBar | 스텝 진행 표시 |
| AmbientPageWrapper | Orb 래핑 페이지 |
| AnimatedProgress | 프로그레스 애니메이션 |

### 레이아웃 (`components/layout/`)
| 컴포넌트 | 용도 |
|----------|------|
| Header | 고정 헤더 + 스크롤 반응 + 모바일 메뉴 |
| Footer | 다크 푸터 |
| ScrollProgress | 2px 스크롤 프로그레스 바 |
| LayoutShell | 라우트 인식 레이아웃 래퍼 |
| SectionWrapper | 섹션 컨테이너 유틸 |

---

## 미구현 / 향후 검토 항목

| 항목 | 우선순위 | 비고 |
|------|----------|------|
| drag carousel (터치 스와이프) | 낮음 | ContentQuickAccess 탭 콘텐츠 |
| SunsetScroll 랜딩 적용 | 낮음 | 컴포넌트 있으나 랜딩에 미적용 |
| 페이지 전환 애니메이션 | 중간 | Next.js App Router 한계 검토 필요 |
| 다크 모드 | 낮음 | 색상 시스템 확장 필요 |
| 스켈레톤 로딩 | 중간 | 데이터 로딩 시 시각적 피드백 |

---

## 기술 제약 요약

- **framer-motion 사용 금지** — CSS transitions + requestAnimationFrame만
- **prefers-reduced-motion** — 모든 애니메이션에 필수 적용
- **색상**: `--color-hlk-*` CSS 변수 시스템
- **이징**: C2MTL `cubic-bezier(0.19, 1, 0.22, 1)` 통일
- **비대칭 타이밍**: 진입 0.6s / 퇴장 0.4s
- **GPU 가속**: transform, opacity 위주 애니메이션
- **passive listener**: 스크롤 이벤트에 필수

---

*마지막 업데이트: 2026-03-08 (Phase D 완료 + 카피 변경)*
