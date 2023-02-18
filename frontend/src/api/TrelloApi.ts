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
  const [members, setMembers] = useState([])
  const [lists, setLists] = useState([])

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

    } catch (err) {
      setError(true)
      console.error(err)
    }
  };

  const deleteCard = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_TRELLO_URL}/cards/${id}`, config)
      setSuccess(true)
    } catch (error) {
      console.error(error);
      setError(true)
    }
  }

  const getBoards = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_TRELLO_GET_BOARDS}`, config)
      setBoards(res.data)
      return res.data
    } catch (error) {
      console.error(error);
    }
  }


  const getLists = async (filter: string) => {
    try {
      const boards = await getBoards()
      const allLists = await Promise.all(
        boards
          .map((board: { id: string }) => board.id)
          .map(async (id: string) => {
            const boardList = await axios.get(
              `${process.env.REACT_APP_TRELLO_URL}/boards/${id}/lists/${filter}`, 
              config
            )
        return boardList.data
      }))
      .then(res => {
        const lists = [].concat(...res)
        setLists(lists)
      })
    } catch (error) {
      console.error(error);
    }
  }

  const getMembers = async () => {
    try {
      const boards = await getBoards()
      const allMembers = await Promise.all(
        boards
          .map((board: { id: string }) => board.id)
          .map(async (id: string) => {
            const boardMembers = await axios.get(
              `${process.env.REACT_APP_TRELLO_URL}/boards/${id}/members`, 
              config
            )
        return boardMembers.data
      }))
      .then(res => {
        const filterUniqueArray = () => {
          const allMembers = [].concat(...res)
          const ids = allMembers?.map((o: any) => o.id)
          return allMembers.filter(({id}, index) => !ids.includes(id, index + 1))
        }
        setMembers(filterUniqueArray())
      })
    } catch (error) {
      console.error(error);
    }
  }
    

  const getAllCards = async (filter: string) => {
    try {
      const boards = await getBoards()
      const allCards = await Promise.all(
        boards
         .map((board: { id: string }) => board.id)
         .map(async (id: string) => {
           const boardCards = await axios.get(
            `${process.env.REACT_APP_TRELLO_URL}/boards/${id}/cards/${filter}`, 
            config
          )
           return boardCards.data
        })
      )
      .then(res => { 
        const allCards = [].concat(...res)
        setCards(allCards);
      })
    } catch (error) {
      console.error(error);
    }
  }
  
  return { 
    addCardToTrello, 
    getAllCards, 
    getMembers,
    getLists,
    getBoards,
    deleteCard,
    cards,
    members,
    lists,
    boards,
    success, 
    error, 
    loading 
  }
}