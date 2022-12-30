export interface Materials {
  field: {
    name: string
    value: string
    color: string
  }
}
export interface Description {
  logo: string
  fabric: string
  amount: number | string
  width: number
  height: number
  additionalDesc: string
  priceForOnePiece: number | string
  price: number | string
  customPrice: boolean
  materials: Materials[]
  size: string
}

export interface Card {
  _id: string | number
  title: string
  description: Description[]
  startDate: Date | any
  endDate: Date | any
  member: string
  attachment: File | any
  recipient: string
  price: number | string
  filePath: string
}
