import { Card, CardDescription } from 'models/card'
import * as constants from 'constants/index'

const mapDescriptionToText = (description: CardDescription[], department: string) => {
  const descSectionArray = description
    .map((desc, i) => {
      const materials = desc.materials.map((item: { field: any }) => item.field)
      const decsPriceForOnePiece = desc.priceForOnePiece > 0 ? 
       `\n- Cena za 1 szt: ${desc.priceForOnePiece} zł` : ''
      const descPrice = desc.price > 0 ? 
       `\n- Wartość sekcji: ${desc.price} zł` : ''
      const materialTxt = 
       `\n- Typ materiału: ${desc.materialType}\n- Materiał: ${materials.length ? materials.join(', ') : 'Nie wybrano'}`
      const descMaterials = department === constants.PLOTTER ? materialTxt : ''
      const additionalDesc = desc.additionalDesc ? desc.additionalDesc.replace(/\n/g, "> ") : 'Brak'  
      
      return `
        \n\
        \n***Sekcja: ${i + 1} >>>>>>>>>>>>>>>>>>>>>***
        \n- Logo: ${desc.logo}
        \n- Ilość: ${desc.amount}
        \n- Tkanina: ${desc.fabric}
        \n- Szerokość: ${desc.width}cm
        \n- Wysokość: ${desc.height}cm
        \n- Rozmiar: ${desc.size}
        \n- Pakowanie: ${desc.packing ? 'TAK' : 'NIE'}
        ${descMaterials}
        ${decsPriceForOnePiece}
        ${descPrice}
        \n- Dodatkowy opis: \n >_${additionalDesc}_
        \n\n\n\n\
      `
    })
    .join('')
    .toString()
  return descSectionArray
}

export const generateDescData = (data: Card) => {
  const { orderPrice, orderCost, filePath, description } = data
  const descriptionArray = mapDescriptionToText(description, data.department)
  const price = orderPrice > 0 ? `\n- Wartość zlecenia: ${orderPrice} zł` : ''
  const cost = orderCost > 0 ? `\n- Koszt zlecenia: ${orderCost} zł` : ''

  return `
      ${descriptionArray} 
      \n***Dane dodatkowe >>>>>>>>>>>>>>>>***
      \n- Plik produkcyjny: ${filePath ? `**${filePath}**` : 'Nie wybrano'}
      ${price}
      ${cost}
    `
}

const initialFormData = (data: Card, listId: string) => {
  const { title, startDate, endDate, member, recipient, orderPrice } = data
  const description = generateDescData(data)
  const formData = new FormData()
  formData.append('idList', listId)
  formData.append('name', title)
  formData.append('desc', description)
  formData.append('start', startDate)
  formData.append('due', endDate)
  formData.append('idMembers', `${member},${recipient}`)
  formData.append('customFieldItems', `${orderPrice}`)
  formData.append('pos', 'top')
  return formData
}

const customFieldsFormData = (data: any) => {
  const formData = new FormData()
  formData.append('value', data)
  return formData
}

const fileFormData = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('setCover', 'false')
  return formData
}

const checklistFormData = () => {
  const formData = new FormData()
  formData.append('name', 'Lista zadań')
  return formData
}

export const cardFormData = {
  initialFormData,
  fileFormData,
  checklistFormData,
  customFieldsFormData
}
