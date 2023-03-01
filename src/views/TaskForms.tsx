import React, { useCallback, useEffect } from 'react'
import Tabs from 'components/organisms/Tabs/Tabs'
import TabsContent from 'components/organisms/Tabs/TabsContent/TabsContent'
import PlotterForm from 'components/organisms/Forms/Plotter'
import EmbroideryForm from 'components/organisms/Forms/Embroidery'
import DTFForm from 'components/organisms/Forms/DTF'
import * as constants from 'constants/index';
import { useTrelloApi } from 'hooks/useTrelloApi'

const TaskForms: React.FC = () => {

  const {
    PLOTTER,
    EMBROIDERY,
    DTF
  } = constants;

  const {
    getBoards,
    getLists,
    getMembers,
    boards,
    lists,
    members,
  } = useTrelloApi()

  useEffect(() => {
    getMembers()
    getBoards()
    getLists('all')
  }, [])

  const getFirstListOfCurrentBoard = useCallback((boardName: string): string | undefined => {
    if (boards.length && lists.length) {
      const currentBoard = boards
        .find((board: { name: string }) => board.name.toLowerCase() === boardName.toLowerCase())
      const firstListOfCurrentBoard = currentBoard ? lists
        .find((list: { idBoard: string | undefined }) => list.idBoard === currentBoard.id) : undefined
      return firstListOfCurrentBoard?.id
    }
  }, [boards, lists])

  return (
    <Tabs subcategory>
      <TabsContent title={PLOTTER}>
        <PlotterForm
          listId={getFirstListOfCurrentBoard(PLOTTER)}
          boardName={PLOTTER}
          members={members} />
      </TabsContent>
      <TabsContent title={EMBROIDERY}>
        <EmbroideryForm
          listId={getFirstListOfCurrentBoard(EMBROIDERY)}
          boardName={EMBROIDERY}
          members={members} />
      </TabsContent>
      <TabsContent title={DTF}>
        <DTFForm
          listId={getFirstListOfCurrentBoard(DTF)}
          boardName={DTF} 
          members={members} />
      </TabsContent>
    </Tabs>
  )
}

export default TaskForms