/**
 * 스마트공장 소개 — TIPA(스마트공장 사업관리시스템) 소개 내용을 참고한 요약.
 * 출처: https://www.smart-factory.kr/usr/pr/sf/ma/smrtFctryIntrcn
 */

export const smartFactoryIntroMeta = {
  title: '스마트공장 소개',
  subtitle:
    '제품 기획부터 판매까지 ICT로 연결하는 사람 중심의 지능형 공장. 중기부·TIPA 스마트공장 사업관리시스템의 소개를 바탕으로 정리했습니다.',
  sourceName: '스마트공장 사업관리시스템',
  sourceUrl: 'https://www.smart-factory.kr/usr/pr/sf/ma/smrtFctryIntrcn',
}

export const smartFactoryDefinition = {
  headline: '정의',
  body: '스마트공장은 제품의 기획부터 판매까지 모든 생산과정을 ICT(정보통신)기술로 통합해 최소 비용과 시간으로 고객 맞춤형 제품을 생산하는 사람 중심의 첨단 지능형 공장입니다.',
}

export const smartFactoryScope = {
  headline: '적용 범위',
  lead: '제품을 만드는 공정만 바뀐다고 해서 스마트공장은 아닙니다.',
  paragraphs: [
    '스마트공장은 제품 기획·개발부터 양산까지, 주문에서 완제품 출하까지 제조 관련 모든 과정을 말합니다.',
    '응용 시스템뿐 아니라 현장자동화와 제어자동화 영역까지, 공장 운영의 모든 부분을 포함합니다.',
  ],
}

export type SmartLevelId =
  | 'ict-none'
  | 'basic'
  | 'mid1'
  | 'mid2'
  | 'advanced'

export type SmartDomainId =
  | 'field'
  | 'ops'
  | 'erp'
  | 'rd'
  | 'scm'

export const smartDomains: { id: SmartDomainId; label: string }[] = [
  { id: 'field', label: '현장자동화' },
  { id: 'ops', label: '공장운영' },
  { id: 'erp', label: '기업자원관리' },
  { id: 'rd', label: '제품개발' },
  { id: 'scm', label: '공급사슬관리' },
]

export const smartLevels: {
  id: SmartLevelId
  label: string
  short: string
  summary: string
  highlight: string
  cells: Record<SmartDomainId, string>
}[] = [
  {
    id: 'ict-none',
    label: 'ICT 미적용',
    short: '미적용',
    summary: '수기·전화·이메일 중심의 업무. 현장과 관리가 데이터로 연결되지 않은 상태입니다.',
    highlight: '수작업으로 기록·공유하며, 시스템 기반 집계·추적은 거의 없습니다.',
    cells: {
      field: '수작업',
      ops: '수작업',
      erp: '수작업',
      rd: '수작업',
      scm: '전화·이메일 협업',
    },
  },
  {
    id: 'basic',
    label: '기초',
    short: '기초',
    summary:
      '실적집계 자동화와 Lot-tracking으로 자재·제품 흐름을 파악하는 시작 단계입니다. 많은 중소기업이 여기서 효과를 확인합니다.',
    highlight:
      '바코드·RFID 등으로 생산실적을 모으고, 자재 이력을 추적할 수 있습니다.',
    cells: {
      field: '실적집계 자동화',
      ops: '공정물류 관리(POP)',
      erp: '관리 기능 중심·개별 운용',
      rd: 'CAD·프로젝트 관리',
      scm: '단일 모기업 의존',
    },
  },
  {
    id: 'mid1',
    label: '중간1',
    short: '중간1',
    summary:
      '설비 데이터 자동집계와 실시간 정보로 의사결정을 돕는 단계입니다. 현장과 시스템이 같은 숫자를 봅니다.',
    highlight:
      '설비·계측 데이터가 정보시스템으로 모이고, 기능 간 통합과 다품종 생산 협업이 가능해집니다.',
    cells: {
      field: '설비데이터 자동집계',
      ops: '실시간 의사결정',
      erp: '기능 간 통합',
      rd: '기술정보 생성 자동화·협업',
      scm: '다품종 생산 협업',
    },
  },
  {
    id: 'mid2',
    label: '중간2',
    short: '중간2',
    summary:
      '설비 제어 자동화와 실시간 공장 제어로 공정 운영을 최적화하는 단계입니다.',
    highlight:
      '모니터링을 넘어 제어·통합이 이뤄지고, 시뮬레이션·일괄 프로세스 자동화가 가능해집니다.',
    cells: {
      field: '설비제어 자동화',
      ops: '실시간 공장제어',
      erp: '공장운영 통합',
      rd: '시뮬레이션·일괄 프로세스 자동화',
      scm: '다품종 개발 협업',
    },
  },
  {
    id: 'advanced',
    label: '고도화',
    short: '고도화',
    summary:
      'IoT·빅데이터·AI 기반의 지능형·자율 운영을 지향하는 단계입니다. 처음부터 목표로 두지 않아도 됩니다.',
    highlight:
      'CPS·네트워크 협업과 데이터 기반 진단·운영으로 맞춤형·자율 생산에 다가갑니다.',
    cells: {
      field: 'IoT/IoS·CPS화',
      ops: '빅데이터 기반 진단·운영',
      erp: '인터넷 공간 비즈니스·CPS 협업',
      rd: '가상 시뮬레이션·3D프린팅 등',
      scm: 'CPS 네트워크 협업',
    },
  },
]

export const smartLevelNote = {
  headline: '단계별로 본 스마트공장',
  paragraphs: [
    'ICT 활용 정도와 역량에 따라 구축시스템 스마트화 수준을 ICT 미적용 → 기초 → 중간1 → 중간2 → 고도화로 구분합니다.',
    '이와 별도로 기업의 종합 스마트 역량은 기업제조혁신역량 수준(Level 1~5)으로도 측정합니다.',
    '첫 단계부터 고도화를 걱정할 필요는 없습니다. 여력과 상황에 맞춰 점진적으로, 필요한 수준에 집중하는 것이 중요합니다.',
  ],
}

export const smartRequirements: {
  id: string
  title: string
  body: string
}[] = [
  {
    id: 'digital-4m1e',
    title: '4M+1E의 디지털화',
    body: '사람(Man)·설비(Machinery)·자재(Material)·방법(Method)·환경(Environment)의 값을 실시간으로 인지·측정하고, 서로 통신할 수 있어야 합니다.',
  },
  {
    id: 'intelligence',
    title: '지능화',
    body: '알고리즘·인공지능 등으로 최적해 또는 예측 가능한 해법을 제공해야 합니다.',
  },
  {
    id: 'integration',
    title: '통합',
    body: '가치사슬 End-to-end의 수평 통합과, 기계장치부터 기업 비즈니스까지 수직 통합을 지향합니다.',
  },
  {
    id: 'engineering-knowledge',
    title: '엔지니어링 지식의 창출',
    body: '정보를 지속적으로 확보·저장하고, 이를 바탕으로 자동화를 위한 제조 지식을 점진적으로 만들어야 합니다.',
  },
  {
    id: 'smart-connection',
    title: '스마트 시스템과의 연결',
    body: '앞으로의 스마트 제품과 통신 표준에 맞춰 연결될 수 있어야 합니다.',
  },
]
