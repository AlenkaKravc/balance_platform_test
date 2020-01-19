import React from 'react';
import styles from './styles.module.scss';

const H1 = ({ children, ...props }) => (
  <h1 className={styles.h1} {...props}>
    {children}
  </h1>
);

export default H1;
