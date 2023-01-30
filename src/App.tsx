import React from "react";
import Layout from "components/layouts/AppLayout/AppLayout";
import Tabs from "components/templates//Tabs/Tabs";
import TabsContent from "components/templates//Tabs/TabsContent/TabsContent";
import TaskList from "screens/TaskList";
import TaskForms from "screens/TaskForms";
import { TrelloProvider } from "context/trelloContext";

function App() {
  return (
    <TrelloProvider>
      <Layout>
        <Tabs>
          <TabsContent title="Dodaj zlecenie">
            <TaskForms />
          </TabsContent>
          <TabsContent title="Lista zleceń">
            <TaskList />
          </TabsContent>
        </Tabs>
      </Layout>
    </TrelloProvider>
  );
}

export default App;
