import { materials, sizes } from 'data'
import { Description } from 'models/card'

const getSizeModifier = (width: number, height: number) => {
  let size = 0

  switch (true) {
    case ((width * height) <= 50):
      size = 50
      break;
    case ((width * height) > 50 && (width * height) <= 100):
      size = 100;
      break;
    case ((width * height) > 100 && (width * height) <= 150):
      size = 150;
      break;
    case ((width * height) > 150 && (width * height) <= 250):
      size = 250;
      break;
    case ((width * height) > 250 && (width * height) <= 300):
      size = 300;
      break;
    case ((width * height) > 300 && (width * height) <= 400):
      size = 400;
      break;
    case ((width * height) > 400 && (width * height) <= 500):
      size = 500;
      break;
    case ((width * height) > 500 && (width * height) <= 650):
      size = 650;
      break;
    default:
      size = 0;
  }

  return size
}

const getAmountModifier = (amount: number) => {
  let modifier = 1

  switch (true) {
    case (amount >= 1 && amount <= 10):
      modifier = 1;
      break;
    case (amount >= 11 && amount <= 30):
      modifier = 0.7101449275362319;
      break;
    default:
      modifier = 1;
  }

  return modifier
}

export const calculator = (
  amount: number,
  selectedSize: string,
  selectedMaterial: string,
  width: number,
  height: number
) => {
  const filteredSelectedMaterial = materials.filter(
    (item) => item.value === selectedMaterial
  )
  const filteredSelectedSize = sizes.filter(
    (item: { value: string }) => item.value === selectedSize
  )
  const numberWidth = Number(width)
  const numberHeight = Number(height)
  const numberAmount = Number(amount)

  const priceCalculations = (
    (getSizeModifier(numberWidth, numberHeight) * (filteredSelectedMaterial[0] ? filteredSelectedMaterial[0].price : 0)) * numberAmount
  )

  const price = (priceCalculations * getAmountModifier(numberAmount))

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
      prices.push(calculator(Number(item.amount), item.size, material, item.width, item.height))
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
