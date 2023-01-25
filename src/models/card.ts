export interface Materials {
  field: {
    name: string
    value: string
    color: string
  }
}
export interface Description {
  materialType: string
  logo: string
  fabric: string
  amount: number
  width: number
  height: number
  additionalDesc: string
  priceForOnePiece: number
  price: number
  customPrice: boolean
  materials: Materials[]
  size: string
  packing: boolean
}

export interface Card {
  _id: string | number
  title: string
  department: string
  description: Description[]
  startDate: Date | any
  endDate: Date | any
  member: string
  attachment: File | any
  recipient: string
  price: number
  filePath: string
  costOfOrder: number
  board: string
}
