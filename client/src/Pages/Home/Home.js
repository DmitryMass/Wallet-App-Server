import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './home.m.css';

const Home = () => {
  const { t } = useTranslation();
  return (
    <main className={styles.home__main}>
      <div className='container'>
        <div className={styles.home__wrapper}>
          <h5>
            {t('welcome')}{' '}
            <span className={styles.home__app}>{t('myApp')}</span>
          </h5>
          <div className={styles.home__link__wrapper}>
            <Link className={styles.home__link} to='/registration'>
              {t('signUp')}
            </Link>
            <Link className={styles.home__link} to='/login'>
              {t('signIn')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
