import moment from 'moment';

const isoWeekdayIndex = [
  {
    day: 'mon',
    title: 'Monday',
  },
  {
    day: 'tue',
    title: 'Tuesday',
  },
  {
    day: 'wed',
    title: 'Wednesday',
  },
  {
    day: 'thu',
    title: 'Thursday',
  },
  {
    day: 'fri',
    title: 'Friday',
  },
  {
    day: 'sat',
    title: 'Saturday',
  },
  {
    day: 'sun',
    title: 'Sunday',
  },
];

export function formatISOWeekday(time) {
  const currentTime = time ? time : new Date();
  // eslint-disable-next-line prettier/prettier
  const currentDay = isoWeekdayIndex[parseInt(moment(currentTime).isoWeekday(), 10) - 1].day;
  console.log(currentDay);
  return currentDay.toString();
}
