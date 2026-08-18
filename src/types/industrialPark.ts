export type IndustrialParkType = '국가' | '일반' | '도시첨단' | '농공' | string

export type IndustrialParkItem = {
  id: string
  type: IndustrialParkType
  sido: string
  sigungu: string
  name: string
  status: string
  designatedArea: number | null
  managedArea: number | null
  facilityArea: number | null
  saleTargetArea: number | null
  soldArea: number | null
  unsoldArea: number | null
  saleRate: number | null
  tenants: number | null
  operating: number | null
  lat: number
  lng: number
  address: string
  trendKey: string | null
}

export type IndustrialRegion = {
  id: string
  sido: string
  name: string
  address: string
  lat: number
  lng: number
  parkCount: number
  tenants: number
  operating: number
  byType: Record<string, number>
}

export type IndustrialTrend = {
  key: string
  sido: string | null
  tenants: number | null
  operating: number | null
  production: number | null
  productionQoQ: number | null
  employment: number | null
  employmentQoQ: number | null
  utilization: number | null
  utilizationQoQ: number | null
  lat: number | null
  lng: number | null
}

export type IndustrialParkDataset = {
  source: string
  sourceUrl: string
  statusAsOf: string
  trendAsOf: string
  updatedAt: string
  note: string
  summary: {
    parkCount: number
    byType: Record<
      string,
      {
        parks: number
        tenants: number | null
        operating: number | null
        saleRate?: number | null
        designatedArea?: number | null
      }
    >
  }
  totalParks: number
  trendMatched: number
  regions: IndustrialRegion[]
  parks: IndustrialParkItem[]
  trends: IndustrialTrend[]
}
