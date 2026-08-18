import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { NationalTrendCharts } from '../components/NationalTrendCharts'
import { ParkRankingPanel } from '../components/ParkRankingPanel'
import { loadKakaoMaps } from '../lib/kakaoLoader'
import type {
  IndustrialParkDataset,
  IndustrialParkItem,
  IndustrialRegion,
  IndustrialTrend,
} from '../types/industrialPark'
import type { SupplierDataset, SupplierItem } from '../types/supplier'

const KAKAO_KEY = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined

type MapTab = 'suppliers' | 'parks'
type ParkTypeFilter = '총합' | '국가' | '일반' | '도시첨단' | '농공'

const PARK_TYPES: ParkTypeFilter[] = [
  '총합',
  '국가',
  '일반',
  '도시첨단',
  '농공',
]

function regionOf(address: string) {
  return address.trim().split(/\s+/)[0] || '기타'
}

function fmtNum(n: number | null | undefined) {
  if (n == null || Number.isNaN(n)) return '—'
  return n.toLocaleString('ko-KR')
}

function fmtPct(n: number | null | undefined) {
  if (n == null || Number.isNaN(n)) return '—'
  return `${n.toFixed(1)}%`
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const tab: MapTab = tabParam === 'parks' ? 'parks' : 'suppliers'

  const mapRef = useRef<HTMLDivElement>(null)
  const mapObj = useRef<kakao.maps.Map | null>(null)
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null)
  const infoRef = useRef<kakao.maps.InfoWindow | null>(null)

  const [suppliers, setSuppliers] = useState<SupplierItem[]>([])
  const [supplierMeta, setSupplierMeta] = useState<Pick<
    SupplierDataset,
    'source' | 'sourceUrl' | 'updatedAt' | 'totalRaw' | 'totalMapped'
  > | null>(null)

  const [parkData, setParkData] = useState<IndustrialParkDataset | null>(null)
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('전체')
  const [parkType, setParkType] = useState<ParkTypeFilter>('총합')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [status, setStatus] = useState('데이터 불러오는 중…')
  const [error, setError] = useState('')
  const [mapReady, setMapReady] = useState(false)

  const setTab = (next: MapTab) => {
    setQuery('')
    setRegion('전체')
    setParkType('총합')
    setSelectedId(null)
    infoRef.current?.close()
    const params = new URLSearchParams(searchParams)
    if (next === 'parks') params.set('tab', 'parks')
    else params.delete('tab')
    setSearchParams(params, { replace: true })
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [supRes, parkRes] = await Promise.all([
          fetch('/data/suppliers.json'),
          fetch('/data/industrial-parks.json'),
        ])
        if (!supRes.ok) throw new Error('공급기업 데이터를 불러오지 못했습니다.')
        if (!parkRes.ok) throw new Error('산업단지 데이터를 불러오지 못했습니다.')
        const supData = (await supRes.json()) as SupplierDataset
        const parks = (await parkRes.json()) as IndustrialParkDataset
        if (cancelled) return
        setSuppliers(supData.items)
        setSupplierMeta({
          source: supData.source,
          sourceUrl: supData.sourceUrl,
          updatedAt: supData.updatedAt,
          totalRaw: supData.totalRaw,
          totalMapped: supData.totalMapped,
        })
        setParkData(parks)
        setStatus('')
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : '데이터 로드 실패')
          setStatus('')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const trendByKey = useMemo(() => {
    const map = new Map<string, IndustrialTrend>()
    parkData?.trends.forEach((t) => map.set(t.key, t))
    return map
  }, [parkData])

  const supplierRegions = useMemo(() => {
    const set = new Set(suppliers.map((item) => regionOf(item.address)))
    return ['전체', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'ko'))]
  }, [suppliers])

  const parkRegions = useMemo(() => {
    if (!parkData) return ['전체']
    const set = new Set(parkData.parks.map((p) => p.sido))
    return ['전체', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'ko'))]
  }, [parkData])

  const regions = tab === 'suppliers' ? supplierRegions : parkRegions

  const filteredSuppliers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return suppliers.filter((item) => {
      if (region !== '전체' && regionOf(item.address) !== region) return false
      if (!q) return true
      return (
        item.name.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q)
      )
    })
  }, [suppliers, query, region])

  const filteredParks = useMemo(() => {
    if (!parkData) return [] as IndustrialParkItem[]
    const q = query.trim().toLowerCase()
    return parkData.parks.filter((item) => {
      if (region !== '전체' && item.sido !== region) return false
      if (parkType !== '총합' && item.type !== parkType) return false
      if (!q) return true
      return (
        item.name.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.sigungu.toLowerCase().includes(q)
      )
    })
  }, [parkData, query, region, parkType])

  const filteredRegions = useMemo(() => {
    if (!parkData) return [] as IndustrialRegion[]
    if (region !== '전체') {
      return parkData.regions.filter((r) => r.sido === region)
    }
    if (parkType === '총합' && !query.trim()) return parkData.regions
    const sidoSet = new Set(filteredParks.map((p) => p.sido))
    return parkData.regions
      .filter((r) => sidoSet.has(r.sido))
      .map((r) => ({
        ...r,
        parkCount: filteredParks.filter((p) => p.sido === r.sido).length,
      }))
  }, [parkData, region, parkType, query, filteredParks])

  const avgUtilization = useMemo(() => {
    const vals = (parkData?.trends ?? [])
      .map((t) => t.utilization)
      .filter((v): v is number => v != null)
    if (!vals.length) return null
    return vals.reduce((a, b) => a + b, 0) / vals.length
  }, [parkData])

  const rankingParks = useMemo(() => {
    if (!parkData) return [] as IndustrialParkItem[]
    return parkData.parks.filter((item) => {
      if (parkType !== '총합' && item.type !== parkType) return false
      if (region !== '전체' && item.sido !== region) return false
      return true
    })
  }, [parkData, parkType, region])

  const typeStats = useMemo(() => {
    if (!parkData) return null
    const key = parkType === '총합' ? '총합' : parkType
    return parkData.summary.byType[key] ?? null
  }, [parkData, parkType])

  const typeListCounts = useMemo(() => {
    if (!parkData) return {} as Record<string, number>
    const counts: Record<string, number> = { 총합: parkData.parks.length }
    for (const p of parkData.parks) {
      counts[p.type] = (counts[p.type] ?? 0) + 1
    }
    return counts
  }, [parkData])

  const dataReady =
    tab === 'suppliers' ? suppliers.length > 0 : (parkData?.parks.length ?? 0) > 0

  useEffect(() => {
    if (!mapRef.current || !KAKAO_KEY || !dataReady) return
    if (mapObj.current) {
      setMapReady(true)
      return
    }
    let cancelled = false
    setMapReady(false)

    ;(async () => {
      try {
        const kakao = await loadKakaoMaps(KAKAO_KEY)
        if (cancelled || !mapRef.current) return

        const center = new kakao.maps.LatLng(36.5, 127.8)
        const map = new kakao.maps.Map(mapRef.current, {
          center,
          level: 12,
        })
        mapObj.current = map
        infoRef.current = new kakao.maps.InfoWindow({ zIndex: 3 })
        clustererRef.current = new kakao.maps.MarkerClusterer({
          map,
          averageCenter: true,
          minLevel: 8,
        })
        if (!cancelled) setMapReady(true)
      } catch (e) {
        if (!cancelled) {
          setMapReady(false)
          setError(
            e instanceof Error
              ? e.message
              : '카카오맵을 불러오지 못했습니다. 키·도메인 설정을 확인해 주세요.',
          )
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [dataReady])

  useEffect(() => {
    return () => {
      clustererRef.current?.clear()
      clustererRef.current = null
      mapObj.current = null
      setMapReady(false)
    }
  }, [])

  useEffect(() => {
    if (!mapReady) return
    const map = mapObj.current
    const clusterer = clustererRef.current
    const kakao = window.kakao
    if (!map || !clusterer || !kakao?.maps) return

    clusterer.clear()
    infoRef.current?.close()

    if (tab === 'suppliers') {
      const markers = filteredSuppliers.map((item) => {
        const position = new kakao.maps.LatLng(item.lat, item.lng)
        const marker = new kakao.maps.Marker({ position })
        kakao.maps.event.addListener(marker, 'click', () => {
          setSelectedId(item.id)
          const content = `<div style="padding:8px 10px;max-width:220px;font-size:12px;line-height:1.4;">
            <strong style="display:block;margin-bottom:4px;">${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.address)}</span>
          </div>`
          infoRef.current?.setContent(content)
          infoRef.current?.open(map, marker)
          map.panTo(position)
        })
        return marker
      })
      clusterer.addMarkers(markers)

      if (filteredSuppliers.length === 1) {
        map.setLevel(5)
        map.panTo(
          new kakao.maps.LatLng(
            filteredSuppliers[0].lat,
            filteredSuppliers[0].lng,
          ),
        )
      } else if (
        filteredSuppliers.length > 1 &&
        filteredSuppliers.length < suppliers.length
      ) {
        const bounds = new kakao.maps.LatLngBounds()
        filteredSuppliers.forEach((item) =>
          bounds.extend(new kakao.maps.LatLng(item.lat, item.lng)),
        )
        map.setBounds(bounds)
      } else {
        map.setLevel(12)
        map.panTo(new kakao.maps.LatLng(36.5, 127.8))
      }
      return
    }

    const markers = filteredRegions.map((item) => {
      const position = new kakao.maps.LatLng(item.lat, item.lng)
      const marker = new kakao.maps.Marker({ position })
      kakao.maps.event.addListener(marker, 'click', () => {
        setRegion(item.sido)
        setSelectedId(item.id)
        const content = `<div style="padding:8px 10px;max-width:240px;font-size:12px;line-height:1.45;">
          <strong style="display:block;margin-bottom:4px;">${escapeHtml(item.sido)}</strong>
          <span>산업단지 ${item.parkCount.toLocaleString('ko-KR')}곳</span><br/>
          <span>입주 ${fmtNum(item.tenants)} · 가동 ${fmtNum(item.operating)}</span>
          <div style="margin-top:4px;color:#666;">좌표는 시도 중심점 기준</div>
        </div>`
        infoRef.current?.setContent(content)
        infoRef.current?.open(map, marker)
        map.setLevel(9)
        map.panTo(position)
      })
      return marker
    })
    clusterer.addMarkers(markers)

    if (filteredRegions.length === 1) {
      map.setLevel(9)
      map.panTo(
        new kakao.maps.LatLng(filteredRegions[0].lat, filteredRegions[0].lng),
      )
    } else if (filteredRegions.length > 1 && region !== '전체') {
      const bounds = new kakao.maps.LatLngBounds()
      filteredRegions.forEach((item) =>
        bounds.extend(new kakao.maps.LatLng(item.lat, item.lng)),
      )
      map.setBounds(bounds)
    } else if (region === '전체' && !query.trim() && parkType === '총합') {
      map.setLevel(12)
      map.panTo(new kakao.maps.LatLng(36.5, 127.8))
    } else if (filteredRegions.length > 0) {
      const bounds = new kakao.maps.LatLngBounds()
      filteredRegions.forEach((item) =>
        bounds.extend(new kakao.maps.LatLng(item.lat, item.lng)),
      )
      map.setBounds(bounds)
    }
  }, [
    tab,
    mapReady,
    filteredSuppliers,
    filteredRegions,
    suppliers.length,
    region,
    query,
    parkType,
  ])

  const focusSupplier = (item: SupplierItem) => {
    setSelectedId(item.id)
    const map = mapObj.current
    if (!map || !window.kakao?.maps) return
    const position = new window.kakao.maps.LatLng(item.lat, item.lng)
    map.setLevel(4)
    map.panTo(position)
  }

  const focusPark = (item: IndustrialParkItem) => {
    setSelectedId(item.id)
    setRegion(item.sido)
    const map = mapObj.current
    if (!map || !window.kakao?.maps) return
    const position = new window.kakao.maps.LatLng(item.lat, item.lng)
    map.setLevel(9)
    map.panTo(position)
  }

  const listCount =
    tab === 'suppliers' ? filteredSuppliers.length : filteredParks.length

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-6 md:py-14">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Map
      </p>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        제조 지도
      </h1>
      <p className="mb-2 inline-block border border-line px-2 py-1 text-[11px] tracking-[0.06em] text-ink-muted">
        공공데이터 기반
      </p>
      <p className="mb-5 max-w-2xl text-[14px] leading-relaxed text-ink-muted">
        스마트공장 공급기업과 전국 산업단지 현황을 같은 지도에서 살펴봅니다.
        산업단지는 상세 주소가 없어 시도 단위로 포커스합니다.
      </p>

      <div
        role="tablist"
        aria-label="지도 구분"
        className="mb-5 flex border border-line"
      >
        {(
          [
            { id: 'suppliers' as const, label: '공급기업' },
            { id: 'parks' as const, label: '산업단지' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={[
              'flex-1 px-3 py-2.5 text-[13px] transition-colors',
              tab === item.id
                ? 'bg-ink text-paper'
                : 'bg-paper text-ink-muted hover:text-ink',
            ].join(' ')}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'parks' && parkData ? (
        <>
          <div className="mb-3">
            <p className="mb-1.5 text-[11px] font-medium tracking-[0.08em] text-ink-faint">
              단지유형
            </p>
            <div
              role="tablist"
              aria-label="단지유형"
              className="flex flex-wrap border border-line"
            >
              {PARK_TYPES.map((t) => {
                const count =
                  t === '총합'
                    ? (parkData.summary.byType.총합?.parks ??
                      typeListCounts.총합)
                    : (parkData.summary.byType[t]?.parks ??
                      typeListCounts[t] ??
                      0)
                const active = parkType === t
                return (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setParkType(t)}
                    className={[
                      'min-w-[4.5rem] flex-1 border-r border-line px-2.5 py-2 text-center last:border-r-0',
                      active
                        ? 'bg-ink text-paper'
                        : 'bg-paper text-ink-muted hover:text-ink',
                    ].join(' ')}
                  >
                    <span className="block text-[13px] font-medium">{t}</span>
                    <span
                      className={[
                        'block text-[11px]',
                        active ? 'text-paper/75' : 'text-ink-faint',
                      ].join(' ')}
                    >
                      {count.toLocaleString('ko-KR')}곳
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mb-4 grid gap-2 sm:grid-cols-3">
            <div className="border border-line px-3 py-2.5">
              <p className="text-[11px] text-ink-faint">
                {parkType === '총합' ? '전국 산업단지' : `${parkType} 단지`}
              </p>
              <p className="mt-0.5 text-[18px] font-semibold text-ink">
                {fmtNum(typeStats?.parks ?? listCount)}
                <span className="ml-1 text-[12px] font-normal text-ink-muted">
                  곳
                </span>
              </p>
            </div>
            <div className="border border-line px-3 py-2.5">
              <p className="text-[11px] text-ink-faint">입주 · 가동</p>
              <p className="mt-0.5 text-[18px] font-semibold text-ink">
                {fmtNum(typeStats?.tenants)}
                <span className="ml-1 text-[12px] font-normal text-ink-muted">
                  / {fmtNum(typeStats?.operating)}
                </span>
              </p>
            </div>
            <div className="border border-line px-3 py-2.5">
              <p className="text-[11px] text-ink-faint">
                {parkType === '국가' ||
                (parkType === '총합' && avgUtilization != null)
                  ? '국가산단 평균 가동률'
                  : '분양률(요약)'}
              </p>
              <p className="mt-0.5 text-[18px] font-semibold text-ink">
                {parkType === '국가' || parkType === '총합'
                  ? avgUtilization != null
                    ? `${avgUtilization.toFixed(1)}%`
                    : fmtPct(typeStats?.saleRate)
                  : fmtPct(typeStats?.saleRate)}
              </p>
            </div>
          </div>

          {parkType === '국가' ? (
            <NationalTrendCharts
              trends={parkData.trends}
              asOf={parkData.trendAsOf}
              onSelectTrend={(trend) => {
                if (trend.sido) setRegion(trend.sido)
                const matched = parkData.parks.find(
                  (p) => p.trendKey === trend.key,
                )
                if (matched) focusPark(matched)
                else if (trend.lat != null && trend.lng != null) {
                  const map = mapObj.current
                  if (map && window.kakao?.maps) {
                    map.setLevel(9)
                    map.panTo(
                      new window.kakao.maps.LatLng(trend.lat, trend.lng),
                    )
                  }
                }
              }}
            />
          ) : null}
        </>
      ) : null}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          type="text"
          inputMode="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            tab === 'suppliers' ? '기업명·주소 검색' : '단지명·시군 검색'
          }
          className="box-border min-h-11 w-full flex-1 appearance-none rounded border border-line bg-paper px-3 py-2.5 text-[16px] leading-normal text-ink outline-none focus:border-ink md:text-[14px]"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="box-border min-h-11 w-full appearance-none rounded border border-line bg-paper px-3 py-2.5 text-[16px] leading-normal text-ink outline-none focus:border-ink sm:w-40 md:text-[14px]"
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {!KAKAO_KEY ? (
        <p className="mb-4 text-[13px] text-red-600">
          VITE_KAKAO_JS_KEY가 없습니다. .env와 Vercel 환경변수를 확인해 주세요.
        </p>
      ) : null}
      {error ? (
        <p className="mb-4 text-[13px] text-red-600">{error}</p>
      ) : null}
      {status ? (
        <p className="mb-4 text-[13px] text-ink-faint">{status}</p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div
          ref={mapRef}
          className="h-[420px] w-full overflow-hidden border border-line bg-surface md:h-[560px]"
        />

        <div className="flex max-h-[420px] flex-col border border-line md:max-h-[560px]">
          <div className="border-b border-line px-3 py-2 text-[12px] text-ink-muted">
            {tab === 'suppliers'
              ? `검색 결과 ${listCount.toLocaleString('ko-KR')}곳`
              : `단지 ${listCount.toLocaleString('ko-KR')}곳 · 지도는 시도 ${filteredRegions.length}곳`}
          </div>
          <ul className="flex-1 overflow-auto">
            {tab === 'suppliers'
              ? filteredSuppliers.slice(0, 200).map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => focusSupplier(item)}
                      className={[
                        'w-full border-b border-line px-3 py-2.5 text-left transition-colors hover:bg-surface',
                        selectedId === item.id ? 'bg-surface' : '',
                      ].join(' ')}
                    >
                      <p className="text-[13px] font-medium text-ink">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-[12px] text-ink-muted">
                        {item.address}
                      </p>
                    </button>
                  </li>
                ))
              : filteredParks.slice(0, 200).map((item) => {
                  const trend = item.trendKey
                    ? trendByKey.get(item.trendKey)
                    : undefined
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => focusPark(item)}
                        className={[
                          'w-full border-b border-line px-3 py-2.5 text-left transition-colors hover:bg-surface',
                          selectedId === item.id ? 'bg-surface' : '',
                        ].join(' ')}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[13px] font-medium text-ink">
                            {item.name}
                          </p>
                          <span className="shrink-0 text-[11px] text-ink-faint">
                            {item.type}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[12px] text-ink-muted">
                          {item.address} · {item.status || '상태 미상'}
                          {item.saleRate != null
                            ? ` · 분양 ${fmtPct(item.saleRate)}`
                            : ''}
                        </p>
                        {trend ? (
                          <p className="mt-1 text-[11px] text-ink-muted">
                            동향 가동률 {fmtPct(trend.utilization)}
                            {trend.production != null
                              ? ` · 생산 ${fmtNum(Math.round(trend.production))}억`
                              : ''}
                            {trend.employment != null
                              ? ` · 고용 ${fmtNum(trend.employment)}`
                              : ''}
                          </p>
                        ) : null}
                      </button>
                    </li>
                  )
                })}
            {listCount > 200 ? (
              <li className="px-3 py-2 text-[12px] text-ink-faint">
                상위 200건만 목록에 표시합니다. 검색어로 좁혀 보세요.
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      {tab === 'parks' && parkData ? (
        <ParkRankingPanel
          parks={rankingParks}
          parkTypeLabel={
            region === '전체'
              ? parkType
              : `${region} · ${parkType}`
          }
          onSelectSido={(sido) => {
            setRegion(sido)
            const reg = parkData.regions.find((r) => r.sido === sido)
            if (!reg || !mapObj.current || !window.kakao?.maps) return
            mapObj.current.setLevel(9)
            mapObj.current.panTo(
              new window.kakao.maps.LatLng(reg.lat, reg.lng),
            )
          }}
          onSelectPark={(park) => focusPark(park)}
        />
      ) : null}

      {tab === 'suppliers' && supplierMeta ? (
        <p className="mt-5 text-[12px] leading-relaxed text-ink-faint">
          출처:{' '}
          <a
            href={supplierMeta.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:underline"
          >
            {supplierMeta.source}
          </a>
          {' · '}기준일 {supplierMeta.updatedAt} · 좌표 변환{' '}
          {supplierMeta.totalMapped.toLocaleString('ko-KR')}곳 / 원본{' '}
          {supplierMeta.totalRaw.toLocaleString('ko-KR')}곳. 주소 좌표 변환
          과정에서 누락·오차가 있을 수 있습니다.
        </p>
      ) : null}

      {tab === 'parks' && parkData ? (
        <p className="mt-5 text-[12px] leading-relaxed text-ink-faint">
          출처:{' '}
          <a
            href={parkData.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:underline"
          >
            {parkData.source}
          </a>
          {' · '}현황 {parkData.statusAsOf} · 동향 {parkData.trendAsOf}.{' '}
          {parkData.note}
        </p>
      ) : null}
    </div>
  )
}
