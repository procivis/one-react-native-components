import { fn } from '@storybook/test';
import React, { createContext, FC, PropsWithChildren } from 'react';

export default {};

export const useNavigation = fn(() => ({
  addListener: () => () => {},
}));
export const useRoute = fn;
export const useIsFocused = fn;

type Route<RouteName extends string, Params extends object | undefined = object | undefined> = Readonly<{
  /**
   * Unique key for the route.
   */
  key: string;
  /**
   * User-provided name for the route.
   */
  name: RouteName;
  /**
   * Path associated with the route.
   * Usually present when the screen was opened from a deep link.
   */
  path?: string;
}> &
  (undefined extends Params
    ? Readonly<{
        /**
         * Params for this route
         */
        params?: Readonly<Params>;
      }>
    : Readonly<{
        /**
         * Params for this route
         */
        params: Readonly<Params>;
      }>);

export const NavigationRouteContext = createContext<Route<string, object | undefined> | undefined>(undefined);

export const NavigationContainer: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};
