import React from 'react'
import Tabs from 'components/Tabs/Tabs'
import TabsContent from 'components/Tabs/TabsContent/TabsContent'
import AddTasks from 'views/AddTasks'

const Tasks: React.FC = () => {
  return (
    <Tabs subcategory>
      <TabsContent title="Ploterownia">
        <AddTasks />
      </TabsContent>
      <TabsContent title="Hafciarnia">
        <div>Hafciarnia</div>
      </TabsContent>
      <TabsContent title="DTG">
        <div>DTG</div>
      </TabsContent>
    </Tabs>
  )
}

export default Tasks