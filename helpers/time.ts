export function dayToString(day: number) {
  switch (day) {
    case 0:
      return "Sun";
      break;
    case 1:
      return "Mon";
      break;
    case 2:
      return "Tue";
      break;
    case 3:
      return "Wed";
      break;
    case 4:
      return "Thu";
      break;
    case 5:
      return "Fri";
      break;
    case 6:
      return "Sat";
      break;

    default:
      return "Invalid value`";
      break;
  }
}

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes: number | string = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + ampm;
  return strTime;
}

export function monthToString(month: number) {
  switch (month) {
    case 0:
      return "January";
      break;
    case 1:
      return "February";
      break;
    case 2:
      return "March";
      break;
    case 3:
      return "April";
      break;
    case 4:
      return "May";
      break;
    case 5:
      return "June";
      break;
    case 6:
      return "July";
      break;
    case 7:
      return "August";
      break;
    case 8:
      return "September";
      break;
    case 9:
      return "October";
      break;
    case 10:
      return "November";
      break;
    case 11:
      return "December";
      break;
    default:
      break;
  }
}

export function fixTime(time: number) {
  const timeString = time.toString();

  if (timeString.length === 1) {
    const fixedTime = "0".concat(timeString);
    return fixedTime;
  } else {
    return time;
  }
}

export function getLastDaysOfPrevMonth(
  month: number,
  year: number,
  numberOfDays: number
) {
  const days = new Array(new Date(year, month, 0).getDate())
    .fill("")
    .map((v, i) => new Date(year, month - 1, i + 1));
  return days.slice(days.length - numberOfDays);
}

export function getDaysInMonth(month: number, year: number, except: number) {
  const days = new Array(35 - except)
    .fill("")
    .map((v, i) => new Date(year, month - 1, i + 1));

  return days;
}

export function checkIfSameDay(currentDay: Date, calendarDay: Date) {
  if (
    currentDay.getDate() === calendarDay.getDate() &&
    currentDay.getMonth() === calendarDay.getMonth() &&
    currentDay.getFullYear() === calendarDay.getFullYear()
  ) {
    return true;
  } else {
    return false;
  }
}
export function checkIfSameMonth(currentDate: Date, calendarDate: Date) {
  if (currentDate.getMonth() === calendarDate.getMonth()) {
    return true;
  } else {
    return false;
  }
}

export function arrangeCalendar(month: number, year: number) {
  const firstDayOfMonth = getDaysInMonth(month, year, 0)[0].getDay();
  const lastDaysOfPreviousMonth = getLastDaysOfPrevMonth(
    month - 1,
    year,
    firstDayOfMonth
  );

  const restDaysOfCurrentMonth = getDaysInMonth(month, year, firstDayOfMonth);
  const show = [...lastDaysOfPreviousMonth, ...restDaysOfCurrentMonth];
  return show;
}

export function convertToDateTime(awsDate: string) {
  let date = awsDate.substring(0, 10);
  let time = awsDate.substring(11, 16);

  return date + " " + time;
}
