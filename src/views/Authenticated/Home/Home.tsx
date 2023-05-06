import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout/AppLayout';
import MainLayout from 'layouts/MainLayout/MainLayout';
import Navbar from 'components/organisms/Navbar/Navbar';
import OrderList from './OrderList';
import CreateOrder from './CreateOrder';
import Settings from './Settings/Settings';

const Home = () => {
  return (
    <AppLayout>
      <Navbar />
      <MainLayout>
        <Routes>
          <Route path='/create-order' element={<CreateOrder />} />
          <Route path='/order-list' element={<OrderList />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='*' element={<Navigate to='/create-order' replace />} />
        </Routes>
      </MainLayout>
    </AppLayout>
  );
};

export default Home;
