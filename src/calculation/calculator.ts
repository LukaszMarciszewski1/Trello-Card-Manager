import { materials, size } from 'data'
import { Description } from 'models/card'

export const calculator = (
  amount: number,
  selectedSize: string,
  selectedMaterial: string
) => {
  const filteredSelectedMaterial = materials.filter(
    (item) => item.value === selectedMaterial
  )
  const filteredSelectedSize = size.filter(
    (item: { value: string }) => item.value === selectedSize
  )

  const priceCalculations = ((filteredSelectedSize[0].price * (filteredSelectedMaterial[0] ? filteredSelectedMaterial[0].price : 0)) * amount)

  let amountModifier = 1

  switch (true) {
    case (amount >= 1 && amount <= 10):
      amountModifier = 1;
      break;
    case (amount >= 11 && amount <= 30):
      amountModifier = 0.7101449275362319;
      break;
    default:
      amountModifier = 1;
  }

  const price = (priceCalculations * amountModifier)

  return price
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

  const sum = Number(price.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(1))
  console.log(sum)
  return sum
}
