import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import AppProviders from 'providers/AppProviders';
import Loading from 'components/common/Loading/Loading';
import Authenticated from 'views/Authenticated/Authenticated';
import Login from 'views/Login/Login';

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
              <Authenticated />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppProviders>
  );
}

export default Root;
