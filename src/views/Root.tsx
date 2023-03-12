import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import AppProviders from 'providers/AppProviders';
import Loading from 'components/common/Loading/Loading';
import Authenticated from 'views/Authenticated/Authenticated';
import Login from 'views/Unauthenticated/Login';

function Root() {
  return (
    <AppProviders>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          index
          path='/'
          element={<Authenticated />}
        />
      </Routes>
    </AppProviders>
  );
}

export default Root;
