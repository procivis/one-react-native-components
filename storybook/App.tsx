import '../.ondevice/storybook.requires';

import { getStorybookUI } from '@storybook/react-native';
import React from 'react';
import { LogBox } from 'react-native';

const StorybookUIRoot = getStorybookUI({ tabOpen: -1 });

LogBox.ignoreLogs(['ViewPropTypes will be removed']);

export default function App() {
  return <StorybookUIRoot />;
}
