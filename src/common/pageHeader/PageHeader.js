import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Display, Text, TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS } from 'common/typography';
import colors from 'styles/colors.module.scss';
import classes from './PageHeader.module.scss';

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,

};
const PageHeader = ({ className, title, subTitle }) => {
  return (
    <div className={classnames(classes.pageHeader, className)}>
      {title && <Display value={title} size={TYPOGRAPHY_SIZES.SM}
                         weight={TYPOGRAPHY_WEIGHTS.SEMI_BOLD}
                         color={colors.gray900} />}
      {subTitle && <Text value={subTitle} color={colors.gray600} size={TYPOGRAPHY_SIZES.MD}
                         weight={TYPOGRAPHY_WEIGHTS.REGULAR} />}

    </div>
  );
};

PageHeader.propTypes = propTypes;

export default PageHeader;