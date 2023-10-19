import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Text, TYPOGRAPHY_WEIGHTS } from '@common/typography';
import { SIZES } from '@common/constants';
import { useBadgeContext } from './badgeContext';
import classes from './badge.module.scss';

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

const BADGE_SIZE_TO_TYPOGRAPHY_SIZE = {
  [SIZES.SM]: SIZES.XS,
  [SIZES.MD]: SIZES.SM,
  [SIZES.LG]: SIZES.SM,
};

const BadgeText = React.forwardRef(
  ({ className, text, ...rest }, forwardRef) => {
    const { size } = useBadgeContext();
    return (
      <Text
        ref={forwardRef}
        size={BADGE_SIZE_TO_TYPOGRAPHY_SIZE[size]}
        weight={TYPOGRAPHY_WEIGHTS.MEDIUM}
        className={classnames(classes.text, className)}
        value={text}
        inline
        {...rest}
      />
    );
  },
);

BadgeText.displayName = 'BadgeText';
BadgeText.propTypes = propTypes;

export { BadgeText };
