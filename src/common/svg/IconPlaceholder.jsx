import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SKINS, SIZES } from '@common/constants';
import Svg from './Svg.jsx';
import { ICONS } from './icons.js';
import classes from './iconPlaceholder.module.scss';

const PLACEHOLDER_TYPE = {
  DEFAULT: '',
  ICON: 'icon',
};

const propTypes = {
  className: PropTypes.string,
  svgClassName: PropTypes.string,
  dataTestId: PropTypes.string,
  iconName: PropTypes.oneOf(Object.values(ICONS)),
  placeholderSize: PropTypes.oneOf(Object.values(SIZES)),
  placeholderType: PropTypes.oneOf(Object.values(PLACEHOLDER_TYPE)),
  stroke: PropTypes.string,
  fill: PropTypes.string,
  skin: PropTypes.oneOf(Object.values(SKINS)),
  skinFill: PropTypes.bool,
  skinStroke: PropTypes.bool,
  destructive: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  placeholderRole: PropTypes.string,
};

const defaultProps = {
  placeholderType: PLACEHOLDER_TYPE.DEFAULT,
  placeholderSize: SIZES.SM,
  dataTestId: 'icon-place-holder',
};

const IconPlaceholder = React.forwardRef(
  (
    {
      className,
      svgClassName,
      skin,
      stroke,
      iconName,
      placeholderSize,
      placeholderType,
      dataTestId,
      destructive,
      disabled,
      onClick,
      placeholderRole,
      ...props
    },
    forwardRef,
  ) => {
    return (
      <div
        role={placeholderRole}
        ref={forwardRef}
        data-testid={dataTestId}
        onClick={onClick}
        className={classnames(
          classes.placeHolder,
          { [classes.showCursor]: !!onClick },
          { [classes[skin]]: !destructive && !destructive },
          { [classes[`${skin}Destructive`]]: destructive },
          classes[placeholderSize],
          classes[placeholderType],
          className,
        )}
      >
        {iconName && (
          <Svg
            disabled={disabled}
            className={svgClassName}
            {...(stroke && { stroke })}
            name={iconName}
            {...props}
          />
        )}
      </div>
    );
  },
);

IconPlaceholder.displayName = 'IconPlaceholder';
IconPlaceholder.propTypes = propTypes;
IconPlaceholder.defaultProps = defaultProps;

export { PLACEHOLDER_TYPE, IconPlaceholder };
