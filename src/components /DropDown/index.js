import React from 'react';
import { ClickAwayListener } from '../../utils/core';

import styles from './styles.module.scss';

import cn from 'classnames';

export default function DropDown({ close = () => {}, children, style, ...props }) {
  return (
    <div
      onClick={e => e.stopPropagation()}
      className={cn(styles.drop_down, styles.animate, styles.slideIn, props.styles)}
      style={style}
    >
      <ClickAwayListener onClickAway={() => close()}>{children}</ClickAwayListener>
    </div>
  );
}
