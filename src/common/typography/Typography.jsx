import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import typography from './typography.module.scss';
import { typographySizeType, typographyWeightType } from '@common/types';
import {
  SIZES,
  TYPOGRAPHY_WEIGHTS,
} from '@common/constants';

const propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
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
  htmlFor: PropTypes.string,
};

const defaultProps = {
  inline: false,
  size: SIZES.MD,
  weight: TYPOGRAPHY_WEIGHTS.REGULAR,
  disabled: false,
  useDefaultColor: true,
  onClick: () => {
  },
};

const Typography = React.forwardRef(
  (
    {
      classes,
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
      htmlFor,
      ...rest
    },
    ref,
  ) => {
    const Comp = htmlFor ? 'label' : 'div';
    return (
      <Comp
        htmlFor={htmlFor}
        data-testid={dataTestId}
        ref={ref}
        style={{ color, ...style }}
        className={classnames(
          classes[size],
          typography[weight],
          { [typography.defaultColor]: useDefaultColor },
          { [typography.inline]: inline },
          { [typography.disabled]: disabled && useDefaultColor },
          { [typography.label]: htmlFor },
          className,
        )}
        onClick={onClick}
        title={title}
        dangerouslySetInnerHTML={
          dangerouslySetInnerHTML
            ? { __html: dangerouslySetInnerHTML }
            : undefined
        }
        {...rest}
      >
        {value ? value : children}
      </Comp>
    );
  },
);

Typography.displayName = 'Typography';
Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;

export default Typography;
