import React from "react";
import "./App.scss";
import Tabs from "components/Tabs/Tabs";
import TabsContent from "components/Tabs/TabsContent/TabsContent";
import TaskList from "views/TaskList";
import TaskForms from "views/TaskForms";

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
