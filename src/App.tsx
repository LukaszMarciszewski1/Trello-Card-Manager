import React from "react";
import "./App.scss";
import Tabs from "components/Tabs/Tabs";
import TabsContent from "components/Tabs/TabsContent/TabsContent";
import TaskList from "screens/TaskList";
import TaskForms from "screens/TaskForms";

function App() {
  return (
    <div className="App">
      <Tabs>
        <TabsContent title="Dodaj zlecenie">
          <TaskForms />
        </TabsContent>
        <TabsContent title="Lista zleceń">
          <TaskList />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
