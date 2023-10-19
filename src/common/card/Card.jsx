import React from 'react';
import PropTypes from 'prop-types';
import classes from './card.module.scss';
import classnames from 'classnames';
import CardHeader from './CardHeader';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

};

const Card = ({ className, children }) => {
  return (
    <div className={classnames(classes.card, className)}>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

Card.propTypes = propTypes;
Card.Header = CardHeader;

export default Card;