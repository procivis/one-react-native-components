import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScanButton, { ScanButtonProps } from './scan-button';

const Render = ({ style, ...args }: ScanButtonProps) => {
  const insets = useSafeAreaInsets();
  return <ScanButton {...args} style={[{ marginVertical: Math.max(24, insets.top) }, style]} />;
};

const Basic: StoryObj<typeof ScanButton> = {
  render: Render,
};

export { Basic as ScanButton };

export default {
  title: 'base/button/Scan Button',
  component: ScanButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=527-88398&t=OcqD1XaEyN4BAsCn-4',
    },
  },
} as Meta<typeof ScanButton>;
