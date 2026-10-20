// import React, { createContext, FC, PropsWithChildren } from 'react';

// const NavigationMock = {};
// export default NavigationMock;

// export const useNavigation = () => ({
//   addListener: () => () => {},
// });
// export const useRoute = () => {};
// export const useIsFocused = () => {};

// type Route<RouteName extends string, Params extends object | undefined = object | undefined> = Readonly<{
//   /**
//    * Unique key for the route.
//    */
//   key: string;
//   /**
//    * User-provided name for the route.
//    */
//   name: RouteName;
//   /**
//    * Path associated with the route.
//    * Usually present when the screen was opened from a deep link.
//    */
//   path?: string;
// }> &
//   (undefined extends Params
//     ? Readonly<{
//         /**
//          * Params for this route
//          */
//         params?: Readonly<Params>;
//       }>
//     : Readonly<{
//         /**
//          * Params for this route
//          */
//         params: Readonly<Params>;
//       }>);

// export const NavigationRouteContext = createContext<Route<string, object | undefined> | undefined>(undefined);

// export const NavigationContainer: FC<PropsWithChildren> = ({ children }) => {
//   return <>{children}</>;
// };

// export const NavigationIndependentTree: FC<PropsWithChildren> = ({ children }) => {
//   return <>{children}</>;
// };

// storybook/modules/react-navigation-native.tsx
import React, { createContext, FC, PropsWithChildren } from 'react';

export const useNavigation = () => ({
  addListener: () => () => {},
});
export const useRoute = () => ({});
export const useIsFocused = () => true;
export const useLinkBuilder = () => ({
  buildLink: () => '#',
});

export const NavigationRouteContext = createContext<any>(undefined);

export const NavigationContainer: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export const NavigationIndependentTree: FC<PropsWithChildren> = ({
  children,
}) => {
  return <>{children}</>;
};

// Bundle everything cleanly into an object to prevent "star export entries" failures
const NavigationMock = {
  NavigationContainer,
  NavigationIndependentTree,
  NavigationRouteContext,
  useIsFocused,
  useLinkBuilder,
  useNavigation,
  useRoute,
};

export default NavigationMock;
