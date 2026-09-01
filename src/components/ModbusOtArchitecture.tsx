import { useState, type ReactNode } from 'react'
import { modbusExample } from '../data/otSecuritySamples'

type View = 'asIs' | 'toBe'

function Node({
  label,
  sub,
  tone = 'default',
}: {
  label: string
  sub?: string
  tone?: 'default' | 'risk' | 'secure' | 'device' | 'gate'
}) {
  const toneClass =
    tone === 'risk'
      ? 'border-accent/50 bg-accent/5'
      : tone === 'secure'
        ? 'border-ink/25 bg-ink/[0.03]'
        : tone === 'device'
          ? 'border-line bg-paper'
          : tone === 'gate'
            ? 'border-accent bg-accent text-paper'
            : 'border-line bg-surface/50'

  const subClass = tone === 'gate' ? 'text-paper/80' : 'text-ink-faint'

  return (
    <div
      className={[
        'border px-2.5 py-2 text-center',
        toneClass,
      ].join(' ')}
    >
      <p className="text-[12px] font-semibold leading-snug">{label}</p>
      {sub ? (
        <p className={['mt-0.5 text-[10px] leading-snug', subClass].join(' ')}>
          {sub}
        </p>
      ) : null}
    </div>
  )
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1.5 text-ink-faint" aria-hidden>
      <span className="h-3 w-px bg-line" />
      {label ? (
        <span className="my-0.5 text-[10px] tracking-wide">{label}</span>
      ) : null}
      <span className="text-[10px] leading-none">▼</span>
    </div>
  )
}

function ZoneFrame({
  title,
  children,
  accent,
}: {
  title: string
  children: ReactNode
  accent?: boolean
}) {
  return (
    <div
      className={[
        'border border-dashed px-3 py-3',
        accent ? 'border-accent/60 bg-accent/[0.04]' : 'border-line bg-paper/60',
      ].join(' ')}
    >
      <p
        className={[
          'mb-2 text-[10px] font-medium tracking-[0.1em] uppercase',
          accent ? 'text-accent' : 'text-ink-faint',
        ].join(' ')}
      >
        {title}
      </p>
      {children}
    </div>
  )
}

function AsIsDiagram() {
  return (
    <div className="space-y-1" role="img" aria-label="Modbus As-Is 구성도">
      <div className="grid grid-cols-3 gap-2">
        <Node label="인터넷·사무 PC" tone="risk" />
        <Node label="공급사 VPN" sub="공유 계정" tone="risk" />
        <Node label="MES / ERP" />
      </div>
      <Arrow label="같은 L2/L3 · 경계 없음" />
      <ZoneFrame title="Flat plant network">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Node label="HMI" sub="공용 계정" tone="risk" />
          <Node label="엔지니어링 PC" sub="USB·툴 혼재" tone="risk" />
          <Node label="PLC" sub="Modbus TCP" tone="device" />
          <Node label="I/O·드라이브" sub="Modbus RTU/TCP" tone="device" />
        </div>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-accent">
          Modbus가 망 전역으로 노출 · 도달 = 제어 가능
        </p>
      </ZoneFrame>
    </div>
  )
}

function ToBeDiagram() {
  return (
    <div className="space-y-1" role="img" aria-label="Modbus To-Be 구성도">
      <ZoneFrame title="IT Zone">
        <div className="grid grid-cols-3 gap-2">
          <Node label="사무 PC" tone="secure" />
          <Node label="인터넷" tone="secure" />
          <Node label="MES / ERP" tone="secure" />
        </div>
      </ZoneFrame>
      <Arrow label="제한된 통로" />
      <ZoneFrame title="DMZ / IT–OT 경계" accent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Node label="히스토리언" tone="secure" />
          <Node label="점프호스트" sub="엔지니어링" tone="gate" />
          <Node label="원격 게이트웨이" sub="승인·시간제한" tone="gate" />
          <Node label="패시브 모니터" sub="미러 / 탭" tone="secure" />
        </div>
      </ZoneFrame>
      <Arrow label="산업용 방화벽 · 기능코드 통제" />
      <ZoneFrame title="OT Control Zone">
        <div className="grid grid-cols-2 gap-2">
          <Node label="HMI / SCADA" sub="계정·최소권한" tone="secure" />
          <Node label="프로토콜 게이트웨이" sub="안: Modbus → 밖: OPC UA 등" tone="gate" />
        </div>
      </ZoneFrame>
      <Arrow label="Conduit (허용 호스트만)" />
      <ZoneFrame title="Modbus Device Zone" accent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Node label="PLC" sub="Modbus 유지" tone="device" />
          <Node label="I/O·드라이브" sub="RTU / TCP" tone="device" />
          <Node label="시리얼 게이트웨이" sub="서브넷 분리" tone="secure" />
        </div>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-muted">
          레거시 통신은 Zone 안에 · 바깥으로는 통제된 통로만
        </p>
      </ZoneFrame>
    </div>
  )
}

export function ModbusOtArchitecture() {
  const [view, setView] = useState<View>('asIs')
  const meta = view === 'asIs' ? modbusExample.asIs : modbusExample.toBe
  const bullets =
    view === 'asIs' ? modbusExample.asIs.risks : modbusExample.toBe.gains

  return (
    <div className="border border-line bg-surface/40 px-4 py-5 md:px-5">
      <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
        Architecture
      </p>
      <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-ink">
        As-Is → To-Be 구성도
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
        탭을 바꿔 평평한 망과, Modbus를 가둔 뒤의 경계를 비교하세요.
      </p>

      <div
        role="tablist"
        aria-label="구성도 보기"
        className="mt-4 flex border border-line"
      >
        {(
          [
            { id: 'asIs' as const, label: modbusExample.asIs.label },
            { id: 'toBe' as const, label: modbusExample.toBe.label },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={view === tab.id}
            onClick={() => setView(tab.id)}
            className={[
              'flex-1 px-3 py-2.5 text-[13px] font-medium transition',
              view === tab.id
                ? 'bg-ink text-paper'
                : 'bg-paper text-ink-muted hover:text-ink',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-[14px] font-semibold text-ink">{meta.title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
          {meta.caption}
        </p>
      </div>

      <div className="mt-4 border border-line bg-paper px-3 py-4 md:px-4">
        {view === 'asIs' ? <AsIsDiagram /> : <ToBeDiagram />}
      </div>

      <ul className="mt-4 space-y-2">
        {bullets.map((line) => (
          <li
            key={line}
            className="flex gap-2 text-[13px] leading-relaxed text-ink-muted"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
