import React from 'react';
import { Link } from 'react-router-dom';

import styles from './auth-title.m.css';

const AuthTitle = ({ title, subtitle, sign, link, myApp }) => {
  return (
    <div className={styles.auth__wrap}>
      <div>
        <span className={styles.auth__title}>{title}</span>
        <br />
        <span className={styles.auth__myApp}>{myApp}</span>
      </div>
      <div>
        <span className={styles.auth__sublink}>{subtitle}</span>
        <br />
        <Link to={link} className={styles.auth__link}>
          {sign}
        </Link>
      </div>
    </div>
  );
};

export default AuthTitle;
