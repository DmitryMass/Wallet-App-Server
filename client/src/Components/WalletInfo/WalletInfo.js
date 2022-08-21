import React from 'react';
import MainBalance from './MainBalance';
import MyCards from './MyCards/MyCards';

import styles from './wallet-info.m.css';
import CardsMenu from '../CardsMenu/CardsMenu';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import { useLogoutMutation } from '../../Store/Slice/Login-Register/login-register-slice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Store/Features/authSlice';

const WalletInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userToken.user);
  const [logout] = useLogoutMutation();
  const { t } = useTranslation();

  const handleLogoutUser = async () => {
    try {
      await logout();
      delete localStorage.user;
      dispatch(logoutUser());
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className={styles.wallet__main}>
      <div className={`container ${styles.wallet__info}`}>
        <div>
          <MainBalance />
          <MyCards />
        </div>
        <CardsMenu />
      </div>
      <div className={styles.wallet__logout}>
        {user && (
          <Button modificator={'edit'} handleClick={handleLogoutUser}>
            {t('logout')}
          </Button>
        )}
      </div>
    </main>
  );
};

export default WalletInfo;
