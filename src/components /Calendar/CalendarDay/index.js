import React, {useEffect, useState} from 'react';
import CalendarBase from '../CalendarBase';

function CalendarDay({ changeCb = () => {}, closeCb = () => {}, date = undefined, ...props }) {
  const [day, setDay] = useState(undefined);

  const handleDayClick = (new_day, { selected }) => {
    setDay(selected ? undefined : new_day);
    changeCb(selected ? undefined : new_day);
  };

  const handleClose = () => {
    changeCb(day);
    closeCb();
  };

  useEffect(() => {
    setDay(date ? new Date(date) : undefined);
  }, [date]);

  return (
    <CalendarBase
      closeCb={closeCb}
      className={props.className}
      handleClose={handleClose}
      selectedDays={day}
      onDayClick={handleDayClick}
    />
  );
}

export default CalendarDay;
