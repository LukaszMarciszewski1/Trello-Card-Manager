import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "components/layouts/AppLayout/AppLayout";
import * as constants from 'constants/index';
import { useAuth } from "hooks/useAuth";
import Tabs from "components/organisms//Tabs/Tabs";
import TabsContent from "components/organisms//Tabs/TabsContent/TabsContent";
import TaskList from "views/Authenticated/TasksList";
import TaskForms from "views/Authenticated/TaskForms";
import Login from "views/Unauthenticated/Login";
import Loading from "components/common/Loading/Loading";
import AppProviders from "providers/AppProviders";
import Navbar from "components/organisms/Navbar/Navbar";


function Root() {

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
          </ProtectedRoute>
        } />
      </Routes>
    </AppProviders>
  );
}

export default Root;