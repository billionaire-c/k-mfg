export type MaturityChoice = {
  label: string
  score: number
}

export type MaturityQuestion = {
  id: string
  category: string
  prompt: string
  choices: MaturityChoice[]
}

export type MaturityLevel = {
  id: string
  min: number
  max: number
  title: string
  summary: string
  nextSteps: string[]
  links: { label: string; to: string }[]
}

/** 총점 0~36 (문항 12 × 최대 3) */
export const maturityQuestions: MaturityQuestion[] = [
  {
    id: 'q1',
    category: '가시화',
    prompt: '생산·설비 실적을 얼마나 자주 숫자로 보고 있나요?',
    choices: [
      { label: '거의 수기·감으로 파악', score: 0 },
      { label: '엑셀/일지로 주 1회 이상', score: 1 },
      { label: '대시보드로 매일 확인', score: 2 },
      { label: '실시간으로 이상까지 감지', score: 3 },
    ],
  },
  {
    id: 'q2',
    category: '표준',
    prompt: '표준작업(SOP)이 현장과 얼마나 일치하나요?',
    choices: [
      { label: '문서가 없거나 거의 안 봄', score: 0 },
      { label: '문서는 있으나 사람마다 다름', score: 1 },
      { label: '대체로 따르고 주기적으로 갱신', score: 2 },
      { label: '개정·교육·준수가 체계화됨', score: 3 },
    ],
  },
  {
    id: 'q3',
    category: '기준정보',
    prompt: '품번·설비 ID 등 기준정보가 시스템에 정리돼 있나요?',
    choices: [
      { label: '부서·파일마다 제각각', score: 0 },
      { label: '일부만 코드화', score: 1 },
      { label: '대부분 단일 기준으로 관리', score: 2 },
      { label: '변경 이력까지 통제', score: 3 },
    ],
  },
  {
    id: 'q4',
    category: 'MES/실행',
    prompt: '작업지시·실적 수집은 어떻게 이뤄지나요?',
    choices: [
      { label: '구두·수기 위주', score: 0 },
      { label: '부분적으로 시스템 입력', score: 1 },
      { label: '주요 라인은 MES/실행시스템 사용', score: 2 },
      { label: '실적이 상위 시스템과 자동 연동', score: 3 },
    ],
  },
  {
    id: 'q5',
    category: '품질',
    prompt: '불량·이상 발생 시 추적·대응은?',
    choices: [
      { label: '그때그때 수습', score: 0 },
      { label: '기록은 남기지만 원인분석은 약함', score: 1 },
      { label: '로트/공정 추적이 가능', score: 2 },
      { label: '통계·규칙으로 재발 방지까지', score: 3 },
    ],
  },
  {
    id: 'q6',
    category: '보전',
    prompt: '설비 보전은 어떤 단계인가요?',
    choices: [
      { label: '고장 후 수리 중심', score: 0 },
      { label: '주기 점검(예방보전)', score: 1 },
      { label: '상태감시 데이터 활용', score: 2 },
      { label: '예지 알람→조치 플레이북 운영', score: 3 },
    ],
  },
  {
    id: 'q7',
    category: '데이터 책임',
    prompt: '이상 데이터/알람을 닫는 담당자가 있나요?',
    choices: [
      { label: '불명확', score: 0 },
      { label: '있지만 바쁠 때 밀림', score: 1 },
      { label: '교대·역할이 정해져 있음', score: 2 },
      { label: 'SLA(시간·등급)까지 운영', score: 3 },
    ],
  },
  {
    id: 'q8',
    category: 'OT/IT',
    prompt: '설비(OT)와 업무시스템(IT) 연결 상태는?',
    choices: [
      { label: '거의 분리', score: 0 },
      { label: '파일/수작업 전달', score: 1 },
      { label: '일부 태그·인터페이스 연동', score: 2 },
      { label: '표준 프로토콜로 안정 연동', score: 3 },
    ],
  },
  {
    id: 'q9',
    category: '자동화',
    prompt: '현장 자동화·로봇 활용 수준은?',
    choices: [
      { label: '수작업 비중이 큼', score: 0 },
      { label: '일부 공정 자동화', score: 1 },
      { label: '핵심 공정 자동화+사람 협업', score: 2 },
      { label: '유연 생산·자율화 실험 중', score: 3 },
    ],
  },
  {
    id: 'q10',
    category: 'AI',
    prompt: 'AI/머신러닝 활용은?',
    choices: [
      { label: '계획 없음/관심만', score: 0 },
      { label: 'PoC 검토·파일럿', score: 1 },
      { label: '특정 공정에 실사용', score: 2 },
      { label: '운영 KPI에 연결되어 개선 중', score: 3 },
    ],
  },
  {
    id: 'q11',
    category: '사람',
    prompt: '디지털·스마트공장 교육을 얼마나 하나요?',
    choices: [
      { label: '거의 없음', score: 0 },
      { label: '가끔 외부 교육', score: 1 },
      { label: '정기 교육·내부 공유', score: 2 },
      { label: '역할별 역량 로드맵 운영', score: 3 },
    ],
  },
  {
    id: 'q12',
    category: '투자/거버넌스',
    prompt: '스마트공장·AX 투자의 의사결정 구조는?',
    choices: [
      { label: '단발성·개인 판단', score: 0 },
      { label: '필요 시 경영 보고', score: 1 },
      { label: '연간 계획·우선순위 있음', score: 2 },
      { label: '성과지표와 예산이 연동', score: 3 },
    ],
  },
]

export const maturityLevels: MaturityLevel[] = [
  {
    id: 'L1',
    min: 0,
    max: 9,
    title: '기초 정비 단계',
    summary:
      '가시화·표준·기준정보부터 쌓을 때입니다. AI보다 SOP·실적 기록·책임자 지정이 우선입니다.',
    nextSteps: [
      '핵심 공정 SOP 1페이지부터 만들기',
      '품번·설비 ID 목록 통일',
      '일일 실적 보는 습관(엑셀이라도) 만들기',
    ],
    links: [
      { label: '현장 노트 · 기초 먼저', to: '/notes/fn-sme-before-ai-2026' },
      { label: '용어 · SOP', to: '/glossary' },
      { label: '지원사업', to: '/policy' },
    ],
  },
  {
    id: 'L2',
    min: 10,
    max: 18,
    title: '가시화·연결 단계',
    summary:
      '데이터는 보이기 시작했습니다. 이제 시스템 연동과 “누가 알람을 닫나”를 고정할 때입니다.',
    nextSteps: [
      'MES/실적 입력 범위를 한 라인부터 넓히기',
      '알람·이상 조치 담당·시간 정하기',
      'OT-IT 태그 하나라도 안정적으로 연동',
    ],
    links: [
      { label: '현장 노트 · 데이터 습관', to: '/notes/fn-data-unused-2026' },
      { label: '용어 · MES', to: '/glossary' },
      { label: '공급기업 지도', to: '/map' },
    ],
  },
  {
    id: 'L3',
    min: 19,
    max: 27,
    title: '운영 고도화 단계',
    summary:
      '운영 규칙이 자리를 잡았습니다. 예지보전·품질 분석 등 부분 AI/고도화를 얹기 좋습니다.',
    nextSteps: [
      '예지보전/비전검사 PoC를 조치 플레이북과 함께 설계',
      'OEE·불량 등 KPI를 주간 리뷰에 고정',
      '지원사업·공급기업 매칭으로 실행력 보강',
    ],
    links: [
      { label: '현장 노트 · 예지보전 PoC', to: '/notes/fn-pdm-poc-stuck-2026' },
      { label: '지원 캘린더', to: '/policy' },
      { label: '용어 · 예지보전', to: '/glossary' },
    ],
  },
  {
    id: 'L4',
    min: 28,
    max: 36,
    title: 'AX·자율화 도전 단계',
    summary:
      '데이터·책임이 갖춰졌습니다. AI 팩토리·자율제조로 확장하되, 성과와 거버넌스를 같이 설계하세요.',
    nextSteps: [
      'AI 과제를 KPI·ROI와 연결해 선정',
      '업종 특화 모델/공급기업과 파일럿 확대',
      '조직 교육·보안(OT) 점검 병행',
    ],
    links: [
      { label: '카드뉴스', to: '/card-news' },
      { label: '용어 · AI 팩토리', to: '/glossary' },
      { label: '문의/협업', to: '/contact' },
    ],
  },
]

export function getMaturityLevel(score: number) {
  return (
    maturityLevels.find((level) => score >= level.min && score <= level.max) ??
    maturityLevels[0]
  )
}
