import React, { useEffect, useState } from 'react'
import CardsTable from 'components/organisms/CardsTable/CardsTable'
import axios from "axios";
import dayjs from "dayjs";
import { Card } from 'models/card';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { useTrelloApi } from 'context/trelloContext';
import { useGetAllCardsQuery } from 'store/cards/cards';
interface Member {
  fullName: string
  id: string
  username: string
}

const CardsList = () => {
  dayjs.locale("pl");
  const { getAllCards, getMembers, cards, members, success, loading } = useTrelloApi()
  const { data, error, isLoading } = useGetAllCardsQuery()
  // const [members, setMembers] = useState<Member[]>()
  // const [cards, setCards] = useState<Card[] | any>()

  useEffect(() => {
    getAllCards('visible')
    getMembers()
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getAllCards('cards')
  //       .then((res) => {
  //         setCards(res)
  //       })

  //     await getMembers()
  //       .then((res) => {
  //         setMembers(res)
  //       })
  //   }
  //   fetchData()
  // }, [])
// console.log(cards)

  return (
    <>
    <CardsTable cards={cards} members={members}/>
      {/* {error && <div>Wystąpił błąd serwera, nie można wyświetlić zawartości</div>}
      {
        isLoading ? <div>Loading...</div> : (
          data !== undefined && <CardsTable cards={cards} members={members}/>
        )
      } */}
    </>
  )
}

export default CardsList