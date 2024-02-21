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
  console.log(date.toDate());
  const now = new Date(date.format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'));
  console.log(now);

  const d = dayjs().endOf('day');
  console.log('end of day');
  console.log(d);
  console.log(d.toDate());
  const d2 = new Date(d.format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'));
  console.log(d2);
  return now;
}

export function calcExpireDate(addValue: number, addUnit: TimeUnit): Date {
  const today = dayjs().endOf('day');
  const future = today.add(addValue, addUnit);
  return future.toDate();
}
