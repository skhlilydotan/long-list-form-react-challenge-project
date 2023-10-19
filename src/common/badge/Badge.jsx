import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classes from './badge.module.scss';
import { ITEM_TYPE, SIZES, BADGE_SIZES } from '@common/constants';
import { BadgeContext } from './badgeContext';
import { BadgeIcon } from './BadgeIcon.jsx';
import { BADGE_COLORS, BADGE_ICON_TYPE } from './constants';
import { BadgeText } from './BadgeText.jsx';

const propTypes = {
  size: PropTypes.oneOf(BADGE_SIZES),
  itemType: PropTypes.oneOf(BADGE_ICON_TYPE),
  color: PropTypes.oneOf(Object.values(BADGE_COLORS)),
  text: PropTypes.string,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  children: PropTypes.node,
};
const defaultProps = {
  size: SIZES.MD,
  color: BADGE_COLORS.PRIMARY,
  itemType: ITEM_TYPE.DEFAULT,
};

const Badge = ({
                 text,
                 size,
                 color,
                 className,
                 dataTestId,
                 children,
                 itemType,
               }) => {
  const valueContext = { size, color, itemType };
  return (
    <BadgeContext.Provider value={valueContext}>
      <div
        className={classnames(
          classes.badgeContainer,
          { [classes[size]]: !!size },
          { [classes[`color-${color}`]]: !!color },
          { [classes[itemType]]: !!itemType },
          className,
        )}
        data-testid={dataTestId}
      >
        {!children && text && <BadgeText text={text} />}
        {children}
      </div>
    </BadgeContext.Provider>
  );
};

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;
Badge.Icon = BadgeIcon;
Badge.Text = BadgeText;

export { Badge };
