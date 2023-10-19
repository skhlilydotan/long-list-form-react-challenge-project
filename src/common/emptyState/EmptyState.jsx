import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Smile } from "assets/icons/smile-01.svg"

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};
const EmptyState = ({ className, children }) => (
    <div className={className}>
        {children ? children : <Smile/>}
    </div>
);

EmptyState.propTypes = propTypes;

export default EmptyState;