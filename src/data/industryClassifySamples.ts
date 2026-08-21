export const industryClassifyMeta = {
  title: '제조업 구분',
  subtitle:
    '통계·지원사업에서 쓰는 한국표준산업분류(KSIC)와, 공정 관점의 뿌리산업 분류를 한곳에서 봅니다.',
  ksicAsOf: '제11차 개정 · 2024.7.1. 시행',
  rootAsOf: '뿌리산업진흥법·시행령 기준 14대 뿌리기술',
}

/** KSIC 11차 — 대분류 C 제조업 중분류(10~34). 명칭은 통계청 표준분류 해설 기준. */
export type KsicMid = {
  code: string
  name: string
  blurb: string
}

export const ksicManufacturingMids: KsicMid[] = [
  { code: '10', name: '식료품 제조업', blurb: '식품 가공·제조' },
  { code: '11', name: '음료 제조업', blurb: '알코올·비알코올 음료' },
  { code: '12', name: '담배 제조업', blurb: '담배 제품' },
  {
    code: '13',
    name: '섬유제품 제조업; 의복 제외',
    blurb: '원사·직물·섬유제품',
  },
  {
    code: '14',
    name: '의복, 의복액세서리 및 모피제품 제조업',
    blurb: '의류·액세서리',
  },
  {
    code: '15',
    name: '가죽, 가방 및 신발 제조업',
    blurb: '가죽·신발 등',
  },
  {
    code: '16',
    name: '목재 및 나무제품 제조업; 가구 제외',
    blurb: '목재 가공',
  },
  {
    code: '17',
    name: '펄프, 종이 및 종이제품 제조업',
    blurb: '펄프·지류',
  },
  { code: '18', name: '인쇄 및 기록매체 복제업', blurb: '인쇄·복제' },
  {
    code: '19',
    name: '코크스, 연탄 및 석유정제품 제조업',
    blurb: '석유·석탄 제품',
  },
  {
    code: '20',
    name: '화학물질 및 화학제품 제조업; 의약품 제외',
    blurb: '화학·소재',
  },
  {
    code: '21',
    name: '의료용 물질 및 의약품 제조업',
    blurb: '의약품·바이오',
  },
  {
    code: '22',
    name: '고무제품 및 플라스틱제품 제조업',
    blurb: '고무·플라스틱',
  },
  {
    code: '23',
    name: '비금속 광물제품 제조업',
    blurb: '유리·시멘트·요업 등',
  },
  { code: '24', name: '1차 금속 제조업', blurb: '철강·비철금속' },
  {
    code: '25',
    name: '금속가공제품 제조업; 기계 및 가구 제외',
    blurb: '금속 가공·부품',
  },
  {
    code: '26',
    name: '전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업',
    blurb: '반도체·전자·통신',
  },
  {
    code: '27',
    name: '의료, 정밀, 광학기기 및 시계 제조업',
    blurb: '정밀·광학',
  },
  { code: '28', name: '전기장비 제조업', blurb: '전기기기·전지 등' },
  {
    code: '29',
    name: '기타 기계 및 장비 제조업',
    blurb: '일반·특수 기계',
  },
  {
    code: '30',
    name: '자동차 및 트레일러 제조업',
    blurb: '완성차·부품',
  },
  {
    code: '31',
    name: '기타 운송장비 제조업',
    blurb: '조선·항공·철도 등',
  },
  { code: '32', name: '가구 제조업', blurb: '가구' },
  { code: '33', name: '기타 제품 제조업', blurb: '기타 제조' },
  {
    code: '34',
    name: '산업용 기계 및 장비 수리업',
    blurb: '산업기계 수리',
  },
]

export type RootTech = {
  id: string
  name: string
  blurb: string
}

export type RootTechGroup = {
  id: string
  title: string
  description: string
  items: RootTech[]
}

/** 뿌리산업 14대 기술 — KPIC·뿌리산업진흥법 체계 */
export const rootTechGroups: RootTechGroup[] = [
  {
    id: 'base',
    title: '기반공정기술',
    description:
      '금속·부품 제조의 전통적 핵심 공정. 자동차·기계·전자 등 최종제품 품질을 좌우합니다.',
    items: [
      {
        id: 'casting',
        name: '주조',
        blurb: '용융 금속을 틀에 넣어 형상을 만드는 공정',
      },
      {
        id: 'mold',
        name: '금형',
        blurb: '사출·프레스 등으로 동일 형상을 반복 생산하는 틀',
      },
      {
        id: 'forming',
        name: '소성가공',
        blurb: '단조·압연·압출 등 압력으로 형태를 바꾸는 공정',
      },
      {
        id: 'welding',
        name: '용접',
        blurb: '금속·부품을 접합해 구조를 만드는 공정',
      },
      {
        id: 'surface',
        name: '표면처리',
        blurb: '도금·도장·증착 등으로 내식·외관·기능을 부여',
      },
      {
        id: 'heat',
        name: '열처리',
        blurb: '가열·냉각으로 금속 조직과 강도를 조절',
      },
    ],
  },
  {
    id: 'material',
    title: '소재다원화 공정기술',
    description:
      '금속을 넘어 플라스틱·복합재·적층제조 등으로 공정 범위를 넓힌 차세대 영역입니다.',
    items: [
      {
        id: 'injection',
        name: '사출·프레스',
        blurb: '플라스틱·판재 등을 성형하는 공정',
      },
      {
        id: 'additive',
        name: '적층제조',
        blurb: '3D 프린팅 등 적층 방식의 제조',
      },
      {
        id: 'precision',
        name: '정밀가공',
        blurb: '고정밀 절삭·가공으로 형상을 만드는 공정',
      },
      {
        id: 'film',
        name: '산업용 필름 및 지류공정',
        blurb: '필름·지류 기반의 산업 공정',
      },
    ],
  },
  {
    id: 'smart',
    title: '지능화 공정기술',
    description:
      '로봇·센서·산업 SW·설계로 공정을 자동화·지능화하는 영역입니다. 스마트공장·AX와도 맞닿아 있습니다.',
    items: [
      {
        id: 'robot',
        name: '로봇',
        blurb: '제조·물류 등 현장 자동화 로봇',
      },
      {
        id: 'sensor',
        name: '센서',
        blurb: '공정·품질·안전 데이터를 수집하는 감지 기술',
      },
      {
        id: 'sw',
        name: '산업지능형 소프트웨어',
        blurb: '공정·품질·운영을 다루는 산업용 SW·AI',
      },
      {
        id: 'eng',
        name: '엔지니어링 설계',
        blurb: '제품·공정 설계 및 엔지니어링',
      },
    ],
  },
]

export const rootIndustryIntro = {
  headline: '뿌리산업이란?',
  paragraphs: [
    '뿌리산업은 나무의 뿌리처럼 겉으로 잘 드러나지 않으면서도, 자동차·반도체·기계·전자 등 주력 제조업의 품질과 경쟁력을 받치는 기반·핵심 공정 산업입니다.',
    '주조·금형·용접 같은 전통 공정뿐 아니라, 적층제조·로봇·산업지능형 SW 등 차세대 공정까지 법령으로 묶어 “14대 뿌리기술”로 정의합니다. 소재와 부품, 부품과 완제품 사이의 중간 공정을 담당하는 기업이 여기에 해당합니다.',
    '지원사업·확인서·전문기업 지정 등은 국가뿌리산업진흥센터(KPIC)와 산업통상자원부 체계를 통해 이뤄집니다. KSIC(업종 코드)와는 축이 다릅니다. KSIC는 “무엇을 만드는지”, 뿌리산업은 “어떤 공정·기술로 기여하는지”에 가깝습니다.',
  ],
  lawTitle: '관련 법령·제도',
  laws: [
    {
      name: '뿌리산업 진흥과 첨단화에 관한 법률',
      note: '뿌리산업·뿌리기술의 정의, 진흥 기본계획, 확인서·전문기업 등 제도의 상위법',
      url: 'https://www.law.go.kr/법령/뿌리산업진흥과첨단화에관한법률',
    },
    {
      name: '같은 법 시행령',
      note: '뿌리기술의 범위(별표) 등 세부 기준. 기반·소재다원화·지능화 공정으로 14대 기술을 구체화',
      url: 'https://www.law.go.kr/법령/뿌리산업진흥과첨단화에관한법률시행령',
    },
    {
      name: '국가뿌리산업진흥센터(KPIC)',
      note: '확인서·전문기업·지원사업·실태조사 등 현장 창구',
      url: 'https://www.kpic.re.kr/html/?pmode=main',
    },
  ],
}

export const ksicIntro = {
  headline: '한국표준산업분류(KSIC) 제11차',
  paragraphs: [
    '한국표준산업분류는 통계법 제22조에 따라 통계청이 고시하는 국가 표준입니다. 사업자등록·통계·정책 지원에서 “업종”을 말할 때 가장 많이 쓰입니다.',
    '제11차 개정은 2024년 7월 1일부터 시행되었습니다. 제조업은 대분류 C이며, 중분류 코드 10~34가 해당합니다. 아래는 제조업 중분류 목록입니다. 세세분류까지는 통계분류포털에서 확인할 수 있습니다.',
  ],
  links: [
    {
      name: '통계분류포털 (KSIC)',
      url: 'https://kssc.kostat.go.kr',
    },
    {
      name: '제11차 개정 고시 안내 (국가데이터처)',
      url: 'https://mods.go.kr/board.es?act=view&bid=107&list_no=428660&mid=a10403040000',
    },
  ],
}
