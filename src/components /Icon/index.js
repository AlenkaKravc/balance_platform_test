import styles from './styles.module.scss';

import React from 'react';
import cn from 'classnames';

const Icon = ({ src, className, alt = '', width, height, style, margin, ...props }) => (
  <img
    alt={alt}
    className={cn(styles.img_icon, className)}
    src={src}
    style={{ ...style, width, height, margin }}
    {...props}
  />
);

export default Icon;
