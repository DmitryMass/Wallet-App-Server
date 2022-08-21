import React from 'react';

import styles from './footer.m.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className='container'>
        <h3 className={styles.footer__title}>
          Designed by: <span>Jimmy-Co</span>
        </h3>
      </div>
    </div>
  );
};

export default Footer;
