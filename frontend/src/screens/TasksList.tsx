import React, { useEffect, useState } from 'react'
import CardsTable from 'components/organisms/CardsTable/CardsTable'
import { useTrelloApi } from 'context/trelloContext';

const filters = [
  {
    value :'all',
    label: 'Wszystkie',
  },
  {
    value :'visible',
    label: 'Aktywne',
  },
  // {
  //   value :'open',
  //   label: 'Otwarte',
  // },
  {
    value :'closed',
    label: 'Zarchiwizowane',
  }
]

const CardsList = () => {
  const [selectedFilter, setSelectedFilter] = useState(filters[1].value);
  
  const { 
    getAllCards, 
    getMembers, 
    getBoards,
    getLists,
    deleteCard,
    cards,
    members, 
    boards, 
    lists,

  } = useTrelloApi()

  useEffect(() => {
    getAllCards(selectedFilter)
    getMembers()
    getBoards()
    getLists('all')
  }, [selectedFilter])

  return (
    <>
    {
      !cards.length ? <div>...Loading</div> : (
        <CardsTable
          cards={cards}
          members={members}
          boards={boards}
          lists={lists}
          filters={filters}
          setFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
          // deleteCard={() => console.log('delete')}
        />
      )
    }
    </>
  )
}

export default CardsList