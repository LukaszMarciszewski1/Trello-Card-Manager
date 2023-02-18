import { useEffect, useState } from 'react'
import CardsTable from 'components/organisms/CardsTable/CardsTable'
import { useTrelloApi } from 'hooks/useTrelloApi';
import Loading from 'components/common/Loading/Loading';

const filters = [
  {
    value: 'all',
    label: 'Wszystkie',
  },
  {
    value: 'open',
    label: 'Aktywne',
  },
  {
    value: 'closed',
    label: 'Zarchiwizowane',
  }
]

const CardsList = () => {
  const [selectedFilter, setSelectedFilter] = useState(filters[1].value);

  const {
    getCards,
    getMembers,
    getBoards,
    getLists,
    cards,
    members,
    boards,
    lists,

  } = useTrelloApi()

  useEffect(() => {
    getCards(selectedFilter)
    getMembers()
    getBoards()
    getLists(filters[0].value)
  }, [selectedFilter])

  return (
    <>
      {
        !cards.length ? <Loading size={70} /> : (
          <CardsTable
            cards={cards}
            members={members}
            boards={boards}
            lists={lists}
            filters={filters}
            setFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        )
      }
    </>
  )
}

export default CardsList