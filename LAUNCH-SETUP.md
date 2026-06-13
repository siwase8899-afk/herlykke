# HERLYKKE 출시 전 필수 설정 (사장님 직접)

코드(커뮤니티 CRUD·법규·안전장치·클릭추적)는 모두 배포됐지만, **라이브가 실제로 작동하려면 백엔드 연결이 필요**합니다. 지금 herlykke.vercel.app은 Supabase 미연결 시 "데모 모드"로 돌아갑니다(가짜 데모 사용자, 글 저장 안 됨).

## 0. 데모 모드인지 확인
herlykke.vercel.app 우측 상단에 **"데모 사용자"** 가 보이면 → Supabase 미연결 상태(아래 설정 필요).
실제 로그인 폼이 뜨면 → 이미 연결됨.

## 1. Supabase 프로젝트 준비
1. [supabase.com](https://supabase.com) 로그인 → 프로젝트 생성(이미 있으면 그걸 사용)
2. 프로젝트 → **SQL Editor**에서 아래 스키마를 순서대로 실행(이 폴더의 파일 내용 복붙):
   - `supabase-setup.sql` (profiles, checkin_onboarding 등 기본)
   - `supabase-community.sql` (posts/comments/likes + RLS + 카운트 트리거)
   - `supabase-daily-logs.sql` (수면 일지)
   - `supabase-reviews.sql` (솔루션 리뷰)
   - `supabase-seller.sql` (셀러 신청)
   - `supabase-reports.sql` (신고 — 이번에 추가됨)
3. **Authentication → Providers**: 이메일 로그인 활성화(카카오 OAuth는 추후)
4. **Authentication → Sign In / Providers → Email → "Confirm email" OFF** ⚠️ 필수
   - 켜져 있으면 가입해도 인증 메일을 눌러야만 로그인됨 → 체크인 끝낸 신규 사용자가 가입 직후 로그인 안 되고 로그인 화면으로 튕깁니다(전환 이탈의 핵심 원인).
   - OFF로 두면 **가입 즉시 로그인 → 대시보드** 진입. (켜 두고 싶으면 코드가 "메일함 확인" 안내를 대신 보여주지만, 사용자가 메일 확인 전엔 못 이어감.)
5. 프로젝트 → **Settings → API**에서 `Project URL`과 `anon public key` 복사

## 2. Vercel 환경변수 설정
[vercel.com/dashboard](https://vercel.com/dashboard) → herlykke 프로젝트 → **Settings → Environment Variables**에 추가:

| 이름 | 값 | 범위 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | (1-4의 Project URL) | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (1-4의 anon key) | Production |
| `ANTHROPIC_API_KEY` | (AI 컨시어지용 — 지금 네비 숨김, 나중에) | Production |
| `NEXT_PUBLIC_GA4_ID` | (GA4 측정 ID, 분석용) | Production |

저장 후 **Deployments → 최신 빌드 → Redeploy**.

## 3. 연결 확인 (재배포 후)
- 우측 상단 "데모 사용자"가 사라지고 로그인 가능
- 회원가입 → 체크인 → **커뮤니티 "고민&경험" 탭에서 글 작성 → 새로고침 후에도 남아있음**
- 다른 브라우저(시크릿)로 로그인 → 그 글이 보임 ← 핵심 가설("올리는가") 검증 가능
- 레시피 상세 → 제품링크 클릭 → GA4/Vercel Analytics에 `recipe_product_clicked` 이벤트

## 4. 출시 전 법무 마무리
- `app/privacy/page.tsx`·`app/terms/page.tsx`의 `[ ]` 항목(대표자·문의처·시행일) 확정
- 사업자등록 후: 푸터에 사업자정보 표기 + (제휴/판매 시) 전자상거래법 조항·통신판매업 신고

## 보류(후속 PR) — 지금 범위 아님
메이트 셀프 게시·서약, 공구·직판·PG결제·정산, 쿠팡 파트너스 제휴 전환(가입 후 링크만 교체),
Sentry·레이트리밋, 자동 모더레이션, quiz/solutions/match/concierge 코드 제거(현재 네비 숨김만).
