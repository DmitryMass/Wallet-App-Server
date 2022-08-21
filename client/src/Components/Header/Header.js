import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.m.css';
import i18n from '../../Utils/i18n';

const Header = ({ user }) => {
  const onChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <header className={user ? styles.header_wallet : styles.header}>
      <div className='container'>
        <Link to='/' className={styles.header__logo}>
          Jimmy-Co Wallet
        </Link>
        <div className={styles.header__btns}>
          <input
            type='button'
            value='en'
            onClick={onChange}
            className={styles.header__lang}
          />
          <input
            type='button'
            value='ua'
            onClick={onChange}
            className={styles.header__lang}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
