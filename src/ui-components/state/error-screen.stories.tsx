import type { Meta, StoryObj } from '@storybook/react';

import ErrorScreen, { ErrorScreenProps } from './error-screen';

const Basic: StoryObj<ErrorScreenProps> = {
  args: {
    title: 'Error',
    subtitle: 'The app has reached an error state.',
    button: { label: 'Primary', onPress: () => null },
  },
};

export { Basic as ErrorScreen };

export default {
  title: 'view/loading/Error Screen',
  component: ErrorScreen,
  parameters: {
    noSafeArea: true,
  },
} as Meta<typeof ErrorScreen>;
