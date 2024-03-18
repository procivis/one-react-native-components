import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';

import { theme } from '../theme';
import { Biometry, Keypad, KeypadProps } from './keypad';

const Basic: Story<KeypadProps & { deleteEnabled: boolean }> = (args) => (
  <Keypad {...args} onPressDelete={args.deleteEnabled ? args.onPressDelete : undefined} />
);

Basic.args = {
  deleteEnabled: false,
  biometry: Biometry.FaceID,
  style: { padding: theme.padding },
};

export { Basic as Keypad };

export default {
  title: 'base/pin/Keypad',
  component: Keypad,
  argTypes: {
    biometry: {
      options: [Biometry.FaceID, Biometry.Other, ''],
      control: { type: 'radio' },
    },
    onBiometricPress: { action: 'onBiometricPress' },
    onPressDigit: { action: 'onPressDigit' },
    onPressDelete: { action: 'onPressDelete' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=41%3A3089&t=if2gUkBSc85H9hWC-4',
    },
  },
} as ComponentMeta<typeof Keypad>;
