import { CardDescription } from 'models/card'
import { materials, sizes } from 'data/formData/index'
import {
  materialsPriceList,
  modifiersPriceList,
  packingPrice,
} from 'data/priceListData/index'

import * as constants from 'constants/index'

const getSizeModifier = (width: number, height: number): number => {
  const limits = sizes.map((item) => item.size)
  limits.unshift(0)
  let size = 0
  for (let i = 0; i < limits.length; i++) {
    if (width * height <= limits[i]) {
      size = limits[i]
      break
    }
  }
  return size
}

const getSelectedMaterialPrice = (
  selectedType: string | undefined,
  size: number,
  amount: number
): number => {
  if (!selectedType) return 0
  const comparisonOfType = [...materialsPriceList].filter(
    (item: any) => item.type === selectedType
  )
  const typePrice = comparisonOfType.filter(
    (item) => item.size === size && item.amount >= amount
  )[0]
  if (!typePrice) return 0
  return typePrice.price
}

const getMaterialModifier = (value: string | undefined): number => {
  if (value) {
    return [...modifiersPriceList].filter((item) => item.name === value)[0]
      .modifier
  } else {
    return 1
  }
}

const priceCalculator = (
  amount: number,
  selectedMaterial: string,
  width: number,
  height: number
): number => {
  const numberWidth = Number(width)
  const numberHeight = Number(height)
  const numberAmount = Number(amount)
  const filteredSelectedMaterial = materials.filter(
    (item) => item.value === selectedMaterial
  )

  if (!filteredSelectedMaterial[0]) return 0
  if (amount === 0) return 0
  if (numberWidth * numberHeight === 0) return 0

  const modifier = getMaterialModifier(
    filteredSelectedMaterial[0].priceModifier
  )
  const price = getSelectedMaterialPrice(
    filteredSelectedMaterial[0].priceType,
    getSizeModifier(numberWidth, numberHeight),
    numberAmount
  )
  const priceCalculations = price * modifier * numberAmount
  return priceCalculations
}

const getPriceForPacking = (data: CardDescription): number => {
  const priceForPacking = data?.packing ? data.amount * packingPrice : 0
  return priceForPacking
}

const priceCustomArray = (data: CardDescription[]): number[] => {
  const sectionForms = [...data]
  const sectionPriceArray: number[] = []
  sectionForms
    .filter((item) => item.customPrice === true)
    .map((item) => {
      const price = Number(item.price)
      sectionPriceArray.push(price)
    })
  return sectionPriceArray
}

const priceCalculatorArray = (
  data: CardDescription[],
  onlyForOnePiece: boolean
): number[] => {
  let prices: number[] = []
  data.map((item, index) => {
    const material = (
      item.materials.length ? item.materials[0].field : ''
    ).toString()
    const price = priceCalculator(
      Number(item.amount),
      material,
      item.width,
      item.height
    )
    if (!item.materials.length) {
      prices.push(0)
    } else {
      onlyForOnePiece
        ? prices.push(price / Number(item.amount))
        : prices.push(price + getPriceForPacking(data[index]))
    }
  })
  return prices
}

export const isMoreThanMaximumSize = (
  data: CardDescription[],
  index: number
): boolean => {
  const limits = sizes.map((item) => item.size)
  const sectionForm = [...data][index]
  let isMaxSize: boolean = false
  if (sectionForm?.width * sectionForm?.height > Math.max(...limits)) {
    isMaxSize = true
  } else if (
    !sectionForm?.materialAccess &&
    sectionForm?.width * sectionForm?.height > 0
  ) {
    isMaxSize = true
  }
  return isMaxSize
}

export const getPriceForOnePieceOfSection = (
  data: CardDescription[],
  index: number
): number => {
  const sectionForms = [...data]
  const sum = isMoreThanMaximumSize(sectionForms, index)
    ? sectionForms[index]?.priceForOnePiece
    : priceCalculatorArray(sectionForms, true)[index]

  let price = Number(sum)
  if (isNaN(price)) {
    price = 0
  }
  return Number(price.toFixed(1))
}

export const getPriceForSection = (
  data: CardDescription[],
  index: number
): number => {
  const sectionForms = [...data]
  const calculatorPrice = priceCalculatorArray(sectionForms, false)[index]
  const customPrice = (
    sectionForms[index]?.priceForOnePiece * sectionForms[index]?.amount +
    getPriceForPacking(sectionForms[index])
  )

  const sum = isMoreThanMaximumSize(sectionForms, index)
    ? customPrice
    : calculatorPrice

  let price = Number(sum)
  if (isNaN(price)) {
    price = 0
  }
  return Number(price.toFixed(1))
}

export const getSelectedSizeName = (
  data: CardDescription[],
  index: number
): string => {
  const sectionForms = [...data][index]
  const sizesOptions = [...sizes]
  const maxValue = Math.max(...sizesOptions.map((obj) => obj.size))
  const CHOOSE_SIZE = constants.CHOOSE_SIZE.toUpperCase()
  const CUSTOM_SIZE = constants.CUSTOM_SIZE.toUpperCase()

  if (!sectionForms?.width && !sectionForms?.height) return CHOOSE_SIZE
  if (sectionForms?.width * sectionForms?.height > maxValue) return CUSTOM_SIZE

  const selectedSize = sizesOptions.find(
    (option) =>
      option.size === getSizeModifier(sectionForms.width, sectionForms.height)
  )
  let formSize = selectedSize === undefined ? CHOOSE_SIZE : selectedSize.name
  return formSize
}

export const isDisplayFabric = (data: CardDescription): boolean => {
  const selectMaterial = data?.materials.map((material) =>
    data?.materials.length ? material.field : ''
  )[0]
  const typeOfSolvent = materials
    .filter((material) => material.priceType === constants.SOLVENT_PRINTING)
    .map((item) => {
      if (item.value === selectMaterial) return true
      else return false
    })
    .filter((bool) => bool === true)[0]

  let isTheSame = typeOfSolvent === true ? typeOfSolvent : false
  return isTheSame
}

export const getTotalPrice = (data: CardDescription[]): number => {
  const sectionForms = [...data]
  const calculatorPrice = Number(
    priceCalculatorArray(sectionForms, false).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
  )
  const customPrice = Number(
    priceCustomArray(sectionForms).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
  )
  const price = customPrice > 0 ? calculatorPrice + customPrice : calculatorPrice
  return Number(price.toFixed(1))
}
