import React from 'react';

import styles from './input-field.m.css';
import PropTypes from 'prop-types';

const InputField = ({
  field: { onChange, onBlur, name, value },
  form,
  type,
  id,
  placeholder,
}) => {
  const error = form.errors[name] && form.touched[name];

  return (
    <div className={styles.input__wrapper}>
      {error && <div className={styles.error}>{form.errors[name]}</div>}
      <input
        className={error ? styles.input__error : styles.input}
        id={id}
        name={name}
        type={type ? type : 'text'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </div>
  );
};

InputField.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }),
  form: PropTypes.object,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputField;
