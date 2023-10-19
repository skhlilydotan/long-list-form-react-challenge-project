import PropTypes from 'prop-types';
import Empty from '@common/assets/logos/emptyState.svg?react';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
const EmptyState = ({ className, children }) => (
  <div className={className}>
    {children ? children : <Empty />}
  </div>
);

EmptyState.propTypes = propTypes;

export default EmptyState;