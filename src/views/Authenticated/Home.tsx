import AppLayout from 'layouts/AppLayout/AppLayout';
import Navbar from 'components/organisms/Navbar/Navbar';
import Tabs from 'components/organisms/Tabs/Tabs';
import TabsContent from 'components/organisms/Tabs/TabsContent/TabsContent';
import OrderList from './OrderList';
import CreateOrder from './CreateOrder';
import * as constants from 'constants/index';

const Home = () => {
  return (
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
  );
};

export default Home;
