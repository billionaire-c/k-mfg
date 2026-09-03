/**
 * 제조에서 쓰는 AI — 공정·품질·예지보전 중심 요약 (파일럿 UI용).
 * 보도·정책 발표 사례. 현장 조건에 따라 효과는 달라질 수 있습니다.
 */

export type ManufacturingAiExample = {
  title: string
  /** 큰 숫자. 없으면 짧은 라벨 */
  display: string
  unit?: string
  /** 숫자가 의미하는 한 줄 */
  effect: string
  body: string
  industries: string
  source: { name: string; url: string }
}

export type ManufacturingAiCategoryId = 'process' | 'quality' | 'pdm'

export type ManufacturingAiCategory = {
  id: ManufacturingAiCategoryId
  label: string
  shortLabel: string
  effect: string
  body: string
  technologies: string[]
  where: string[]
  examples: ManufacturingAiExample[]
}

export const manufacturingAiMeta = {
  title: '제조에서 쓰는 AI',
  subtitle:
    '공장에서 AI가 붙는 자리는 크게 공정·품질·설비입니다. 흐름을 먼저 보고, 영역별로 기술과 현장 숫자를 고릅니다.',
  disclaimer:
    '보도·정책 발표 수치입니다. 업종·데이터·설비 연동에 따라 달라질 수 있으며 안내용 요약입니다.',
}

/** 센서 → 판단 → 조치 한 장 */
export const manufacturingAiFlow = {
  title: '현장에서의 한 바퀴',
  caption: '챗봇이 아니라, 라인 데이터가 판정·제어로 이어지는 구조입니다.',
  steps: [
    { id: 'sense', label: '센서 · 비전', sub: '진동·온도·카메라·PLC' },
    { id: 'data', label: '데이터', sub: 'MES · 이력 · 레시피' },
    { id: 'ai', label: 'AI 판단', sub: '최적화 · 불량 · 이상' },
    { id: 'act', label: '조치', sub: '제어 · 알람 · 판정' },
  ],
  branches: [
    { from: 'ai', label: '공정', to: '레시피·제어값' },
    { from: 'ai', label: '품질', to: '합/불 · 수율' },
    { from: 'ai', label: '설비', to: '정비 · 정지 권고' },
  ],
  source: {
    name: '산업부 M.AX 성과 보도 (뉴시스)',
    url: 'https://www.newsis.com/view/NISX20260804_0003735272',
  },
}

export const manufacturingAiCategories: ManufacturingAiCategory[] = [
  {
    id: 'process',
    label: '공정 최적화 · 자율운전',
    shortLabel: '공정',
    effect: '운전 조건을 맞추고, 레시피를 AI가 추천·제어한다',
    body: '온도·압력·속도·배합을 읽어 목표(수율·에너지·두께)에 맞게 제어값을 제안하거나 PLC까지 연결합니다.',
    technologies: [
      '시계열·다변량 / 강화학습 최적 제어',
      '디지털트윈 · AI 에이전트(권고→제어)',
      'MES·PLC 실시간 추론(엣지/클라우드)',
      '숙련공 운전 패턴 학습',
    ],
    where: [
      '시멘트·정유·철강 가열로',
      '식품 증숙·유탕·롤러',
      '반도체 에피택시',
      '이차전지 모듈·팩 라인',
    ],
    examples: [
      {
        title: '팔도 나주 · 라면 자율제조',
        display: 'PLC',
        effect: '분석이 설비 제어까지 이어진다',
        body: '증숙·유탕·면대 두께·중량 최적화와 이상탐지를 AI가 보고 PLC로 연결.',
        industries: '식품',
        source: {
          name: 'ZDNet — 엠아이큐브솔루션·팔도',
          url: 'https://zdnet.co.kr/view/?no=20260819140908',
        },
      },
      {
        title: '인이지 · 장치산업 자율운전',
        display: '1,167',
        unit: '만 t',
        effect: '공정 데이터로 AI 공장장을 학습',
        body: '시멘트·정유·철강 연속공정에서 이상·원인·제어값 추천을 한 에이전트 흐름으로.',
        industries: '철강 · 정유 · 시멘트',
        source: {
          name: '서울경제 — AI 공장 자율운전',
          url: 'https://www.sedaily.com/article/20074857',
        },
      },
      {
        title: '아이브이웍스 · 에피택시',
        display: '양산',
        effect: '성장 상태를 보고 조건을 자동 조정',
        body: 'RHEED·장비 데이터로 성장 예측·스케줄링. 양산 라인 적용 후 자율공정으로 고도화.',
        industries: '화합물 반도체',
        source: {
          name: '헬로티 — 아이브이웍스 자율공정',
          url: 'https://www.hellot.net/mobile/article.html?no=114694',
        },
      },
    ],
  },
  {
    id: 'quality',
    label: '품질 · 비전검사 · 수율',
    shortLabel: '품질',
    effect: '보고 판정하는 일을 AI가 보강해 불량을 가려낸다',
    body: '외관·치수·용접·웨이퍼 결함에 딥러닝 비전이 붙습니다. 검사 시간과 치명 결함 선별이 핵심입니다.',
    technologies: [
      '딥러닝 비전(분류·세그멘테이션)',
      '광학·X-ray·열화상',
      '오토라벨링 · SEM 리뷰 연동',
      '수율 예측 · 원인 역추적',
    ],
    where: [
      '디스플레이 패널 검사',
      '반도체 CMP·웨이퍼',
      '배터리·자동차 부품',
      '조선 용접·실린더',
    ],
    examples: [
      {
        title: '아산성우하이텍 · 배터리 검사',
        display: '−90',
        unit: '%',
        effect: '품질검사 시간이 줄었다',
        body: '전기차 배터리 무인 자율제조 시스템 도입(산업부 M.AX 성과).',
        industries: '배터리',
        source: {
          name: '뉴시스 — 산업부 M.AX 성과',
          url: 'https://www.newsis.com/view/NISX20260804_0003735272',
        },
      },
      {
        title: 'M.AX 조기 성과 · 불량률',
        display: '−15.5',
        unit: '%',
        effect: '지원 사업장 평균 불량이 줄었다',
        body: '조기 성과 42곳 점검. 같은 그룹 생산성 +30.1%.',
        industries: '반도체 · 자동차 · 조선',
        source: {
          name: '뉴시스 — 산업부 M.AX 성과',
          url: 'https://www.newsis.com/view/NISX20260804_0003735272',
        },
      },
      {
        title: 'HD현대삼호 · 용접·검사',
        display: '+50',
        unit: '%',
        effect: '용접·생산 생산성이 올랐다',
        body: '러더트렁크 공정에 AI 자율용접·검사 적용(산업부 성과 인용).',
        industries: '조선',
        source: {
          name: '천지일보 — M.AX 현장 성과',
          url: 'https://www.newscj.com/news/articleView.html?idxno=3422302',
        },
      },
    ],
  },
  {
    id: 'pdm',
    label: '예지보전 · 이상감지',
    shortLabel: '설비',
    effect: '고장 전에 징후를 잡고, 이상을 먼저 알린다',
    body: '진동·전류·온도에서 평소와 다른 패턴을 찾아 정비 시점을 앞당깁니다. 모델 개발·재학습을 빠르게 돌리는 사례가 늘고 있습니다.',
    technologies: [
      '시계열 이상탐지(비지도·준지도)',
      '남은수명(RUL) · 고장 모드',
      '엣지 NPU · 클라우드 재학습',
      '센서 통합 + MES 알람 연동',
    ],
    where: [
      '제철소 회전기·압연',
      '배터리 케이스 프레스',
      '정밀 제조 설비',
      '연속 공정 이상 감시',
    ],
    examples: [
      {
        title: '포스코 광양 · InnoPIMS',
        display: '2주→2일',
        effect: '이상예지 모델 개발이 짧아졌다',
        body: 'AWS AI 에이전트로 코딩 없이 모델 구축. 개발 시간 약 80% 단축 공개.',
        industries: '철강',
        source: {
          name: '포스코 뉴스룸 — InnoPIMS',
          url: 'https://newsroom.posco.com/kr/%ed%8f%ac%ec%8a%a4%ec%bd%94-%ea%b4%91%ec%96%91%ec%a0%9c%ec%b2%a0%ec%86%8c-ai-%ed%99%9c%ec%9a%a9-%ec%9d%b4%ec%83%81%ec%98%88%ec%a7%80-%ec%8b%9c%ec%8a%a4%ed%85%9c-innopims-%ec%84%a0%eb%b3%b4/',
        },
      },
      {
        title: '화신 · 배터리 케이스',
        display: '−20',
        unit: '%',
        effect: '예지보전 후 불량률이 줄었다',
        body: '생산설비 예지보전 도입(산업부 M.AX 성과). 설비 안정 → 품질.',
        industries: '자동차 · 배터리 부품',
        source: {
          name: '뉴시스 — 산업부 M.AX 성과',
          url: 'https://www.newsis.com/view/NISX20260804_0003735272',
        },
      },
      {
        title: '원포유 · 이상탐지+예지보전',
        display: '1',
        unit: '플랫폼',
        effect: '공정 이상과 설비 징후를 같이 본다',
        body: '진동·전류·온도·소음 이종 센서를 한곳에서. 반도체·배터리·정밀부품 대상.',
        industries: '정밀 제조',
        source: {
          name: '전자신문 — 원포유 통합솔루션',
          url: 'https://www.etnews.com/20260810000478',
        },
      },
    ],
  },
]

export const manufacturingAiAlso = {
  headline: '그 밖의 자리',
  body: '설계·스케줄·물류·로봇에도 AI가 붙습니다. 현장에서는 공정·품질·보전 데이터와 연결될 때 효과가 납니다.',
  sources: [
    {
      name: '전자신문 — 마키나락스',
      url: 'https://www.etnews.com/20260903000226',
    },
    {
      name: '이데일리 — 삼성전자 에이전틱 AI',
      url: 'https://www.edaily.co.kr/News/Read?mediaCodeNo=257&newsId=04657606645384632',
    },
  ],
}

export const manufacturingAiLinks = [
  { to: '/smart-factory-numbers', label: '숫자로 보는 스마트공장' },
  { to: '/roadmap', label: '구축 로드맵' },
  { to: '/cases', label: '사례' },
  { to: '/policy', label: '지원사업' },
]
