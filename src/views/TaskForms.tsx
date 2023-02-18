import React from 'react'
import Tabs from 'components/organisms/Tabs/Tabs'
import TabsContent from 'components/organisms/Tabs/TabsContent/TabsContent'
import Plotter from 'components/organisms/Forms/Plotter'
import Embroidery from 'components/organisms/Forms/Embroidery'
import DTF from 'components/organisms/Forms/DTF'
import * as constants from 'constants/index';

const TaskForms: React.FC = () => {
  return (
    <Tabs subcategory>
      <TabsContent title={constants.PLOTTER}>
        <Plotter />
      </TabsContent>
      <TabsContent title={constants.EMBROIDERY}>
        <Embroidery />
      </TabsContent>
      <TabsContent title={constants.DTF}>
        <DTF />
      </TabsContent>
    </Tabs>
  )
}

export default TaskForms