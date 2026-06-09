# Design System — HERLYKKE

> 나침반: **"차분한 신뢰"** — 의료스럽지 않은, 따뜻하고 신뢰가는 웰니스.
> 모든 시각/UI 결정 전에 이 문서를 먼저 읽는다.

## Product Context
- **무엇:** 4050 여성 수면·뇌건강 커뮤니티 마켓 (수면 체크인 → 커뮤니티 → 메이트 레시피)
- **누구:** 40~55세 한국 여성 (모바일 우선, 노안 고려 — 가독성 중요)
- **공간:** 수면·여성 웰니스. 레퍼런스: Oura(데이터 절제), Midi Health(따뜻한 신뢰), Calm(차분)
- **타입:** 모바일 웹앱 + 마케팅 랜딩 혼합

## Aesthetic Direction
- **방향:** Organic + Editorial (따뜻한 절제)
- **데코레이션:** intentional — 따뜻한 크림 베이스, 부드러운 라운드 카드, 은은한 웜 섀도우. 제네릭 이모지·평면 저대비 카드 금지.
- **무드:** 차분하고 신뢰가는, 의료스럽지 않은 온기. 새벽에 깨어 불안한 사람을 안심시키는 톤.
- **레퍼런스:** ouraring.com, joinmidi.com, calm.com

## Typography
- **Display/Hero (영문·숫자):** **Fraunces** (opsz, 500–600) — 따뜻한 세리프, 에디토리얼 신뢰. 큰 수면점수 숫자·영문 헤드라인에 사용.
- **한글 헤드라인:** **Pretendard** 600/700 — 현대·고가독(명조 안 씀, 4050 가독성 우선).
- **Body / UI:** **Pretendard** 400/500, line-height 1.7~1.8, 최소 16px.
- **Data/숫자:** Fraunces (tabular 느낌의 큰 지표 숫자) — 수면점수 등.
- **로딩:** Fraunces = Google Fonts, Pretendard = jsDelivr CDN(이미 사용 중).
- **스케일(px):** hero 52 / h2 30 / h3 24 / lg 20 / body 16 / sm 14 / xs 12.

## Color
- **접근:** balanced — 차분한 중성 + 의미 있는 액센트. 따뜻함이 핵심(차가운 회색이 '싸 보임'의 주범이었음).
- **Warm Cream `#F7F3EC`** — 페이지 배경 (구 `#F3F6F7` 차가운 회색 대체)
- **Surface `#FCFAF6` / White `#FFFFFF`** — 카드
- **Soft Sage `#5E8C94`** — 주조색, 활성/주요 UI (구 #6F9CA6 약간 딥하게 대비↑)
- **Calm Lavender `#B89BC4`** — 감정·보조 강조
- **Dusty Terracotta `#C97B5A`** — **온기·CTA**, 희소하게(과하면 차분함 깨짐)
- **Deep Indigo `#2C3454`** — 수면·밤 요소(수면점수 숫자, 야간 섹션)
- **Ink `#2A332E`** 텍스트 / **Muted `#6B7A72`** 부가 / **Hairline `#E7E0D4`** 보더
- **Semantic:** success `#6FA37A` · warning `#D9986F` · error `#C2645B` · info `#5E8C94`
- **다크/나이트:** 수면 섹션은 Deep Indigo 베이스 + 채도 낮춘 세이지/라벤더.

## Spacing
- **Base:** 8px. **밀도:** comfortable → spacious (넉넉한 여백 = 신뢰감)
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64)

## Layout
- **접근:** hybrid — 마케팅은 에디토리얼(세리프 헤드라인 + 이미지/일러스트 패널, 비대칭), 앱은 정돈된 카드 그리드.
- **Max content:** 모바일 콘텐츠 520px, 마케팅 1100px
- **Border radius:** sm 12 / md 16~20 / lg 24 / pill 9999. 부드럽되 과한 버블 라운드 금지.
- **그림자:** 따뜻한 톤 `0 10px 30px -12px rgba(70,60,40,.18)` (차가운 검정 섀도우 금지)

## Data Visualization (대시보드 — "리얼리티"의 핵심)
- 수면점수 = **초승달/방사형 링 + Fraunces 큰 숫자**(Oura식). 비치볼 블롭 금지.
- 수면 평가 = **달의 위상 아이콘**(못잠→숙면) 또는 정제된 SVG. 제네릭 이모지 금지.
- 추세 = 뮤트 세이지 막대/라인. 방해요인 = 테라코타 뮤트 바.
- 아이콘은 **라인 아이콘**(custom SVG) 우선. 이모지 남용 금지.

## Motion
- **접근:** intentional, 차분. 기존 C2MTL 이징 유지 `cubic-bezier(0.19,1,0.22,1)`.
- **CSS만**(framer-motion 금지), `prefers-reduced-motion` 전체 대응.
- **Duration:** micro 80 / short 200 / medium 320 / long 600ms.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-08 | 디자인 시스템 v2 생성 | /design-consultation. "차분한 신뢰" 나침반. Oura·Midi 리서치 기반. 차가운 회색→웜크림, 제네릭 이모지→초승달/세리프 데이터, 테라코타 온기 추가 |
| 2026-06-08 | 한글 헤드라인 = Pretendard (명조 X), 영문·숫자만 Fraunces | 4050 가독성·현대성 우선 |
