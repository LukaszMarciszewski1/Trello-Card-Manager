import React, { useCallback, useEffect } from 'react';
import * as constants from 'constants/index';
import { dataFilters } from 'data/dataFilters/dataFilters';
import { useTrelloApi } from 'hooks/useTrelloApi';

import Tabs from 'components/organisms/Tabs/Tabs';
import TabsContent from 'components/organisms/Tabs/TabsContent/TabsContent';
import FormWithMaterials from 'components/organisms/OrderForms/FormWithMaterials';
import FormWithoutMaterials from 'components/organisms/OrderForms/FormWithoutMaterials';
import { useAuth } from 'hooks/useAuth';

const TaskForms: React.FC = () => {
  const { user } = useAuth();
  const { PLOTTER, EMBROIDERY, DTF } = constants;
  const {
    getBoards,
    getLists,
    getMembers,
    getCurrentTrelloMember,
    boards,
    lists,
  } = useTrelloApi();

  useEffect(() => {
    getMembers();
    getBoards();
    getLists(dataFilters[0].value);
  }, []);

  const getFirstListOfCurrentBoard = useCallback(
    (boardName: string): string | undefined => {
      if (boards.length && lists.length) {
        const currentBoard = boards.find(
          (board: { name: string }) =>
            board.name.toLowerCase() === boardName.toLowerCase(),
        );
        const firstListOfCurrentBoard = currentBoard
          ? lists.find(
              (list: { idBoard: string | undefined }) =>
                list.idBoard === currentBoard.id,
            )
          : undefined;
        return firstListOfCurrentBoard?.id;
      }
    },
    [boards, lists],
  );

  return (
    <Tabs>
      <TabsContent title={PLOTTER}>
        <FormWithMaterials
          boardName={PLOTTER}
          listId={getFirstListOfCurrentBoard(PLOTTER)}
          member={getCurrentTrelloMember(user?.username)}
        />
      </TabsContent>
      <TabsContent title={EMBROIDERY}>
        <FormWithoutMaterials
          listId={getFirstListOfCurrentBoard(EMBROIDERY)}
          boardName={EMBROIDERY}
          member={getCurrentTrelloMember(user?.username)}
        />
      </TabsContent>
      <TabsContent title={DTF}>
        <FormWithoutMaterials
          listId={getFirstListOfCurrentBoard(DTF)}
          boardName={DTF}
          member={getCurrentTrelloMember(user?.username)}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TaskForms;
