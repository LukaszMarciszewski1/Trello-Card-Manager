// import React, { useContext } from 'react';
import { useState } from 'react'
import axios from 'axios'
import { Card, CardDescription } from 'models/card'
import { generateDescData } from './trelloDescription/trelloDescription'

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

const createFormDataFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
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
  // const formFileDataCard = createFormDataFile(data.attachment)
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
      // await axios.post(
      //   `${process.env.REACT_APP_TRELLO_URL}/cards/${res.data.id}/attachments`,
      //   formFileDataCard,
      //   config
      // )
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

export const AddTrelloCard = () => {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const createCard = async (data: Card, listId: string) => {
    const formInitialDataCard = createFormDataCard(data, listId)
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

    setLoading(true)
    setSuccess(false)
    setError(false)
    
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_TRELLO_URL}/cards`,
        formInitialDataCard,
        config
      )

      if (data.attachment.length) {
        await Promise.all(
          [...data?.attachment].map(async (file) => {
            const formFileDataCard = createFormDataFile(file)
            await axios.post(
              `${process.env.REACT_APP_TRELLO_URL}/cards/${res.data.id}/attachments`,
              formFileDataCard,
              config
            )
          })
        )
      }

      const checklistRes = await axios.post(
        `${process.env.REACT_APP_TRELLO_URL}/cards/${res.data.id}/checklists`,
        formChecklistDataCard,
        config
      )

      if (data.description.length) {
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
      }

      setLoading(false)
      setSuccess(true)

    } catch (err) {
      setError(true)
      console.error(err)
    }
  }

  return { createCard, success, error, loading }
}
