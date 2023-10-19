import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PLACEHOLDER_SIZE, SIZES } from '@common/constants';
import { IconPlaceholder } from '@common/svg';
import { Input } from './Input';
import { InputContext } from './inputContext';
import { INPUT_CONTENT_TYPE } from './constants';
import classes from './content.module.scss';

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(PLACEHOLDER_SIZE),
  destructive: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueType: PropTypes.oneOf(Object.values(INPUT_CONTENT_TYPE)),
  stretch: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  size: SIZES.MD,
  stretch: false,
};

const Content = React.forwardRef(
  (
    {
      className,
      stretch,
      size,
      destructive,
      value,
      children,
      valueType,
      ...rest
    },
    forwardRef,
  ) => {
    const state = value === '' ? 'placeholder' : 'default';
    const valueContext = {
      size,
      destructive,
      value,
      valueType,
      ...rest,
    };
    return (
      <InputContext.Provider value={valueContext}>
        <div
          className={classnames(
            classes.content,
            classes[state],
            { [classes.destructive]: destructive },
            { [classes[size]]: size },
            { [classes.stretch]: !!stretch },
            className,
          )}
          ref={forwardRef}
        >
          {children}
        </div>
      </InputContext.Provider>
    );
  },
);

Content.displayName = 'Content';
Content.Icon = IconPlaceholder;
Content.Input = Input;
Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
