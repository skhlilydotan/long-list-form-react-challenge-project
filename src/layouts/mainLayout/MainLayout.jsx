import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TopBar } from '@components/TopBar';
import styles from './mainLayout.module.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const MainLayout = ({ children, className }) => {
  return (
    <div className={classNames(styles.app, className)}>
      <TopBar className={styles.header} />
      <div className={styles.main}>
        {children}
      </div>

    </div>
  );
};

MainLayout.propTypes = propTypes;

export default MainLayout;