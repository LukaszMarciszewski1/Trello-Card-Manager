import { materials, sizes } from 'data'
import { Description } from 'models/card'

const priceObj = [
  {
    type: 'FLEX',
    size: 50,
    price: 6.9,
    amount: 10
  },
  {
    type: 'FLEX',
    size: 100,
    price: 7.9,
    amount: 10
  },
  {
    type: 'FLEX',
    size: 100,
    price: 5.9,
    amount: 20
  },
]

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

const getSelectedMaterialType = (selectedType: string | undefined, size: number) => {
  if(!selectedType) return 0;
  const comparisonOfType = priceObj.filter((item: any) => item.type === selectedType)
  const typePrice = comparisonOfType.filter(item => item.size === size)[0]
  return typePrice.price
}

const getMaterialPriceModifier = (materialPrice: number, amount : number) => {
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

  const price = (modifier * materialPrice)

  return price
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
  const materialType = materials.filter(
    (item) => item.value === selectedMaterial
    )
    const filteredSelectedSize = sizes.filter(
      (item: { value: string }) => item.value === selectedSize
      )
      const numberWidth = Number(width)
      const numberHeight = Number(height)
      const numberAmount = Number(amount)

  if(!filteredSelectedMaterial[0]) return 0;   

  const price = getSelectedMaterialType(filteredSelectedMaterial[0].priceType, getSizeModifier(numberWidth, numberHeight))
  console.log(price)

  const sizeModifier = getSizeModifier(numberWidth, numberHeight)
  const materialModifier = filteredSelectedMaterial[0] ? getMaterialPriceModifier(filteredSelectedMaterial[0].price, numberAmount) : 0

  const priceCalculations = (price * numberAmount)

  return priceCalculations
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



















// import { materials, sizes } from 'data'
// import { Description } from 'models/card'

// const priceObj = [
//   {
//     type: 'FLEX',
//     size: 50,
//     price: 6.9,
//     amount: 10
//   },
//   {
//     type: 'FLEX',
//     size: 100,
//     price: 7.9,
//     amount: 10
//   },
//   {
//     type: 'FLEX',
//     size: 100,
//     price: 5.9,
//     amount: 20
//   },
// ]

// const getSizeModifier = (width: number, height: number) => {
//   let size = 0

//   switch (true) {
//     case ((width * height) <= 50):
//       size = 50
//       break;
//     case ((width * height) > 50 && (width * height) <= 100):
//       size = 100;
//       break;
//     case ((width * height) > 100 && (width * height) <= 150):
//       size = 150;
//       break;
//     case ((width * height) > 150 && (width * height) <= 250):
//       size = 250;
//       break;
//     case ((width * height) > 250 && (width * height) <= 300):
//       size = 300;
//       break;
//     case ((width * height) > 300 && (width * height) <= 400):
//       size = 400;
//       break;
//     case ((width * height) > 400 && (width * height) <= 500):
//       size = 500;
//       break;
//     case ((width * height) > 500 && (width * height) <= 650):
//       size = 650;
//       break;
//     default:
//       size = 0;
//   }

//   return size
// }

// const getAmountModifier = (amount: number) => {
//   let modifier = 1

//   switch (true) {
//     case (amount >= 1 && amount <= 10):
//       modifier = 1;
//       break;
//     case (amount >= 11 && amount <= 30):
//       modifier = 0.7101449275362319;
//       break;
//     default:
//       modifier = 1;
//   }

//   return modifier
// }

// const getSelectedMaterialTypeModifier = (selectedType: string | undefined) => {
//   if(!selectedType) return;
//   const comparisonOfType = materials.filter((item: any) => item.priceType === selectedType)
  
//   const isSameType = comparisonOfType ? true : false
//   return isSameType
// }

// const getMaterialPriceModifier = (materialPrice: number, amount : number) => {
//   let modifier = 1

//   switch (true) {
//     case (amount >= 1 && amount <= 10):
//       modifier = 1;
//       break;
//     case (amount >= 11 && amount <= 30):
//       modifier = 0.7101449275362319;
//       break;
//     default:
//       modifier = 1;
//   }

//   const price = (modifier * materialPrice)

//   return price
// }

// export const calculator = (
//   amount: number,
//   selectedSize: string,
//   selectedMaterial: string,
//   width: number,
//   height: number
// ) => {
//   const filteredSelectedMaterial = materials.filter(
//     (item) => item.value === selectedMaterial
//   )
//   const materialType = materials.filter(
//     (item) => item.value === selectedMaterial
//     )
//     const filteredSelectedSize = sizes.filter(
//       (item: { value: string }) => item.value === selectedSize
//       )
//       const numberWidth = Number(width)
//       const numberHeight = Number(height)
//       const numberAmount = Number(amount)
      


//   console.log(filteredSelectedMaterial)

//   const sizeModifier = getSizeModifier(numberWidth, numberHeight)
//   const materialModifier = filteredSelectedMaterial[0] ? getMaterialPriceModifier(filteredSelectedMaterial[0].price, numberAmount) : 0

//   const priceCalculations = ((sizeModifier * materialModifier) * numberAmount)

//   return priceCalculations
// }

// const priceArray = (data: Description[]) => {
//   let prices: number[] = []

//   data.map((item) => {
//     const material = (
//       item.materials.length ? item.materials[0].field : ''
//     ).toString()
//     if (!item.materials.length) {
//       prices.push(0)
//     } else {
//       prices.push(calculator(Number(item.amount), item.size, material, item.width, item.height))
//     }
//   })

//   return prices
// }

// export const getPriceForSection = (data: Description[], index: number) => {
//   const sectionForms = [...data]
//   const sum = Number(priceArray(sectionForms)[index]).toFixed(1)
//   return sum
// }

// export const getTotalPrice = (data: Description[]) => {
//   const sectionForms = [...data]
//   const sum = Number(priceArray(sectionForms).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(1))
//   return sum
// }
