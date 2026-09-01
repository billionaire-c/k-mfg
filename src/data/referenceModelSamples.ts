/**
 * 스마트공장 추진단 「스마트공장 참조모델」 ver 3.1 (2017) 요약.
 * 원문 전문이 아니라 업종 특징·수준별 요구·구성 포인트만 사이트용으로 정리.
 */

export type RefLevelId = 'basic' | 'mid1' | 'mid2' | 'advanced'

export type RefLevelBlock = {
  id: RefLevelId
  label: string
  requirements: string[]
  buildFocus: string[]
  outcomes: string[]
}

export type RefIndustry = {
  id: string
  name: string
  group: 'assembly' | 'root' | 'process' | 'consumer'
  process: string
  traits: string[]
  levels: RefLevelBlock[]
}

export const referenceModelMeta = {
  title: '업종별 참조모델',
  subtitle:
    '스마트공장 추진단 참조모델(ver 3.1)을 바탕으로, 업종 특징과 수준별 구축 포인트를 요약했습니다. 공장마다 현장이 다르므로 정답이 아닌 일반 경로로 보세요.',
  disclaimer:
    '안내용 요약입니다. 실제 설계·투자는 최신 가이드·전문 컨설팅과 함께 확인하세요. 원문은 2017년 3차 개정증보판(Version 3.1) 기준입니다.',
  sourceName: '스마트공장 추진단 참조모델 ver 3.1',
  sourceYear: '2017.07',
}

export const refLevelLabels: { id: RefLevelId; label: string; short: string }[] =
  [
    { id: 'basic', label: '기초', short: '자재·Lot 실적 집계' },
    { id: 'mid1', label: '중간1', short: '3M 실시간 집계' },
    { id: 'mid2', label: '중간2', short: '4M 실시간 제어' },
    { id: 'advanced', label: '고도화', short: '4M+1E · 개인화' },
  ]

/** 성숙도 L1~L4 ↔ 참조모델 수준 */
export const maturityToRefLevel: Record<string, RefLevelId> = {
  L1: 'basic',
  L2: 'mid1',
  L3: 'mid2',
  L4: 'advanced',
}

export const refLevelToMaturity: Record<RefLevelId, string> = {
  basic: 'L1',
  mid1: 'L2',
  mid2: 'L3',
  advanced: 'L4',
}

export const referenceOverview = {
  purpose:
    '업종별·수준별 가이드를 제시해 중소·중견기업이 스마트공장을 점진적으로 구축하도록 돕습니다.',
  scope:
    '제품개발부터 양산·출하까지, 현장자동화·제어자동화·응용시스템을 모두 포함합니다.',
  levelWhy:
    '대규모 일괄 투자 대신 여력에 맞춰 기초→중간1→중간2→고도화로 진화하도록 수준을 나눕니다.',
  levelTable: [
    {
      level: '기초',
      iot: '1M · Materials',
      decision: '실시간 집계',
      note: 'Lot 추적·자재 이력 중심',
    },
    {
      level: '중간1',
      iot: '3M · Man·Machinery·Materials',
      decision: '실시간 집계',
      note: '사람·설비·자재 실적으로 의사결정',
    },
    {
      level: '중간2',
      iot: '4M · +Methods',
      decision: '실시간 제어',
      note: '공정·방법까지 제어·최적화',
    },
    {
      level: '고도화',
      iot: '4M+1E',
      decision: '실시간 제어',
      note: '환경 포함 · 맞춤형·개인화 생산',
    },
  ],
}

export const referenceCommonAreas: {
  id: string
  title: string
  body: string
}[] = [
  {
    id: 'ops',
    title: '공장운영',
    body: '작업지시·실적·Lot 추적·품질·설비보전을 POP/MES로 묶는 축. 업종 모델의 공통 골격입니다.',
  },
  {
    id: 'scm',
    title: '공급사슬관리',
    body: '모기업·협력사 주문·납기·재고 공유. 기초에서는 모기업 인프라 활용부터 시작하는 경우가 많습니다.',
  },
  {
    id: 'rd',
    title: '제품·공정개발',
    body: 'BOM·공정설계·변경관리. 수준이 오를수록 설계–생산 정보 연동이 중요해집니다.',
  },
  {
    id: 'erp',
    title: '기업자원관리',
    body: '수주·원가·재고·재무와 현장 실적의 연결. 중간 이후 기능 간 통합의 핵심입니다.',
  },
]

const advancedShared = (
  industryHint: string,
): Pick<RefLevelBlock, 'requirements' | 'buildFocus' | 'outcomes'> => ({
  requirements: [
    '4M+1E(환경 포함) 실시간 제어·모니터링',
    '고객 맞춤·소Lot·개인화 생산에 대응하는 유연 스케줄',
    '빅데이터·AI 기반 진단·최적화(업종 KPI와 연결)',
    industryHint,
  ],
  buildFocus: [
    '고도화 KPI·ROI를 경영 지표와 연결',
    '보안·데이터 거버넌스를 OT/IT에 같이 설계',
    '파일럿 성공 과제를 라인·공장으로 확장',
  ],
  outcomes: [
    '변동 수요에 맞는 실시간 의사결정',
    '품질·가동·에너지의 통합 최적화',
  ],
})

function levels(blocks: {
  basic: Omit<RefLevelBlock, 'id' | 'label'>
  mid1: Omit<RefLevelBlock, 'id' | 'label'>
  mid2: Omit<RefLevelBlock, 'id' | 'label'>
  advancedHint: string
}): RefLevelBlock[] {
  return [
    { id: 'basic', label: '기초', ...blocks.basic },
    { id: 'mid1', label: '중간1', ...blocks.mid1 },
    { id: 'mid2', label: '중간2', ...blocks.mid2 },
    {
      id: 'advanced',
      label: '고도화',
      ...advancedShared(blocks.advancedHint),
    },
  ]
}

export const referenceIndustries: RefIndustry[] = [
  {
    id: 'machine-assembly',
    name: '기계부품 조립',
    group: 'assembly',
    process: '자재 입고 → 부착/조립 → 검사 → 출하',
    traits: [
      '원재료·부품을 조립·검사하는 노동집약 공정이 핵심',
      '발주처 규격 수급형과 원자재 구매 후 가공·공급형이 혼재',
      '공정 데이터와 검사 데이터의 집계·품질분석이 중요',
      '품질 추적은 시간대·제품일련번호·자재 이력까지 요구되는 경우 많음',
    ],
    levels: levels({
      basic: {
        requirements: [
          '부품/작업자별 작업실적 자동 또는 바코드 집계',
          '일·라인·작업자별 생산현황 모니터링',
          '자재 입출고·사용량·잔량 관리',
          'Lot 단위 생산이력·불량품 반품 이력',
        ],
        buildFocus: [
          '바코드·카운터로 Lot 시작/종료 실적부터',
          'SOP·품번·설비 ID 기준정보 단일화',
          '일일 수율·정지 기록 습관',
        ],
        outcomes: ['Lot 추적 가능', '기초 실적·재고 가시화'],
      },
      mid1: {
        requirements: [
          '기초 요구사항 포함',
          '설비 가동·비가동·보전작업 시간 시스템 관리',
          '예방보전 계획·고장·부품교체 이력',
          '공구·부자재 출고·재고 관리',
        ],
        buildFocus: [
          '사람·설비·자재 3M 실적을 한 화면에서',
          '알람·이상 조치 담당 고정',
          '한 라인 MES/POP 범위 확대',
        ],
        outcomes: ['3M 기반 의사결정', '보전·가동 가시화'],
      },
      mid2: {
        requirements: [
          '중간1 포함 + 공정 Methods 실시간 제어',
          '작업표준·레시피와 실적의 연동',
          '품질·가동 KPI 기반 실시간 의사결정',
          '기능 간(생산·품질·물류) 통합 운영',
        ],
        buildFocus: [
          '표준 이탈 알람과 조치 플레이북',
          '라인 간·공정 간 데이터 인터페이스',
          '주간 KPI 리뷰에 제어 결과 반영',
        ],
        outcomes: ['4M 제어·최적화', '재발 불량·정지 감소'],
      },
      advancedHint: '조립 라인의 다품종·혼류에 맞춘 유연 스케줄·품질 AI',
    }),
  },
  {
    id: 'electronics-assembly',
    name: '전자부품 조립',
    group: 'assembly',
    process: '자재 → 실장/조립 → 검사 → 출하',
    traits: [
      '기계 조립과 유사하나 전자부품 불량과 작업 불량 구분이 중요',
      'Lot 추적과 함께 자재 단위 추적이 자주 요구됨',
      '부착/조립·검사 데이터 집계가 품질분석의 기반',
    ],
    levels: levels({
      basic: {
        requirements: [
          '바코드 기반 실적·자재 흐름 관리',
          'Lot·자재 이력 추적',
          '공정·출하 검사 결과 기록',
          '생산계획 대비 실적 모니터링',
        ],
        buildFocus: [
          '자재 Lot와 제품 Lot 연결부터',
          '검사 불량 코드 표준화',
          '선행 재고·납기 버퍼 가시화',
        ],
        outcomes: ['전자·작업 불량 구분 가능', '기초 추적성'],
      },
      mid1: {
        requirements: [
          '설비·작업자·자재 실시간 집계',
          '예방보전·공구 이력',
          '검사 데이터와 생산 실적 연계 분석',
          '협력사·모기업 납기·품질 정보 공유 강화',
        ],
        buildFocus: [
          'AOI/검사기 데이터 수집 경로 확보',
          '과검·미검 리뷰 루틴',
          '한 라인 실시간 대시보드',
        ],
        outcomes: ['3M+품질 가시화', '공급 이슈 조기 감지'],
      },
      mid2: {
        requirements: [
          '공정 조건·레시피 제어와 실적 연동',
          '통계적 품질(관리도 등) 운영',
          '기능 통합 MES/QMS',
          '실시간 이상 대응·에스컬레이션',
        ],
        buildFocus: [
          '레시피 변경 관리와 현장 적용 통제',
          '비전/AOI PoC를 조치 절차와 묶기',
          '고객 품질 요구(문서·추적) 갭 점검',
        ],
        outcomes: ['공정 제어 고도화', '재발 불량 감소'],
      },
      advancedHint: '전자 라인의 예지·비전·수율 AI와 혼류 최적화',
    }),
  },
  {
    id: 'pcb',
    name: 'PCB 제작',
    group: 'process',
    process: '재단·드릴·노광·에칭·도금·PSR·마킹·표면처리·성형·검사',
    traits: [
      '주문 설계에 따른 수주형·다공정(다층은 수십 공정) 장치산업',
      '설비 능력과 품질이 직결, 소재·설비·제품 기술 집약',
      '중소는 소량 다모델(1 Model=1 Lot) 운영이 흔함',
    ],
    levels: levels({
      basic: {
        requirements: [
          'Lot·공정 단위 실적·이동 이력',
          '주요 설비 가동/정지 기초 기록',
          '공정·최종 검사 결과 관리',
          '자재(동박·원판 등) 입출고·Lot 연결',
        ],
        buildFocus: [
          '병목 공정부터 바코드/실적 입력',
          '불량 코드·재작업 이력 표준화',
          '설비 레시피 종이 관리 → 파일/코드화',
        ],
        outcomes: ['다공정 Lot 가시화', '기초 품질·가동 기록'],
      },
      mid1: {
        requirements: [
          '설비 데이터 자동 집계(온도·압력 등 핵심 파라미터)',
          '예방보전·금형/툴 이력',
          '실시간 공정 현황·WIP 모니터링',
          '수율·불량 분석 리포트',
        ],
        buildFocus: [
          '핵심 설비 파라미터 수집 우선순위',
          'WIP·납기 알람',
          '보전·품질 담당 역할 분리',
        ],
        outcomes: ['장치 파라미터와 품질 연계', '납기 리스크 감소'],
      },
      mid2: {
        requirements: [
          '공정 조건 자동 제어·레시피 적용',
          'SPC·이상 감지와 조치 연동',
          '생산·품질·설비 시스템 통합',
          '다층·다모델 스케줄 최적화 지원',
        ],
        buildFocus: [
          '레시피 버전 관리와 현장 적용 통제',
          '수율 KPI 주간 리뷰',
          '고객 신뢰성 시험 데이터 연계',
        ],
        outcomes: ['공정 제어 안정화', '모델 전환 손실 감소'],
      },
      advancedHint: '다층 PCB 수율·스케줄 AI, 환경·에너지 통합',
    }),
  },
  {
    id: 'casting',
    name: '주조',
    group: 'root',
    process: '용해 → 주입 → 냉각 → 후처리 → 검사',
    traits: [
      '뿌리업종. Charge/Ladle·금형 온도·주입 조건이 품질 핵심',
      'Ingot·스크랩·반제품 중량·Lot 관리가 중요',
    ],
    levels: levels({
      basic: {
        requirements: [
          '바코드로 Charge/Ladle Lot 관리',
          '예방보전·금형 수리 이력',
          'Ingot 재고·중량 관리',
          '주입 온도 등 핵심 품질 파라미터 주기 기록',
        ],
        buildFocus: [
          'Batch→Lot 공정 물류 추적부터',
          '금형·설비 코드 마스터',
          '출하 Lot 정보를 고객과 공유할 형식 정리',
        ],
        outcomes: ['용해·주입 Lot 추적', '기초 보전·재고 가시화'],
      },
      mid1: {
        requirements: [
          '설비·품질 파라미터 자동 집계',
          '생산·품질·설비 현황 실시간 모니터',
          'Xbar-R·Cpk 등 기초 통계 분석',
          '스크랩·부적합 처리 시스템화',
        ],
        buildFocus: [
          '주입/금형 온도 자동 수집',
          'Lot 단위 KPI 대시보드',
          '보전·품질 알람 담당 지정',
        ],
        outcomes: ['3M+품질 집계', '불량·스크랩 원인 가시화'],
      },
      mid2: {
        requirements: [
          '주입·온도 등 실시간 제어',
          '금형·보전·생산 기능 통합',
          '이상 시 자동 에스컬레이션',
          '공정 조건과 실적·품질 피드백 루프',
        ],
        buildFocus: [
          '제어 한계와 조치 플레이북',
          '금형 수명·보전 일정 연동',
          '에너지·용해 효율 KPI 추가',
        ],
        outcomes: ['공정 안정화', '재작업·스크랩 감소'],
      },
      advancedHint: '용해·주입 최적화 AI, 에너지·환경 모니터링',
    }),
  },
  {
    id: 'mold',
    name: '금형',
    group: 'root',
    process: '설계 → 가공 → 조립·트라이 → 수정 → 출고',
    traits: [
      '수주 단위 프로젝트성·설계변경이 잦음',
      '금형 이력·수정·트라이 횟수 관리가 원가·납기의 핵심',
    ],
    levels: levels({
      basic: {
        requirements: [
          '수주·금형 ID 기준 진척·공수 기록',
          '가공 실적·설비 가동 기초 집계',
          '수정·트라이 이력 관리',
          '도면·BOM 버전 최소한의 단일 관리',
        ],
        buildFocus: [
          '금형 마스터(ID·고객·차수)부터',
          '공정 게이트(설계/가공/트라이) 체크리스트',
          '납기·공수 일일 보드',
        ],
        outcomes: ['프로젝트 가시화', '수정 이력 추적'],
      },
      mid1: {
        requirements: [
          '설비·작업자·공수 실시간 집계',
          '설계–생산 정보 공유',
          '예방보전·툴 이력',
          '진척·부하 모니터링',
        ],
        buildFocus: [
          'CAM/설비 실적 연동 우선 구간',
          '병목 공정 부하 알람',
          '변경 요청(ECR) 간단 워크플로',
        ],
        outcomes: ['부하·납기 예측 개선', '변경 누락 감소'],
      },
      mid2: {
        requirements: [
          '공정·방법 표준과 실적 연동',
          '시뮬레이션·검증과 생산 연계',
          '품질·원가·납기 통합 KPI',
          '고객 포털·출고 정보 자동화',
        ],
        buildFocus: [
          '표준 공수·단가 베이스라인',
          '트라이 실패 모드 분석',
          '디지털 도면/버전 통제 강화',
        ],
        outcomes: ['반복 수정 감소', '납기 준수율 상승'],
      },
      advancedHint: '금형 수명·가공 경로 최적화, 디지털 트윈 활용',
    }),
  },
  {
    id: 'forming',
    name: '소성가공',
    group: 'root',
    process: '소재 → 성형 → 후처리 → 검사',
    traits: [
      '프레스·단조 등 하중·금형·소재 조건이 품질을 좌우',
      '금형·툴 수명과 예방보전이 가동률과 직결',
    ],
    levels: levels({
      basic: {
        requirements: [
          'Lot·금형 단위 실적·불량 기록',
          '금형 타발/사용 횟수 기초 관리',
          '예방보전 계획·고장 이력',
          '소재·반제품 재고 관리',
        ],
        buildFocus: [
          '금형 ID와 생산 Lot 연결',
          '타발수 카운터/일지 디지털화',
          '자주보전 체크리스트',
        ],
        outcomes: ['금형·Lot 추적', '돌발정지 기초 파악'],
      },
      mid1: {
        requirements: [
          '설비 하중·온도 등 파라미터 집계',
          '금형·보전·생산 현황 모니터',
          '불량·재작업 분석',
          '공구·부자재 재고 연동',
        ],
        buildFocus: [
          '핵심 프레스 파라미터 수집',
          '금형 수명 알람',
          '3M 대시보드',
        ],
        outcomes: ['조건–품질 상관 가시화', '보전 선제화'],
      },
      mid2: {
        requirements: [
          '성형 조건 실시간 제어',
          '금형·생산·품질 시스템 통합',
          '이상 시 라인 정지/에스컬레이션 규칙',
          'Methods(표준) 준수 모니터링',
        ],
        buildFocus: [
          '레시피·하중 한계 통제',
          '금형 교환·세팅 표준시간',
          'OEE·스크랩 KPI 주간 리뷰',
        ],
        outcomes: ['세팅 손실 감소', '품질 안정'],
      },
      advancedHint: '성형 조건 최적화·예지보전, 에너지 모니터링',
    }),
  },
  {
    id: 'welding',
    name: '용접접합',
    group: 'root',
    process: '모재 → 용접 → 검사 → 출하',
    traits: [
      '모재·용접재 Lot와 용접 조건이 품질·안전의 핵심',
      '바코드 기반 물류·실적과 조건 모니터링이 병행',
    ],
    levels: levels({
      basic: {
        requirements: [
          '주문 Lot 단위 물류 추적',
          '모재/용접재 바코드 입출고',
          '계획 대비 실적 모니터링',
          '설비 가동·비가동·예방보전 이력',
        ],
        buildFocus: [
          '모재 Lot ↔ 제품 Lot 연결',
          '용접 조건 일지 표준화',
          '공정 검사 구역·불량 재고 파악',
        ],
        outcomes: ['물류·품질 기초 추적', '보전 이력화'],
      },
      mid1: {
        requirements: [
          '용접 조건·설비 상태 자동 집계',
          '품질/비용/납기 통합 관제',
          '공정 불량 분석',
          '입출하 물류 흐름 시스템 관리',
        ],
        buildFocus: [
          '조건 센서/용접기 데이터 수집',
          '이상 조건 알람',
          '3M 실적 대시보드',
        ],
        outcomes: ['조건 이탈 조기 감지', '납기·품질 가시화'],
      },
      mid2: {
        requirements: [
          '용접 파라미터 실시간 제어',
          '검사·실적·보전 통합',
          'Methods 표준과 현장 준수 모니터링',
          '고객 추적·성적서 자동화',
        ],
        buildFocus: [
          'WPS/조건 버전 관리',
          '비파괴·외관 검사 데이터 연동',
          '조치 플레이북',
        ],
        outcomes: ['용접 품질 안정', '문서·추적 부하 감소'],
      },
      advancedHint: '용접 품질 AI·예지, 로봇 용접 셀 최적화',
    }),
  },
  {
    id: 'heat-treatment',
    name: '열처리',
    group: 'root',
    process: '장입 → 열처리 → 냉각 → 검사',
    traits: [
      '로(爐) 온도·시간·분위기가 품질을 결정하는 장치공정',
      '배치(Batch) 단위 이력과 에너지 관리가 중요',
    ],
    levels: levels({
      basic: {
        requirements: [
          '배치 Lot·장입 이력 관리',
          '온도·시간 기록(차트/일지)',
          '예방보전·로 설비 이력',
          '입출고·재고 기초 관리',
        ],
        buildFocus: [
          '배치 카드/바코드화',
          '온도 기록 디지털 보관',
          '로별 가동 일지',
        ],
        outcomes: ['배치 추적', '기초 품질·보전 기록'],
      },
      mid1: {
        requirements: [
          '로 파라미터 자동 집계',
          '배치 현황·대기열 모니터',
          '경도 등 검사 결과 연계',
          '에너지·가스 사용량 기초 집계',
        ],
        buildFocus: [
          '로 컨트롤러 데이터 수집',
          '대기·지연 알람',
          '배치 KPI(수율·재처리)',
        ],
        outcomes: ['조건–품질 연계', '납기·에너지 가시화'],
      },
      mid2: {
        requirements: [
          '열처리 레시피 자동 적용·제어',
          '이상 시 알람·인터록',
          '생산·품질·에너지 통합',
          '고객 성적서·추적 자동화',
        ],
        buildFocus: [
          '레시피 버전 통제',
          '재처리 원인 분석 루틴',
          '에너지 KPI를 원가와 연결',
        ],
        outcomes: ['배치 품질 안정', '에너지·재처리 비용 감소'],
      },
      advancedHint: '레시피·에너지 최적화 AI, 환경(배출) 모니터링',
    }),
  },
  {
    id: 'surface',
    name: '표면처리',
    group: 'root',
    process: '전처리 → 도금/도장 등 → 후처리 → 검사',
    traits: [
      '약품·욕조 조건·막두께 등 화학·공정 조건 관리가 핵심',
      '환경·안전·폐수 규제와 생산이 함께 움직임',
    ],
    levels: levels({
      basic: {
        requirements: [
          'Lot·랙/바스켓 단위 실적',
          '욕조·공정 조건 일지',
          '약품·자재 입출고',
          '외관·막두께 등 기초 검사 기록',
        ],
        buildFocus: [
          'Lot–랙 추적부터',
          '욕조 점검 체크리스트 디지털화',
          '불량·재작업 코드 표준',
        ],
        outcomes: ['공정 이력 추적', '기초 품질·약품 관리'],
      },
      mid1: {
        requirements: [
          '욕조 pH·온도 등 자동 집계',
          '라인·Lot 현황 모니터',
          '예방보전·필터/양극 등 소모품 이력',
          '불량·재작업 분석',
        ],
        buildFocus: [
          '핵심 욕조 센서 수집',
          '조건 이탈 알람',
          '3M 대시보드',
        ],
        outcomes: ['조건 안정성 향상', '재작업 감소 단서'],
      },
      mid2: {
        requirements: [
          '공정 조건 실시간 제어',
          '환경·폐수 데이터와 생산 연계',
          '품질·생산 시스템 통합',
          'Methods 표준 준수 모니터링',
        ],
        buildFocus: [
          '자동 보급/제어와 수동 개입 규칙',
          '고객 스펙 대비 SPC',
          '환경 KPI를 운영 리뷰에 포함',
        ],
        outcomes: ['스펙 준수율 상승', '규제·품질 리스크 감소'],
      },
      advancedHint: '욕조·막질 최적화 AI, 환경·에너지 통합 제어',
    }),
  },
  {
    id: 'precision',
    name: '정밀가공',
    group: 'process',
    process: '소재 → 절삭/연마 → 측정 → 출하',
    traits: [
      '치수·공차·측정이 품질의 중심',
      '다품종 소량, 설비·공구·측정기 이력이 원가에 직결',
    ],
    levels: levels({
      basic: {
        requirements: [
          '작업지시·실적·공수 기초 집계',
          '공구·치구 입출고',
          '측정 결과 기록·성적서',
          '설비 가동 기초 관리',
        ],
        buildFocus: [
          '품번–공정–공구 기준정보',
          '측정 데이터 파일/시트 표준',
          '일일 수율·재작업 보드',
        ],
        outcomes: ['가공·측정 이력화', '기초 가동 가시화'],
      },
      mid1: {
        requirements: [
          'CNC/설비 실적 자동 집계',
          '공구 수명·보전 이력',
          'WIP·납기 모니터',
          '측정–생산 연계 분석',
        ],
        buildFocus: [
          '핵심 설비 DNC/로그 수집',
          '공구 수명 알람',
          '병목 공정 부하 파악',
        ],
        outcomes: ['설비·공구 가시화', '납기 예측 개선'],
      },
      mid2: {
        requirements: [
          '가공 조건·프로그램 버전 통제',
          '인라인/자주 측정 피드백',
          '생산·품질 통합 KPI',
          '실시간 이상 대응',
        ],
        buildFocus: [
          '프로그램/셋업 표준화',
          '치수 이탈 조치 플레이북',
          'OEE·스크랩 주간 리뷰',
        ],
        outcomes: ['셋업 손실 감소', '공차 준수율 상승'],
      },
      advancedHint: '공구·가공 경로 최적화, 인라인 측정 피드백 루프',
    }),
  },
  {
    id: 'injection',
    name: '사출성형',
    group: 'process',
    process: '건조 → 사출 → 후가공 → 검사',
    traits: [
      '금형·사출 조건(온도·압력·시간)이 품질·사이클을 좌우',
      '금형 수명·교체·보전과 자재 Lot 관리가 중요',
    ],
    levels: levels({
      basic: {
        requirements: [
          '금형·Lot 단위 실적·불량',
          '사출 조건 일지',
          '예방보전·금형 이력',
          '원료·색상 Lot 입출고',
        ],
        buildFocus: [
          '금형 ID–제품 Lot 연결',
          '조건표 표준 양식',
          '사이클·불량 일일 집계',
        ],
        outcomes: ['금형·조건 이력화', '기초 수율 가시화'],
      },
      mid1: {
        requirements: [
          '사출기 파라미터 자동 집계',
          '금형·설비·자재 3M 모니터',
          '불량·재작업 분석',
          '금형 타발/쇼트 수 관리',
        ],
        buildFocus: [
          '핵심 사출기 데이터 수집',
          '금형 수명 알람',
          '색상/원료 전환 로스 파악',
        ],
        outcomes: ['조건–품질 연계', '금형 돌발 감소'],
      },
      mid2: {
        requirements: [
          '사출 조건 실시간 제어·레시피 적용',
          '생산·품질·금형 시스템 통합',
          '이상 시 알람·인터록',
          'Methods 준수 모니터링',
        ],
        buildFocus: [
          '레시피 버전 통제',
          '셋업/색상 전환 표준시간',
          'OEE·스크랩 KPI',
        ],
        outcomes: ['사이클 안정', '전환 손실 감소'],
      },
      advancedHint: '사출 조건·예지보전 AI, 에너지 모니터링',
    }),
  },
  {
    id: 'pharma',
    name: '제약',
    group: 'consumer',
    process: '칭량 → 제조 → 충전·포장 → 시험 → 출하',
    traits: [
      'GMP·배치기록·일탈·변경관리가 스마트화의 전제',
      '칭량·환경·설비 적격성이 품질과 규제 준수의 핵심',
    ],
    levels: levels({
      basic: {
        requirements: [
          '배치·칭량 기록 전자/표준화',
          '자재 Lot 입출고·사용 추적',
          '환경·설비 점검 일지',
          '시험·출하 성적 기초 관리',
        ],
        buildFocus: [
          '배치 기록 누락 포인트부터 디지털화',
          '자재 Lot–배치 연결',
          '일탈/변경 로그 단일화',
        ],
        outcomes: ['추적성·기록 완성도 향상', '감사 대응 기초'],
      },
      mid1: {
        requirements: [
          '제조·포장 설비 데이터 집계',
          '환경(온습도) 모니터링',
          '예방보전·교정 이력',
          'WIP·배치 현황 가시화',
        ],
        buildFocus: [
          '핵심 설비/클린룸 센서 수집',
          '배치 진행 보드',
          '교정·보전 일정 알람',
        ],
        outcomes: ['환경·설비 가시화', '배치 지연 조기 감지'],
      },
      mid2: {
        requirements: [
          '전자배치기록(EBR)과 실적 연동',
          '일탈·CAPA 워크플로',
          '생산·품질·창고 통합',
          '실시간 알람·인터록',
        ],
        buildFocus: [
          'EBR 범위 단계적 확대',
          'CAPA 주기·책임 고정',
          '출하 결정 데이터 패키지 자동화',
        ],
        outcomes: ['규제 리스크 감소', '배치 리드타임 단축'],
      },
      advancedHint: '연속생산·PAT·AI 품질예측 (규제 프레임 내)',
    }),
  },
  {
    id: 'chemical',
    name: '화학',
    group: 'process',
    process: '원료 → 반응/혼합 → 후처리 → 충전',
    traits: [
      '배치/연속 공정, 반응 조건·안전·환경이 동시에 중요',
      '원료 Lot·처방(레시피) 관리가 품질·원가의 축',
    ],
    levels: levels({
      basic: {
        requirements: [
          '배치·원료 Lot 추적',
          '처방/배합 일지',
          '설비·안전 점검 기록',
          '재고·입출고 기초 관리',
        ],
        buildFocus: [
          '배치 카드 디지털화',
          '원료–제품 Lot 연결',
          '안전·누출 점검 체크리스트',
        ],
        outcomes: ['배치 추적', '기초 안전·재고 가시화'],
      },
      mid1: {
        requirements: [
          '온도·압력 등 파라미터 집계',
          '배치 현황·알람 모니터',
          '예방보전·교정',
          '수율·부산물 분석',
        ],
        buildFocus: [
          '핵심 반응기 데이터 수집',
          '이탈 알람 담당',
          '수율 KPI 보드',
        ],
        outcomes: ['조건 가시화', '수율 편차 파악'],
      },
      mid2: {
        requirements: [
          '레시피 자동 적용·제어',
          '안전 인터록·비상 절차 연동',
          '생산·품질·환경 데이터 통합',
          'Methods 준수 모니터링',
        ],
        buildFocus: [
          '레시피 버전·권한 통제',
          '환경·배출 KPI 운영 반영',
          '일탈 조사 워크플로',
        ],
        outcomes: ['공정·안전 안정화', '규제·품질 대응력'],
      },
      advancedHint: '반응 최적화·예지, 에너지·환경 통합 제어',
    }),
  },
  {
    id: 'cosmetics',
    name: '화장품',
    group: 'consumer',
    process: '칭량·제조 → 충전 → 포장 → 출하',
    traits: [
      '다품종·소Lot, 처방·벌크·충전 라인 전환이 잦음',
      '위생·표시·추적(회수) 요구가 스마트화 동력',
    ],
    levels: levels({
      basic: {
        requirements: [
          '벌크/완제품 Lot 추적',
          '칭량·처방 기록',
          '충전·포장 실적 집계',
          '자재·부자재 입출고',
        ],
        buildFocus: [
          'Lot–배치–완박스 연결',
          '전환(색/향) 체크리스트',
          '일일 수율·클레임 보드',
        ],
        outcomes: ['회수·추적 기초', '전환 로스 파악'],
      },
      mid1: {
        requirements: [
          '제조·충전 설비 데이터 집계',
          '라인·WIP 모니터',
          '예방보전·교정',
          '품질검사 결과 연계',
        ],
        buildFocus: [
          '충전 라인 실적 자동 수집',
          '전환 시간 KPI',
          '3M 대시보드',
        ],
        outcomes: ['라인 가동 가시화', '품질–생산 연계'],
      },
      mid2: {
        requirements: [
          '처방·레시피 통제와 실적 연동',
          '위생·환경 모니터링',
          '생산·품질·물류 통합',
          '이상·클레임 에스컬레이션',
        ],
        buildFocus: [
          '처방 버전 권한 관리',
          '회수 시뮬레이션 훈련',
          '포장 라인 KPI 주간 리뷰',
        ],
        outcomes: ['전환 손실 감소', '회수 대응 속도'],
      },
      advancedHint: '수요·처방 유연 생산, 품질·위생 데이터 AI',
    }),
  },
  {
    id: 'fashion',
    name: '패션',
    group: 'consumer',
    process: '기획 → 재단·봉제 → 검사 → 출하',
    traits: [
      '시즌·SKU 변동이 크고 외주·임가공 비중이 높음',
      '발주·원단·봉제 진척·납기 가시화가 핵심',
    ],
    levels: levels({
      basic: {
        requirements: [
          '수주·오더 단위 진척 기록',
          '원단·부자재 입출고',
          '재단·봉제 실적 기초 집계',
          '검사·출하 실적',
        ],
        buildFocus: [
          '오더–원단–완제품 코드 연결',
          '외주처 진척 공유 양식',
          '납기 위험 오더 보드',
        ],
        outcomes: ['오더 가시화', '기초 재고·납기 관리'],
      },
      mid1: {
        requirements: [
          '공정·외주 진척 실시간 집계',
          '원단 소요·재고 연동',
          '불량·수선 분석',
          '시즌/SKU 판매–생산 정보 공유',
        ],
        buildFocus: [
          '외주 포털/시트 자동화',
          '병목 공정·외주처 알람',
          '3M(인력·설비·자재) 현황',
        ],
        outcomes: ['납기 준수율 개선', '과잉·결품 감소'],
      },
      mid2: {
        requirements: [
          '계획–실행 통합, 공임·원가 연동',
          '품질·납기 KPI 실시간',
          'SCM·생산 기능 통합',
          'Methods(표준공수) 모니터링',
        ],
        buildFocus: [
          '표준공수 베이스라인',
          '리오더·시즌 전환 플레이북',
          '판매 데이터와 생산 계획 연결',
        ],
        outcomes: ['재고 회전 개선', '외주 통제력 강화'],
      },
      advancedHint: '수요예측·유연 생산, SKU 최적화',
    }),
  },
  {
    id: 'food',
    name: '가공식품',
    group: 'consumer',
    process: '입고 → 전처리 → 가공 → 포장 → 출하',
    traits: [
      'HACCP·위생·유통기한·온도관리가 스마트화와 결합',
      '배치/Lot 추적과 CCP 기록이 규제·회수의 핵심',
    ],
    levels: levels({
      basic: {
        requirements: [
          '원료·완제품 Lot 추적',
          'CCP/위생 점검 기록',
          '생산·포장 실적 집계',
          '온도·보관 일지',
        ],
        buildFocus: [
          'Lot–배치–박스 연결',
          'CCP 체크리스트 디지털화',
          '유통기한·선입선출 보드',
        ],
        outcomes: ['회수·추적 기초', '위생 기록 완성도'],
      },
      mid1: {
        requirements: [
          '설비·온도 데이터 자동 집계',
          '라인·배치 현황 모니터',
          '예방보전·교정',
          '불량·폐기 분석',
        ],
        buildFocus: [
          '냉장/가열 CCP 센서 수집',
          '이탈 알람·담당',
          '폐기·수율 KPI',
        ],
        outcomes: ['CCP 가시화', '폐기 감소 단서'],
      },
      mid2: {
        requirements: [
          '레시피·공정 제어와 실적 연동',
          'HACCP/스마트HACCP과 MES 연계',
          '생산·품질·물류 통합',
          '이상·회수 에스컬레이션',
        ],
        buildFocus: [
          '스마트HACCP 연동 범위 정의',
          '회수 훈련·플레이북',
          '포장 라인 KPI 주간 리뷰',
        ],
        outcomes: ['규제 대응력', '회수·품질 리스크 감소'],
      },
      advancedHint: '수요·유통 연계 생산, 위생·품질 예측',
    }),
  },
]

export const referenceIndustryGroups: {
  id: RefIndustry['group']
  label: string
}[] = [
  { id: 'assembly', label: '조립' },
  { id: 'root', label: '뿌리' },
  { id: 'process', label: '공정·장치' },
  { id: 'consumer', label: '소비재·규제' },
]

export function getReferenceIndustry(id: string): RefIndustry {
  return (
    referenceIndustries.find((i) => i.id === id) ?? referenceIndustries[0]
  )
}

export function getIndustryLevel(
  industry: RefIndustry,
  levelId: RefLevelId,
): RefLevelBlock {
  return (
    industry.levels.find((l) => l.id === levelId) ?? industry.levels[0]
  )
}
