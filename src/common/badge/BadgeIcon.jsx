import React from 'react';
import PropTypes from 'prop-types';
import { IconPlaceholder } from '@common/svg';

const propTypes = {
  className: PropTypes.string,
  svgClassName: PropTypes.string,
  iconName: PropTypes.string,
};
const BadgeIcon = React.forwardRef(
  ({ className, svgClassName, iconName, ...rest }, forwardRef) => {
    return (
      <IconPlaceholder
        svgClassName={svgClassName}
        placeholderRole='icon-placeholder'
        className={className}
        ref={forwardRef}
        iconName={iconName}
        {...rest}
      />
    );
  },
);

BadgeIcon.displayName = 'BadgeIcon';
BadgeIcon.propTypes = propTypes;

export { BadgeIcon };
