import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Bucharest');

export enum TimeUnit {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export function rightNow(): Date {
  const date = dayjs();
  console.log(date);
  const now = new Date(date.format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'));
  return now;
}

export function calcExpireDate(addValue: number, addUnit: TimeUnit): Date {
  const today = dayjs().endOf('day');
  const future = today.add(addValue, addUnit);
  return future.toDate();
}
