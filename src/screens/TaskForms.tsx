import React from 'react'
import Tabs from 'components/Tabs/Tabs'
import TabsContent from 'components/Tabs/TabsContent/TabsContent'
import Plotter from 'screens/Forms/Plotter/Plotter'
import Embroidery from 'screens/Forms/Embroidery/Embroidery'
import DTF from 'screens/Forms/DTF/DTF'

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