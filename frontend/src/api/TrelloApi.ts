import { useState } from 'react'
import axios from 'axios'
import { Card } from 'models/card'
import { cardFormData } from './cardFormData/cardFormData'

export function TrelloApi() {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState<any>([])
  const [boards, setBoards] = useState([])
  const [trelloCardId, setTrelloCardId] = useState<string>('')
  const [members, setMembers] = useState([])
  const [traders, setTraders] = useState([])

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

  const getBoardIds = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_TRELLO_GET_BOARDS}`, config)
      return res.data.map((board: { id: string }) => board.id)
    } catch (error) {
      console.error(error);
    }
  }

  const getMembers = async () => {
    try {
      const boardsIds = await getBoardIds()
      const allMembersArray = await Promise.all(
        boardsIds.map(async (id: string) => {
         const boardMembers = await axios.get(`${process.env.REACT_APP_TRELLO_URL}/boards/${id}/members`, config)
        return boardMembers.data
      }))
      .then(res => {
        const allMembers = [].concat(...res)
        const ids = allMembers?.map((o: any) => o.id)
        const uniqueArray = allMembers.filter(({id}, index) => !ids.includes(id, index + 1))
        setMembers(uniqueArray)
        // return uniqueArray
      })
    //  const allMembers = [].concat(...allMembersArray)
    //  const ids = allMembers?.map((o: any) => o.id)
    //  const uniqueArray = allMembers.filter(({id}, index) => !ids.includes(id, index + 1))
    //  setMembers(uniqueArray)
    //  return uniqueArray
    } catch (error) {
      console.error(error);
    }
  }

  const getAllCards = async (filter: string) => {
    try {
      const boardsIds = await getBoardIds()
      const allCards = await Promise.all(
        boardsIds.map(async (id: string) => {
         const boardCards = await axios.get(`${process.env.REACT_APP_TRELLO_URL}/boards/${id}/cards/${filter}`, config)
        return boardCards.data
        })
      )
      .then(res => { 
        const allCards = [].concat(...res)
        console.log(allCards)
        setCards(allCards);
      })
    } catch (error) {
      console.error(error);
    }
  }
  //63adfba73c9cc503e6215d7f
  //https://api.trello.com/1/boards/{id}/cards/visible

  return { 
    addCardToTrello, 
    getBoardIds, 
    getAllCards, 
    getBoards,
    getMembers,
    members,
    cards,
    trelloCardId,
    success, 
    error, 
    loading 
  }
}


        // const filterArray = (
        //   members: string[]
        // ) => members.filter((member: string) => res.data.includes(member));
        // const name = res.data.filter((member: { id: any }) => member.id === id)[0].fullName
        // console.log(filterArray(members))
        // setMember(filterArray(members))
        // return res.data