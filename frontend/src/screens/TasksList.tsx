import React, { useEffect, useState } from 'react'
import CardsTable from 'components/organisms/CardsTable/CardsTable'
import axios from "axios";
import dayjs from "dayjs";
import { Card } from 'models/card';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { useTrelloApi } from 'context/trelloContext';
import { useGetAllCardsQuery } from 'store/cards/cards';

const CardsList = () => {
  dayjs.locale("pl");
  const { getAllCards, success, loading, cards } = useTrelloApi()
  const { data, error, isLoading } = useGetAllCardsQuery()

  useEffect(() => {
    getAllCards('cards')
  }, [])

  return (
    <>
      {error && <div>Wystąpił błąd serwera, nie można wyświetlić zawartości</div>}
      {
        isLoading ? <div>Loading...</div> : (
          data !== undefined && <CardsTable cards={data} />
        )
      }
    </>
  )
}

export default CardsList