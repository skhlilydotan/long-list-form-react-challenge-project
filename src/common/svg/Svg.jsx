import React from 'react';
import PropTypes from 'prop-types';
import { useDynamicSvgImport } from './useDynamicSvgImport';

const propTypes = {
  name: PropTypes.string.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  onLoading: PropTypes.func,
};

const Svg = ({ name, onCompleted, onError, onLoading, ...rest }) => {
  const { error, loading, SvgIcon } = useDynamicSvgImport(name, {
    onCompleted,
    onError,
  });

  if (error) {
    return error.message;
  }
  if (loading && onLoading) {
    return onLoading();
  }
  if (SvgIcon) {
    return (
      <SvgIcon {...rest} />
    );
  }
  return null;
};

Svg.propTypes = propTypes;

export default Svg;
