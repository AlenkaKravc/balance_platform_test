import cn from 'classnames';
import React, { useState } from 'react';

import arrow from '../../../assets/media/arrows.svg';
import DropDown from '../../DropDown';
import Icon from '../../Icon';
import styles from './styles.module.scss';

function Select({ list = [], onSelect = () => {}, placeholder = '', style, value = '', ...props }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(styles.select, open && styles.select_open, style)}
      onClick={() => setOpen(!open)}
      style={props.styles}
    >
      {value}
      <div
        className={cn(
          styles.placeholder,
          (open || value.length !== 0) && styles.placeholder_top,
          open && styles.green_color,
        )}
      >
        {placeholder}
      </div>
      {open && (
        <DropDown close={() => setOpen(false)} styles={styles.drop_down}>
          <div className={styles.list}>
            {list.map(item => (
              <div
                className={styles.line}
                onClick={() => {
                  setOpen(false);
                  onSelect(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </DropDown>
      )}
      <Icon src={arrow} className={styles.arrow} />
    </div>
  );
}

export default Select;
