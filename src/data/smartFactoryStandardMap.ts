/**
 * 스마트공장 표준지도 · OPC UA 적용 흐름 — 사이트용 요약.
 *
 * 원문(로컬):
 * - docs/standards/스마트공장 표준지도_Ver1.0.pdf
 * - docs/standards/OPC UA 표준적용 가이드라인.pdf
 *
 * 공개 안내:
 * - 중기부 스마트공장 표준지도 (5대 공정 × 6대 기술, 약 2,011종)
 * - https://www.smart-factory.kr/usr/np/rr/ma/recsroomDetail
 *
 * 전수 목록이 아니라 탐색·교육용 대표 표준만 담았습니다.
 */

export type ProcessAreaId =
  | 'equipment'
  | 'transfer'
  | 'collect'
  | 'factory'
  | 'enterprise'

export type TechFieldId =
  | 'data'
  | 'network'
  | 'automation'
  | 'control'
  | 'integration'
  | 'security'

export type Importance = 1 | 2 | 3

export type MapStandard = {
  code: string
  name: string
  note: string
  stars: Importance
}

export const smartFactoryMapMeta = {
  title: '스마트공장 표준지도',
  subtitle:
    '5대 공정영역 × 6대 기술분야로 보는 대표 표준. 칸을 누르면 해당 교차점의 표준이 열립니다.',
  sourceNote:
    '중기부·스마트공장 사업관리시스템 공개 표준지도를 바탕으로 한 요약입니다. 전체 목록·세부 지도는 원문 PDF·자료실을 확인하세요.',
  portalUrl: 'https://www.smart-factory.kr/usr/np/rr/ma/recsroomDetail',
  processAreas: [
    { id: 'equipment' as const, label: '생산설비', blurb: '설비·장치 계층' },
    { id: 'transfer' as const, label: '전송제어', blurb: '신호·제어 전송' },
    { id: 'collect' as const, label: '데이터수집', blurb: '계측·취득' },
    { id: 'factory' as const, label: '공장관리', blurb: 'MES·현장 운영' },
    {
      id: 'enterprise' as const,
      label: '기업운영관리',
      blurb: 'ERP·경영 연계',
    },
  ],
  techFields: [
    { id: 'data' as const, label: '데이터' },
    { id: 'network' as const, label: '디바이스네트워크' },
    { id: 'automation' as const, label: '자동화' },
    { id: 'control' as const, label: '제어시스템' },
    { id: 'integration' as const, label: '시스템통합' },
    { id: 'security' as const, label: '보안' },
  ],
}

/** 교차점별 대표 표준 (요약) */
export const smartFactoryMapCells: Record<
  ProcessAreaId,
  Partial<Record<TechFieldId, MapStandard[]>>
> = {
  equipment: {
    network: [
      {
        code: 'OPC UA',
        name: 'Open Platform Communications Unified Architecture',
        note: '이종 설비·컨트롤러 간 정보 모델·보안 통신의 사실상 표준.',
        stars: 3,
      },
    ],
    automation: [
      {
        code: 'IEC 61131',
        name: 'PLC 프로그래밍',
        note: 'PLC 언어·구조의 기본 틀.',
        stars: 2,
      },
    ],
    control: [
      {
        code: 'IEC 61499',
        name: '분산 제어 기능블록',
        note: '분산·이벤트 기반 제어 설계.',
        stars: 2,
      },
    ],
    security: [
      {
        code: 'IEC 62443',
        name: '산업제어시스템 보안',
        note: 'OT 구간 보안 요구의 대표 계열.',
        stars: 3,
      },
    ],
  },
  transfer: {
    network: [
      {
        code: 'TSN',
        name: 'Time-Sensitive Networking',
        note: '시간 결정성 있는 산업 이더넷 전송.',
        stars: 2,
      },
      {
        code: 'OPC UA Pub/Sub',
        name: '발행·구독 전송',
        note: '대량·주기 데이터 전송에 유리.',
        stars: 3,
      },
    ],
    data: [
      {
        code: 'MQTT',
        name: 'Message Queuing Telemetry Transport',
        note: '경량 메시징. IIoT 게이트웨이에서 자주 사용.',
        stars: 2,
      },
    ],
    security: [
      {
        code: 'TLS / OPC UA Security',
        name: '전송 구간 암호화·인증',
        note: '전송제어 구간의 기본 보안 계층.',
        stars: 3,
      },
    ],
  },
  collect: {
    data: [
      {
        code: 'OPC UA',
        name: '정보 모델 기반 수집',
        note: '태그·객체 단위로 의미를 담아 수집.',
        stars: 3,
      },
    ],
    network: [
      {
        code: 'Modbus / Fieldbus',
        name: '레거시 필드버스·시리얼',
        note: 'Brownfield에서 게이트웨이로 OPC UA에 올리는 경우가 많음.',
        stars: 2,
      },
    ],
    automation: [
      {
        code: '센서·계측 프로파일',
        name: '장치 프로파일·스케일',
        note: '단위·샘플링·품질 비트를 맞춰야 데이터가 쓸 만해짐.',
        stars: 2,
      },
    ],
  },
  factory: {
    integration: [
      {
        code: 'ISA-95 / IEC 62264',
        name: '기업-제어 시스템 통합',
        note: 'MES와 상위·하위 계층 역할 구분의 뼈대.',
        stars: 3,
      },
    ],
    data: [
      {
        code: 'B2MML',
        name: 'Business To Manufacturing Markup Language',
        note: 'ISA-95 기반 교환 메시지.',
        stars: 2,
      },
    ],
    control: [
      {
        code: 'MESA 모델',
        name: '제조실행 기능 모델',
        note: '현장 실행·실적·품질 기능 맵.',
        stars: 2,
      },
    ],
    security: [
      {
        code: '접근통제·감사로그',
        name: 'MES 계정·변경 이력',
        note: '공장관리 화면의 권한·추적이 운영 보안의 실무.',
        stars: 2,
      },
    ],
  },
  enterprise: {
    integration: [
      {
        code: 'ISA-95 Level 4',
        name: 'ERP·SCM 연계',
        note: '수주·재고·원가와 제조실행의 경계.',
        stars: 3,
      },
    ],
    data: [
      {
        code: '마스터데이터 정합',
        name: '품번·설비 ID·BOM',
        note: '표준 통신보다 먼저 깨지는 경우가 많은 구간.',
        stars: 3,
      },
    ],
    security: [
      {
        code: 'ISO/IEC 27001',
        name: '정보보안경영',
        note: 'IT·클라우드 구간 보안경영 체계.',
        stars: 2,
      },
    ],
  },
}

export const opcUaGuideMeta = {
  title: 'OPC UA 표준 적용 흐름',
  subtitle:
    'Brownfield(레거시) 공장에 OPC UA를 붙일 때의 절차·유스케이스 요약.',
  sourceNote:
    '『Brownfield에서의 표준적용 가이드라인: OPC UA 사례』(2021.12) 목차·내용을 사이트용으로 압축했습니다.',
  steps: [
    {
      id: 'why',
      title: '왜 표준인가',
      body: '공급사마다 다른 프로토콜이면 데이터가 공장 자산이 되지 못합니다. 표준은 호환·확장·내재화의 최소 조건입니다.',
    },
    {
      id: 'assess',
      title: '레거시 진단',
      body: 'PLC·CNC·센서가 OPC UA(통신·정보모델)를 얼마나 지원하는지부터 나눕니다. 지원/미지원 조합이 유스케이스를 결정합니다.',
    },
    {
      id: 'install',
      title: '환경 설치',
      body: '서버·클라이언트·보안 정책(인증서·사용자)을 준비합니다. 데모 연결 전에 네트워크·계정 경계를 정합니다.',
    },
    {
      id: 'connect',
      title: 'PLC 등 연결',
      body: '태그·노드를 정보모델에 매핑하고, 읽기/구독이 현장에서 끊기지 않는지 확인합니다.',
    },
    {
      id: 'usecase',
      title: '유스케이스 확장',
      body: 'AGV·CNC·센서 등 장치 유형별로 ‘표준 통신 지원 여부 × 정보모델 지원 여부’에 따라 경로가 달라집니다.',
    },
  ],
  useCases: [
    {
      id: 'plc-full',
      title: 'OPC UA 지원 PLC',
      support: '통신·정보모델 지원',
      tip: '가장 단순한 경로. 네이티브 서버/클라이언트로 바로 연결.',
    },
    {
      id: 'agv',
      title: 'AGV',
      support: '통신 지원 · 정보모델 미지원',
      tip: '통신은 되더라도 의미 모델은 직접 설계·매핑해야 함.',
    },
    {
      id: 'cnc',
      title: 'CNC',
      support: '통신 미지원 · 정보모델 지원',
      tip: '게이트웨이·어댑터로 통신을 올린 뒤 모델에 맞춤.',
    },
    {
      id: 'cnc-sensor',
      title: 'CNC–Sensor',
      support: '통신·정보모델 모두 미지원',
      tip: '가장 Brownfield다운 케이스. 수집 계층부터 표준화 설계.',
    },
  ],
}
