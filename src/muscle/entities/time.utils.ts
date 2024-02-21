import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
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

export function expireDateTest(): Date {
  const today = dayjs().endOf('day');
  console.log(today);
  return today.toDate();
}

export function compareDateTest(): Date {
  const today = dayjs().startOf('day');
  console.log(today);
  return today.toDate();
}

export function endOfDay(): Date {
  const today = dayjs().endOf('day');
  console.log('end of day', today, today.toDate());
  return today.toDate();
}

export function endOfDayUTC(): Date {
  const today = dayjs().utc().endOf('day');
  console.log('end of day utc', today, today.toDate());
  return today.toDate();
}
