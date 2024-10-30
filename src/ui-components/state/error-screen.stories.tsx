import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';

import ErrorScreen, { ErrorScreenProps } from './error-screen';

const Basic: Story<ErrorScreenProps> = (props) => <ErrorScreen {...props} />;

Basic.args = {
  title: 'Error',
  subtitle: 'The app has reached an error state.',
  button: { label: 'Primary', onPress: () => null },
};

export { Basic as ErrorScreen };

export default {
  title: 'view/loading/Error Screen',
  component: ErrorScreen,
  parameters: {
    noSafeArea: true,
  },
} as ComponentMeta<typeof ErrorScreen>;
