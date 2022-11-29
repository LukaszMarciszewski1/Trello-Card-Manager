import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Tabs from "components/Tabs/Tabs";
import TabsContent from "components/Tabs/TabsContent/TabsContent";
import Tasks from "views/AddTasks";
import ListTasks from "views/ListTasks";

function App() {
  return (
    <div className="App">
      <Tabs>
        <TabsContent title="Lista zleceń">
          <ListTasks />
        </TabsContent>
        <TabsContent title="Dodaj zlecenie">
          <Tasks />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
