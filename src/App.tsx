import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Tabs from "components/Tabs/Tabs";
import TabsContent from "components/Tabs/TabsContent/TabsContent";
import AddTasks from "views/DepartamentsForm/Plotter/Plotter";
import ListTasks from "views/ListTasks";
import Tasks from "views/Tasks/Tasks";

function App() {
  return (
    <div className="App">
      <Tabs>
        <TabsContent title="Dodaj zlecenie">
          <Tasks />
        </TabsContent>
        <TabsContent title="Lista zleceń">
          <ListTasks />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
