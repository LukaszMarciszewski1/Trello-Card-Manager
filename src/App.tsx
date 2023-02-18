import Layout from "components/layouts/AppLayout/AppLayout";
import * as constants from 'constants/index';
import { TrelloApiContextProvider } from "context/trelloApiContext";
import { AuthContextProvider } from "context/authContext";
import Tabs from "components/organisms//Tabs/Tabs";
import TabsContent from "components/organisms//Tabs/TabsContent/TabsContent";
import Navbar from "components/organisms/Navbar/Navbar";
import TaskList from "views/TasksList";
import TaskForms from "views/TaskForms";

function App() {
  return (
    <AuthContextProvider>
      <TrelloApiContextProvider>
        <Layout>
          <Navbar />
          <Tabs>
            <TabsContent title={constants.ADD_TASK_TAB}>
              <TaskForms />
            </TabsContent>
            <TabsContent title={constants.TASKS_LIST_TAB}>
              <TaskList />
            </TabsContent>
          </Tabs>
        </Layout>
      </TrelloApiContextProvider>
    </AuthContextProvider>
  );
}

export default App;
