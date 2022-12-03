

interface Description {
  id: string
  name: string
}

export interface Task {
  _id: string
  title: string
  description: {
    id: string
    name: string
  }[]
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
}
