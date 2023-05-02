import { useEffect, useState } from 'react';
import { dataFilters } from 'data/dataFilters/dataFilters';
import { useTrelloApi } from 'hooks/useTrelloApi';
import OrderTable from 'components/organisms/OrderTable/OrderTable';
import Loading from 'components/common/Loading/Loading';

const CardsList = () => {
  const [selectedFilter, setSelectedFilter] = useState(dataFilters[1].value);
  const { getCards, getMembers, getBoards, getLists, cards, members, boards, lists } = useTrelloApi();

  useEffect(() => {
    getCards(selectedFilter);
    getMembers();
    getBoards();
    getLists(dataFilters[0].value);
  }, [selectedFilter]);

  return (
    <>
      {!cards.length ? (
        <Loading size={70} />
      ) : (
        <OrderTable
          cards={cards}
          members={members}
          boards={boards}
          lists={lists}
          dataFilters={dataFilters}
          setSelectedDataFilter={setSelectedFilter}
          selectedDataFilter={selectedFilter}
        />
      )}
    </>
  );
};

export default CardsList;
