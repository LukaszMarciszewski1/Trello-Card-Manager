import { materials, sizes } from 'data'
import { Description } from 'models/card'

const priceObj = [
  {
    type: 'FLEX',
    size: 50,
    price: 6.9,
    amount: 10,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 100,
    price: 7.9,
    amount: 10,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 150,
    price: 8.9,
    amount: 10,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 250,
    price: 9.9,
    amount: 10,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 300,
    price: 10.9,
    amount: 10,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 400,
    price: 12.9,
    amount: 10,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 500,
    price: 14.9,
    amount: 10,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 625,
    price: 16.9,
    amount: 10,
    modifier: 1
  },
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>10
  {
    type: 'FLEX',
    size: 50,
    price: 4.9,
    amount: 30,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 100,
    price: 5.9,
    amount: 30,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 150,
    price: 6.9,
    amount: 30,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 250,
    price: 7.9,
    amount: 30,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 300,
    price: 8.9,
    amount: 30,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 400,
    price: 10.9,
    amount: 30,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 500,
    price: 12.4,
    amount: 30,
    modifier: 1
  },
  {
    type: 'FLEX',
    size: 625,
    price: 13.9,
    amount: 30,
    modifier: 1
  },
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>30
{
  type: 'FLEX',
  size: 50,
  price: 3.9,
  amount: 50,
  modifier: 1
},
{
  type: 'FLEX',
  size: 100,
  price: 4.4,
  amount: 50,
  modifier: 1
},
{
  type: 'FLEX',
  size: 150,
  price: 4.9,
  amount: 50,
  modifier: 1
},
{
  type: 'FLEX',
  size: 250,
  price: 5.9,
  amount: 50,
  modifier: 1
},
{
  type: 'FLEX',
  size: 300,
  price: 6.9,
  amount: 50,
  modifier: 1
},
{
  type: 'FLEX',
  size: 400,
  price: 7.9,
  amount: 50,
  modifier: 1
},
{
  type: 'FLEX',
  size: 500,
  price: 8.9,
  amount: 50,
  modifier: 1
},
{
  type: 'FLEX',
  size: 625,
  price: 10.9,
  amount: 50,
  modifier: 1
},
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>50
{
  type: 'FLEX',
  size: 50,
  price: 3,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLEX',
  size: 100,
  price: 3.4,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLEX',
  size: 150,
  price: 3.8,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLEX',
  size: 250,
  price: 4.5,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLEX',
  size: 300,
  price: 5.5,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLEX',
  size: 400,
  price: 6.1,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLEX',
  size: 500,
  price: 6.6,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLEX',
  size: 625,
  price: 7.1,
  amount: Infinity,
  modifier: 1
},
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>50
]

const priceModifier = [
  {
    name: 'STANDARD',
    modifier: 1
  },
  {
    name: 'PS EXTRA',
    modifier: 1.1
  },
  {
    name: 'FLUO',
    modifier: 1.2
  },
  {
    name: 'GLITTER',
    modifier: 1.5
  },
  {
    name: 'PS SUBLI',
    modifier: 1.15
  },

  {
    name: 'ELECTRIC',
    modifier: 1.15
  },
  {
    name: 'BRICK',
    modifier: 1.5
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
      case ((width * height) > 650):
        console.log('jest wieksze')
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

const getSelectedMaterialPrice = (selectedType: string | undefined, size: number, amount: number) => {
  if(!selectedType) return 0;
  const comparisonOfType = priceObj.filter((item: any) => item.type === selectedType)
  const typePrice = comparisonOfType.filter(item => ((item.size === size) && (item.amount >= amount)))[0]
  if(!typePrice) return 0;
  const price = typePrice.price
  // console.log(price)
  // console.log(typePrice)
  // console.log(amount)
  return typePrice.price
}

const getModifier = (value: any) => {
  if(value) {
    return priceModifier.filter(item => item.name === value)[0].modifier
  } else {
    return 1
  }
}

export const calculator = (
  amount: number,
  selectedSize: string,
  selectedMaterial: string,
  width: number,
  height: number
) => {
  const filteredSelectedMaterial = materials
    .filter((item) => item.value === selectedMaterial)

      const numberWidth = Number(width)
      const numberHeight = Number(height)
      const numberAmount = Number(amount)

  if(!filteredSelectedMaterial[0]) return 0;   
  if(numberWidth * numberHeight === 0) return 0
  
  const modifier = getModifier(filteredSelectedMaterial[0].priceModifier)
  console.log(filteredSelectedMaterial[0])
  
  const price = getSelectedMaterialPrice(
    filteredSelectedMaterial[0].priceType, 
    getSizeModifier(numberWidth, numberHeight),
    numberAmount
  )

  const priceCalculations = ((price * modifier) * numberAmount)

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
