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
//FLOCK//////////////////////////////////////////////////////////////////
{
  type: 'FLOCK',
  size: 50,
  price: 7.7,
  amount: 10,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 100,
  price: 8.7,
  amount: 10,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 150,
  price: 9.7,
  amount: 10,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 250,
  price: 11.7,
  amount: 10,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 300,
  price: 12.7,
  amount: 10,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 400,
  price: 14.7,
  amount: 10,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 500,
  price: 16.7,
  amount: 10,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 625,
  price: 19.2,
  amount: 10,
  modifier: 1
},
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>10
{
  type: 'FLOCK',
  size: 50,
  price: 5.5,
  amount: 30,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 100,
  price: 6.5,
  amount: 30,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 150,
  price: 7.5,
  amount: 30,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 250,
  price: 9.5,
  amount: 30,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 300,
  price: 10.5,
  amount: 30,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 400,
  price: 11.9,
  amount: 30,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 500,
  price: 12.9,
  amount: 30,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 625,
  price: 14.9,
  amount: 30,
  modifier: 1
},
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>30
{
  type: 'FLOCK',
  size: 50,
  price: 4.5,
  amount: 50,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 100,
  price: 5.5,
  amount: 50,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 150,
  price: 6.5,
  amount: 50,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 250,
  price: 7.9,
  amount: 50,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 300,
  price: 8.9,
  amount: 50,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 400,
  price: 9.9,
  amount: 50,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 500,
  price: 10.9,
  amount: 50,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 625,
  price: 11.9,
  amount: 50,
  modifier: 1
},
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>50
{
  type: 'FLOCK',
  size: 50,
  price: 3.5,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 100,
  price: 4.3,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 150,
  price: 5,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 250,
  price: 6,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 300,
  price: 7,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 400,
  price: 8,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 500,
  price: 9,
  amount: Infinity,
  modifier: 1
},
{
  type: 'FLOCK',
  size: 625,
  price: 10.5,
  amount: Infinity,
  modifier: 1
},
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

const getSizeModifier = (width: number, height: number) : number => {
  let size = 0

  switch (true) {
    case ((width * height) === 0):
      size = 0
      break;
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
    case ((width * height) > 500 && (width * height) <= 625):
      size = 625;
      break;
    case ((width * height) > 625):
      size = 626
      break;
    default:
      size = 0;
  }

  return size
}

const getSelectedMaterialPrice = (selectedType: string | undefined, size: number, amount: number) : number => {
  if(!selectedType) return 0;
  const comparisonOfType = priceObj.filter((item: any) => item.type === selectedType)
  const typePrice = comparisonOfType.filter(item => ((item.size === size) && (item.amount >= amount)))[0]
  if(!typePrice) return 0;
  return typePrice.price
}

const getMaterialModifier = (value: string | undefined) : number => {
  if(value) {
    return priceModifier.filter(item => item.name === value)[0].modifier
  } else {
    return 1
  }
}

export const observeForm = (data: Description[]) : number => {
  const sectionForms = [...data]
  const dataPrises = sectionForms
    .map(item => item.price)
    .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0)
  return dataPrises
}

export const calculator = (
  amount: number,
  selectedMaterial: string,
  width: number,
  height: number,
) => {
  const filteredSelectedMaterial = materials
    .filter((item) => item.value === selectedMaterial)

      const numberWidth = Number(width)
      const numberHeight = Number(height)
      const numberAmount = Number(amount)

  if(!filteredSelectedMaterial[0]) return 0;  
  if(amount === 0) return 0 
  if(numberWidth * numberHeight === 0) return 0
  
  const modifier = getMaterialModifier(filteredSelectedMaterial[0].priceModifier)
  
  const price = getSelectedMaterialPrice(
    filteredSelectedMaterial[0].priceType, 
    getSizeModifier(numberWidth, numberHeight),
    numberAmount
  )
  // console.log(`cena za 1 szt: ${(price * modifier).toFixed(2)} zł`)
  const priceCalculations = (((price * modifier) * numberAmount))

  return priceCalculations
}

export const customPriceArray = (data: Description[], onlyForOnePiece: boolean) : number[] => {
  const sectionForms = [...data]
  let pricesArray: number[] = []
  let onePieceArray: number[] = []
  sectionForms
    .filter(item => item.customPrice === true)
    .map(item => {
       onePieceArray.push(Number(item.priceForOnePiece))
       pricesArray.push(Number(item.price))
    })
  return onlyForOnePiece ? onePieceArray : pricesArray
}

const calculatorPriceArray = (data: Description[], onlyForOnePiece: boolean) : number[] => {
  let prices: number[] = []
  data.map((item) => {
    const material = (
      item.materials.length ? item.materials[0].field : ''
    ).toString()
    if (!item.materials.length) {
      prices.push(0)
    } else {
      onlyForOnePiece ? 
      prices.push(calculator(1, material, item.width, item.height)) : 
      prices.push(calculator(Number(item.amount), material, item.width, item.height))
    }
  })
  return prices
}

export const isMoreThanMaximumSize = (data: Description[], index: number) : boolean => {
  const sectionForm = [...data][index]
  let isMaxSize: boolean = false
  if((sectionForm?.width * sectionForm?.height) > 625){
    isMaxSize = true
  }
  return isMaxSize
}

export const getPriceForOnePieceOfSection = (data: Description[], index: number) : number => {
  const sectionForms = [...data]
  const sum = isMoreThanMaximumSize(sectionForms, index) ? 
    customPriceArray(sectionForms, true)[index] :
    calculatorPriceArray(sectionForms, true)[index]
  let price = Number(sum)

  //initial form section
  if (isNaN(price)) {
    price = 0;
  }
  return price
}

export const getPriceForSection = (data: Description[], index: number) : number => {
  const sectionForms = [...data]
  let amount = sectionForms[index]?.amount ?  Number(sectionForms[index].amount) : 0
  const sum = isMoreThanMaximumSize(sectionForms, index) ? 
   (customPriceArray(sectionForms, true)[index] * amount)
    //  customPriceArray(sectionForms, false)[index] 
     : 
    //  (customPriceArray(sectionForms, true)[index] * sectionForms[index].amount)
     calculatorPriceArray(sectionForms, false)[index]
  let price = Number(sum)
  
  //initial form section
  if (isNaN(price)) {
    price = 0;
  }

  return price
}

export const getTotalPrice = (data: Description[]) : number => {
  const sectionForms = [...data]
  
  const calculatorPrice = Number(calculatorPriceArray(sectionForms, false)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    .toFixed(1))

  const customPrice = Number(customPriceArray(sectionForms, false)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    .toFixed(1))

  const sum = customPrice > 0 ? (calculatorPrice + customPrice) : calculatorPrice
  return sum
}