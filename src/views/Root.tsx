import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import AppProviders from 'providers/AppProviders';
import Home from 'views/Authenticated/Home/Home';
import Settings from './Authenticated/Settings/Settings';
import Login from 'views/Unauthenticated/Login';
import { useAuth } from 'hooks/useAuth';
import Register from './Unauthenticated/Register';

const Root: React.FC = () => {
  
  const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        return <Navigate to='/login' />;
      }
    return <>{children}</>;
  };

  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            index
            path='*'
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
};

export default Root;



{/* <Route
index
path='/settings'
element={
  <ProtectRoute>
    <Navigate to='/dodaj zlecenie' replace />
  </ProtectRoute>
}
/> */}
