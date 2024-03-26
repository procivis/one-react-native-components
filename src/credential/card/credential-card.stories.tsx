import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import CredentialCardBackground from '../../../storybook/assets/CredentialCardBackground.png';
import ColorSchemes from '../../../storybook/colorScheme';
import { AlertOutlineIcon, CredentialWarningIcon, RequiredAttributeIcon } from '../../icons/credential';
import CredentialCard from './credential-card';

const Basic: ComponentStory<typeof CredentialCard> = ({ ...args }) => {
  return <CredentialCard {...args} />;
};

Basic.args = {
  cardImage: { imageSource: CredentialCardBackground },
  color: undefined,
  header: {
    accessory: RequiredAttributeIcon,
    credentialDetail: 'Credential detail',
    credentialDetailTestID: undefined,
    credentialDetailErrorColor: false,
    credentialName: 'Credential Name',
    icon: undefined,
    iconLabelColor: undefined,
    statusIcon: CredentialWarningIcon,
  },
  notice: 'Notice related to the credential',
  noticeIcon: AlertOutlineIcon,
};

export { Basic as CredentialCard };

export default {
  title: 'credential/card/CredentialCard',
  component: CredentialCard,
  argTypes: {
    color: {
      options: Object.entries(ColorSchemes.procivis)
        .filter(([_, value]) => typeof value === 'string')
        .map(([key]) => key),
      control: { type: 'select' },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=415-10041&mode=design&t=0DWIGZWyWYB7JzPE-0',
    },
  },
} as ComponentMeta<typeof CredentialCard>;