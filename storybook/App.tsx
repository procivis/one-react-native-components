import '../.ondevice/storybook.requires';

import { getStorybookUI } from '@storybook/react-native';
import React from 'react';

const StorybookUIRoot = getStorybookUI({ tabOpen: -1 });

export default function App() {
  return <StorybookUIRoot />;
}
