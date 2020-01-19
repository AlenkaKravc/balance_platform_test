import React from 'react';

import styles from './styles.module.scss';

import cn from 'classnames';

const Row = ({ children, className, ...props }) => (
  <div className={cn(styles.row, className)} {...props}>
    {children}
  </div>
);

export default Row;
