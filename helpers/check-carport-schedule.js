import moment from 'moment';
import {formatISOWeekday} from './format-isoweekday';

export const checkCarportSchedule = (port, time) => {
  const {schedule} = port;
  const day = formatISOWeekday(time);
  if (schedule) {
    if (schedule[day].allday) {
      return true;
    } else {
      return moment(time).isBetween(
        moment(schedule[day].start, 'HH:mm'),
        moment(schedule[day].end, 'HH:mm'),
      );
    }
  } else {
    // Schedule hasn't been made yet
    return true;
  }
};
