import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "components/layouts/AppLayout/AppLayout";
import * as constants from 'constants/index';
import { TrelloApiContextProvider } from 'context/trelloApiContext'
import { AuthContextProvider } from 'context/authContext'
import { useAuth } from "hooks/useAuth";
import Tabs from "components/organisms//Tabs/Tabs";
import TabsContent from "components/organisms//Tabs/TabsContent/TabsContent";
import TaskList from "views/TasksList";
import TaskForms from "views/TaskForms";
import Login from "views/Login/Login";
import Loading from "components/common/Loading/Loading";


function App() {

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
      return <Loading size={70} />;
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
