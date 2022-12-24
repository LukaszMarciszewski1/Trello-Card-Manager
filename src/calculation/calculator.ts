import { materials, size } from 'data'
import { Description } from 'models/card'

export const calculator = (
  amount: number,
  selectSize: string,
  selectMaterial: string
) => {
  const filterSelectedMaterial = materials.filter(
    (item) => item.value === selectMaterial
  )
  const filterSelectedSize = size.filter(
    (item: { value: string }) => item.value === selectSize
  )

  return (
    ((filterSelectedMaterial[0] ? filterSelectedMaterial[0].price : 0) +
      filterSelectedSize[0].price) * amount
  )
}

export const getPrice = (descriptionValues: Description[]) => {
  const updateDescription = [...descriptionValues]
  let price: number[] = []

  updateDescription.map((item) => {
    const material = (
      item.materials.length ? item.materials[0].field : ''
    ).toString()
    if (!item.materials.length) {
      price.push(0)
    } else {
      price.push(calculator(Number(item.amount), item.size, material))
    }
  })

  const sum = price.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  return sum
}
