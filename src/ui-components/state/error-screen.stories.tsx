import type { Meta, StoryObj } from '@storybook/react';

import ErrorScreen, { ErrorScreenProps } from './error-screen';

const Basic: StoryObj<ErrorScreenProps> = {
  args: {
    button: { label: 'Primary', onPress: () => null },
    subtitle: 'The app has reached an error state.',
    title: 'Error',
  },
};

export { Basic as ErrorScreen };

export default {
  component: ErrorScreen,
  parameters: {
    noSafeArea: true,
  },
  title: 'view/loading/Error Screen',
} as Meta<typeof ErrorScreen>;
