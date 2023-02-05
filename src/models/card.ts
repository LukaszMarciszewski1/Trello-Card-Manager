export interface MaterialField {
  field: {
    name: string
    value: string
    color: string
  }
}
export interface CardDescription {
  materialAccess: boolean
  materialType?: string | undefined
  logo: string
  fabric: string
  amount: number
  width: number
  height: number
  additionalDesc: string
  priceForOnePiece: number
  price: number
  customPrice: boolean
  materials: MaterialField[]
  size: string
  packing: boolean
}

export interface Card {
  title: string
  department: string
  description: CardDescription[]
  startDate: string | Blob
  endDate: string | Blob
  member: string
  recipient: string
  attachment: File[]
  filePath: string
  orderPrice: number
  orderCost: number
}
