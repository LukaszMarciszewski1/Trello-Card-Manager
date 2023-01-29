import axios from 'axios'
import { Card, CardDescription } from 'models/card'

const mapDescriptionToText = (description: CardDescription[]) => {
  const descSectionArray = description
    .map((desc, i) => {
      const materials = desc.materials.map((item: { field: any }) => item.field)
      const decsPriceForOnePiece = desc.priceForOnePiece > 0 ? `\n>Cena za 1 szt: ${desc.priceForOnePiece} zł` : ''
      const descPrice = desc.price > 0 ? `\n>Wartość sekcji: ${desc.price} zł` : ''
      const descMaterials = desc.materialType !== '' ? (
`       \n>Typ materiału: ${desc.materialType}
        \n>Materiał: ${materials.length ? materials.join(', ') : 'Nie wybrano'}`
      ) : ''

      return `
        \n\
        \n***Sekcja: ${i + 1} >>>>>>>>>>>>>>>>>>>>>***
        \n>**Logo: ${desc.logo}**
        \n>Ilość: ${desc.amount}
        \n>Tkanina: ${desc.fabric}
        \n>Szerokość: ${desc.width}cm
        \n>Wysokość: ${desc.height}cm
        \n>Rozmiar: ${desc.size}
        \n>Pakowanie: ${desc.packing ? 'TAK' : 'NIE'}
        ${descMaterials}
        ${decsPriceForOnePiece}
        ${descPrice}
        \n\n>Dodatkowy opis: ${desc.additionalDesc ? desc.additionalDesc : 'Brak'}
        \n-\n\n\n\
      `
    })
    .join('')
    .toString()
    return descSectionArray
}

const generateDescData = (data: Card) => {
  const {orderPrice, orderCost, filePath, description} = data
  const descriptionArray = mapDescriptionToText(description)
  const price = orderPrice > 0 ? `\n>Wartość zlecenia: ${orderPrice} zł` : ''
  const cost = orderCost > 0 ? `\n>Koszt zlecenia: ${orderCost} zł` : ''

  return `
      ${descriptionArray} 
      \n***Dane dodatkowe >>>>>>>>>>>>>>>>***
      \n>Plik produkcyjny: ${filePath ? `**${filePath}**` : 'Nie wybrano'}
      ${price}
      ${cost}
    `
}

const createFormDataCard = (data: Card, listId: string) => {
  const { title, startDate, endDate, member, recipient } = data
  const description = generateDescData(data)

  const formData = new FormData()
  formData.append('idList', listId)
  formData.append('name', title)
  formData.append('desc', description)
  formData.append('start', startDate)
  formData.append('due', endDate)
  formData.append('idMembers', `${member},${recipient}`)
  return formData
}

const createFormDataFile = (attachment: File[]) => {
  const formData = new FormData()
  formData.append('file', attachment[0])
  formData.append('setCover', 'false')
  return formData
}

const createFormDataChecklist = () => {
  const formData = new FormData()
  formData.append('name', 'Lista zadań')
  return formData
}

export const AddCardForm = async (data: Card, listId: string) => {
  const formInitialDataCard = createFormDataCard(data, listId)
  const formFileDataCard = createFormDataFile(data.attachment)
  const formChecklistDataCard = createFormDataChecklist()

  const config = {
    params: {
      key: process.env.REACT_APP_TRELLO_KEY,
      token: process.env.REACT_APP_TRELLO_TOKEN,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  }

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_TRELLO_URL}/cards`,
      formInitialDataCard,
      config
    )
    if (data.attachment.length) {
      await axios.post(
        `${process.env.REACT_APP_TRELLO_URL}/cards/${res.data.id}/attachments`,
        formFileDataCard,
        config
      )
    }
    const checklistRes = await axios.post(
      `${process.env.REACT_APP_TRELLO_URL}/cards/${res.data.id}/checklists`,
      formChecklistDataCard,
      config
    )
    await Promise.all(
      data?.description.map(async (desc) => {
        await axios.post(
          `${process.env.REACT_APP_TRELLO_URL}/checklists/${checklistRes.data.id}/checkItems`,
          {
            name: desc.logo,
            checked: false,
          },
          config
        )
      })
    )
  } catch (err) {
    console.error(err)
  }
}
