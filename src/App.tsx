import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Tabs from "components/Tabs/Tabs";
import TabsContent from "components/Tabs/TabsContent/TabsContent";
import Tasks from "views/AddTasks";
import ListTasks from "views/ListTasks";

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
