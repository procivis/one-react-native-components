import React, { FunctionComponent, useMemo } from 'react';
import { ColorValue, StatusBar, StatusBarProps, StatusBarStyle } from 'react-native';

import { getBrightness } from './color';

interface ContrastingStatusBarProps extends Omit<StatusBarProps, 'barStyle'> {
  backgroundColor: ColorValue;
}

/**
 * Defines transparent status bar with content contrasting to the background
 */
const ContrastingStatusBar: FunctionComponent<ContrastingStatusBarProps> = ({ backgroundColor, ...props }) => {
  const barStyle = useMemo<StatusBarStyle>(
    () => (getBrightness(backgroundColor) > 0.5 ? 'dark-content' : 'light-content'),
    [backgroundColor],
  );
  return <StatusBar translucent={true} barStyle={barStyle} backgroundColor={'transparent'} {...props} />;
};

export default ContrastingStatusBar;
