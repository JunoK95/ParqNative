import {getCarportSchedule} from '.';
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

export async function checkSchedule(port_id, time) {
  try {
    const data = await getCarportSchedule(port_id);
    if (data) {
      console.log('Schedule =>', data);
      const day =
        isoWeekdayIndex[parseInt(moment(time).isoWeekday(), 10) - 1].day;
      return data[day];
    } else {
      console.log('no data');
      return;
    }
  } catch (error) {
    console.error(error);
    return;
  }
}
