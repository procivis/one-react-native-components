import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';

import ErrorScreen, { ErrorScreenProps, ErrorScreenVariation } from './error-screen';

const Basic: Story<ErrorScreenProps> = (props) => <ErrorScreen {...props} />;

Basic.args = {
  title: 'Error',
  subtitle: 'The app has reached an error state.',
  variation: ErrorScreenVariation.Neutral,
  buttons: [
    { label: 'Primary', onPress: () => null },
    { label: 'Secondary', onPress: () => null },
  ],
};

export { Basic as ErrorScreen };

export default {
  title: 'view/loading/Error Screen',
  component: ErrorScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/baolhE7fB2BMdCN5RVjusX/App-Feature-Library?node-id=782%3A31982&t=EX6zyqvONranvehN-4',
    },
  },
  argTypes: {
    variation: {
      options: [ErrorScreenVariation.Neutral, ErrorScreenVariation.Accent],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof ErrorScreen>;
