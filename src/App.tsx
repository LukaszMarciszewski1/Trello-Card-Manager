import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "components/layouts/AppLayout/AppLayout";
import * as constants from 'constants/index';
import { TrelloApiContextProvider } from "context/TrelloApiContext";
import { AuthContext } from "context/AuthContext";
import Tabs from "components/organisms//Tabs/Tabs";
import TabsContent from "components/organisms//Tabs/TabsContent/TabsContent";
import Navbar from "components/organisms/Navbar/Navbar";
import TaskList from "views/TasksList";
import TaskForms from "views/TaskForms";
import Login from "views/Login/Login";
import { AuthContextProvider } from 'context/AuthContext';
import { useContext } from "react";


function App() {

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useContext(AuthContext);
    if (isLoading) {
      return <></>;
    }
    return user ? <>{children}</> : <Navigate to="/" />;
  }

  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route index path="/home" element={
          <ProtectedRoute>
            <Layout>
              <TrelloApiContextProvider>
                <Navbar />
                <Tabs>
                  <TabsContent title={constants.ADD_TASK_TAB}>
                    <TaskForms />
                  </TabsContent>
                  <TabsContent title={constants.TASKS_LIST_TAB}>
                    <TaskList />
                  </TabsContent>
                </Tabs>
              </TrelloApiContextProvider>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
