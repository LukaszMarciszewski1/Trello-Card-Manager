import { Routes, Route, Navigate } from 'react-router-dom';
import * as constants from 'constants/index';
import { useAuth } from 'hooks/useAuth';

import Layout from 'components/layouts/AppLayout/AppLayout';
import Tabs from 'components/organisms//Tabs/Tabs';
import TabsContent from 'components/organisms//Tabs/TabsContent/TabsContent';
import Loading from 'components/common/Loading/Loading';
import AppProviders from 'providers/AppProviders';
import Navbar from 'components/organisms/Navbar/Navbar';

import OrderList from 'views/Authenticated/OrderList';
import CreateOrder from 'views/Authenticated/CreateOrder';
import Login from 'views/Unauthenticated/Login';

function Root() {
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
      return <Loading size={70} />;
    }
    return user ? <>{children}</> : <Navigate to='/login' />;
  };

  return (
    <AppProviders>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          index
          path='/'
          element={
            <ProtectedRoute>
              <Layout>
                <Navbar />
                <Tabs>
                  <TabsContent title={constants.ADD_TASK_TAB}>
                    <CreateOrder />
                  </TabsContent>
                  <TabsContent title={constants.TASKS_LIST_TAB}>
                    <OrderList />
                  </TabsContent>
                </Tabs>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppProviders>
  );
}

export default Root;
