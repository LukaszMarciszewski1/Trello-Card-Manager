import { Routes, Route } from 'react-router-dom';
import AppProviders from 'providers/AppProviders';
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
