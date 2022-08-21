import React from 'react';
import PropTypes from 'prop-types';

import styles from './load-error.m.css';

// Вирішив зробити одним компонентом, оскільки більше ніде Лоадер мені не потрібен
const LoadAndError = ({ load, error }) => {
  if (load) {
    return (
      <div className={styles.loadingio__spinner__dual__ball__6z54vq7xtjq}>
        <div className={styles.ldio__2z0vk0b3lxc}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Вибачте, грошей нема, але ви тримайтесь..</div>;
  }
};

LoadAndError.propTypes = {
  load: PropTypes.bool,
  error: PropTypes.bool,
};

export default LoadAndError;
