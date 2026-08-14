export type GlossarySample = {
  id: string
  term: string
  termKo: string
  summary: string
  tags: string[]
}

/**
 * 용어·해설 — 가나다/ABC 색인은 페이지에서 처리.
 * 추가 시 기존 항목은 유지하고 배열에 push.
 */
export const glossarySamples: GlossarySample[] = [
  {
    id: 'gl-aas',
    term: 'AAS',
    termKo: '자산관리 쉘',
    summary:
      'Asset Administration Shell. 설비·자산을 디지털로 표현하는 표준 정보 모델입니다. 자율형공장·상호운용 논의에서 자주 등장합니다.',
    tags: ['데이터', '시스템'],
  },
  {
    id: 'gl-agv',
    term: 'AGV',
    termKo: '무인운반차',
    summary:
      'Automated Guided Vehicle. 정해진 경로를 따라 자재를 옮기는 무인 운반 장비입니다. 공장 내 물류 자동화의 기본 수단입니다.',
    tags: ['물류', '설비제어'],
  },
  {
    id: 'gl-ai-factory',
    term: 'AI Factory',
    termKo: 'AI 팩토리',
    summary:
      '데이터를 학습해 공정을 예측·최적화하고, 품질·설비·에너지 판단까지 돕는 공장입니다. 단순 모니터링을 넘어 “판단하는 공장”에 가깝습니다.',
    tags: ['개념', 'AI'],
  },
  {
    id: 'gl-amr',
    term: 'AMR',
    termKo: '자율이동로봇',
    summary:
      'Autonomous Mobile Robot. 센서·지도로 경로를 스스로 잡아 이동하는 로봇입니다. AGV보다 유연한 물류에 쓰입니다.',
    tags: ['물류', 'AI'],
  },
  {
    id: 'gl-anomaly-detection',
    term: 'Anomaly Detection',
    termKo: '이상탐지',
    summary:
      '정상 패턴에서 벗어난 신호·이미지를 찾아내는 기법입니다. 설비 고장 징후나 불량 검출에 많이 쓰입니다.',
    tags: ['AI', '품질'],
  },
  {
    id: 'gl-aoi',
    term: 'AOI',
    termKo: '자동광학검사',
    summary:
      'Automated Optical Inspection. 카메라로 부품·기판 외관을 자동 검사하는 방식입니다. 전자·반도체 품질관리의 핵심입니다.',
    tags: ['품질', '설비제어'],
  },
  {
    id: 'gl-apc',
    term: 'APC',
    termKo: '고도공정제어',
    summary:
      'Advanced Process Control. 공정 변수를 모델 기반으로 제어해 수율·안정성을 높이는 기술입니다. 화학·반도체 공정에서 흔합니다.',
    tags: ['설비제어', '데이터'],
  },
  {
    id: 'gl-aps',
    term: 'APS',
    termKo: '고도계획스케줄링',
    summary:
      'Advanced Planning and Scheduling. 수요·설비·자재를 고려해 생산 계획을 최적화하는 시스템입니다. ERP·MES와 연계됩니다.',
    tags: ['시스템', '데이터'],
  },
  {
    id: 'gl-ar-vr',
    term: 'AR / VR',
    termKo: '증강현실 / 가상현실',
    summary:
      'AR은 현실에 정보를 겹쳐 보여주고, VR은 가상 공간을 체험하게 합니다. 교육·유지보수·원격지원에 활용됩니다.',
    tags: ['개념'],
  },
  {
    id: 'gl-asrs',
    term: 'AS/RS',
    termKo: '자동창고시스템',
    summary:
      'Automated Storage and Retrieval System. 물건을 자동으로 입고·출고하는 입체 창고입니다. 물류·부품 보관에 쓰입니다.',
    tags: ['물류', '시스템'],
  },
  {
    id: 'gl-ax',
    term: 'AX',
    termKo: 'AI 전환',
    summary:
      'AI Transformation. 업무·공정에 AI를 도입해 일하는 방식을 바꾸는 전환을 말합니다. 제조 분야에서는 M.AX와 함께 쓰입니다.',
    tags: ['개념', 'AI'],
  },
  {
    id: 'gl-bom',
    term: 'BOM',
    termKo: '자재명세서',
    summary:
      'Bill of Materials. 제품에 들어가는 부품·자재 구성표입니다. 생산·구매·원가 관리의 기본 데이터입니다.',
    tags: ['데이터', '시스템'],
  },
  {
    id: 'gl-brownfield',
    term: 'Brownfield',
    termKo: '기존공장 고도화',
    summary:
      '이미 가동 중인 공장을 리모델링·디지털화하는 접근입니다. 신규 공장(그린필드)보다 제약과 연동 이슈가 큽니다.',
    tags: ['개념'],
  },
  {
    id: 'gl-capa',
    term: 'CAPA',
    termKo: '시정·예방조치',
    summary:
      'Corrective and Preventive Action. 불량·일탈의 원인을 바로잡고 재발을 막는 품질 절차입니다.',
    tags: ['품질'],
  },
  {
    id: 'gl-cim',
    term: 'CIM',
    termKo: '컴퓨터통합제조',
    summary:
      'Computer Integrated Manufacturing. 설계·생산·물류를 컴퓨터로 통합 관리하는 개념입니다. 스마트공장의 전신 격입니다.',
    tags: ['개념', '시스템'],
  },
  {
    id: 'gl-cmms',
    term: 'CMMS',
    termKo: '설비보전관리시스템',
    summary:
      'Computerized Maintenance Management System. 정비 이력·부품·작업지시를 관리하는 시스템입니다.',
    tags: ['시스템', '설비제어'],
  },
  {
    id: 'gl-cnc',
    term: 'CNC',
    termKo: '컴퓨터수치제어',
    summary:
      'Computer Numerical Control. 수치 프로그램으로 공작기계를 제어하는 방식입니다. 정밀 가공의 기본입니다.',
    tags: ['설비제어'],
  },
  {
    id: 'gl-cobot',
    term: 'Cobot',
    termKo: '협동로봇',
    summary:
      'Collaborative Robot. 사람과 같은 공간에서 안전하게 작업하도록 설계된 로봇입니다. 중소 현장 자동화에 많이 도입됩니다.',
    tags: ['설비제어'],
  },
  {
    id: 'gl-cps',
    term: 'CPS',
    termKo: '사이버물리시스템',
    summary:
      'Cyber-Physical System. 물리 세계와 디지털 제어·통신이 결합된 시스템입니다. 스마트공장의 이론적 기반입니다.',
    tags: ['개념'],
  },
  {
    id: 'gl-cycle-time',
    term: 'Cycle Time',
    termKo: '사이클타임',
    summary:
      '한 제품을 만드는 데 걸리는 공정 반복 시간입니다. 생산능력·병목 분석의 핵심 지표입니다.',
    tags: ['데이터', '품질'],
  },
  {
    id: 'gl-dashboard',
    term: 'Dashboard',
    termKo: '대시보드',
    summary:
      '생산·품질·설비 지표를 한눈에 보여주는 화면입니다. 현장·경영이 같은 숫자로 소통하게 돕습니다.',
    tags: ['데이터', '시스템'],
  },
  {
    id: 'gl-data-lake',
    term: 'Data Lake',
    termKo: '데이터 레이크',
    summary:
      '원본 형태에 가깝게 대용량 데이터를 모아 두는 저장소입니다. 제조 로그·센서 데이터를 AI 학습에 쓰기 전에 모을 때 쓰입니다.',
    tags: ['데이터'],
  },
  {
    id: 'gl-dcm',
    term: 'DCM',
    termKo: '수요사슬관리',
    summary:
      'Demand Chain Management. 고객 수요를 기준으로 공급·생산을 맞추는 관리 관점입니다. SCM과 짝으로 이야기됩니다.',
    tags: ['개념', '물류'],
  },
  {
    id: 'gl-digital-thread',
    term: 'Digital Thread',
    termKo: '디지털 스레드',
    summary:
      '설계부터 제조·서비스까지 제품 데이터가 끊기지 않고 이어지는 흐름입니다. PLM·디지털트윈과 함께 쓰입니다.',
    tags: ['데이터', '개념'],
  },
  {
    id: 'gl-digital-twin',
    term: 'Digital Twin',
    termKo: '디지털 트윈',
    summary:
      '실제 공장·설비를 가상으로 복제해 시뮬레이션·예지·최적화를 하는 기술입니다. 가동 전에 공정 변경 효과를 검증할 때 자주 쓰입니다.',
    tags: ['개념', '데이터'],
  },
  {
    id: 'gl-dmaic',
    term: 'DMAIC',
    termKo: '정의·측정·분석·개선·관리',
    summary:
      'Six Sigma의 개선 절차입니다. Define–Measure–Analyze–Improve–Control 순으로 문제를 해결합니다.',
    tags: ['품질'],
  },
  {
    id: 'gl-downtime',
    term: 'Downtime',
    termKo: '비가동시간',
    summary:
      '설비가 계획대로 돌지 못한 시간입니다. 고장·대기·교체 등으로 나뉘며 OEE 계산에 들어갑니다.',
    tags: ['데이터', '설비제어'],
  },
  {
    id: 'gl-dt',
    term: 'DT',
    termKo: '디지털 전환',
    summary:
      'Digital Transformation. 데이터·디지털 기술로 업무와 비즈니스를 재설계하는 전환입니다. 스마트공장은 제조 DT의 대표 사례입니다.',
    tags: ['개념'],
  },
  {
    id: 'gl-edge-computing',
    term: 'Edge Computing',
    termKo: '엣지 컴퓨팅',
    summary:
      '데이터를 클라우드로 보내기 전, 현장 근처에서 바로 처리하는 방식입니다. 지연이 중요한 설비 제어·비전검사에 유리합니다.',
    tags: ['데이터', '시스템'],
  },
  {
    id: 'gl-edi',
    term: 'EDI',
    termKo: '전자문서교환',
    summary:
      'Electronic Data Interchange. 주문·납품 등 문서를 기업 간에 표준 형식으로 주고받는 방식입니다.',
    tags: ['시스템', '물류'],
  },
  {
    id: 'gl-erp',
    term: 'ERP',
    termKo: '전사자원관리',
    summary:
      'Enterprise Resource Planning. 재무·구매·재고·영업 등 전사 자원을 통합 관리하는 시스템입니다. MES의 상위 계층으로 연결됩니다.',
    tags: ['시스템'],
  },
  {
    id: 'gl-fmea',
    term: 'FMEA',
    termKo: '고장모드영향분석',
    summary:
      'Failure Mode and Effects Analysis. 잠재 고장과 영향을 미리 평가해 위험을 줄이는 품질 기법입니다.',
    tags: ['품질'],
  },
  {
    id: 'gl-fms',
    term: 'FMS',
    termKo: '유연생산시스템',
    summary:
      'Flexible Manufacturing System. 제품 변경에 빠르게 대응하도록 설비·물류를 유연하게 구성한 생산 체계입니다.',
    tags: ['개념', '설비제어'],
  },
  {
    id: 'gl-greenfield',
    term: 'Greenfield',
    termKo: '신규공장 구축',
    summary:
      '처음부터 새로 짓는 공장·시스템을 말합니다. 기존 설비 제약이 적어 이상적인 설계가 가능합니다.',
    tags: ['개념'],
  },
  {
    id: 'gl-hmi',
    term: 'HMI',
    termKo: '인간기계인터페이스',
    summary:
      'Human-Machine Interface. 작업자가 설비를 조작·감시하는 화면·패널입니다. PLC·SCADA와 함께 쓰입니다.',
    tags: ['설비제어', '시스템'],
  },
  {
    id: 'gl-iiot',
    term: 'IIoT',
    termKo: '산업용 사물인터넷',
    summary:
      'Industrial Internet of Things. 공장 설비·센서를 네트워크로 연결해 데이터를 모으는 기술입니다.',
    tags: ['데이터', '시스템'],
  },
  {
    id: 'gl-industry40',
    term: 'Industry 4.0',
    termKo: '인더스트리 4.0',
    summary:
      '사이버물리·IoT·데이터 기반의 네 번째 산업혁명을 가리키는 개념입니다. 스마트공장 정책·담론의 출발점입니다.',
    tags: ['개념'],
  },
  {
    id: 'gl-isa95',
    term: 'ISA-95',
    termKo: 'ISA-95 표준',
    summary:
      '기업 시스템(ERP)과 제조 시스템(MES/제어)의 계층·인터페이스를 정의한 국제 표준입니다.',
    tags: ['시스템', '데이터'],
  },
  {
    id: 'gl-jit',
    term: 'JIT',
    termKo: '적시생산',
    summary:
      'Just In Time. 필요한 것을 필요한 때에 필요한 만큼 생산·공급하는 방식입니다. 재고를 줄이는 것이 목표입니다.',
    tags: ['개념', '물류'],
  },
  {
    id: 'gl-kanban',
    term: 'Kanban',
    termKo: '칸반',
    summary:
      '시각적 신호로 자재·작업을 당기는(pull) 방식입니다. 린 생산의 대표 도구입니다.',
    tags: ['개념', '물류'],
  },
  {
    id: 'gl-kpi',
    term: 'KPI',
    termKo: '핵심성과지표',
    summary:
      'Key Performance Indicator. 목표 달성도를 보는 핵심 지표입니다. 생산성·불량률·OEE 등이 대표적입니다.',
    tags: ['데이터', '품질'],
  },
  {
    id: 'gl-lead-time',
    term: 'Lead Time',
    termKo: '리드타임',
    summary:
      '주문부터 납품·완성까지 걸리는 총 시간입니다. 단축이 경쟁력으로 이어집니다.',
    tags: ['데이터', '물류'],
  },
  {
    id: 'gl-lean',
    term: 'Lean',
    termKo: '린 생산',
    summary:
      '낭비(과잉생산·대기·불량 등)를 줄여 흐름을 만드는 생산 철학입니다. 스마트공장 도입 전후에도 기본으로 강조됩니다.',
    tags: ['개념', '품질'],
  },
  {
    id: 'gl-llm-mfg',
    term: 'Manufacturing LLM',
    termKo: '제조 특화 언어모델',
    summary:
      '제조 문서·매뉴얼·공정 지식을 학습한 대규모 언어모델입니다. 작업 지원·이상 원인 설명에 쓰이기 시작합니다.',
    tags: ['AI', '데이터'],
  },
  {
    id: 'gl-lot',
    term: 'Lot Traceability',
    termKo: '로트 추적',
    summary:
      '제품·자재의 생산 단위(로트)를 따라가며 이력을 남기는 일입니다. 리콜·품질 원인 분석에 필수입니다.',
    tags: ['품질', '데이터'],
  },
  {
    id: 'gl-max',
    term: 'M.AX',
    termKo: '제조 AI 대전환',
    summary:
      'Manufacturing AI Transformation. 제조 현장에 AI를 본격 적용해 생산성·품질을 끌어올리는 정책·산업 방향입니다.',
    tags: ['개념', 'AI'],
  },
  {
    id: 'gl-mes',
    term: 'MES',
    termKo: '제조실행시스템',
    summary:
      'Manufacturing Execution System. 작업지시·실적·품질·자재를 현장 단위로 관리하는 시스템입니다. ERP와 설비 사이의 “실행 계층” 역할을 합니다.',
    tags: ['시스템', '데이터'],
  },
  {
    id: 'gl-ml',
    term: 'Machine Learning',
    termKo: '머신러닝',
    summary:
      '데이터로 패턴을 학습해 예측·분류하는 AI 기법입니다. 예지보전·수요예측·품질 판정에 활용됩니다.',
    tags: ['AI'],
  },
  {
    id: 'gl-mom',
    term: 'MOM',
    termKo: '제조운영관리',
    summary:
      'Manufacturing Operations Management. MES를 포함해 생산·품질·보전·물류 운영을 아우르는 상위 개념입니다.',
    tags: ['시스템', '개념'],
  },
  {
    id: 'gl-mtbf',
    term: 'MTBF',
    termKo: '평균고장간격',
    summary:
      'Mean Time Between Failures. 고장과 고장 사이의 평균 시간입니다. 설비 신뢰성 지표입니다.',
    tags: ['설비제어', '데이터'],
  },
  {
    id: 'gl-mttr',
    term: 'MTTR',
    termKo: '평균복구시간',
    summary:
      'Mean Time To Repair. 고장 후 정상 가동까지 걸린 평균 시간입니다. 짧을수록 보전 역량이 좋습니다.',
    tags: ['설비제어', '데이터'],
  },
  {
    id: 'gl-oee',
    term: 'OEE',
    termKo: '설비종합효율',
    summary:
      'Overall Equipment Effectiveness. 가동률·성능·품질을 곱해 설비 효율을 보는 지표입니다. 현장 KPI로 널리 쓰입니다.',
    tags: ['데이터', '품질'],
  },
  {
    id: 'gl-opcua',
    term: 'OPC UA',
    termKo: 'OPC UA',
    summary:
      '산업 장비·시스템 간 데이터 교환을 위한 개방형 통신 표준입니다. 이기종 설비 연동의 사실상 표준에 가깝습니다.',
    tags: ['시스템', '데이터'],
  },
  {
    id: 'gl-ot-it',
    term: 'OT / IT',
    termKo: '운영기술 / 정보기술',
    summary:
      'OT는 설비·공정 제어(PLC, SCADA 등), IT는 업무·데이터 시스템(ERP, MES, 클라우드)입니다. 스마트공장·AI 팩토리는 두 영역의 연결이 핵심입니다.',
    tags: ['개념', '시스템'],
  },
  {
    id: 'gl-pdca',
    term: 'PDCA',
    termKo: '계획·실행·점검·조치',
    summary:
      'Plan–Do–Check–Act. 개선을 순환적으로 돌리는 기본 프레임입니다. 품질·운영 관리에 공통으로 쓰입니다.',
    tags: ['품질', '개념'],
  },
  {
    id: 'gl-plm',
    term: 'PLM',
    termKo: '제품수명주기관리',
    summary:
      'Product Lifecycle Management. 설계부터 폐기까지 제품 정보를 관리하는 체계입니다. BOM·설계변경과 밀접합니다.',
    tags: ['시스템', '데이터'],
  },
  {
    id: 'gl-plc',
    term: 'PLC',
    termKo: '프로그래머블 로직 제어기',
    summary:
      'Programmable Logic Controller. 설비·라인을 실시간으로 제어하는 산업용 컨트롤러입니다. 센서 입력을 받아 모터·밸브 등 출력을 제어합니다.',
    tags: ['설비제어'],
  },
  {
    id: 'gl-poc',
    term: 'PoC',
    termKo: '개념검증',
    summary:
      'Proof of Concept. 기술·솔루션이 현장에서 통하는지 작게 시험해 보는 단계입니다. 본도입 전 위험을 줄입니다.',
    tags: ['개념'],
  },
  {
    id: 'gl-ppm',
    term: 'PPM',
    termKo: '백만분율 불량',
    summary:
      'Parts Per Million. 불량 비율을 백만 개당 개수로 나타낸 품질 지표입니다.',
    tags: ['품질', '데이터'],
  },
  {
    id: 'gl-predictive-maintenance',
    term: 'Predictive Maintenance',
    termKo: '예지보전',
    summary:
      '센서·운전 데이터로 고장 징후를 미리 잡아 정비 시점을 잡는 방식입니다. 고장 난 뒤 고치는 사후보전, 일정 주기 정비와 구분됩니다.',
    tags: ['설비제어', 'AI'],
  },
  {
    id: 'gl-preventive-maintenance',
    term: 'Preventive Maintenance',
    termKo: '예방보전',
    summary:
      '고장 전에 주기·조건에 따라 점검·부품 교체를 하는 보전 방식입니다. 예지보전의 전 단계로 볼 수 있습니다.',
    tags: ['설비제어'],
  },
  {
    id: 'gl-process-mining',
    term: 'Process Mining',
    termKo: '프로세스 마이닝',
    summary:
      '시스템 로그로 실제 업무·공정 흐름을 재구성해 병목·일탈을 찾는 분석 기법입니다.',
    tags: ['데이터', 'AI'],
  },
  {
    id: 'gl-qms',
    term: 'QMS',
    termKo: '품질경영시스템',
    summary:
      'Quality Management System. 품질 정책·절차·기록을 체계화한 경영 시스템입니다. ISO 9001 등과 연결됩니다.',
    tags: ['품질', '시스템'],
  },
  {
    id: 'gl-rpa',
    term: 'RPA',
    termKo: '로봇프로세스자동화',
    summary:
      'Robotic Process Automation. 반복적인 화면·문서 업무를 소프트웨어 봇이 대신하는 자동화입니다. 사무·물류 행정에 자주 씁니다.',
    tags: ['AI', '시스템'],
  },
  {
    id: 'gl-roi',
    term: 'ROI',
    termKo: '투자대비효과',
    summary:
      'Return on Investment. 투자 대비 얻은 이익을 보는 지표입니다. 스마트공장·AI 도입 설득의 핵심 숫자입니다.',
    tags: ['개념', '데이터'],
  },
  {
    id: 'gl-root-cause',
    term: 'Root Cause Analysis',
    termKo: '근본원인분석',
    summary:
      '문제의 표면 증상이 아니라 진짜 원인을 찾는 분석입니다. 5Why·어골도 등이 대표 도구입니다.',
    tags: ['품질'],
  },
  {
    id: 'gl-rtls',
    term: 'RTLS',
    termKo: '실시간위치추적',
    summary:
      'Real-Time Location System. 자재·설비·사람의 위치를 실시간으로 파악하는 기술입니다. 물류·안전에 활용됩니다.',
    tags: ['물류', '데이터'],
  },
  {
    id: 'gl-scada',
    term: 'SCADA',
    termKo: '감시제어데이터수집',
    summary:
      'Supervisory Control and Data Acquisition. 공장·설비를 원격으로 감시·제어하고 데이터를 모으는 시스템입니다.',
    tags: ['설비제어', '시스템'],
  },
  {
    id: 'gl-scm',
    term: 'SCM',
    termKo: '공급망관리',
    summary:
      'Supply Chain Management. 원자재부터 고객 납품까지 흐름을 계획·실행·조정하는 관리입니다.',
    tags: ['물류', '개념'],
  },
  {
    id: 'gl-simulation',
    term: 'Simulation',
    termKo: '시뮬레이션',
    summary:
      '가상으로 공정·물류를 돌려 병목·효과를 미리 보는 기법입니다. 디지털트윈·라인 설계에 쓰입니다.',
    tags: ['데이터', '개념'],
  },
  {
    id: 'gl-six-sigma',
    term: 'Six Sigma',
    termKo: '식스 시그마',
    summary:
      '데이터 기반으로 변동·불량을 줄이는 품질 경영 방법론입니다. DMAIC 절차와 함께 알려져 있습니다.',
    tags: ['품질'],
  },
  {
    id: 'gl-sme',
    term: 'SME',
    termKo: '중소기업',
    summary:
      'Small and Medium-sized Enterprises. 스마트공장 지원정책의 주요 대상입니다. 국내에서는 규모 기준이 법령으로 정의됩니다.',
    tags: ['개념'],
  },
  {
    id: 'gl-smart-factory',
    term: 'Smart Factory',
    termKo: '스마트공장',
    summary:
      'ICT로 설계–생산–물류를 연결해 공정을 가시화·자동화한 공장입니다. AI 팩토리의 기반이 되는 단계로 이해하면 쉽습니다.',
    tags: ['개념', '시스템'],
  },
  {
    id: 'gl-smes',
    term: 'SMEs Digitalization',
    termKo: '중소기업 디지털화',
    summary:
      '중소 제조기업의 데이터·자동화·AI 도입을 뜻합니다. 정부 지원사업의 핵심 키워드입니다.',
    tags: ['개념'],
  },
  {
    id: 'gl-sop',
    term: 'SOP',
    termKo: '표준작업절차',
    summary:
      'Standard Operating Procedure. 작업을 일정한 품질로 반복하기 위한 표준 절차서입니다.',
    tags: ['품질', '개념'],
  },
  {
    id: 'gl-spc',
    term: 'SPC',
    termKo: '통계적공정관리',
    summary:
      'Statistical Process Control. 관리도로 공정 변동을 감시해 이상 징후를 잡는 품질 기법입니다.',
    tags: ['품질', '데이터'],
  },
  {
    id: 'gl-takt-time',
    term: 'Takt Time',
    termKo: '택트타임',
    summary:
      '고객 수요에 맞춰 제품을 내보내야 하는 리듬(시간)입니다. 라인 설계·균형의 기준이 됩니다.',
    tags: ['데이터', '개념'],
  },
  {
    id: 'gl-tpm',
    term: 'TPM',
    termKo: '전원참여생산보전',
    summary:
      'Total Productive Maintenance. 설비 효율을 높이기 위해 현장 전원이 보전에 참여하는 활동입니다.',
    tags: ['설비제어', '품질'],
  },
  {
    id: 'gl-traceability',
    term: 'Traceability',
    termKo: '추적성',
    summary:
      '제품·부품이 어디서 왔고 어디로 갔는지 이력으로 따라갈 수 있는 성질입니다. 품질·리콜 대응의 기반입니다.',
    tags: ['품질', '데이터'],
  },
  {
    id: 'gl-uwb',
    term: 'UWB',
    termKo: '초광대역',
    summary:
      'Ultra Wideband. 짧은 펄스로 정밀 측위가 가능한 무선 기술입니다. 공장 RTLS에 자주 쓰입니다.',
    tags: ['물류', '데이터'],
  },
  {
    id: 'gl-vision-ai',
    term: 'Vision AI',
    termKo: '비전 AI',
    summary:
      '카메라 영상을 AI로 분석해 불량·이물·조립 상태를 판정하는 기술입니다. 사람 검사의 보완·대체로 확산 중입니다.',
    tags: ['AI', '품질'],
  },
  {
    id: 'gl-wms',
    term: 'WMS',
    termKo: '창고관리시스템',
    summary:
      'Warehouse Management System. 입고·적치·피킹·출고를 관리하는 물류 시스템입니다. MES·ERP와 연동됩니다.',
    tags: ['물류', '시스템'],
  },
  {
    id: 'gl-wcs',
    term: 'WCS',
    termKo: '창고제어시스템',
    summary:
      'Warehouse Control System. 컨베이어·셔틀·로봇 등 물류 장비를 실시간 제어하는 계층입니다. WMS 아래에 위치합니다.',
    tags: ['물류', '설비제어'],
  },
  {
    id: 'gl-work-order',
    term: 'Work Order',
    termKo: '작업지시',
    summary:
      '무엇을 얼마나 어떤 순서로 만들지에 대한 현장 지시입니다. MES의 핵심 트랜잭션입니다.',
    tags: ['시스템', '데이터'],
  },
  {
    id: 'gl-yield',
    term: 'Yield',
    termKo: '수율',
    summary:
      '투입 대비 양품이 나온 비율입니다. 반도체·배터리 등 공정형 산업의 핵심 KPI입니다.',
    tags: ['품질', '데이터'],
  },
  {
    id: 'gl-5s',
    term: '5S',
    termKo: '5S',
    summary:
      '정리·정돈·청소·청결·습관화. 현장 기본 질서를 만드는 활동입니다. 자동화 전 필수 기반으로 꼽힙니다.',
    tags: ['품질', '개념'],
  },
  {
    id: 'gl-5why',
    term: '5Why',
    termKo: '5Why',
    summary:
      '‘왜?’를 반복해 문제의 근본 원인에 다가가는 기법입니다. 현장 개선·품질 분석에 흔합니다.',
    tags: ['품질'],
  },
  {
    id: 'gl-automation',
    term: 'Automation',
    termKo: '자동화',
    summary:
      '사람 개입을 줄이고 설비·소프트웨어가 작업을 수행하게 하는 일입니다. 스마트공장의 기본 축입니다.',
    tags: ['개념', '설비제어'],
  },
  {
    id: 'gl-bottleneck',
    term: 'Bottleneck',
    termKo: '병목',
    summary:
      '전체 흐름을 가로막는 가장 느린 공정·자원입니다. 개선 우선순위의 출발점입니다.',
    tags: ['개념', '데이터'],
  },
  {
    id: 'gl-calibration',
    term: 'Calibration',
    termKo: '교정',
    summary:
      '측정기가 기준에 맞게 동작하는지 확인하고 맞추는 일입니다. 품질 데이터의 신뢰성과 직결됩니다.',
    tags: ['품질'],
  },
  {
    id: 'gl-changeover',
    term: 'Changeover',
    termKo: '기종전환',
    summary:
      '한 제품 생산에서 다른 제품으로 바꾸기 위한 셋업 작업입니다. 시간을 줄이면 유연생산이 쉬워집니다.',
    tags: ['설비제어', '개념'],
  },
  {
    id: 'gl-condition-monitoring',
    term: 'Condition Monitoring',
    termKo: '상태감시',
    summary:
      '진동·온도·전류 등으로 설비 상태를 계속 지켜보는 일입니다. 예지보전의 입력 데이터입니다.',
    tags: ['설비제어', '데이터'],
  },
  {
    id: 'gl-cybersecurity-ot',
    term: 'OT Security',
    termKo: 'OT 보안',
    summary:
      '공장 제어망·설비를 대상으로 한 보안입니다. IT 보안과 달리 가동 중단·안전이 최우선입니다.',
    tags: ['시스템', '개념'],
  },
  {
    id: 'gl-energy-management',
    term: 'Energy Management',
    termKo: '에너지관리',
    summary:
      '공장 전력·가스·스팀 사용을 측정·분석·절감하는 활동입니다. ESG·원가와 함께 중요해졌습니다.',
    tags: ['데이터', '시스템'],
  },
  {
    id: 'gl-humanoid',
    term: 'Humanoid Robot',
    termKo: '휴머노이드 로봇',
    summary:
      '사람 형태에 가까운 로봇입니다. 기존 라인에 맞게 다능 작업을 맡기려는 시도가 늘고 있습니다.',
    tags: ['설비제어', 'AI'],
  },
  {
    id: 'gl-interoperability',
    term: 'Interoperability',
    termKo: '상호운용성',
    summary:
      '서로 다른 시스템·설비가 데이터를 막힘없이 주고받을 수 있는 성질입니다. 표준·인터페이스가 핵심입니다.',
    tags: ['시스템', '데이터'],
  },
  {
    id: 'gl-latency',
    term: 'Latency',
    termKo: '지연시간',
    summary:
      '신호가 발생하고 처리·응답까지 걸리는 시간입니다. 실시간 제어에서는 짧게 유지해야 합니다.',
    tags: ['데이터', '설비제어'],
  },
  {
    id: 'gl-line-balancing',
    term: 'Line Balancing',
    termKo: '라인밸런싱',
    summary:
      '공정별 작업량을 고르게 나눠 대기·과부하를 줄이는 설계입니다. 사이클타임과 밀접합니다.',
    tags: ['개념', '데이터'],
  },
  {
    id: 'gl-sensor-fusion',
    term: 'Sensor Fusion',
    termKo: '센서퓨전',
    summary:
      '여러 센서 정보를 합쳐 더 정확한 상태 인식을 하는 기술입니다. 로봇·자율주행·품질검사에 쓰입니다.',
    tags: ['AI', '데이터'],
  },
  {
    id: 'gl-shop-floor',
    term: 'Shop Floor',
    termKo: '현장(샵플로어)',
    summary:
      '실제 생산이 이뤄지는 공장 바닥 현장입니다. MES·OT 데이터의 출발점입니다.',
    tags: ['개념'],
  },
  {
    id: 'gl-throughput',
    term: 'Throughput',
    termKo: '처리량',
    summary:
      '단위 시간당 완성·통과하는 제품 수입니다. 병목 개선의 결과 지표로 봅니다.',
    tags: ['데이터'],
  },
  {
    id: 'gl-time-series',
    term: 'Time Series',
    termKo: '시계열 데이터',
    summary:
      '시간 순으로 쌓인 센서·실적 데이터입니다. 예지보전·수요예측 모델의 주재료입니다.',
    tags: ['데이터', 'AI'],
  },
  {
    id: 'gl-value-stream',
    term: 'Value Stream Mapping',
    termKo: '가치흐름지도',
    summary:
      '고객 가치 창출 과정을 그려 낭비와 병목을 찾는 린 도구입니다. 디지털화 우선순위 설정에도 쓰입니다.',
    tags: ['개념', '품질'],
  },
  {
    id: 'gl-vibration-analysis',
    term: 'Vibration Analysis',
    termKo: '진동분석',
    summary:
      '회전기계 진동 신호로 베어링·정렬 이상을 진단하는 기법입니다. 예지보전의 대표 수단입니다.',
    tags: ['설비제어', '데이터'],
  },
  {
    id: 'gl-zero-defect',
    term: 'Zero Defect',
    termKo: '무결점',
    summary:
      '불량을 허용하지 않는 품질 목표·문화입니다. 검사·공정능력·작업표준이 뒷받침되어야 합니다.',
    tags: ['품질', '개념'],
  },
]
