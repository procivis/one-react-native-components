import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-svg';

import CredentialDetailsCardBackground from '../../../storybook/assets/CredentialCardBackground.png';
import { AlertOutlineIcon, CredentialWarningIcon } from '../../icons/credential';
import CredentialDetailsCard from './credential-details-card';

const Basic: ComponentStory<typeof CredentialDetailsCard> = ({ ...args }) => {
  return <CredentialDetailsCard {...args} />;
};

Basic.args = {
  attributes: [
    {
      attributes: [
        {
          id: 'attribute-1-1',
          name: 'Attribute 1.1',
          value: 'Value 1.1',
        },
        {
          attributes: [
            {
              id: 'attribute-1-2-1',
              name: 'Attribute 1.2.1',
              value: 'Value 1.2.1',
            },
            {
              id: 'attribute-1-2-2',
              name: 'Attribute 1.2.2',
              value: 'Value 1.2.2',
            },
          ],
          id: 'attribute-1-2',
          name: 'Attribute 1.2',
        },
      ],
      id: 'attribute-1',
      name: 'Attribute 1',
    },
    {
      id: 'attribute-2',
      name: 'Attribute 2',
      image: {
        uri: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png',
      },
    },
    {
      id: 'attribute-3',
      name: 'Attribute 3',
      value: 'Value 3',
    },
    {
      id: 'attribute-4',
      name: 'Attribute 4',
      value: 'Value 4',
    },
    {
      id: 'attribute-5',
      name: 'Attribute 5',
      value: 'Value 5',
    },
    {
      id: 'attribute-6',
      name: 'Attribute 5',
      value: 'Value 5',
    },
  ],
  card: {
    cardImage: { imageSource: CredentialDetailsCardBackground },
    color: undefined,
    header: {
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
  },
  expanded: true,
  footer: (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: 'lightgray',
        padding: 12,
      }}>
      <Text>Footer view</Text>
    </View>
  ),
};

export { Basic as CredentialDetailsCard };

export default {
  title: 'credential/card/CredentialDetailsCard',
  component: CredentialDetailsCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=415-10041&mode=design&t=0DWIGZWyWYB7JzPE-0',
    },
  },
} as ComponentMeta<typeof CredentialDetailsCard>;
