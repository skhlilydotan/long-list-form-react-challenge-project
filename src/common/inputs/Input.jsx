import { forwardRef, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useInputContext } from './inputContext';
import classes from './input.module.scss';

const propTypes = {
  id: PropTypes.string,
  dataTestId: PropTypes.string,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

const defaultProps = {
  onFocus: () => {
  },
  onBlur: () => {
  },
  onChange: () => {
  },
  onKeyDown: () => {
  },
  placeholder: '',
};

const Input = forwardRef(
  (
    {
      id,
      onFocus,
      onBlur,
      onChange,
      onKeyDown,
      placeholder,
      dataTestId,
      ...rest
    },
    forwardRef,
  ) => {
    const { value, valueType } = useInputContext();
    const [inputVal, setInputVal] = useState(String(value));
    

    useLayoutEffect(() => {
      setInputVal(value);
    }, [value]);

    const handleOnChange = useCallback(
      (event) => {
        setInputVal(event.target.value);
        onChange(event);
      },
      [onChange],
    );

    return (
      <input
        data-testid={dataTestId}
        ref={forwardRef}
        className={classes.input}
        id={id}
        type={valueType || 'text'}
        placeholder={placeholder}
        defaultValue={inputVal}
        onFocus={onFocus}
        onChange={handleOnChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';
Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export { Input };
