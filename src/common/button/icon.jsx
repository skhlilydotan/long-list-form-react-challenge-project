import React from 'react';
import PropTypes from 'prop-types';
import { useButtonContext } from './buttonContext';
import { IconPlaceholder } from '@common/svg';

const propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string,
  useSkin: PropTypes.bool,
};

const Icon = React.forwardRef(({ className, iconName, ...rest }, forwardRef) => {
  const { buttonType, destructive, buttonSize, disabled } = useButtonContext();

  return (
    <IconPlaceholder
      iconName={iconName}
      disabled={disabled}
      skinStroke
      destructive={destructive}
      ref={forwardRef}
      className={className}
      skin={buttonType}
      placeholderSize={buttonSize}
      {...rest}
    />
  );
});

Icon.displayName = 'Icon';
Icon.propTypes = propTypes;

export default Icon;
