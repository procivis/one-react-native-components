// Date & Time formatted as specified in SW-610

import { NativeModules } from 'react-native';

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
    });
  } catch {
    return undefined;
  }
};
