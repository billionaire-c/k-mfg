import { useEffect, useMemo, useRef, useState } from 'react'
import { loadKakaoMaps } from '../lib/kakaoLoader'
import type { SupplierDataset, SupplierItem } from '../types/supplier'

const KAKAO_KEY = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined

function regionOf(address: string) {
  const part = address.trim().split(/\s+/)[0] || '기타'
  return part
}

export function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapObj = useRef<kakao.maps.Map | null>(null)
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null)
  const infoRef = useRef<kakao.maps.InfoWindow | null>(null)

  const [items, setItems] = useState<SupplierItem[]>([])
  const [meta, setMeta] = useState<Pick<
    SupplierDataset,
    'source' | 'sourceUrl' | 'updatedAt' | 'totalRaw' | 'totalMapped'
  > | null>(null)
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('전체')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [status, setStatus] = useState('데이터 불러오는 중…')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/data/suppliers.json')
        if (!res.ok) throw new Error('공급기업 데이터를 불러오지 못했습니다.')
        const data = (await res.json()) as SupplierDataset
        if (cancelled) return
        setItems(data.items)
        setMeta({
          source: data.source,
          sourceUrl: data.sourceUrl,
          updatedAt: data.updatedAt,
          totalRaw: data.totalRaw,
          totalMapped: data.totalMapped,
        })
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

  const regions = useMemo(() => {
    const set = new Set(items.map((item) => regionOf(item.address)))
    return ['전체', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'ko'))]
  }, [items])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((item) => {
      if (region !== '전체' && regionOf(item.address) !== region) return false
      if (!q) return true
      return (
        item.name.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q)
      )
    })
  }, [items, query, region])

  useEffect(() => {
    if (!mapRef.current || !KAKAO_KEY || items.length === 0) return
    let cancelled = false

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
      } catch (e) {
        if (!cancelled) {
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
      clustererRef.current?.clear()
      clustererRef.current = null
      mapObj.current = null
    }
  }, [items.length])

  useEffect(() => {
    const map = mapObj.current
    const clusterer = clustererRef.current
    const kakao = window.kakao
    if (!map || !clusterer || !kakao?.maps) return

    clusterer.clear()
    infoRef.current?.close()

    const markers = filtered.map((item) => {
      const position = new kakao.maps.LatLng(item.lat, item.lng)
      const marker = new kakao.maps.Marker({ position })
      kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedId(item.id)
        const content = `<div style="padding:8px 10px;max-width:220px;font-size:12px;line-height:1.4;">
          <strong style="display:block;margin-bottom:4px;">${item.name}</strong>
          <span>${item.address}</span>
        </div>`
        infoRef.current?.setContent(content)
        infoRef.current?.open(map, marker)
        map.panTo(position)
      })
      return marker
    })

    clusterer.addMarkers(markers)

    if (filtered.length === 1) {
      map.setLevel(5)
      map.panTo(new kakao.maps.LatLng(filtered[0].lat, filtered[0].lng))
    } else if (filtered.length > 1 && filtered.length < items.length) {
      const bounds = new kakao.maps.LatLngBounds()
      filtered.forEach((item) =>
        bounds.extend(new kakao.maps.LatLng(item.lat, item.lng)),
      )
      map.setBounds(bounds)
    }
  }, [filtered, items.length])

  const focusItem = (item: SupplierItem) => {
    setSelectedId(item.id)
    const map = mapObj.current
    if (!map || !window.kakao?.maps) return
    const position = new window.kakao.maps.LatLng(item.lat, item.lng)
    map.setLevel(4)
    map.panTo(position)
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-6 md:py-14">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Map
      </p>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        스마트공장 공급기업 지도
      </h1>
      <p className="mb-2 inline-block border border-line px-2 py-1 text-[11px] tracking-[0.06em] text-ink-muted">
        공공데이터 기반
      </p>
      <p className="mb-6 max-w-2xl text-[14px] leading-relaxed text-ink-muted">
        공공데이터포털에 공개된 스마트공장 공급기업 현황을 바탕으로, 위치를
        지도에서 찾아볼 수 있습니다.
        {meta
          ? ` 좌표 변환 ${meta.totalMapped.toLocaleString()}곳 / 원본 ${meta.totalRaw.toLocaleString()}곳.`
          : null}
      </p>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="기업명·주소 검색"
          className="h-10 flex-1 rounded border border-line bg-paper px-3 text-[14px] text-ink outline-none focus:border-ink"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="h-10 rounded border border-line bg-paper px-3 text-[14px] text-ink outline-none focus:border-ink sm:w-44"
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
            검색 결과 {filtered.length.toLocaleString()}곳
          </div>
          <ul className="flex-1 overflow-auto">
            {filtered.slice(0, 200).map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => focusItem(item)}
                  className={[
                    'w-full border-b border-line px-3 py-2.5 text-left transition-colors hover:bg-surface',
                    selectedId === item.id ? 'bg-surface' : '',
                  ].join(' ')}
                >
                  <p className="text-[13px] font-medium text-ink">{item.name}</p>
                  <p className="mt-0.5 text-[12px] text-ink-muted">{item.address}</p>
                </button>
              </li>
            ))}
            {filtered.length > 200 ? (
              <li className="px-3 py-2 text-[12px] text-ink-faint">
                상위 200건만 목록에 표시합니다. 검색어로 좁혀 보세요.
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      {meta ? (
        <p className="mt-5 text-[12px] leading-relaxed text-ink-faint">
          출처:{' '}
          <a
            href={meta.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:underline"
          >
            {meta.source}
          </a>
          {' · '}기준일 {meta.updatedAt} · 공공데이터 기반 자체 시각화이며, 주소
          좌표 변환 과정에서 누락·오차가 있을 수 있습니다.
        </p>
      ) : null}
    </div>
  )
}
