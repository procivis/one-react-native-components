import type { Meta, StoryObj } from '@storybook/react';

import ColorSchemes from '../../../../storybook/colorScheme';
import {
  CredentialWarningIcon,
  RequiredAttributeIcon,
} from '../../icons/credential';
import CredentialHeader from './credential-header';

const Basic: StoryObj<typeof CredentialHeader> = {
  args: {
    accessory: RequiredAttributeIcon,
    color: undefined,
    credentialDetailErrorColor: false,
    credentialDetailPrimary: 'Primary detail',
    credentialDetailSecondary: 'Secondary detail',
    credentialDetailTestID: undefined,
    credentialName: 'Credential Name',
    icon: undefined,
    iconLabelColor: undefined,
    statusIcon: CredentialWarningIcon,
  },
};

export { Basic as CredentialHeader };

export default {
  argTypes: {
    color: {
      control: { type: 'select' },
      options: Object.entries(ColorSchemes.procivis)
        .filter(([_, value]) => typeof value === 'string')
        .map(([key]) => key),
    },
    iconLabelColor: {
      control: { type: 'select' },
      options: Object.entries(ColorSchemes.procivis)
        .filter(([_, value]) => typeof value === 'string')
        .map(([key]) => key),
    },
  },
  component: CredentialHeader,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=401-1898&mode=design&t=0DWIGZWyWYB7JzPE-0',
    },
  },
  title: 'credential/card/CredentialHeader',
} as Meta<typeof CredentialHeader>;
