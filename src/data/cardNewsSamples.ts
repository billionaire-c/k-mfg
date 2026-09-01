export type MetricTone = 'up' | 'down' | 'neutral' | 'warn'

export type SlideMetric = {
  label: string
  value: string
  tone?: MetricTone
  arrow?: 'up' | 'down' | 'right'
}

export type ChartBar = {
  label: string
  value: number
  display?: string
  tone?: MetricTone
}

export type CardSlide = {
  eyebrow?: string
  title: string
  body?: string
  highlight?: string
  image?: string
  /** 커버처럼 이미지가 주인공인 슬라이드 */
  layout?: 'cover' | 'split' | 'text'
  metrics?: SlideMetric[]
  bars?: ChartBar[]
}

export type CardNewsSample = {
  id: string
  title: string
  date: string
  summary: string
  topic: string
  /** 잡지형 호수. 예: 08월-01 — 목록 커버 좌상단에 표시 */
  issue?: string
  cover: string
  sources: { name: string; url: string }[]
  slides: CardSlide[]
}

/**
 * 자체 요약 카드뉴스 — 원문 링크 포함
 * 최신 글이 배열 앞쪽. 매일 추가 시 기존 항목은 유지하고 앞에 push.
 *
 * 커버 디자인 (다음 제작부터):
 * - 목록 좌상단 `issue`(월-No) UI와 겹치므로, 커버 PNG에 01/02/03 숫자 넣지 말 것.
 * - 배경에는 대주제 키워드만 두고, 좌상단 월-No 영역은 비울 것.
 * - 기존 배포 커버는 수정하지 않음.
 */
export const cardNewsSamples: CardNewsSample[] = [
  {
    id: 'cn-ot-cyber-resilience-2026',
    title: '디지털화가 커질수록, 보안이 먼저다',
    date: '2026.09.01',
    summary:
      '제조기업 다수가 2년 내 완전 디지털화를 목표로 하지만, 전환의 최대 장애로 사이버보안이 꼽힙니다. OT 사고의 진짜 비용은 포렌식보다 라인 정지입니다.',
    topic: 'OT · 사이버복원력',
    issue: '09월-01',
    cover: '/card-news/cn-ot-cyber-resilience-2026.png',
    sources: [
      {
        name: 'ZDNet — 카스퍼스키 제조 사이버복원력',
        url: 'https://zdnet.co.kr/view/?no=20260831102956',
      },
      {
        name: 'K-Manufacturing OT 보안',
        url: '/ot-security',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: '09월-01',
        title: '디지털 전환의\n첫 장애물',
        body: 'OT · 사이버복원력',
        image: '/card-news/cn-ot-cyber-resilience-2026.png',
      },
      {
        layout: 'text',
        eyebrow: '숫자',
        title: '목표는 디지털,\n걸림돌은 보안',
        body: '완전 디지털화 예정 기업은 늘고\n보안 우려가 전환을 붙잡습니다.',
        metrics: [
          { label: '2년 내 목표', value: '60%', tone: 'up', arrow: 'up' },
          { label: '장애 1위', value: '보안', tone: 'warn', arrow: 'right' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '현장',
        title: '사고 비용은\n가동 정지',
        body: '평균 중단 시간은 십수 시간대.\n벌금·납기 지연이 포렌식보다 큽니다.',
        image: '/card-news/slide-factory-line.png',
        highlight: '복원력 KPI = 복구 시간 · 백업 신뢰 · 레거시 범위',
      },
      {
        layout: 'text',
        eyebrow: '시사점',
        title: '보안을 IT 규정\n밖으로 꺼내기',
        body: '생산·엔지니어링·품질 일상 업무에\nOT 보안을 같이 넣어야 합니다.',
        highlight: '연결만 늘리고 Zone이 없으면 리스크도 같이 커집니다.',
      },
    ],
  },
  {
    id: 'cn-modbus-ot-zone-2026',
    title: 'Modbus를 바꾸지 않고 OT 보안 적용하기',
    date: '2026.09.01',
    summary:
      '인증·암호화가 없는 레거시 프로토콜은 ‘패치’로 고치지 않습니다. PLC는 두고 Modbus Zone을 가둔 뒤 통로만 통제하는 As-Is→To-Be를 짧게 정리했습니다.',
    topic: 'OT · Modbus',
    issue: '09월-02',
    cover: '/card-news/cn-modbus-ot-zone-2026.png',
    sources: [
      {
        name: 'K-Manufacturing OT 보안 — Modbus 예시',
        url: '/ot-security',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: '09월-02',
        title: '프로토콜 전에\n경계부터',
        body: 'Modbus · Zone First',
        image: '/card-news/cn-modbus-ot-zone-2026.png',
      },
      {
        layout: 'text',
        eyebrow: 'As-Is',
        title: '평평한 한 망',
        body: '사무·VPN·HMI·PLC가 섞이면\n도달하는 순간 제어가 가능합니다.',
        metrics: [
          { label: '인증', value: '없음', tone: 'warn' },
          { label: '암호화', value: '없음', tone: 'warn' },
        ],
      },
      {
        layout: 'split',
        eyebrow: 'To-Be',
        title: 'Zone에 가두고\nConduit만 열기',
        body: '산업용 방화벽·게이트웨이·점프호스트로\n통로를 줄입니다.',
        image: '/card-news/slide-control-room.png',
        highlight: '안쪽은 Modbus 유지 · 바깥은 통제된 통신',
      },
      {
        layout: 'text',
        eyebrow: '순서',
        title: '그림 → 경계 →\n가시화 → 원격',
        body: '설비 교체보다 자산 목록과\n원격·계정 정리가 ROI가 큽니다.',
        highlight: 'OT 보안 페이지에서 As-Is / To-Be 구성도를 확인하세요.',
      },
    ],
  },
  {
    id: 'cn-ot-talent-gap-2026',
    title: 'OT 보안, 장비가 아니라 사람이 비어 있다',
    date: '2026.09.01',
    summary:
      '중소 제조의 정보화 조직은 극소수이고 OT 전담은 더 드뭅니다. 솔루션 도입만으로는 안 끝나는 인력·운영 공백을 현장 언어로 정리했습니다.',
    topic: 'OT · 인력',
    issue: '09월-03',
    cover: '/card-news/cn-ot-talent-gap-2026.png',
    sources: [
      {
        name: '테크월드 — 스마트팩토리 보안·인력',
        url: 'https://www.epnc.co.kr/news/articleView.html?idxno=402442',
      },
      {
        name: 'K-Manufacturing OT 보안',
        url: '/ot-security',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: '09월-03',
        title: '솔루션 다음에\n비는 자리',
        body: 'OT · Talent Gap',
        image: '/card-news/cn-ot-talent-gap-2026.png',
      },
      {
        layout: 'text',
        eyebrow: '현실',
        title: '정보화 조직이\n거의 없다',
        body: '중소 현장은 IT 겸직·외주 원격으로\nOT 보안을 버티는 경우가 많습니다.',
        metrics: [
          { label: '조직', value: '희소', tone: 'warn' },
          { label: '전담', value: '공백', tone: 'down', arrow: 'down' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '대응',
        title: '사람 대신\n절차를 먼저',
        body: '승인 원격 · 공용 계정 폐지 ·\n백업·사고 플레이북부터.',
        image: '/card-news/slide-data-panel.png',
        highlight: '고비용 전문가 채용 전에 운영 루틴을 고정합니다.',
      },
      {
        layout: 'text',
        eyebrow: '시사점',
        title: 'IT와 OT가\n같은 테이블에',
        body: '가동 제약을 IT가 이해하고\n피싱·악성코드를 OT가 이해해야 합니다.',
        highlight: '합동 테이블탑 한 번이 장비 한 대보다 쌀 수 있습니다.',
      },
    ],
  },
  {
    id: 'cn-ess-ai-datacenter-2026',
    title: 'AI 데이터센터가 당긴 ESS: 배터리 공장의 새 주문',
    date: '2026.08.18',
    summary:
      'EV 수요 둔화 속에 ESS·데이터센터 전력이 제조 배터리 라인의 새 축이 되고 있습니다. 출하 믹스 변화가 공장 운영에 의미하는 바를 정리했습니다.',
    topic: '배터리 · ESS',
    issue: '08월-04',
    cover: '/card-news/cn-ess-ai-datacenter-2026.png',
    sources: [
      {
        name: 'LG에너지솔루션 실적',
        url: 'https://www.newswire.co.kr/newsRead.php?no=1039662',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: '08월-04',
        title: '배터리 라인의\n새 주문처',
        body: 'ESS · AI 데이터센터',
        image: '/card-news/cn-ess-ai-datacenter-2026.png',
      },
      {
        layout: 'text',
        eyebrow: '변화',
        title: 'EV만으로는\n라인이 안 돈다',
        body: '중저가 EV·원통형·ESS로\n출하 믹스가 빠르게 바뀌는 중',
        metrics: [
          { label: '초점', value: 'ESS', tone: 'up', arrow: 'up' },
          { label: '동력', value: 'AI DC', tone: 'up', arrow: 'right' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '현장',
        title: '캐파를\n옮기는 공장',
        body: 'EV 라인을 ESS로 전환하거나\n북미 생산능력을 재배치하는 사례 증가',
        image: '/card-news/slide-control-room.png',
        highlight: '수요 변화 → 설비·인력 재배치가 동시에 움직임',
      },
      {
        layout: 'text',
        eyebrow: '시사점',
        title: '스마트공장은\n‘무엇을 만드나’에 묶인다',
        body: '제품 믹스가 바뀌면 MES·품질·에너지 KPI도\n함께 다시 설계해야 합니다.',
        highlight: '운영 설계 없이 캐파만 옮기면 병목이 따라옵니다.',
      },
    ],
  },
  {
    id: 'cn-hyundai-q2-ops-2026',
    title: '현대차 2분기: 매출은 최대, 이익은 줄었다',
    date: '2026.08.18',
    summary:
      '분기 최대 매출 뒤에 부품 차질·원가·관세가 겹쳤습니다. 숫자보다 ‘생산 안정성’이 다시 전면에 나온 실적을 요약합니다.',
    topic: '자동차 · 실적',
    issue: '08월-05',
    cover: '/card-news/cn-hyundai-q2-ops-2026.png',
    sources: [
      {
        name: '현대차그룹 실적',
        url: 'https://www.hyundaimotorgroup.com/ko/news/hyundai-motor-company-2026-q2-earnings',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: '08월-05',
        title: '매출 신기록,\n수익은 눌림',
        body: '현대차 2026.2Q',
        image: '/card-news/cn-hyundai-q2-ops-2026.png',
      },
      {
        layout: 'text',
        eyebrow: '숫자',
        title: '매출 49.2조\n영업이익 2.85조',
        body: '매출은 전년비 +1.9%\n영업이익은 −20.8%',
        metrics: [
          { label: '매출', value: '49.2조', tone: 'up', arrow: 'up' },
          { label: '영업익', value: '−20.8%', tone: 'down', arrow: 'down' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '원인',
        title: '화재·원자재·관세',
        body: '부품사 화재로 생산 차질,\n원가와 판매관리비가 동시에 상승',
        image: '/card-news/slide-quality-parts.png',
        highlight: '하이브리드 호조만으로는 이익률을 못 지탱',
      },
      {
        layout: 'text',
        eyebrow: '현장 언어',
        title: '가동률보다\n공급망 복원력',
        body: '스마트공장 KPI에\n‘대체 공급·안전 재고’ 항목이 다시 올라옵니다.',
      },
    ],
  },
  {
    id: 'cn-iso-security-ot-2026',
    title: '스마트공장이 커질수록, 보안 인증이 따라온다',
    date: '2026.08.17',
    summary:
      '원격 관제·클라우드 MES가 늘수록 ISO 27001·ISMS 요구가 품질 인증 다음 과제로 올라옵니다. 현장에서 먼저 묻는 질문만 골랐습니다.',
    topic: '표준 · 보안',
    issue: '08월-06',
    cover: '/card-news/cn-iso-security-ot-2026.png',
    sources: [
      {
        name: 'K-Manufacturing 표준·인증',
        url: '/standards',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: '08월-06',
        title: '품질 다음엔\n보안이다',
        body: 'ISO 27001 · ISMS',
        image: '/card-news/cn-iso-security-ot-2026.png',
      },
      {
        layout: 'text',
        eyebrow: '왜 지금',
        title: 'OT와 IT가\n한 화면으로',
        body: '도면·레시피·원격 알람이\n외부망을 타기 시작했습니다.',
        metrics: [
          { label: '출발', value: '9001', tone: 'neutral' },
          { label: '다음', value: '27001', tone: 'up', arrow: 'right' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '체크',
        title: '인증 전에\n묻는 세 가지',
        body: '자산 목록 · 접근 권한 ·\n사고 시 에스컬레이션',
        image: '/card-news/slide-control-room.png',
        highlight: '문서만 있으면 감사에 통과해도 현장은 그대로입니다.',
      },
      {
        layout: 'text',
        eyebrow: '연결',
        title: '표준 안내에서\n경로 고르기',
        body: '자동차·개인정보·클라우드 연동 여부에 따라\n인증 경로가 달라집니다.',
        highlight: '사이트 표준·인증 플로우에서 바로 확인해 보세요.',
      },
    ],
  },
  {
    id: 'cn-physical-ai-data-2026',
    title: '피지컬 AI의 첫발: 정부가 공장 데이터를 모은다',
    date: '2026.08.14',
    summary:
      '과기정통부가 8월부터 경남·전북에서 현장 제조데이터 수집에 착수합니다. 피지컬 AI 범용 파운데이션 모델(범파모)의 첫 후속 조치를 정리했습니다.',
    topic: '스마트공장 · 정책',
    issue: '08월-01',
    cover: '/card-news/cn-physical-ai-gap-gg.png',
    sources: [
      {
        name: '뉴스1',
        url: 'https://www.news1.kr/it-science/internet-platform/6255855',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: '08월-01',
        title: '공장 데이터가\n먼저다',
        body: '피지컬 AI · 범파모 후속 조치',
        image: '/card-news/slide-data-panel.png',
      },
      {
        layout: 'text',
        eyebrow: '일정',
        title: '8월 넷째 주부터\n데이터 수집',
        body: '경남·전북 AX R&D 사업을 통해\n현장 제조데이터를 선제 확보',
        metrics: [
          { label: '주관', value: '과기정통부', tone: 'neutral' },
          { label: '권역', value: '경남·전북', tone: 'up', arrow: 'right' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '왜 필요한가',
        title: '피지컬 AI는\n현장 데이터가 핵심',
        body: '연구실·가상 데이터만으로는\n설비·작업·환경 변화를 충분히 담기 어려움',
        image: '/card-news/slide-control-room.png',
        highlight: '인식 → 판단 → 로봇·장비 직접 제어',
      },
      {
        layout: 'split',
        eyebrow: '규모',
        title: '지역 AX 거점\n5년 1.4조 원대',
        body: '2026~2030년 경남·전북 AX 연구개발사업\n총 약 1조 4131억 원 규모',
        image: '/card-news/slide-factory-line.png',
        metrics: [
          { label: '기간', value: '5년', tone: 'neutral' },
          { label: '규모', value: '1.4조+', tone: 'up', arrow: 'up' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '역할',
        title: '올해는 사전 작업,\n본격 확보는 내년',
        body: '기존 AX 축적 데이터를 우선 활용하고\n내년 센서·장비 구축·대규모 확보로 확장',
        bars: [
          { label: '경남', value: 50, display: '장비 데이터', tone: 'up' },
          { label: '전북', value: 40, display: '로봇 관련', tone: 'neutral' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '한 줄 정리',
        title: '모델보다 먼저\n현장 데이터',
        body: '범파모 학습의 재료를 모으는 단계가 시작됐습니다.\n중소기업 참여 인센티브도 부처 간 협의 중',
        metrics: [
          { label: '핵심', value: '데이터 선행', tone: 'up', arrow: 'right' },
        ],
      },
    ],
  },
  {
    id: 'cn-ulsan-ax-sprint-2026',
    title: '울산, 스마트공장 다음 단계: 자율제조에 71억',
    date: '2026.08.14',
    summary:
      '울산TP가 제조 AI 신속 상용화(AX-Sprint) 3개 과제에 총 71억 원을 투입합니다. 조선 용접·자동차 이상탐지·EV 배터리 유연생산을 정리했습니다.',
    topic: '스마트공장 · 지역',
    issue: '08월-02',
    cover: '/card-news/cn-ai-factory-max-2026.png',
    sources: [
      {
        name: '브릿지경제',
        url: 'https://www.viva100.com/article/20260813500744',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: '08월-02',
        title: '보이게 한 다음엔\n스스로 판단',
        body: '울산TP · 제조 AX 상용화',
        image: '/card-news/slide-welding-robot.png',
      },
      {
        layout: 'split',
        eyebrow: '규모',
        title: '3개 과제\n총 71.7억 원',
        body: '국비 50.2억 + 민간 21.5억\n조선·자동차 현장 실증',
        image: '/card-news/slide-factory-line.png',
        metrics: [
          { label: '과제', value: '3건', tone: 'neutral' },
          { label: '총액', value: '71억', tone: 'up', arrow: 'up' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '조선',
        title: '블록 용접\n자율화 실증',
        body: '레일 용접 로봇 + AI로 조건·경로를 실시간 조정\n생산성 +10%가 목표',
        metrics: [
          { label: '투입', value: '18.9억', tone: 'neutral' },
          { label: '목표', value: '+10%', tone: 'up', arrow: 'up' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '자동차',
        title: '로봇 85대\n이상탐지·최적화',
        body: '164개 공정 데이터로 고장 징후를 예측하고\n3D 시뮬레이션으로 개선 효과를 사전 검증',
        image: '/card-news/slide-control-room.png',
        metrics: [
          { label: '로봇', value: '85대', tone: 'neutral' },
          { label: '공정', value: '164', tone: 'up', arrow: 'right' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '기반',
        title: '스마트공장\n514곳이 밑바탕',
        body: '지역 등록공장의 약 15.8%\n데이터·GPU 인프라로 AI 학습 환경 확대',
        image: '/card-news/slide-data-panel.png',
        highlight: '※ 세부 과제·금액은 원문 기준',
      },
      {
        layout: 'text',
        eyebrow: '한 줄 정리',
        title: '지역 주력산업이\nAX 실증 무대',
        body: '스마트공장 보급 다음 단계는\n이상예측·공정자율·유연생산의 상용화',
        metrics: [
          { label: '방향', value: '자율제조', tone: 'up', arrow: 'right' },
        ],
      },
    ],
  },
  {
    id: 'cn-daejeon-tp-a-grade-2026',
    title: '대전TP A등급: 스마트공장 이후의 제조 AI가 점수다',
    date: '2026.08.14',
    summary:
      '전국 19개 지역 스마트제조혁신센터 평가에서 대전TP가 A등급을 받았습니다. 비전검사·시뮬레이션·예지보전 중심 지원과 KPI 성과를 요약합니다.',
    topic: '스마트공장 · 지역',
    issue: '08월-03',
    cover: '/card-news/cn-mss-ai-smartfactory-2026.png',
    sources: [
      {
        name: '뉴데일리',
        url: 'https://cc.newdaily.co.kr/site/data/html/2026/08/13/2026081300090.html',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: '08월-03',
        title: '구축 다음엔\n활용 성적',
        body: '지역 스마트제조혁신센터 성과평가',
        image: '/card-news/slide-quality-parts.png',
      },
      {
        layout: 'split',
        eyebrow: '결과',
        title: '전국 19개 센터 중\nA등급',
        body: '중기부·중기기술정보진흥원\n2025년 성과평가 우수등급',
        image: '/card-news/slide-data-panel.png',
        metrics: [
          { label: '평가 대상', value: '19곳', tone: 'neutral' },
          { label: '등급', value: 'A', tone: 'up', arrow: 'up' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '3대 모델',
        title: '비전검사·시뮬레이션\n·예지보전',
        body: '구축 후 데이터 활용이 어려운 중소기업을 위해\n품질·공정·설비 AI를 묶어 지원',
        bars: [
          { label: '비전검사', value: 90, display: '품질', tone: 'up' },
          { label: '시뮬레이션', value: 75, display: '공정', tone: 'neutral' },
          { label: '예지보전', value: 80, display: '설비', tone: 'up' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '성과',
        title: 'KPI 목표 대비\n평균 160%+',
        body: '리드타임·불량률 등 핵심지표 초과 달성\n기존 구축기업 80%+가 우수 가동·활용 유지',
        image: '/card-news/slide-factory-line.png',
        metrics: [
          { label: 'KPI', value: '160%+', tone: 'up', arrow: 'up' },
          { label: '가동·활용', value: '80%+', tone: 'up' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '다음',
        title: '모델 공유와\n맞춤 고도화',
        body: '대표 제조AI 데이터 확산,\n기업별 분석 환경·맞춤 모델로 확장',
        highlight: '※ 평가·수치는 보도 기준, 상세는 원문 확인',
      },
      {
        layout: 'text',
        eyebrow: '한 줄 정리',
        title: '도입보다\n현장 활용이 성적표',
        body: '스마트공장은 ‘설치’가 아니라\n데이터로 경쟁력을 만드는 운영이 핵심입니다',
        metrics: [
          { label: '핵심', value: '현장 활용', tone: 'up', arrow: 'right' },
        ],
      },
    ],
  },
  {
    id: 'cn-aw2026-ax-ops',
    title: 'AW 2026이 보여준 전환: 설비 개선 → 운영 혁신',
    date: '2026.08.13',
    summary:
      'Automation World 2026에서 드러난 제조 AX 흐름을 요약합니다. 참관 규모·정책 과제 수·AI 위치를 ‘운영’ 관점으로 정리했습니다.',
    topic: '스마트공장 · 전시',
    cover: '/card-news/cn-ai-factory-max-2026.png',
    sources: [
      {
        name: '헬로티',
        url: 'https://www.hellot.net/news/article.html?no=111251',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: 'Card News 01',
        title: '설비보다\n운영이\n이슈다',
        body: 'Automation World 2026 · 제조 AX',
        image: '/card-news/slide-factory-line.png',
      },
      {
        layout: 'split',
        eyebrow: '현장 규모',
        title: '역대 최대\n약 8만 명',
        body: '24개국 500개사 · 2,300부스\n전년 대비 참관객 약 +15%',
        image: '/card-news/slide-control-room.png',
        metrics: [
          { label: '참관객', value: '8만+', tone: 'up', arrow: 'up' },
          { label: '참가 기업', value: '500', tone: 'neutral' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '정책 신호',
        title: '2026 지원 과제\n약 450개',
        body: '자율형 공장·제조 AI 특화·상생형 AI 트랙으로\n스마트공장 보급을 넘어 AX·자율제조로 확장',
        bars: [
          { label: '자율형 공장', value: 30, display: '30개', tone: 'up' },
          { label: 'AI 특화 SF', value: 400, display: '400개', tone: 'up' },
          { label: '상생형 AI', value: 20, display: '20개', tone: 'neutral' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '격차',
        title: '관심은 높은데\n현장 안착은 더딤',
        body: 'OECD 추정 기준 한국 AI 도입률은 아직 제한적\n중소기업 AI 활용도 주요국 대비 낮은 편',
        image: '/card-news/slide-data-panel.png',
        metrics: [
          { label: '韓 중소 AI', value: '31%', tone: 'warn', arrow: 'down' },
          { label: '독일 중소 AI', value: '51%', tone: 'up' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '전시 메시지',
        title: 'AI는 모니터가 아니라\n운영기술(OT)',
        body: '예지보전·품질·안전·보안까지\n현장 과제를 푸는 실행 계층으로 이동',
        image: '/card-news/slide-welding-robot.png',
        highlight: '※ 세부 수치·인용은 원문에서 확인',
      },
      {
        layout: 'text',
        eyebrow: '한 줄 정리',
        title: '다음 경쟁은\n통합 운영',
        body: '단품 성능보다 센서–데이터–판단–실행–복구의\n순환 체계를 얼마나 안정적으로 돌리느냐',
        metrics: [
          { label: '핵심', value: '운영 혁신', tone: 'up', arrow: 'right' },
        ],
      },
    ],
  },
  {
    id: 'cn-ai-factory-era-2026',
    title: '2026, AI 팩토리: 보여주는 공장에서 판단하는 공장으로',
    date: '2026.08.13',
    summary:
      '스마트공장과 AI 팩토리의 차이, 현장 기대효과, 정부 500개 목표를 한 장으로 정리했습니다. 전문기업 인증이 확산의 마중물이 되는 지점도 함께 봅니다.',
    topic: '스마트공장 · 정책',
    cover: '/card-news/cn-physical-ai-gap-gg.png',
    sources: [
      {
        name: '인더스트리뉴스',
        url: 'https://www.industrynews.co.kr/news/articleView.html?idxno=77059',
      },
      {
        name: 'FA저널',
        url: 'https://www.fajournal.com/news/articleView.html?idxno=20550',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: 'Card News 02',
        title: 'AI가 제어하는\n공장의 현실',
        body: '자율제조 · AI 팩토리 2026',
        image: '/card-news/slide-control-room.png',
      },
      {
        layout: 'text',
        eyebrow: '정의',
        title: '모니터링을 넘어\n학습·판단·제안',
        body: '스마트공장: 가시화·규칙 기반 자동화\nAI 팩토리: 데이터 학습 → 예측 → 최적화·제어',
        metrics: [
          { label: 'Before', value: '보여주기', tone: 'neutral' },
          { label: 'After', value: '판단하기', tone: 'up', arrow: 'right' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '현장 기대',
        title: '무엇을 기대하나',
        body: '제조 현장 설문에서 생산·품질 향상이 1순위\n인력난 해소·자동화 확대도 주요 기대',
        image: '/card-news/slide-quality-parts.png',
        bars: [
          { label: '생산·품질', value: 65, display: '65%', tone: 'up' },
          { label: '인력·자동화', value: 40, display: '40%', tone: 'neutral' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '기반',
        title: '이미 있는\n3만 스마트공장',
        body: '중소 제조기업의 80%가 AI 필요성을 체감\n정부는 AI 팩토리 500개 구축을 목표로 제시',
        image: '/card-news/slide-factory-line.png',
        metrics: [
          { label: 'SF 기반', value: '3만+', tone: 'neutral' },
          { label: 'AI 필요 체감', value: '80%', tone: 'up', arrow: 'up' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '확산 장치',
        title: '전문기업 인증이\n마중물',
        body: '산업부 AI 팩토리 전문기업 선정으로\n공급기업 신뢰·선도사업 우대·확산 경로를 만듦',
        highlight: '품질검사·예지보전·에너지·공정예측 등 영역별 실증이 핵심',
      },
      {
        layout: 'text',
        eyebrow: '한 줄 정리',
        title: '과제는 ROI,\n해법은 검증된 적용',
        body: '초기 투자·성과 불확실성이 남아 있는 만큼\n현장 실증과 정책 지원이 같이 가야 합니다',
        metrics: [
          { label: '방향', value: '검증 확산', tone: 'up', arrow: 'right' },
        ],
      },
    ],
  },
  {
    id: 'cn-mobis-ai-sf-order-2026',
    title: '제조 AI 수주가 늘었다: 모비스 4.2억 스마트공장 계약',
    date: '2026.08.13',
    summary:
      '모비스–네오텍 AI 특화 지능형 스마트공장 구축 계약을 계기로, 민간 제조 AI 수주 확대 신호를 정리했습니다.',
    topic: '스마트공장 · 시장',
    cover: '/card-news/cn-mss-ai-smartfactory-2026.png',
    sources: [
      {
        name: '한국경제TV',
        url: 'https://www.wowtv.co.kr/NewsCenter/News/Read?articleId=202608070277L',
      },
      {
        name: 'TokenPost',
        url: 'https://www.tokenpost.kr/news/economy/386560',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: 'Card News 03',
        title: '민간 수주로\n보이는\n제조 AI',
        body: 'AI 특화 지능형 스마트공장 구축',
        image: '/card-news/slide-welding-robot.png',
      },
      {
        layout: 'split',
        eyebrow: '계약 개요',
        title: '약 4.2억 원\n단일 공급계약',
        body: '모비스 ↔ 네오텍(자동차부품)\n기간: 2026.08.10 ~ 2027.05.09',
        image: '/card-news/slide-factory-line.png',
        metrics: [
          { label: '계약액', value: '4.2억', tone: 'up', arrow: 'up' },
          { label: '매출 대비', value: '8.2%', tone: 'neutral' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '맥락',
        title: '단발보다\n수주 흐름',
        body: '7월 보그워너창녕 자율형 스마트공장용\n제조 AI 시스템 구축에 이은 연속 수주',
        metrics: [
          { label: '신호', value: '연속 수주', tone: 'up', arrow: 'right' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '누적',
        title: '2026년 들어\n공급계약 확대',
        body: '1.1~8.7 공시 기준 공급계약 3건\n합계 약 33.3억 원으로 전년 동기 대비 확대',
        image: '/card-news/slide-data-panel.png',
        metrics: [
          { label: '계약 건수', value: '3건', tone: 'neutral' },
          { label: '합계', value: '33억+', tone: 'up', arrow: 'up' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '시사점',
        title: '정책 지원 다음엔\n민간 발주',
        body: '정부 사업 참여 경험을 바탕으로\n민간 제조사 대상 AI 공장 구축이 늘고 있음',
        image: '/card-news/slide-quality-parts.png',
        highlight: '※ 계약·금액은 공시·보도 기준, 상세는 원문 확인',
      },
      {
        layout: 'text',
        eyebrow: '한 줄 정리',
        title: '제조 AI는\n‘사업’이 되고 있다',
        body: '솔루션 데모 단계를 지나\n납기·규모·반복 수주가 보이는 구간으로 진입',
        metrics: [
          { label: '핵심', value: '민간 수요', tone: 'up', arrow: 'right' },
        ],
      },
    ],
  },
  {
    id: 'cn-ai-factory-max-2026',
    title: 'AI 팩토리, 생산성 +30% · 불량 −15%의 의미',
    date: '2026.08.12',
    summary:
      '산업부가 발표한 AI 팩토리 선도 사업 성과를 요약합니다. 숫자의 맥락과 2030 목표를 함께 정리했습니다.',
    topic: '스마트공장 · 정책',
    cover: '/card-news/cn-ai-factory-max-2026.png',
    sources: [
      {
        name: '연합뉴스',
        url: 'https://www.yna.co.kr/view/AKR20260804030700003',
      },
      {
        name: '매일경제',
        url: 'https://stock.mk.co.kr/news/view/1133747',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: 'Card News',
        title: 'AI 팩토리,\n현장 숫자가\n나왔다',
        body: '스마트공장 · 제조 AI 전환 (M.AX)',
        image: '/card-news/slide-factory-line.png',
      },
      {
        layout: 'split',
        eyebrow: '핵심 지표',
        title: '현장 성과,\n숫자로 보면',
        body: '성과가 가시화된 42개 사업장 평균\n(산업통상자원부 발표 기준)',
        image: '/card-news/slide-quality-parts.png',
        metrics: [
          { label: '생산성', value: '+30.1%', tone: 'up', arrow: 'up' },
          { label: '불량률', value: '−15.5%', tone: 'down', arrow: 'down' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '규모',
        title: '지원 사업장\n약 170곳',
        body: '반도체·자동차·조선 등\n실제 제조 현장에서 AI 전환을 지원',
        image: '/card-news/slide-welding-robot.png',
        metrics: [
          { label: '선도 지원', value: '170+', tone: 'neutral', arrow: 'right' },
          { label: '성과 확인', value: '42곳', tone: 'neutral' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '비교 · 목표',
        title: '지금은 170곳,\n목표는 500곳',
        body: '2030년까지 AI 팩토리를 확대하고\n검증 모델을 중소·중견으로 확산',
        bars: [
          { label: '현재 지원', value: 170, display: '170곳', tone: 'neutral' },
          { label: '2030 목표', value: 500, display: '500곳', tone: 'up' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '현장 사례',
        title: '업종별로\n다른 개선',
        body: '부품 선별, 품질검사 시간 단축,\n용접·검사 자동화 등 공정별 성과',
        image: '/card-news/slide-data-panel.png',
        highlight: '※ 세부 수치는 원문에서 확인',
      },
      {
        layout: 'text',
        eyebrow: '한 줄 정리',
        title: '실험에서\n확산으로',
        body: '성과가 공개된 만큼,\n현장에 맞는 적용 설계가 다음 경쟁력',
        metrics: [
          { label: '방향', value: '확산', tone: 'up', arrow: 'right' },
        ],
      },
    ],
  },
  {
    id: 'cn-physical-ai-gap-gg',
    title: '데이터는 모았는데… 피지컬 AI는 아직 12.5%',
    date: '2026.08.12',
    summary:
      '경기도 스마트공장 조사로 본 DX와 피지컬 AI 격차. MES·ERP는 늘었지만 공정 제어·최적화 연결은 초기 단계입니다.',
    topic: '스마트공장 · 현장',
    cover: '/card-news/cn-physical-ai-gap-gg.png',
    sources: [
      {
        name: '머니투데이',
        url: 'https://www.mt.co.kr/policy/2026/08/06/2026080609481797339',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: 'Card News',
        title: '스마트공장이\n막히는 지점',
        body: '데이터는 쌓였는데, 현장 AI는 아직',
        image: '/card-news/slide-control-room.png',
      },
      {
        layout: 'split',
        eyebrow: '조사 개요',
        title: '경기 제조기업\n200곳',
        body: '스마트공장 기초 단계 이상 기업\n디지털 전환은 상당수 진행 중',
        image: '/card-news/slide-factory-line.png',
        metrics: [
          { label: '조사 대상', value: '200곳', tone: 'neutral' },
          { label: 'DX 추진', value: '77.5%', tone: 'up', arrow: 'up' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '비교',
        title: '시스템은 있는데\n연결은 약하다',
        body: 'MES·ERP 도입률은 높지만\n피지컬 AI 적용은 초기 단계',
        bars: [
          { label: 'MES', value: 92.9, display: '92.9%', tone: 'up' },
          { label: 'ERP', value: 79.4, display: '79.4%', tone: 'neutral' },
          { label: '피지컬 AI', value: 12.5, display: '12.5%', tone: 'warn' },
        ],
        metrics: [
          { label: '격차', value: 'MES → AI', tone: 'warn', arrow: 'down' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '핵심 격차',
        title: '데이터는 모았는데\n쓰질 못한다',
        body: '대부분 단순 인식 기능에 머무름\n공정 최적화 연결은 극소수',
        image: '/card-news/slide-data-panel.png',
        metrics: [
          { label: '피지컬 AI', value: '12.5%', tone: 'warn', arrow: 'down' },
          { label: '최적화 연결', value: '1.5%', tone: 'warn', arrow: 'down' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '장애 요인',
        title: '비용 · 호환성\n신뢰성',
        body: '초기 투자비와 설비 교체 부담이 크고\n기술 안정성·회수 기간 요구가 높음',
        bars: [
          { label: '초기 투자 부담', value: 69.7, display: '69.7%', tone: 'warn' },
          { label: '설비 교체 부담', value: 50.3, display: '50.3%', tone: 'warn' },
          { label: '기술 신뢰성 중시', value: 49.0, display: '49.0%', tone: 'neutral' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '시사점',
        title: '다음 과제는\n‘연결’',
        body: '시스템 도입을 넘어\n데이터·설비·AI를 한 흐름으로',
        image: '/card-news/slide-quality-parts.png',
        metrics: [
          { label: '다음 단계', value: '연결', tone: 'up', arrow: 'right' },
        ],
      },
    ],
  },
  {
    id: 'cn-smart-mfg-special-class-2026',
    title: '스마트제조 공급기업, 이제 ‘특수분류’로 잡힌다',
    date: '2026.07.23',
    summary:
      '중기부·국가데이터처가 국내 최초로 스마트제조기술산업 특수분류를 제정했습니다. 공급기업을 통계·정책으로 연결하는 기준을 정리했습니다.',
    topic: '스마트공장 · 정책',
    cover: '/card-news/cn-mss-ai-smartfactory-2026.png',
    sources: [
      {
        name: '연합뉴스',
        url: 'https://www.yna.co.kr/view/AKR20260723066600030',
      },
      {
        name: '머니투데이',
        url: 'https://www.mt.co.kr/economy/2026/07/23/2026072311245053305',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: 'Card News',
        title: '공급기업을\n세는 기준이\n생겼다',
        body: '스마트제조기술산업 특수분류 제정',
        image: '/card-news/slide-data-panel.png',
      },
      {
        layout: 'split',
        eyebrow: '왜 중요한가',
        title: '그동안은\n누가 공급기업인지\n애매했다',
        body: '스마트공장 핵심 제품·서비스를\n식별할 공식 산업분류가 없었던 문제를 보완',
        image: '/card-news/slide-control-room.png',
        metrics: [
          { label: '주체', value: '중기부', tone: 'neutral' },
          { label: '발표', value: '2026.07', tone: 'up', arrow: 'up' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '구성',
        title: '4대 영역으로\n나눈다',
        body: '자동화·연결화·정보화·지능화로\n스마트제조 공급 영역을 체계화',
        bars: [
          { label: '자동화기기 제조', value: 25, display: '영역 1', tone: 'neutral' },
          { label: '연결화기기 제조', value: 25, display: '영역 2', tone: 'neutral' },
          { label: '정보화 솔루션', value: 25, display: '영역 3', tone: 'up' },
          { label: '지능화 서비스', value: 25, display: '영역 4', tone: 'up' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '구조',
        title: '대·중·소\n3계층 분류',
        body: '대분류 4개 → 중분류 7개 → 소분류 34개\n통계와 정책 설계의 공통 언어가 됨',
        image: '/card-news/slide-factory-line.png',
        metrics: [
          { label: '중분류', value: '7개', tone: 'neutral' },
          { label: '소분류', value: '34개', tone: 'up', arrow: 'right' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '앞으로',
        title: '실태조사·법 개정으로\n이어진다',
        body: '정기 실태조사와 전략기술 로드맵,\n하반기 스마트제조혁신법 전면 개정 추진',
        image: '/card-news/slide-quality-parts.png',
        highlight: '※ 세부 일정·범위는 원문에서 확인',
      },
      {
        layout: 'text',
        eyebrow: '한 줄 정리',
        title: '수요기업만이 아니라\n공급기업도 제도화',
        body: '누가 무엇을 공급하는지 명확해질수록\n지원·매칭·성장 경로도 선명해집니다',
        metrics: [
          { label: '핵심', value: '특수분류', tone: 'up', arrow: 'right' },
        ],
      },
    ],
  },
]

export function getCardNewsSample(id: string) {
  return cardNewsSamples.find((item) => item.id === id)
}
