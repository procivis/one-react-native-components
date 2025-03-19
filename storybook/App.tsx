import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import { view } from '../.ondevice/storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
  enableWebsockets: true,
  host: 'localhost',
  port: 7007,
});

export default function App() {
  return <StorybookUIRoot />;
}
