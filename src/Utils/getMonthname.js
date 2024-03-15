export function getMonthName(monthNumber) {
  const months = {
    1: "January",
    2: "Feb",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return months[monthNumber];
}

export function getDefaultMonthCount() {
  const months = {
    January: 0,
    Feb: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  return months;
}
