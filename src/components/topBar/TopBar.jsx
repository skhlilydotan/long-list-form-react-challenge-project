import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import colors from '@common/styles/colors.module.scss';
import Logo from '@common/assets/logos/il.svg?react';
import { Text, TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS } from '@common/Typography';
import classes from './TopBar.module.scss';


const propTypes = {
  className: PropTypes.string,
};
const TopBar = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div className={classnames(classes.topBar, className)}>
      <Logo className={classes.logo} />
      <Text className={classes.title} color={colors.gray700} inline value='Statistics'
            size={TYPOGRAPHY_SIZES.MD}
            weight={TYPOGRAPHY_WEIGHTS.SEMI_BOLD}
            onClick={() => navigate('/')}
      />
      <Text className={classes.title} color={colors.gray700} inline value='Users'
            size={TYPOGRAPHY_SIZES.MD}
            weight={TYPOGRAPHY_WEIGHTS.SEMI_BOLD}
            onClick={() => navigate('/users')}
      />

    </div>
  );
};

TopBar.propTypes = propTypes;

export { TopBar };