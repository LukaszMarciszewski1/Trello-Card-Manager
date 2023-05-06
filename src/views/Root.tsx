import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import AppProviders from 'providers/AppProviders';
import Home from 'views/Authenticated/Home/Home';
import Login from 'views/Unauthenticated/Login';
import { useAuth } from 'hooks/useAuth';
import Register from './Unauthenticated/Register';

const Root: React.FC = () => {
  
  const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();

    if (!user) {
      const token = localStorage.getItem('jwt');
      if (token) {
        return <>{children}</>;
      } else {
        return <Navigate to='/login' />;
      }
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

