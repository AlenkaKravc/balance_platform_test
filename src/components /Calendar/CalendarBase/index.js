import cn from 'classnames';
import React from 'react';
import DayPicker from 'react-day-picker';
import defaultClasses from 'react-day-picker/lib/src/classNames';
import 'react-day-picker/lib/style.css';
import DropDown from '../../DropDown';
import styles from './styles.module.scss';

const WEEKDAYS_SHORT_RU = ['ВC', 'ПН', 'ВТ', 'СH', 'ЧT', 'ПT', 'СБ'];
const MONTHS_RU = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const CalendarBase = ({ closeCb = () => {}, className, stylesCalendar, stylesDaySelected, ...props }) => {
  const classNames = {
    ...defaultClasses,
    body: cn('DayPicker-Body', styles.body),
    caption: cn('DayPicker-Caption', styles.caption),
    day: cn('DayPicker-Day', styles.day),
    month: cn('DayPicker-Month', styles.month),
    navButtonNext: cn('DayPicker-NavButton--next', styles.navButtonNext),
    navButtonPrev: cn('DayPicker-NavButton--prev', styles.navButtonPrev),
    week: cn('DayPicker-Week', styles.week),
    weekday: cn('DayPicker-Weekday', styles.weekday),
    weekdays: cn('DayPicker-Weekdays', styles.weekdays),
    wrapper: cn('DayPicker-wrapper', styles.wrapper),
    today: cn('DayPicker-Day--today', styles.today),
    outside: cn('DayPicker-Day--outside', styles.outside),
  };

  return (
    <DropDown close={closeCb} styles={cn(styles.drop_down_calendar, className)}>
      <div className={styles.calendar_content}>
        <DayPicker
          className="Selectable"
          classNames={classNames}
          locale="ru"
          weekdaysShort={WEEKDAYS_SHORT_RU}
          months={MONTHS_RU}
          numberOfMonths={1}
          firstDayOfWeek={1}
          {...props}
        />
      </div>
    </DropDown>
  );
};

export default CalendarBase;
