import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './display.module.scss';
import { typographySizeType, typographyWeightType } from '@common/types';
import Typography from './Typography.jsx';

const propTypes = {
  className: PropTypes.string,
  size: typographySizeType,
  weight: typographyWeightType,
  inline: PropTypes.bool,
  value: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string,
  children: PropTypes.node,
  dataTestId: PropTypes.string,
  dangerouslySetInnerHTML: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  useDefaultColor: PropTypes.bool,
};

const Display = React.forwardRef(
  (
    {
      className,
      value,
      children,
      title,
      size,
      weight,
      color,
      inline,
      style,
      dataTestId,
      dangerouslySetInnerHTML,
      onClick,
      disabled,
      useDefaultColor,
      ...rest
    },
    ref,
  ) => (
    <Typography
      data-testid={dataTestId}
      ref={ref}
      size={size}
      style={{ color, ...style }}
      className={classNames(classes.font, className)}
      weight={weight}
      disabled={disabled}
      inline={inline}
      useDefaultColor={useDefaultColor}
      classes={classes}
      onClick={onClick}
      title={title}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      {...rest}
    >
      {value ? value : children}
    </Typography>
  ),
);

Display.displayName = 'Display';
Display.propTypes = propTypes;

export default Display;
