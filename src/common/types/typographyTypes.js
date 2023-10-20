import PropTypes from 'prop-types';
import { TYPOGRAPHY_WEIGHTS, SIZES } from '@common/constants';

const typographySizeType = PropTypes.oneOf(
  Object.values(SIZES),
);

const typographyWeightType = PropTypes.oneOf(
  Object.values(TYPOGRAPHY_WEIGHTS),
);

export { typographyWeightType, typographySizeType };
