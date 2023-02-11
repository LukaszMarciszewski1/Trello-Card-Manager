import { useState } from 'react'
import axios from 'axios'
import { Card } from 'models/card'
import { cardFormData } from './cardFormData/cardFormData'

export function TrelloApi() {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([])
  const [boards, setBoards] = useState([])
  const [trelloCardId, setTrelloCardId] = useState<string>('')

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

  const addCardToTrello = async (data: Card, listId: string) => {
    const formInitialDataCard = cardFormData.initialFormData(data, listId)
    const formChecklistDataCard = cardFormData.checklistFormData()

    setLoading(true)
    setSuccess(false)
    setError(false)
    
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_TRELLO_URL}/cards`,
        formInitialDataCard,
        config
      )
      
      await Promise.all(
        [...data.attachment]?.map(async (file) => {
          const formFileDataCard = cardFormData.fileFormData(file)
          console.log(data)
          await axios.post(
            `${process.env.REACT_APP_TRELLO_URL}/cards/${res.data.id}/attachments`,
            formFileDataCard,
            config
          )
        })
      )

      const checklistRes = await axios.post(
        `${process.env.REACT_APP_TRELLO_URL}/cards/${res.data.id}/checklists`,
        formChecklistDataCard,
        config
      )

      await Promise.all(
        data?.description?.map(async (desc) => {
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

      setLoading(false)
      setSuccess(true)
      setTrelloCardId(res.data.id)

    } catch (err) {
      setError(true)
      console.error(err)
    }
  };

  const getBoards = async () => {
    try {
      const boards = await axios.get(`${process.env.REACT_APP_TRELLO_GET_BOARDS}`, config)
    } catch (error) {
      console.error(error);
    }
  }

  const getBoardId = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_TRELLO_GET_BOARDS}`, config)
      return res.data.map((board: { id: string }) => board.id)
    } catch (error) {
      console.error(error);
    }
  }

  const getAllCards = async (filter: string) => {
    try {
      // const boardsId = await getBoardId()
      // const allCards = await Promise.all(
      //   boardsId.map(async (id: string) => {
      //    const boardCards = await axios.get(`${process.env.REACT_APP_TRELLO_URL}/boards/${id}/cards/${filter}`, config)
      //   setCards(boardCards.data)
      //   })
      // )
      // return [].concat(...allCards)
      await axios.get(`${process.env.REACT_APP_TRELLO_URL}/boards/63adfba73c9cc503e6215d7f/cards`, 
      config
      )
      .then(res => { 
        setCards(res.data);
        console.log(res.data)
      })
    } catch (error) {
      console.error(error);
    }
  }
  //63adfba73c9cc503e6215d7f
  //https://api.trello.com/1/boards/{id}/cards/visible

  return { 
    addCardToTrello, 
    getBoardId, 
    getAllCards, 
    getBoards,
    cards,
    trelloCardId,
    success, 
    error, 
    loading 
  }
}
