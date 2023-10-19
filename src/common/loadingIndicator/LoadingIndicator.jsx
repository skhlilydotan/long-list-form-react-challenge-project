import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Text, TYPOGRAPHY_WEIGHTS } from '@common/typography';
import colors from '@common/styles/colors.module.scss';
import classes from './loadingIndicator.module.scss';
import { SIZES } from '@common/constants';
import {
  LOADING_INDICATOR_STYLES,
  LOADING_INDICATOR_TEXT,
} from './constants';

const propTypes = {
  size: PropTypes.oneOf([SIZES.SM, SIZES.MD, SIZES.LG, SIZES.XL]),
  style: PropTypes.oneOf(Object.values(LOADING_INDICATOR_STYLES)),
  dataTestId: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  size: SIZES.SM,
  style: LOADING_INDICATOR_STYLES.LINE_SIMPLE,
};

const LoadingIndicator = ({ size, style, dataTestId, value, className }) => (
  <div
    className={classnames(classes.container, className)}
    data-testid={dataTestId}
  >
    <div className={classes.circleContainer}>
      <span
        className={classnames(classes[size], classes.loading, classes[style])}
      >
        <span
          className={classnames(
            classes.edge,
            classes[`_${size}EdgeRight`],
            classes[`_${size}EdgeWidth`],
          )}
        ></span>
        <span
          className={classnames(
            classes.edge,
            classes[`_${size}EdgeLeft`],
            classes[`_${size}EdgeWidth`],
          )}
        ></span>
      </span>
    </div>
    {value && (
      <Text
        size={LOADING_INDICATOR_TEXT[size]}
        weight={TYPOGRAPHY_WEIGHTS.MEDIUM}
        value={value}
        color={colors.gray700}
        className={classes.text}
      />
    )}
  </div>
);

LoadingIndicator.defaultProps = defaultProps;
LoadingIndicator.propTypes = propTypes;
LoadingIndicator.displayName = 'Loading Indicator';

export { LoadingIndicator };
