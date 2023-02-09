import Layout from "components/layouts/AppLayout/AppLayout";
import * as constants from 'constants/index';
import { TrelloProvider } from "context/trelloContext";
import { Provider } from "react-redux";
import { store } from 'store/index'
import Tabs from "components/organisms//Tabs/Tabs";
import TabsContent from "components/organisms//Tabs/TabsContent/TabsContent";
import TaskList from "screens/TasksList";
import TaskForms from "screens/TaskForms";

function App() {
  return (
    <TrelloProvider>
      <Provider store={store}>
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
      </Provider>
    </TrelloProvider>
  );
}

export default App;
