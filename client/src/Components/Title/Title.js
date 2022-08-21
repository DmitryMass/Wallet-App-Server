import React from 'react';

import PropTypes from 'prop-types';

const Title = ({ children, modificator }) => {
  return <h2 className={`title title__${modificator}`}>{children}</h2>;
};

Title.propTypes = {
  children: PropTypes.string.isRequired,
  modificator: PropTypes.string,
};

export default Title;
