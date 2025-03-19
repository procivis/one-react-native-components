/* eslint-disable no-console */
import { OneError } from '@procivis/react-native-one-core';
import * as Sentry from '@sentry/react-native';

export function reportError(message: string) {
  if (!__DEV__) {
    try {
      Sentry.captureException(new Error(message));
    } catch (error) {
      // do nothing
    }
  } else {
    console.warn('reportError:', message);
  }
}

const getDebugExceptionInfo = (error: unknown, message: string | undefined) => {
  if (error instanceof OneError) {
    let info = `[${error.code}](${error.message})`;
    if (error.cause) {
      info = `${info}: ${error.cause}`;
    }
    return message ? `(${message}, ${info})` : info;
  }

  return message ? `(${message})` : '';
};

export function reportException(e: unknown, message?: string) {
  if (!__DEV__) {
    try {
      Sentry.withScope((scope) => {
        if (message) {
          scope.setExtra('message', message);
        }

        if (e instanceof OneError) {
          // prevent reporting specific errors
          if (e.cause?.includes('BLE adapter not enabled')) {
            return;
          }

          scope.setExtra('operation', e.operation);
          scope.setExtra('code', e.code);
          scope.setExtra('codeMessage', e.message);
          if (e.cause) {
            scope.setExtra('cause', e.cause);
          }

          Sentry.captureException(e.originalError);
        } else {
          Sentry.captureException(e);
        }
      });
    } catch (error) {
      // do nothing
    }
  } else {
    const info = getDebugExceptionInfo(e, message);
    console.warn(`reportException${info}`, e, e instanceof Error ? e.stack : undefined);
  }
}

export function reportTraceInfo(category: string, message?: string, data?: Sentry.Breadcrumb['data']) {
  if (!__DEV__) {
    try {
      Sentry.addBreadcrumb({
        category,
        data,
        level: 'log',
        message,
      });
    } catch (error) {
      // do nothing
    }
  } else {
    const logged: unknown[] = [category, message];

    if (data) {
      logged.push(data);
    }

    console.log(...logged);
  }
}
