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

## Color (v3 — 실제 토큰 = `app/globals.css @theme inline` 단일 출처)
- **원칙:** 따뜻하고 **선명한** 살구빛 정체성 + **카드 분리·텍스트 가독성(WCAG AA)**. 흐린 파스텔·차가운 회색이 '답답함·안 보임'의 주범이었음 → v3에서 대비 강화.
- **카드 분리의 핵심:** 흰↔크림은 명도비가 낮아 대비로는 못 띄움 → **bg를 한 단계 깊게(`#FBEAD9`) + surface 순백(`#FFFFFF`) + 보이는 웜 보더 + 따뜻한 엄버 그림자** 3종을 함께 써야 카드가 뜬다.
- **Apricot Cream `#FBEAD9`** — 페이지 배경(`--color-hlk-bg`)
- **Surface `#FFFFFF`** 카드 / **Surface-warm `#F6DCC4`** 따뜻한 면
- **Sage `#43734F`**(`--color-hlk-primary`) — 주조색·텍스트/아이콘이 **읽히는** 진한 세이지(크림 위 4.70). 파스텔 `#CFE7D3`(`-light`)는 **채움 전용**(진한 글씨와만).
- **Mauve `#96524C`**(`--color-hlk-accent`) — 감정·보조(텍스트로 4.95). `#F3D4CE`(`-light`)는 채움 전용.
- **Lavender `#6F5C9E`**(`--color-hlk-lavender`) — 3번째 의미 강조(흰 위 5.67). `#E8E1F2` 채움.
- **Terracotta CTA `#F0642B`**(`--color-hlk-clay`) — 온기·주요 CTA(대형/UI 흰글씨). 작은 흰글씨엔 `#CD4A1B`(`-text`, 4.57).
- **Deep Indigo `#29314C`**(`--color-hlk-indigo`) — 수면·밤. `#DCE0EB` 채움.
- **Ink `#17231D`** 텍스트 / **Secondary `#4D5A50`**(6.18) / **Tertiary `#6B5E4C`**(5.37) / **Hairline `#E0B58F`** 보더
- **Semantic(텍스트 AA):** success `#2F7D4F` · warning `#9A6212`(채움/점은 `#D48A3B` = `-fill`) · error `#C0392B` · star `#E8A33D`
- **카테고리 다색:** 무지개 금지. 구분이 필요하면 **브랜드 5색 로테이션**(sage→mauve→clay→lavender→indigo)의 `-light` 채움 사용. 감정 태그는 tone 2톤(긍정=세이지, 부정=라벤더).
- **카카오 노랑 `#FEE500`** — 카카오 채널 CTA에 한해 허용(3rd파티 브랜드색, 토큰화 X).
- **다크/나이트:** 수면 섹션은 Deep Indigo 베이스 + 채도 낮춘 세이지/라벤더.

## Spacing
- **Base:** 8px. **밀도:** comfortable → spacious (넉넉한 여백 = 신뢰감)
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64)

## Layout
- **접근:** hybrid — 마케팅은 에디토리얼(세리프 헤드라인 + 이미지/일러스트 패널, 비대칭), 앱은 정돈된 카드 그리드.
- **Max content:** 모바일 콘텐츠 520px, 마케팅 1100px
- **Border radius:** sm 12 / md 16~20 / lg 24 / pill 9999. 부드럽되 과한 버블 라운드 금지.
- **그림자:** 따뜻한 엄버 톤 `rgba(120,80,40, .10~.16)` (차가운 세이지블루·검정 섀도우 금지). `.shadow-soft*` 유틸 사용.

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
| 2026-06-12 | 컬러 v3: 대비·가독성 강화 | 사용자 피드백 "흐리멍텅·글씨 안 보임". 측정 결과 surface↔bg=1.07(카드 안 뜸), sage 텍스트 2.78 FAIL. → bg 깊게+surface 순백+웜 보더/그림자, sage/mauve 텍스트용 진하게, 라벤더 추가, 전 토큰 WCAG AA. 따뜻·선명 정체성 유지(랜딩 mesh 히어로 불변) |
| 2026-06-12 | 오프시스템 색/이모지 퇴치, /quiz·/match 삭제 | green/red/amber 등 193곳→시맨틱 토큰, 14색 무지개 감정태그→tone 2톤, 핵심 플로우 이모지→달위상/라인아이콘. 중복 디스커버리(/quiz)·데드 리다이렉트(/match) 제거로 고객여정 단순화 |
| 2026-06-12 | v4 "Immersive Aurora" 전 페이지 전파 | LayoutShell에 전역 오로라 배경(`.app-aurora`, 가장자리 비비드·중앙 라이트 베일) 주입. 앱 화면 불투명 `bg-hlk-bg` 제거→오로라 투과, 카드 82곳 `bg-white/surface+border`→`.card-glass`(흰 82% blur, 가장 밝은 오로라 위 본문 14.65 AA). 솔리드/그라데이션 타이틀 밴드 5곳→공유 `.aurora-header`(비비드 그라데이션+10% 다크 베일로 흰글씨 AA), 색 정체성은 인라인 gradient로 보존(log=웜 모브→테라코타). 스티키 헤더/탭/하단 CTA 6곳→반투명 글래스. 페이지별 중복 장식 오브(FloatingOrbs) 6화면 제거→전역 오로라로 단일화. 액센트 재채도는 비비드 오로라 블롭+aurora-header로 달성(muted `-light`은 AA 텍스트 페어라 유지). 폼/플로우(login·signup·checkin)는 자체 소프트 그라데이션 유지(포커스) |
