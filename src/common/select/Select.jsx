import React from 'react';
import PropTypes from 'prop-types';
import { default as ReactSelect } from 'react-select';
import { dropdownStyles, selectTheme } from '@common/styles/selectStyles';
import styles from './select.module.scss';

const propTypes = {
  destructive: PropTypes.bool,
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  isSearchable: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
};
const Select = ({ value, isSearchable, destructive, placeholder, onChange, options, ...rest }) => {
  return (
    <ReactSelect
      className={styles.select}
      destructive={destructive}
      placeholder={placeholder}
      value={value}
      theme={selectTheme}
      styles={dropdownStyles}
      isSearchable={isSearchable}
      onChange={onChange}
      options={options}
      {...rest}
    />
  );
};

Select.propTypes = propTypes;

export { Select };