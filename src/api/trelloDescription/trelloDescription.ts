import { Card, CardDescription } from 'models/card'

const mapDescriptionToText = (description: CardDescription[]) => {
  const descSectionArray = description
    .map((desc, i) => {
      const materials = desc.materials.map((item: { field: any }) => item.field)
      const decsPriceForOnePiece =
        desc.priceForOnePiece > 0
          ? `\n- Cena za 1 szt: ${desc.priceForOnePiece} zł`
          : ''
      const descPrice = desc.price > 0 ? `\n- Wartość sekcji: ${desc.price} zł` : ''
      const materialTxt = `\n- Typ materiału: ${desc.materialType} \n- Materiał: ${materials.length ? materials.join(', ') : 'Nie wybrano'}`
      const descMaterials = desc.materialType !== '' ? materialTxt : ''
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
  const descriptionArray = mapDescriptionToText(description)
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
