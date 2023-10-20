import React from 'react';
import PropTypes from 'prop-types';
import { Text, TYPOGRAPHY_WEIGHTS, TYPOGRAPHY_SIZES } from '@common/typography';
import classnames from 'classnames';
import classes from './card.module.scss';

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.node,
};
const CardHeader = ({ className, title, children }) => {
  return (
    <div className={classnames(classes.header, className)}>
      {title && <Text value={title} size={TYPOGRAPHY_SIZES.LG} weight={TYPOGRAPHY_WEIGHTS.SEMI_BOLD} />}
      {children}
    </div>
  );
};

CardHeader.propTypes = propTypes;

export default CardHeader;