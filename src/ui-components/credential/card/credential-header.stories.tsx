import type { Meta, StoryObj } from '@storybook/react';

import ColorSchemes from '../../../../storybook/colorScheme';
import { CredentialWarningIcon, RequiredAttributeIcon } from '../../icons/credential';
import CredentialHeader from './credential-header';

const Basic: StoryObj<typeof CredentialHeader> = {
  args: {
    accessory: RequiredAttributeIcon,
    color: undefined,
    credentialDetailPrimary: 'Primary detail',
    credentialDetailSecondary: 'Secondary detail',
    credentialDetailTestID: undefined,
    credentialDetailErrorColor: false,
    credentialName: 'Credential Name',
    icon: undefined,
    iconLabelColor: undefined,
    statusIcon: CredentialWarningIcon,
  },
};

export { Basic as CredentialHeader };

export default {
  title: 'credential/card/CredentialHeader',
  component: CredentialHeader,
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
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=401-1898&mode=design&t=0DWIGZWyWYB7JzPE-0',
    },
  },
} as Meta<typeof CredentialHeader>;
