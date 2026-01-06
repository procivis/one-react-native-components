import { Platform } from 'react-native';
import Share from 'react-native-share';

/**
 * Check URL validity
 * @param {string} urlString URL to validate.
 * @returns {boolean}
 */
export const isUrlValid = (urlString: string): boolean => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const url = new URL(urlString);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check URL http(s) validity
 * @param {string} urlString URL to validate.
 * @returns {boolean}
 */
export const isValidHttpUrl = (urlString: string): boolean => {
  try {
    const url = new URL(urlString);
    return url?.protocol === 'http:' || url?.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Share URL via share sheet
 * @param {string} url URL to share.
 * @param {string} title _(optional)_ title for iOS share sheet.
 * @returns {boolean}
 */
export const shareUrl = async (url: string, title?: string) => {
  if (Platform.OS === 'ios') {
    await Share.open({
      activityItemSources: [
        {
          placeholderItem: { type: 'url', content: url },
          item: {
            default: { type: 'url', content: url },
          },
          subject: title
            ? {
                default: title,
              }
            : undefined,
          linkMetadata: { originalUrl: url, url, title },
        },
      ],
      failOnCancel: false,
    });
  } else {
    await Share.open({ url, failOnCancel: false });
  }
};
