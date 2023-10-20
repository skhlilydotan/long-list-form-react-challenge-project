import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classes from './container.module.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
const Container = ({ className, children }) => {
  return (
    <div className={classnames(classes.container, className)}>
      {children}
    </div>
  );
};

Container.propTypes = propTypes;

export { Container };