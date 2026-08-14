export type FieldNoteBlock =
  | { type: 'p'; text: string }
  | { type: 'image'; src: string; caption?: string }

export type FieldNoteSample = {
  id: string
  title: string
  date: string
  tags: string[]
  summary: string
  /** 목록 왼쪽 썸네일 */
  cover: string
  /** 본문 블록. 문단·이미지 교차 (그림일기형) */
  body: FieldNoteBlock[]
  takeaway: string
  related?: { label: string; to: string }[]
}

/**
 * 현장 노트 — 최신 글이 배열 앞쪽.
 * 본문 강조: **볼드** · ==핵심== · ``용어``
 */
export const fieldNoteSamples: FieldNoteSample[] = [
  {
    id: 'fn-data-unused-2026',
    title: '스마트공장을 만들었는데, 데이터는 왜 안 쓰일까',
    date: '2026.08.14',
    tags: ['현장', '데이터', '스마트공장'],
    summary:
      '구축은 끝났는데 데이터로 바꾼 행동이 없다면, 가시화 다음 단계—해석과 습관—가 빠진 것일 수 있습니다.',
    cover: '/field-notes/fn-data-unused-panel-sketch.jpg',
    body: [
      {
        type: 'p',
        text: '전시장이나 지원사업 설명회에 가면 **“구축 완료”** 사례가 자주 나옵니다. 대시보드도 있고, 센서도 붙어 있고, ``MES`` 화면도 깔끔합니다. 그런데 현장 관리자에게 “그럼 그 데이터로 지난주에 뭘 바꿨나요?”라고 물으면, 잠깐 멈추는 경우가 많습니다.',
      },
      {
        type: 'image',
        src: '/field-notes/fn-data-unused-control-sketch.jpg',
        caption: '화면은 켜져 있지만, 다음 행동이 비어 있는 관제실이 생각보다 많다.',
      },
      {
        type: 'p',
        text: '제가 본 중소 공장 몇 곳에서는 공통 패턴이 있었습니다. 데이터는 쌓이는데, ==누가·언제·무엇을 보고 결정하는지==가 정해져 있지 않았습니다. 시스템은 **‘보여주는 도구’**가 되었고, 의사결정은 여전히 경험과 긴급 이슈에 끌려갔습니다.',
      },
      {
        type: 'image',
        src: '/field-notes/fn-data-unused-panel-sketch.jpg',
        caption: '쌓인 숫자보다 중요한 건, 그 숫자를 열어보는 습관이다.',
      },
      {
        type: 'p',
        text: '스마트공장이 실패한 게 아닙니다. ==가시화 다음 단계—해석과 습관—==가 빠진 것에 가깝습니다. ``AI 팩토리`` 이야기 전에, **“이상 알람이 뜨면 누가 30분 안에 확인하는가”** 같은 작은 운영 규칙이 먼저일 수 있습니다.',
      },
    ],
    takeaway:
      '==데이터==는 모아두는 순간이 아니라, **현장의 다음 행동**을 바꿀 때 비로소 자산이 됩니다.',
    related: [
      { label: '용어 · 스마트공장', to: '/glossary' },
      { label: '지원사업 보기', to: '/policy' },
    ],
  },
  {
    id: 'fn-ops-over-equipment-2026',
    title: '전시장에서 느낀 것: 설비보다 운영이 이슈다',
    date: '2026.08.13',
    tags: ['전시', '운영', 'AX'],
    summary:
      '새 로봇·센서 데모는 화려하지만, 관람객이 더 오래 머문 곳은 “어떻게 돌릴 것인가”를 묻는 부스였습니다.',
    cover: '/field-notes/fn-ops-welding-sketch.jpg',
    body: [
      {
        type: 'p',
        text: '자동화 전시회에 가면 가장 먼저 눈에 들어오는 건 ==용접 로봇==과 비전 검사기입니다. 스파크가 튀고, 불량이 빨간 박스로 잡히는 영상은 확실히 시선을 끕니다.',
      },
      {
        type: 'image',
        src: '/field-notes/fn-ops-welding-sketch.jpg',
        caption: '데모 라인의 로봇은 ‘가능성’을 보여 준다. 현장은 ‘지속성’을 묻는다.',
      },
      {
        type: 'p',
        text: '그런데 사람들이 노트에 적어 가는 질문은 조금 달랐습니다. **“우리 라인에 넣으면 누가 레시피를 관리하죠?”**, **“알람이 하루에 200개면 어쩌죠?”** 설비 스펙보다 ==운영 설계==가 병목이었습니다.',
      },
      {
        type: 'image',
        src: '/field-notes/fn-ops-line-sketch.jpg',
        caption: '라인은 장비의 합이 아니라, 사람과 규칙이 붙는 시스템이다.',
      },
      {
        type: 'p',
        text: '``M.AX``·``AI 팩토리`` 키워드가 커질수록, 반대로 기본기가 선명해집니다. ==예지보전==도, 품질 AI도, 결국 **누가 결과를 책임지고 다음 교대에 넘기느냐**로 귀결됩니다.',
      },
    ],
    takeaway:
      '다음 경쟁은 **더 비싼 설비**가 아니라, ==설비를 안정적으로 돌리는 운영==에 있습니다.',
    related: [
      { label: '카드뉴스 · 운영 혁신', to: '/card-news' },
      { label: '용어 · 예지보전', to: '/glossary' },
    ],
  },
  {
    id: 'fn-pdm-poc-stuck-2026',
    title: '예지보전 PoC가 막히는 지점은 센서가 아니었다',
    date: '2026.08.12',
    tags: ['예지보전', 'PoC', '설비'],
    summary:
      '진동 센서는 달렸는데 모델이 안 믿는 이유—라벨·책임·조치 경로가 비어 있었습니다.',
    cover: '/field-notes/fn-pdm-parts-sketch.jpg',
    body: [
      {
        type: 'p',
        text: '``예지보전`` PoC 킥오프는 늘 비슷합니다. **“고장 전에 알려 주세요.”** 센서 위치도 정하고, 대시보드 목업도 나옵니다. 분위기는 좋습니다.',
      },
      {
        type: 'image',
        src: '/field-notes/fn-pdm-parts-sketch.jpg',
        caption: '부품과 설비는 말없이 신호를 낸다. 문제는 그 신호를 해석할 합의다.',
      },
      {
        type: 'p',
        text: '막히는 지점은 보통 세 달 뒤에 옵니다. ==정답 라벨(언제가 고장인가)==이 모호하고, 알람이 떠도 **누가 라인을 세울 권한**이 있는지 애매합니다. 모델 정확도 논의보다 먼저, ==조치 플레이북==이 필요했습니다.',
      },
      {
        type: 'image',
        src: '/field-notes/fn-pdm-alarm-sketch.jpg',
        caption: '빨간 점이 ‘알려 주는 것’과 ‘멈춰도 되는 것’은 다른 문제다.',
      },
      {
        type: 'p',
        text: '그래서 요즘은 PoC 첫 주에 기술보다 **운영 질문**을 적습니다. “알람 등급은 몇 단계?”, “야간 교대는 누구에게 에스컬레이션?”, “오탐이 나와도 계속 볼 사람은 누구?” ==기술은 규칙을 증폭==할 뿐입니다.',
      },
    ],
    takeaway:
      '예지보전은 **센서 프로젝트**가 아니라, ==이상 신호→현장 조치==를 닫는 운영 프로젝트입니다.',
    related: [
      { label: '용어 · 예지보전', to: '/glossary' },
      { label: '지원사업 보기', to: '/policy' },
    ],
  },
  {
    id: 'fn-sme-before-ai-2026',
    title: '중소 공장에 AI보다 먼저 필요한 세 가지',
    date: '2026.08.11',
    tags: ['중소기업', '기초', '스마트공장'],
    summary:
      '화려한 데모 전에 표준작업·기준정보·책임자가 서 있어야, AI도 자리를 잡습니다.',
    cover: '/card-news/cn-mss-ai-smartfactory-2026.png',
    body: [
      {
        type: 'p',
        text: '상담 요청 중 절반은 **“AI로 불량을 잡고 싶다”**로 시작합니다. 의도는 분명합니다. 다만 현장을 보면 ``SOP``가 사람마다 다르고, 품번·설비가 시스템에 제각각인 경우가 많습니다.',
      },
      {
        type: 'image',
        src: '/card-news/slide-factory-line.png',
        caption: '같은 라인이라도, 작업자마다 ‘맞는 순서’가 다르면 학습 데이터는 흔들린다.',
      },
      {
        type: 'p',
        text: '제가 먼저 권하는 건 세 가지입니다. ==① 표준작업(한 페이지라도)==, ==② 기준정보(품번·설비 ID)==, ==③ 데이터 주인(누가 이상치를 닫나)==. 멋지지 않지만, 이게 없으면 모델은 **평균적인 혼란**을 배웁니다.',
      },
      {
        type: 'image',
        src: '/card-news/cn-mss-ai-smartfactory-2026.png',
        caption: '지원사업도 ‘고도화’ 전에 ‘기초 체력’ 구간을 함께 설계해야 한다.',
      },
      {
        type: 'p',
        text: '``스마트공장`` 지원이 AI 특화로 넘어가는 흐름은 맞습니다. 다만 현장 언어로 번역하면 **기초가 단단한 공장일수록 AI ROI가 빨리 보입니다.** 순서를 뒤집으면 PoC만 쌓입니다.',
      },
    ],
    takeaway:
      'AI 도입의 출발점은 알고리즘이 아니라, ==반복 가능한 현장 규칙==입니다.',
    related: [
      { label: '지원사업 보기', to: '/policy' },
      { label: '용어 · SOP', to: '/glossary' },
    ],
  },
  {
    id: 'fn-ot-it-handshake-2026',
    title: 'OT와 IT가 악수하려면, 회의실이 아니라 현장 한 점이 필요하다',
    date: '2026.08.10',
    tags: ['OT', 'IT', '연동'],
    summary:
      '부서 미팅으로는 연결이 안 됩니다. 설비 한 대, 태그 한 줄, 화면 한 장부터 같이 만져야 합니다.',
    cover: '/card-news/slide-control-room.png',
    body: [
      {
        type: 'p',
        text: '``OT`` 팀은 가동을, ``IT`` 팀은 시스템을 책임집니다. 둘 다 옳습니다. 그런데 **“데이터 연동”** 프로젝트만 열리면, 책임 경계에서 공이 멈추기 쉽습니다.',
      },
      {
        type: 'image',
        src: '/card-news/slide-control-room.png',
        caption: '관제 화면과 ERP 화면은 같은 공장을 보지만, 같은 언어를 쓰지 않을 때가 많다.',
      },
      {
        type: 'p',
        text: '최근에 잘 풀린 사례는 거창하지 않았습니다. ==라인 1번의 온도 태그 하나==를 ``MES`` 화면에 올리고, 교대 일지에 **임계치 초과 시 조치**를 한 줄 적었습니다. 회의 자료 대신 **현장의 작은 성공**이 신뢰를 만들었습니다.',
      },
      {
        type: 'image',
        src: '/card-news/cn-physical-ai-gap-gg.png',
        caption: '피지컬 AI·디지털트윈 이야기도, 결국 ‘한 점의 연결’이 쌓여야 커진다.',
      },
      {
        type: 'p',
        text: '큰 로드맵은 필요합니다. 다만 실행은 ==작게, 같이, 현장에서==가 맞습니다. OT/IT 악수는 PPT가 아니라 **공유된 태그 이름**에서 시작됩니다.',
      },
    ],
    takeaway:
      '연동의 단위는 전사 프로젝트가 아니라, ==함께 소유한 현장 한 점==입니다.',
    related: [
      { label: '용어 · OT/IT', to: '/glossary' },
      { label: '공급기업 지도', to: '/map' },
    ],
  },
]

export function getFieldNoteSample(id: string) {
  return fieldNoteSamples.find((item) => item.id === id)
}
