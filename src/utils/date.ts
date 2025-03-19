// Date & Time formatted as specified in SW-610

import { NativeModules, Platform } from 'react-native';
import { format } from 'timeago.js';

const MINUTE = 60 * 1000;
const DAY = 24 * 60 * MINUTE;

// OS locale
const systemLocale: string = NativeModules.I18nManager?.localeIdentifier
  ?.replace(/_/g, '-')
  .split('#')[0]
  .replace(/-$/, '');

/**
 * Date only format
 */
export const formatDate = (date: Date, locale?: string, options?: Intl.DateTimeFormatOptions) => {
  try {
    return date.toLocaleDateString(locale || systemLocale, options);
  } catch {
    return undefined;
  }
};

/**
 * Time only format
 */
export const formatTime = (date: Date, locale?: string) => {
  try {
    return date.toLocaleTimeString(locale || systemLocale, { hour: '2-digit', minute: '2-digit' });
  } catch {
    return undefined;
  }
};

/**
 * Date and time format
 */
export const formatDateTime = (date: Date, locale?: string) => {
  try {
    return date.toLocaleString(locale || systemLocale, {
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour12: locale === 'en-US',
    });
  } catch {
    return undefined;
  }
};

/**
 * Month format
 */
export const formatMonth = (date: Date, locale: string): string => {
  return `${date.toLocaleString(locale, {
    month: 'long',
  })} ${date.getFullYear()}`;
};

/**
 * Time-ago format
 */
export const formatTimeAgo = (date: Date, locale: string): string => {
  return format(date, locale);
};

/**
 * Timestamp formatted for general use
 */
export const formatTimestamp = (date: Date, locale: string, nowLabel: string): string => {
  const now = Date.now();
  const timestamp = date.getTime();
  if (now < timestamp) {
    // in the future
    return formatDateTime(date, locale) ?? '';
  }

  // in the past
  if (now - timestamp < MINUTE) {
    // less than a minute ago
    return nowLabel;
  }

  // less than a day ago
  if (now - timestamp < DAY) {
    return formatTimeAgo(date, locale);
  }

  // longer ago
  return formatDateTime(date, locale) ?? '';
};

const pad = (x: number) => (x >= 0 && x < 10 ? `0${x}` : String(x));

/**
 * Utility function to deal with `date`-type attributes
 * @param {Date} date local timezone representation
 * @returns {number} the same day, but UTC timezone with midnight time
 */
export const convertDateToUTCTimestamp = (date: Date): number =>
  Date.parse(`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`);

/**
 * Utility function to deal with `date`-type attributes
 * @param {string} date in YYYY-MM-DD representation
 * @returns {Date} the same day, but local timezone with midnight time
 */
export const convertDateStrToLocalDate = (date: string): Date =>
  Platform.select({
    // android conversion using the standard date parsing doesn't work, computing the timestamp manually
    android: (() => {
      const timestamp = Date.parse(date);
      const timezoneOffset = new Date(date).getTimezoneOffset();
      return new Date(timestamp + timezoneOffset * MINUTE);
    })(),
    default: new Date(`${date}T00:00:00`),
  });

/**
 * Inverted function to {@link convertDateToUTCTimestamp}
 * @param {number} utcTimestamp date timestamp represented as midnight UTC time
 * @returns {string} formatted date (based on locale settings, e.g. `21/02/2021`)
 */
export const formatDateOnlyFromUTCTimestamp = (utcTimestamp: number): string => {
  const utcDate = new Date(utcTimestamp);
  return (
    formatDate(
      convertDateStrToLocalDate(
        `${utcDate.getUTCFullYear()}-${pad(utcDate.getUTCMonth() + 1)}-${pad(utcDate.getUTCDate())}`,
      ),
    ) ?? ''
  );
};

const locale = (
  // Platform.OS === 'ios'
  //   ? Settings.get('AppleLocale')
  //   : NativeModules.I18nManager?.localeIdentifier
    NativeModules.I18nManager?.localeIdentifier
)
  ?.split('@')[0]
  .replace('_', '-');

export const formatDateTimeLocalized = (date: Date) => {
  return formatDateTime(date, locale);
};

export const formatDateLocalized = (date: Date) => {
  return formatDate(date, locale);
};
