import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const Button = ({ onClick = () => {}, children, className, ...props }) => {
  return (
    <button onClick={onClick} type="button" className={cn(styles.green_button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
