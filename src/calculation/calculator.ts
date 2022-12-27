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

const priceArray = (data: Description[]) => {
  let prices: number[] = []

  data.map((item) => {
    const material = (
      item.materials.length ? item.materials[0].field : ''
    ).toString()
    if (!item.materials.length) {
      prices.push(0)
    } else {
      prices.push(calculator(Number(item.amount), item.size, material))
    }
  })
  return prices
}

export const getPriceForSection = (data: Description[], index: number) => {
  const sectionForms = [...data]
  const sum = Number(priceArray(sectionForms)[index]).toFixed(1)
  return sum
}

export const getTotalPrice = (data: Description[]) => {
  const sectionForms = [...data]
  const sum = Number(priceArray(sectionForms).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(1))
  return sum
}
