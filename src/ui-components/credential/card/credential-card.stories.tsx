import type { Meta, StoryContext, StoryObj } from '@storybook/react';
import React from 'react';
import { fn } from 'storybook/test';

import CredentialCardBackground from '../../../../storybook/assets/CredentialCardBackground.png';
import ColorSchemes from '../../../../storybook/colorScheme';
import { ExtendedContext } from '../../../../storybook/context';
import { CredentialNoticeWarningIcon, CredentialWarningIcon, RequiredAttributeIcon } from '../../icons/credential';
import CredentialCard, { CredentialCardProps } from './credential-card';

const Render = (args: CredentialCardProps, context: StoryContext<CredentialCardProps>) => {
  const extendedContext = context as ExtendedContext<CredentialCardProps>;
  const viewport = extendedContext.parameters.viewport.options[extendedContext.userGlobals.viewport.value ?? extendedContext.initialGlobals.viewport.value];
  const width = parseInt(viewport.styles.width.replace('px', ''), 10);
  const props = {
    ...args,
    width,
  };
  return <CredentialCard {...props} />;
};

const Basic: StoryObj<typeof CredentialCard> = {
  args: {
    cardImage: { imageSource: CredentialCardBackground },
    color: undefined,
    header: {
      accessory: RequiredAttributeIcon,
      credentialDetailErrorColor: false,
      credentialDetailPrimary: 'Primary detail',
      credentialDetailSecondary: 'Secondary detail',
      credentialDetailTestID: undefined,
      credentialName: 'Credential Name',
      icon: undefined,
      iconLabelColor: undefined,
      statusIcon: CredentialWarningIcon,
    },
    notice: {
      noticeIcon: CredentialNoticeWarningIcon,
      text: 'Notice related to the credential',
    },
    onHeaderPress: fn(),
    tags: [],
  },
  render: Render,
};

export { Basic as CredentialCard };

export default {
  argTypes: {
    color: {
      control: { type: 'select' },
      options: Object.entries(ColorSchemes.procivis)
        .filter(([_, value]) => typeof value === 'string')
        .map(([key]) => key),
    },
    onHeaderPress: { action: 'onPress' },
  },
  component: CredentialCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=415-10041&mode=design&t=0DWIGZWyWYB7JzPE-0',
    },
  },
  title: 'credential/card/CredentialCard',
} as Meta<typeof CredentialCard>;
