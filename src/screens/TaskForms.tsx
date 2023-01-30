import React from 'react'
import Tabs from 'components/templates/Tabs/Tabs'
import TabsContent from 'components/templates/Tabs/TabsContent/TabsContent'
import Plotter from 'screens/Forms/Plotter'
import Embroidery from 'screens/Forms/Embroidery'
import DTF from 'screens/Forms/DTF'

const TaskForms: React.FC = () => {
  return (
    <Tabs subcategory>
      <TabsContent title="Ploterownia">
        <Plotter />
      </TabsContent>
      <TabsContent title="Hafciarnia">
        <Embroidery />
      </TabsContent>
      <TabsContent title="DTF">
        <DTF />
      </TabsContent>
    </Tabs>
  )
}

export default TaskForms