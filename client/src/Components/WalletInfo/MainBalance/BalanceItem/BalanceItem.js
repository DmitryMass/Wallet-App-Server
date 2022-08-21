import React from 'react';
import PropTypes from 'prop-types';

const BalanceItem = ({ children, modificator }) => {
  return <div className={modificator}>{children}</div>;
};

BalanceItem.propTypes = {
  children: PropTypes.array.isRequired,
  modificator: PropTypes.string,
};
export default BalanceItem;
