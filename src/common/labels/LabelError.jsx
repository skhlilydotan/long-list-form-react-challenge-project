import React from 'react';
import PropTypes from 'prop-types';
import { Text, TYPOGRAPHY_WEIGHTS, TYPOGRAPHY_SIZES } from '@common/typography';
import colors from '@common/styles/colors.module.scss';

const propTypes = {
  label: PropTypes.string,
};

export const LabelError = ({ label }) => {
  return (
    <Text
      color={colors.error500}
      size={TYPOGRAPHY_SIZES.SM}
      weight={TYPOGRAPHY_WEIGHTS.REGULAR}
      value={label}
    />
  );
};

LabelError.propTypes = propTypes;
