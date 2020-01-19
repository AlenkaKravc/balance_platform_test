export const formString = data => (data < 10 ? `0${data}` : data);

export const formDate = date_str => {
  const date = new Date(date_str);
  let day = date.getDate();
  day = formString(day);

  let month = date.getMonth() + 1;
  month = formString(month);

  const year = date.getFullYear();

  return [day, month, year].join('.');
};
