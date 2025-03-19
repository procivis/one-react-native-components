import type { Meta, StoryObj } from '@storybook/react';

import ActivityIndicator from './activity-indicator';

const Basic: StoryObj<typeof ActivityIndicator> = {};

export { Basic as ActivityIndicator };

export default {
  title: 'base/activity/Activity Indicator',
  component: ActivityIndicator,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=444-45709&node-type=symbol&t=OQxawbbArhzkDVkZ-0',
    },
  },
} as Meta<typeof ActivityIndicator>;
