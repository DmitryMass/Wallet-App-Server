import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import WalletInfo from './WalletInfo/WalletInfo';
import Register from '../Pages/Register';
import Login from '../Pages/Login/login';

import '../Utils/i18n';
import Home from '../Pages/Home/Home';
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector((state) => state.userToken.user);

  return (
    <Suspense fallback={'Loading...'}>
      <div className='app'>
        <div className='wrapper'>
          <Header user={user} />
          <Routes>
            <Route
              path='/'
              element={user ? <Navigate to='/wallet' /> : <Home />}
            />
            <Route
              path='/wallet'
              element={user ? <WalletInfo /> : <Navigate to='/' />}
            />
            <Route
              path='/registration'
              element={user ? <Navigate to='/wallet' /> : <Register />}
            />
            <Route
              path='/login'
              element={user ? <Navigate to='/wallet' /> : <Login />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
};

export default App;
