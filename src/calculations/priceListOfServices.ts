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
  selectedMaterialType: string | undefined,
  size: number,
  amount: number
): number => {
  if (!selectedMaterialType) return 0
  const comparisonOfMaterialType = [...materialsPriceList].filter(
    (item: any) => item.type === selectedMaterialType
  )
  const materialType = comparisonOfMaterialType.filter(
    (item) => item.size === size && item.amount >= amount
  )[0]
  if (!materialType) return 0
  return materialType.price
}

const getMaterialModifier = (value: string | undefined): number => {
  if (value) {
    return [...modifiersPriceList].filter((item) => item.name === value)[0]
      .modifier
  } else {
    return 1
  }
}

const calculateDefaultPrice = (
  amount: number,
  material: string,
  width: number,
  height: number
): number => {
  const selectedWidth = Number(width)
  const selectedHeight = Number(height)
  const selectedAmount = Number(amount)
  const selectedMaterial = materials.filter(
    (item) => item.value === material
  )

  if (!selectedMaterial[0]) return 0
  if (amount === 0) return 0
  if (selectedWidth * selectedHeight === 0) return 0

  const materialModifier = getMaterialModifier(
    selectedMaterial[0].priceModifier
  )
  const materialPrice = getSelectedMaterialPrice(
    selectedMaterial[0].priceType,
    getSizeModifier(selectedWidth, selectedHeight),
    selectedAmount
  )
  const price = materialPrice * materialModifier * selectedAmount
  return price
}

const calculatePackingPrice = (data: CardDescription): number => {
  const priceForPacking = data?.packing ? data.amount * packingPrice : 0
  return priceForPacking
}

const customPrices = (data: CardDescription[]): number[] => {
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

const defaultPrices = (
  data: CardDescription[],
  onlyForOnePiece: boolean
): number[] => {
  let prices: number[] = []
  data.map((item, index) => {
    const material = (
      item.materials.length ? item.materials[0].field : ''
    ).toString()
    const price = calculateDefaultPrice(
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
        : prices.push(price + calculatePackingPrice(data[index]))
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
    : defaultPrices(sectionForms, true)[index]

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
  const calculatorPrice = defaultPrices(sectionForms, false)[index]
  const customPrice = (
    sectionForms[index]?.priceForOnePiece * sectionForms[index]?.amount +
    calculatePackingPrice(sectionForms[index])
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
  const totalDefaultPrice = Number(
    defaultPrices(sectionForms, false).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
  )
  const totalCustomPrice = Number(
    customPrices(sectionForms).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
  )
  const totalPrice = totalCustomPrice > 0 ? (totalDefaultPrice + totalCustomPrice) : totalDefaultPrice
  return Number(totalPrice.toFixed(1))
}
