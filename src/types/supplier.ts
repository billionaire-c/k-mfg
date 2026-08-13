export type SupplierItem = {
  id: string
  name: string
  address: string
  phone?: string
  lat: number
  lng: number
}

export type SupplierDataset = {
  source: string
  sourceUrl: string
  updatedAt: string
  totalRaw: number
  totalMapped: number
  items: SupplierItem[]
}
