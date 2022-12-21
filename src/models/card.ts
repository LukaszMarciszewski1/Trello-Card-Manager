export interface Description {
  logo: string
  fabric: string
  amount: number
  width: number
  height: number
  additionalDesc: string
  price: number
  materials: any
  size: string
}

export interface Card {
  _id: string | number
  title: string
  description: Description[]
  materials: string[] | string
  production: string[] | string
  startDate: Date | any
  deadline: Date | any
  fabric: string
  amount: number
  width: number
  height: number
  size: string
  price: number | null
  member: string
  attachment: File | any
  recipient: string
  filePath: string
}
