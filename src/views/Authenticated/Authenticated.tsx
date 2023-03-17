import AppLayout from 'components/layouts/AppLayout/AppLayout';
import Navbar from 'components/organisms/Navbar/Navbar';
import Tabs from 'components/organisms/Tabs/Tabs';
import TabsContent from 'components/organisms/Tabs/TabsContent/TabsContent';
import OrderList from './OrderList';
import CreateOrder from './CreateOrder';
import * as constants from 'constants/index';
import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Authenticated = () => {
  
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const isAuthenticated = Boolean(user);

    if (!isAuthenticated) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return <>{children}</>;
      } else {
        return <Navigate to='/login' />;
      }
    }

    return <>{children}</>;
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <Navbar />
        <Tabs>
          <TabsContent title={constants.ADD_TASK_TAB}>
            <CreateOrder />
          </TabsContent>
          <TabsContent title={constants.TASKS_LIST_TAB}>
            <OrderList />
          </TabsContent>
        </Tabs>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default Authenticated;
