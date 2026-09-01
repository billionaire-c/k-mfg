import {
  getBuildRoadmapPlan,
  type RoadmapPlan,
} from './roadmapSamples'
import {
  getIndustryLevel,
  getReferenceIndustry,
  maturityToRefLevel,
} from './referenceModelSamples'

/**
 * 기계부품 조립 — 구축 로드맵 그래프 샘플.
 * 이후 다른 업종도 같은 스키마로 확장.
 */
const machineAssemblyByLevel: Record<string, RoadmapPlan> = {
  L1: {
    levelId: 'L1',
    headline: '기계부품 조립 · 기초를 12주에 고정하기',
    summary:
      '바코드·Lot·SOP부터 쌓는 기초 경로입니다. 조립·검사 실적과 자재 이력을 같은 리듬으로 보는 것이 목표입니다.',
    casesHref: '/cases?industry=일반제조',
    phases: [
      {
        id: 'ma-l1-p1',
        graphLabel: '기준·Lot',
        title: '1–4주 · 기준정보·Lot 추적',
        weeks: '1–4주',
        focus: '품번·설비 ID · 바코드 Lot',
        steps: [
          '품번·설비·작업자 ID를 단일 시트로 통합',
          '핵심 조립 라인에 Lot 시작/종료 바코드 적용',
          '검사 불량 코드를 조립/부품 불량으로 구분',
          '일일 수율·정지 기록을 같은 시간에 보기',
        ],
        links: [
          {
            label: '참조모델 · 기계부품 조립',
            to: '/reference-model?industry=machine-assembly&level=basic',
          },
          { label: '용어 · SOP', to: '/glossary' },
        ],
      },
      {
        id: 'ma-l1-p2',
        graphLabel: '실적·인수',
        title: '5–8주 · 실적·교대 인수',
        weeks: '5–8주',
        focus: '작업실적 집계 · 이상 담당',
        steps: [
          '부품/작업자별 실적을 바코드 또는 단말로 집계',
          '자재 입출고·사용량·잔량 일지 디지털화',
          '교대 인수에 미결 이상·Lot 칸 추가',
          '주간 품질/가동 리뷰 30분 정례화',
        ],
        links: [
          { label: '현장 노트 · 교대', to: '/notes/fn-shift-handover-2026' },
          { label: '표준 · ISO 9001', to: '/standards#iso-9001' },
        ],
      },
      {
        id: 'ma-l1-p3',
        graphLabel: '지원·확장',
        title: '9–12주 · 지원·다음 범위',
        weeks: '9–12주',
        focus: '기초 구축 지원 · MES 범위 초안',
        steps: [
          '기대 효과 점검: Lot 추적·기초 실적 가시화',
          '기초·고도화 지원사업 일정 확인',
          '공급기업 지도에서 조립 공정 유사 3곳 후보',
          '다음 분기 POP/MES 확대 범위 1페이지 초안',
        ],
        links: [
          { label: '지원사업', to: '/policy' },
          { label: '공급기업 지도', to: '/map' },
          { label: 'OT 보안', to: '/ot-security' },
        ],
      },
    ],
  },
  L2: {
    levelId: 'L2',
    headline: '기계부품 조립 · 가시화를 닫히는 운영으로',
    summary:
      '3M(사람·설비·자재) 실적과 알람 조치를 한 화면·한 담당으로 묶는 중간1 경로입니다.',
    casesHref: '/cases',
    phases: [
      {
        id: 'ma-l2-p1',
        graphLabel: '알람·SLA',
        title: '1–4주 · 알람·조치 SLA',
        weeks: '1–4주',
        focus: '등급표 · 조립라인 담당',
        steps: [
          '알람 A/B/C 등급과 조치 시간을 조립 라인 기준으로 정의',
          '무시 알람·반복 정지를 목록화해 주간 정리',
          '교대 인수에 미결 알람·금형/치구 이슈 칸 추가',
        ],
        links: [
          {
            label: '참조모델 · 중간1',
            to: '/reference-model?industry=machine-assembly&level=mid1',
          },
          { label: '현장 노트 · 데이터 습관', to: '/notes/fn-data-unused-2026' },
        ],
      },
      {
        id: 'ma-l2-p2',
        graphLabel: '3M 연동',
        title: '5–8주 · 3M·설비 연동',
        weeks: '5–8주',
        focus: '가동·보전 · MES 한 라인',
        steps: [
          '설비 가동·비가동·보전 시간을 시스템에 남기기',
          '예방보전 계획·고장·부품교체 이력 등록',
          '조립 라인 하나에서 OT 태그를 MES/화면에 안정 연동',
          '실적 입력 범위를 1→2개 라인으로 확대',
        ],
        links: [
          { label: '현장 노트 · OT/IT', to: '/notes/fn-ot-it-handshake-2026' },
          { label: '표준 · ISO 27001', to: '/standards#iso-27001' },
        ],
      },
      {
        id: 'ma-l2-p3',
        graphLabel: '벤치·PoC',
        title: '9–12주 · 벤치마크·PoC 후보',
        weeks: '9–12주',
        focus: '고도화 준비',
        steps: [
          '기대 효과: 3M 기반 의사결정·보전 가시화',
          '유사 조립 사례 2건 벤치마크',
          '공구·부자재 재고 관리 범위 초안',
          '다음 단계(비전/예지) 후보 공정 선정',
        ],
        links: [
          { label: '사례·벤치마크', to: '/cases' },
          { label: '지원사업', to: '/policy' },
          { label: 'OT 보안', to: '/ot-security' },
        ],
      },
    ],
  },
  L3: {
    levelId: 'L3',
    headline: '기계부품 조립 · 제어·PoC를 운영에 붙이기',
    summary:
      '표준·레시피와 실적을 묶고, 비전/품질 PoC를 조치 플레이북과 같이 가는 중간2 경로입니다.',
    casesHref: '/cases?industry=자동차',
    phases: [
      {
        id: 'ma-l3-p1',
        graphLabel: '표준·PoC',
        title: '1–4주 · 표준·PoC 설계',
        weeks: '1–4주',
        focus: '작업표준 · 불량 정의',
        steps: [
          '조립 표준·토크/체결 레시피와 실적 연동 범위 정의',
          '고장/불량 라벨과 성공 기준 합의',
          '조치 플레이북(누가·언제·어디까지) 초안',
        ],
        links: [
          {
            label: '참조모델 · 중간2',
            to: '/reference-model?industry=machine-assembly&level=mid2',
          },
          { label: '현장 노트 · 예지보전', to: '/notes/fn-pdm-poc-stuck-2026' },
        ],
      },
      {
        id: 'ma-l3-p2',
        graphLabel: '파일럿',
        title: '5–8주 · 한 라인 파일럿',
        weeks: '5–8주',
        focus: '표준 이탈 알람 · KPI',
        steps: [
          '표준 이탈 알람과 조치 플레이북을 한 라인에서 실사용',
          '주 3회 이상 파일럿 리뷰(오탐·과검·체결 불량)',
          'OEE·불량 KPI에 파일럿 지표 연결',
          '생산·품질·물류 데이터 인터페이스 점검',
        ],
        links: [
          { label: '사례 · 비전검사', to: '/cases#case-auto-vision-inline-2026' },
          { label: '표준·인증', to: '/standards' },
        ],
      },
      {
        id: 'ma-l3-p3',
        graphLabel: '확장·인증',
        title: '9–12주 · 확장·고객 요구',
        weeks: '9–12주',
        focus: '스케일 · IATF 등',
        steps: [
          '기대 효과: 4M 제어·재발 불량 감소',
          '확장 라인/공정 우선순위 결정',
          '고객·업종 인증 갭 점검',
          '지원사업·공급사 본계약 검토',
        ],
        links: [
          { label: '지원 캘린더', to: '/policy' },
          { label: '표준 · IATF', to: '/standards#iatf-16949' },
          { label: 'OT 보안', to: '/ot-security' },
        ],
      },
    ],
  },
  L4: {
    levelId: 'L4',
    headline: '기계부품 조립 · AX를 거버넌스와 같이',
    summary:
      '혼류·다품종 조립에 AI·최적화를 얹되, KPI·보안·교육을 한 로드맵에 묶는 고도화 경로입니다.',
    casesHref: '/cases?industry=전자',
    phases: [
      {
        id: 'ma-l4-p1',
        graphLabel: '과제·ROI',
        title: '1–4주 · 과제 포트폴리오',
        weeks: '1–4주',
        focus: '혼류·품질 AI 후보',
        steps: [
          '조립 혼류 스케줄·품질 AI 후보 3개와 KPI 매핑',
          '실패 기준(중단 조건)까지 문서화',
          'OT/IT 보안·데이터 영향 사전 점검',
        ],
        links: [
          {
            label: '참조모델 · 고도화',
            to: '/reference-model?industry=machine-assembly&level=advanced',
          },
          { label: '표준 · 보안', to: '/standards' },
        ],
      },
      {
        id: 'ma-l4-p2',
        graphLabel: '파일럿 확대',
        title: '5–8주 · 파일럿 확대',
        weeks: '5–8주',
        focus: '업종 특화 · 공급 협력',
        steps: [
          '조립 벤치마크 2건과 갭 분석',
          '공급기업·내부 역량 역할 분담',
          '주간 AX 운영 회의(성과·리스크)',
        ],
        links: [
          { label: '사례·벤치마크', to: '/cases' },
          { label: '공급기업 지도', to: '/map' },
        ],
      },
      {
        id: 'ma-l4-p3',
        graphLabel: '스케일',
        title: '9–12주 · 스케일·조직',
        weeks: '9–12주',
        focus: '교육 · 경영 보고',
        steps: [
          '기대 효과: 유연 스케줄·품질·가동 통합 최적화',
          '역할별 교육 로드맵 초안',
          '연간 투자·성과 지표 경영 보고',
          '협업·자문 채널 정리',
        ],
        links: [
          { label: '문의/협업', to: '/contact' },
          { label: '지원사업', to: '/policy' },
          { label: 'OT 보안', to: '/ot-security' },
        ],
      },
    ],
  },
}

export function getMachineAssemblyGraphPlan(levelId: string): RoadmapPlan {
  return machineAssemblyByLevel[levelId] ?? machineAssemblyByLevel.L1
}

const graphLabelsByLevel: Record<string, [string, string, string]> = {
  L1: ['기준·Lot', '실적·인수', '지원·확장'],
  L2: ['알람·SLA', '3M 연동', '벤치·PoC'],
  L3: ['표준·PoC', '파일럿', '확장·인증'],
  L4: ['과제·ROI', '파일럿 확대', '스케일'],
}

/** 참조모델 기반 — 전 업종 공통 그래프 플랜 */
export function buildIndustryGraphPlan(
  industryId: string,
  levelId: string,
): RoadmapPlan {
  const base = getBuildRoadmapPlan(levelId, industryId)
  const industry = getReferenceIndustry(industryId)
  const refLevelId = maturityToRefLevel[levelId] ?? 'basic'
  const refLevel = getIndustryLevel(industry, refLevelId)
  const labels = graphLabelsByLevel[levelId] ?? graphLabelsByLevel.L1

  const phases = base.phases.map((phase, index) => ({
    ...phase,
    id: `${industry.id}-${levelId}-p${index + 1}`,
    graphLabel: labels[index] ?? `Phase ${index + 1}`,
    title: phase.title,
    focus:
      index === 0
        ? `${industry.name} · ${refLevel.label} 구성`
        : index === 1
          ? `${phase.focus} · ${industry.name}`
          : phase.focus,
    steps:
      index === 0
        ? [
            ...refLevel.buildFocus.slice(0, 2),
            ...phase.steps.slice(0, 2),
          ]
        : index === 1
          ? [
              ...refLevel.requirements.slice(0, 2),
              ...phase.steps.slice(0, 2),
            ]
          : [
              ...phase.steps.slice(0, 2),
              `기대 효과 점검: ${refLevel.outcomes[0] ?? '가시화·추적성'}`,
              `표준 흐름 점검: ${industry.process}`,
            ],
  }))

  return {
    ...base,
    headline: base.headline,
    summary: `${industry.traits[0] ?? ''} ${base.summary}`,
    phases,
  }
}

/** 업종별 Phase 그래프 — 기계부품은 상세 샘플, 나머지는 참조모델 기반 */
export function getIndustryGraphPlan(
  industryId: string,
  levelId: string,
): RoadmapPlan {
  if (industryId === 'machine-assembly') {
    return getMachineAssemblyGraphPlan(levelId)
  }
  return buildIndustryGraphPlan(industryId, levelId)
}

