import type { MaturityLevel } from './maturityCheck'
import { maturityLevels } from './maturityCheck'

export type RoadmapPhase = {
  id: string
  title: string
  weeks: string
  focus: string
  steps: string[]
  links: { label: string; to: string }[]
}

export type RoadmapPlan = {
  levelId: string
  headline: string
  summary: string
  phases: RoadmapPhase[]
  casesHref: string
}

export const roadmapMeta = {
  title: '도입 로드맵',
  subtitle:
    '성숙도 진단 결과에 맞춰 12주 안팎의 실행 순서를 제안합니다. 표준·지원·사례로 바로 이어집니다.',
}

const plans: Record<string, RoadmapPlan> = {
  L1: {
    levelId: 'L1',
    headline: '기초를 12주에 고정하기',
    summary:
      'AI·고도화보다 SOP·기준정보·일일 실적 습관이 우선입니다. 작은 표준이 쌓여야 다음 단계 투자가 붙습니다.',
    casesHref: '/cases?industry=일반제조',
    phases: [
      {
        id: 'l1-p1',
        title: '1–4주 · 표준·기준정보',
        weeks: '1–4주',
        focus: '한 라인 SOP · 품번/설비 ID',
        steps: [
          '핵심 공정 SOP 1페이지 작성·현장 부착',
          '품번·설비 ID 목록을 단일 시트로 통합',
          '일일 실적(수율·정지)을 같은 시간에 보기',
        ],
        links: [
          { label: '현장 노트 · 기초 먼저', to: '/notes/fn-sme-before-ai-2026' },
          { label: '용어 · SOP', to: '/glossary' },
          { label: '표준 · ISO 9001', to: '/standards#iso-9001' },
        ],
      },
      {
        id: 'l1-p2',
        title: '5–8주 · 책임·기록',
        weeks: '5–8주',
        focus: '교대 인수 · 이상 담당',
        steps: [
          '교대 인수 템플릿(이상·조치·미결·담당) 도입',
          '이상 발생 시 1차 담당자 지정',
          '주간 품질/가동 리뷰 30분 정례화',
        ],
        links: [
          { label: '현장 노트 · 교대', to: '/notes/fn-shift-handover-2026' },
          { label: '사례 · 교대 템플릿', to: '/cases#case-gen-shift-template-2026' },
        ],
      },
      {
        id: 'l1-p3',
        title: '9–12주 · 지원·공급 탐색',
        weeks: '9–12주',
        focus: '기초 구축 지원 · 공급사 후보',
        steps: [
          '기초·고도화 지원사업 일정 확인',
          '공급기업 지도에서 유사 공정 3곳 후보',
          '다음 분기 MES/가시화 범위 1페이지 초안',
        ],
        links: [
          { label: '지원사업', to: '/policy' },
          { label: '공급기업 지도', to: '/map' },
          { label: '사례 전체', to: '/cases' },
        ],
      },
    ],
  },
  L2: {
    levelId: 'L2',
    headline: '가시화를 ‘닫히는 운영’으로',
    summary:
      '데이터는 보이기 시작했습니다. 연동·알람 담당·한 라인 MES 확장이 로드맵의 중심입니다.',
    casesHref: '/cases',
    phases: [
      {
        id: 'l2-p1',
        title: '1–4주 · 알람·조치',
        weeks: '1–4주',
        focus: '등급표 · SLA',
        steps: [
          '알람 A/B/C 등급과 조치 시간 정의',
          '무시 알람 목록화 후 주간 정리',
          '교대 인수에 미결 알람 칸 추가',
        ],
        links: [
          { label: '사례 · 안돈 등급', to: '/cases#case-auto-andon-escalation-2026' },
          { label: '현장 노트 · 데이터 습관', to: '/notes/fn-data-unused-2026' },
        ],
      },
      {
        id: 'l2-p2',
        title: '5–8주 · 연동 한 점',
        weeks: '5–8주',
        focus: 'OT–IT 태그 · MES 범위',
        steps: [
          '설비 태그 하나를 MES/화면에 안정 연동',
          '실적 입력 라인을 1→2개로 확대',
          '데이터 추출/소유 조항 점검',
        ],
        links: [
          { label: '현장 노트 · OT/IT', to: '/notes/fn-ot-it-handshake-2026' },
          { label: '사례 · MES 소유권', to: '/cases#case-gen-mes-owner-2026' },
          { label: '표준 · ISO 27001', to: '/standards#iso-27001' },
        ],
      },
      {
        id: 'l2-p3',
        title: '9–12주 · 지원·벤치마크',
        weeks: '9–12주',
        focus: '고도화 준비',
        steps: [
          '업종 유사 사례 2건 벤치마크',
          '지원사업·공급사 PoC 범위 초안',
          '다음 단계(예지/비전) 후보 공정 선정',
        ],
        links: [
          { label: '사례·벤치마크', to: '/cases' },
          { label: '지원사업', to: '/policy' },
          { label: '문의', to: '/contact' },
        ],
      },
    ],
  },
  L3: {
    levelId: 'L3',
    headline: '고도화 PoC를 운영에 붙이기',
    summary:
      '예지·비전·품질 분석은 가능합니다. 다만 조치 플레이북과 KPI 주간 리뷰가 같이 가야 합니다.',
    casesHref: '/cases?industry=자동차',
    phases: [
      {
        id: 'l3-p1',
        title: '1–4주 · PoC 설계',
        weeks: '1–4주',
        focus: '문제 정의 · 라벨 · 조치',
        steps: [
          '고장/불량 정의(라벨)와 성공 기준 합의',
          '조치 플레이북(누가·언제·어디까지) 초안',
          '데이터 수집 구간·책임자 지정',
        ],
        links: [
          { label: '현장 노트 · 예지보전', to: '/notes/fn-pdm-poc-stuck-2026' },
          { label: '사례 · 비전검사', to: '/cases#case-auto-vision-inline-2026' },
        ],
      },
      {
        id: 'l3-p2',
        title: '5–8주 · 파일럿',
        weeks: '5–8주',
        focus: '한 라인 실사용',
        steps: [
          '파일럿 라인에서 주 3회 이상 리뷰',
          '오탐/과검 분류와 레시피·표준 점검',
          'OEE·불량 KPI에 파일럿 지표 연결',
        ],
        links: [
          { label: '사례 · AOI 과검', to: '/cases#case-elec-aoi-false-2026' },
          { label: '표준·인증 플로우', to: '/standards' },
        ],
      },
      {
        id: 'l3-p3',
        title: '9–12주 · 확장·인증',
        weeks: '9–12주',
        focus: '스케일 · 고객 요구',
        steps: [
          '확장 라인/공정 우선순위 결정',
          '고객·업종 인증(IATF 등) 갭 점검',
          '지원사업·공급사 본계약 검토',
        ],
        links: [
          { label: '지원 캘린더', to: '/policy' },
          { label: '표준 · IATF', to: '/standards#iatf-16949' },
          { label: '사례 전체', to: '/cases' },
        ],
      },
    ],
  },
  L4: {
    levelId: 'L4',
    headline: 'AX 확장을 거버넌스와 같이',
    summary:
      '데이터·책임이 갖춰졌습니다. AI 과제 선정·보안·교육·ROI를 한 로드맵에 묶을 때입니다.',
    casesHref: '/cases?industry=전자',
    phases: [
      {
        id: 'l4-p1',
        title: '1–4주 · 과제 포트폴리오',
        weeks: '1–4주',
        focus: 'ROI · KPI 연결',
        steps: [
          'AI/자율화 후보 과제 3개와 KPI 매핑',
          '실패 기준(중단 조건)까지 문서화',
          '보안·개인정보 영향 사전 점검',
        ],
        links: [
          { label: '표준 · 보안/개인정보', to: '/standards' },
          { label: '카드뉴스', to: '/card-news' },
        ],
      },
      {
        id: 'l4-p2',
        title: '5–8주 · 파일럿 확대',
        weeks: '5–8주',
        focus: '업종 특화 · 공급 협력',
        steps: [
          '업종 벤치마크 2건과 갭 분석',
          '공급기업·내부 역량 역할 분담',
          '주간 AX 운영 회의(성과·리스크)',
        ],
        links: [
          { label: '사례·벤치마크', to: '/cases' },
          { label: '공급기업 지도', to: '/map' },
          { label: '현장 노트 · 운영', to: '/notes/fn-ops-over-equipment-2026' },
        ],
      },
      {
        id: 'l4-p3',
        title: '9–12주 · 스케일·협업',
        weeks: '9–12주',
        focus: '조직 · 대외',
        steps: [
          '역할별 교육 로드맵 초안',
          '연간 투자·성과 지표 경영 보고',
          '협업·자문 채널 정리',
        ],
        links: [
          { label: '문의/협업', to: '/contact' },
          { label: '지원사업', to: '/policy' },
          { label: '용어 · AI 팩토리', to: '/glossary' },
        ],
      },
    ],
  },
}

export const ROADMAP_STORAGE_KEY = 'km-maturity-result-v1'

export type StoredMaturityResult = {
  levelId: string
  score: number
  maxScore: number
  updatedAt: string
}

export function getRoadmapPlan(levelId: string): RoadmapPlan {
  return plans[levelId] ?? plans.L1
}

export function getLevelMeta(levelId: string): MaturityLevel {
  return (
    maturityLevels.find((level) => level.id === levelId) ?? maturityLevels[0]
  )
}

export function saveMaturityResult(result: StoredMaturityResult) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(result))
}

export function loadMaturityResult(): StoredMaturityResult | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(ROADMAP_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredMaturityResult
  } catch {
    return null
  }
}
