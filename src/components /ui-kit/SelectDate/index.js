import cn from 'classnames';
import React, { useState } from 'react';

import calendar from '../../../assets/media/calendar.svg';
import calendar_black from '../../../assets/media/calendar_black.svg';
import { formDate } from '../../../utils';

import CalendarDay from '../../Calendar/CalendarDay';
import Icon from '../../Icon';
import styles from './styles.module.scss';

function SelectDate({ onSelect = () => {}, placeholder = '', error, style, value = '', ...props }) {
  const [open, setOpen] = useState(false);

  const changeDate = date => {
    onSelect(formDate(date));
    setOpen(false);
  };
  return (
    <div
      className={cn(styles.select, open && styles.select_open, error.length > 0 && !open && styles.error_input, style)}
      onClick={() => setOpen(!open)}
      style={props.styles}
    >
      {value}
      <div
        className={cn(
          styles.placeholder,
          value.length !== 0 && styles.placeholder_top,
          value.length !== 0 && styles.green_color,
        )}
      >
        {placeholder}
      </div>
      {open && <CalendarDay closeCb={() => setOpen(false)} changeCb={changeDate} className={styles.calendar} />}
      {error.length > 0 && !open && <div className={styles.error}>{error}</div>}
      <Icon src={open ? calendar_black : calendar} className={styles.calendar_img} />
    </div>
  );
}

export default SelectDate;
