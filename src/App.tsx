import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "components/layouts/AppLayout/AppLayout";
import * as constants from 'constants/index';
import { useAuth } from "hooks/useAuth";
import Tabs from "components/organisms//Tabs/Tabs";
import TabsContent from "components/organisms//Tabs/TabsContent/TabsContent";
import TaskList from "views/TasksList";
import TaskForms from "views/TaskForms";
import Login from "views/Login/Login";
import Loading from "components/common/Loading/Loading";
import AppProviders from "providers/AppProviders";


function App() {

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
      return <Loading size={70} />;
    }
    return user ? <>{children}</> : <Navigate to="/" />;
  }

  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route index path="/home" element={
          <ProtectedRoute>
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
          </ProtectedRoute>
        } />
      </Routes>
    </AppProviders>
  );
}

export default App;
