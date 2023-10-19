import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
};

const ButtonText = ({ className, value, children }) => (
  <div className={className}>{children || value}</div>
);

ButtonText.propTypes = propTypes;

export default ButtonText;
