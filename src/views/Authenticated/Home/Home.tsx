import { useEffect } from 'react';
import AppLayout from 'layouts/AppLayout/AppLayout';
import MainLayout from 'layouts/MainLayout/MainLayout';
import Navbar from 'components/organisms/Navbar/Navbar';
import Tabs from 'components/organisms/Tabs/Tabs';
import TabsContent from 'components/organisms/Tabs/TabsContent/TabsContent';
import OrderList from './OrderList';
import CreateOrder from './CreateOrder';
import * as constants from 'constants/index';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

const Home = () => {

  // useEffect(() => {
  //   return () => {
  //     <Navigate to="/dodaj-zlecenie" replace />;
  //   };
  // }, []);
  
  return (
    <AppLayout>
      <Navbar />
      <MainLayout>
        <Routes>
          <Route path='/create-order' element={<CreateOrder />} />
          <Route path='/order-list' element={<OrderList />} />
          <Route path='*' element={<Navigate to='/create-order' replace />} />
        </Routes>
      </MainLayout>
    </AppLayout>
  );
};

export default Home;
