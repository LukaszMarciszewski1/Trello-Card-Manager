import React from "react";
import Layout from "components/layouts/AppLayout/AppLayout";
import Tabs from "components/templates//Tabs/Tabs";
import TabsContent from "components/templates//Tabs/TabsContent/TabsContent";
import TaskList from "screens/TaskList";
import TaskForms from "screens/TaskForms";
import { TrelloProvider } from "context/trelloContext";
import * as constants from 'constants/index';

function App() {
  return (
    <TrelloProvider>
      <Layout>
        <Tabs>
          <TabsContent title={constants.ADD_TASK_TAB}>
            <TaskForms />
          </TabsContent>
          <TabsContent title={constants.TASKS_LIST_TAB}>
            <TaskList />
          </TabsContent>
        </Tabs>
      </Layout>
    </TrelloProvider>
  );
}

export default App;
