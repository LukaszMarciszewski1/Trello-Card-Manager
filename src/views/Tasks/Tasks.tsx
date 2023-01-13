import React from 'react'
import Tabs from 'components/Tabs/Tabs'
import TabsContent from 'components/Tabs/TabsContent/TabsContent'
import PlotterForm from 'views/DepartamentsForm/Plotter/Plotter'
import Embroidery from 'views/DepartamentsForm/Embroidery/Embroidery'
import DTG from 'views/DepartamentsForm/DTG/DTG'

const Tasks: React.FC = () => {
  return (
    <Tabs subcategory>
      <TabsContent title="Ploterownia">
        <PlotterForm />
      </TabsContent>
      <TabsContent title="Hafciarnia">
        <Embroidery />
      </TabsContent>
      <TabsContent title="DTF">
        <DTG />
      </TabsContent>
    </Tabs>
  )
}

export default Tasks