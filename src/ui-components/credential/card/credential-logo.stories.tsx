import type { Meta, StoryObj } from '@storybook/react';

import ColorSchemes from '../../../../storybook/colorScheme';
import CredentialLogo from './credential-logo';

const Basic: StoryObj<typeof CredentialLogo> = {
  args: {
    color: undefined,
    credentialName: 'Credential Name',
    icon: undefined,
    iconLabelColor: undefined,
    size: undefined,
  },
};

export { Basic as CredentialLogo };

export default {
  title: 'credential/card/CredentialLogo',
  component: CredentialLogo,
  argTypes: {
    color: {
      options: Object.entries(ColorSchemes.procivis)
        .filter(([_, value]) => typeof value === 'string')
        .map(([key]) => key),
      control: { type: 'select' },
    },
    iconLabelColor: {
      options: Object.entries(ColorSchemes.procivis)
        .filter(([_, value]) => typeof value === 'string')
        .map(([key]) => key),
      control: { type: 'select' },
    },
    size: {
      options: [44, 20],
      control: { type: 'select' },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=401-1807&t=aYYyzt4OQQZxwjRu-0',
    },
  },
} as Meta<typeof CredentialLogo>;
