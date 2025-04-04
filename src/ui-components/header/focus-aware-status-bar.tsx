import { useIsFocused } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { StatusBar, StatusBarProps } from 'react-native';

const FocusAwareStatusBar: FunctionComponent<StatusBarProps> = (props) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar animated={true} {...props} /> : null;
};

export default FocusAwareStatusBar;
