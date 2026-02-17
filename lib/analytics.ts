import { track } from '@vercel/analytics';

// 핵심 MVP 이벤트 트래킹
// PMF 검증 KPI에 직접 연결되는 이벤트만 추적

export const analytics = {
  // 체크인 플로우
  checkinStarted: () =>
    track('checkin_started'),

  checkinSectionCompleted: (section: number) =>
    track('checkin_section_completed', { section }),

  checkinCompleted: (stage: string, kuppermanScore: number) =>
    track('checkin_completed', { stage, kupperman_score: kuppermanScore }),

  checkinDropoff: (section: number) =>
    track('checkin_dropoff', { last_section: section }),

  // 회원가입 / 로그인
  signupCompleted: (method: string) =>
    track('signup_completed', { method }),

  loginCompleted: () =>
    track('login_completed'),

  // 매일 기록
  dailyLogStarted: () =>
    track('daily_log_started'),

  dailyLogCompleted: (streakCount: number) =>
    track('daily_log_completed', { streak_count: streakCount }),

  // 인사이트
  insightsViewed: (daysLogged: number) =>
    track('insights_viewed', { days_logged: daysLogged }),

  // 솔루션
  solutionClicked: (solutionId: string, symptom: string) =>
    track('solution_clicked', { solution_id: solutionId, symptom }),

  // 커뮤니티
  kakaoGroupClicked: (groupType: string) =>
    track('kakao_group_clicked', { group_type: groupType }),

  // 컬럼
  columnViewed: (slug: string, symptom: string) =>
    track('column_viewed', { slug, symptom }),

  // 랜딩 페이지
  ctaClicked: (location: string, action: string) =>
    track('cta_clicked', { location, action }),

  // 일반
  pageViewed: (path: string) =>
    track('page_viewed', { path }),
};
