import { useState } from 'react'
import axios from 'axios'
import { Card, CardDescription } from 'models/card'
import { Member, Board, List } from 'models/trelloDataModels/index'
import { cardFormData } from './cardFormData/cardFormData'

export function TrelloApi() {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  })
  const [cards, setCards] = useState<Card[]>([])
  const [boards, setBoards] = useState<Board[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [lists, setLists] = useState<List[]>([])

  const {
    REACT_APP_TRELLO_KEY,
    REACT_APP_TRELLO_TOKEN,
    REACT_APP_TRELLO_URL,
    REACT_APP_TRELLO_GET_BOARDS,
  } = process.env

  const config = {
    params: {
      key: REACT_APP_TRELLO_KEY,
      token: REACT_APP_TRELLO_TOKEN,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  }

  const addCard = async (data: Card, listId: string) => {
    const formInitialDataCard = cardFormData.initialFormData(data, listId)
    const formChecklistDataCard = cardFormData.checklistFormData()
    setStatus({ ...status, loading: true })

    try {
      const res = await axios.post(
        `${REACT_APP_TRELLO_URL}/cards`,
        formInitialDataCard,
        config
      )

      await Promise.all(
        [...data.attachment]?.map(async (file: File) => {
          const formFileDataCard = cardFormData.fileFormData(file)
          await axios.post(
            `${REACT_APP_TRELLO_URL}/cards/${res.data.id}/attachments`,
            formFileDataCard,
            config
          )
        })
      )

      const checklistRes = await axios.post(
        `${REACT_APP_TRELLO_URL}/cards/${res.data.id}/checklists`,
        formChecklistDataCard,
        config
      )

      await Promise.all(
        data?.description?.map(async (desc: CardDescription) => {
          await axios.post(
            `${REACT_APP_TRELLO_URL}/checklists/${checklistRes.data.id}/checkItems`,
            {
              name: desc.logo,
              checked: false,
            },
            config
          )
        })
      )
      setStatus({ ...status, success: true, loading: false })
    } catch (err) {
      setStatus({ ...status, error: true })
      console.error(err)
    }
  }

  const deleteCard = async (id: string) => {
    try {
      await axios.delete(`${REACT_APP_TRELLO_URL}/cards/${id}`, config)
      setStatus({ ...status, success: true })
    } catch (error) {
      console.error(error)
    }
  }

  const archiveCard = async (id: string) => {
    try {
      await axios.put(`${REACT_APP_TRELLO_URL}/cards/${id}/`, {
        closed: true,
        key: REACT_APP_TRELLO_KEY,
        token: REACT_APP_TRELLO_TOKEN,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getBoards = async () => {
    try {
      const res = await axios.get(`${REACT_APP_TRELLO_GET_BOARDS}`, config)
      setBoards(res.data)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const getCards = async (filter: string) => {
    try {
      const boards = await getBoards()
      await Promise.all(
        boards
          .map((board: { id: string }) => board.id)
          .map(async (id: string) => {
            const boardCards = await axios.get(
              `${REACT_APP_TRELLO_URL}/boards/${id}/cards/${filter}`,
              config
            )
            return boardCards.data
          })
      ).then((res) => {
        const allCards = [].concat(...res)
        setCards(allCards)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getLists = async (filter: string) => {
    try {
      const boards = await getBoards()
      await Promise.all(
        boards
          .map((board: { id: string }) => board.id)
          .map(async (id: string) => {
            const boardList = await axios.get(
              `${REACT_APP_TRELLO_URL}/boards/${id}/lists/${filter}`,
              config
            )
            return boardList.data
          })
      ).then((res) => {
        const lists = [].concat(...res)
        setLists(lists)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getMembers = async () => {
    try {
      const boards = await getBoards()
      await Promise.all(
        boards
          .map((board: { id: string }) => board.id)
          .map(async (id: string) => {
            const boardMembers = await axios.get(
              `${REACT_APP_TRELLO_URL}/boards/${id}/members`,
              config
            )
            return boardMembers.data
          })
      ).then((res) => {
        const filterUniqueArray = () => {
          const allMembers = [].concat(...res)
          const ids = allMembers?.map((obj: Member) => obj.id)
          return allMembers.filter(
            ({ id }, index) => !ids.includes(id, index + 1)
          )
        }
        setMembers(filterUniqueArray())
      })
    } catch (error) {
      console.error(error)
    }
  }

  const { success, error, loading } = status

  return {
    addCard,
    getCards,
    getMembers,
    getLists,
    getBoards,
    deleteCard,
    archiveCard,
    cards,
    members,
    lists,
    boards,
    success,
    error,
    loading,
  }
}
