import React from 'react';
import PropTypes from 'prop-types';
import { Text, TYPOGRAPHY_WEIGHTS, TYPOGRAPHY_SIZES } from '@common/typography';
import colors from '@common/styles/colors.module.scss';


const propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
};

export const Label = ({ label, htmlFor }) => {
  return (
    <Text
      color={colors.gray700}
      size={TYPOGRAPHY_SIZES.SM}
      weight={TYPOGRAPHY_WEIGHTS.MEDIUM}
      value={label}
      htmlFor={htmlFor}
    />
  );
};

Label.propTypes = propTypes;
