export interface Task {
  _id: string
  title: string
  logo: string
  test: any
  traders: string
  materials: string[] | string
  production: string[] | string
  dateAdmission: Date | any
  deadline: Date | any
  fabric: string
  amount: number
  width: number
  height: number
  size: string
  price: number | null
}
