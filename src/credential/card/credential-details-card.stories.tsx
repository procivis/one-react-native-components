import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import CredentialDetailsCardBackground from '../../../storybook/assets/CredentialCardBackground.png';
import { AlertOutlineIcon, CredentialWarningIcon } from '../../icons/credential';
import CredentialDetailsCard from './credential-details-card';

const Basic: ComponentStory<typeof CredentialDetailsCard> = ({ ...args }) => {
  return <CredentialDetailsCard {...args} />;
};

Basic.args = {
  attributes: [
    {
      id: 'attribute-1',
      name: 'Attribute 1',
      value: 'Value',
    },
    {
      id: 'attribute-2',
      name: 'Attribute 2',
      value: 'Value 2',
    },
    {
      id: 'attribute-1',
      name: 'Attribute 1',
      image: {
        uri: 'https://s3-alpha-sig.figma.com/img/ac5f/5ece/9cbfda349b80d4a06724b8486281b688?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jjkjqOL~2ly-PP0SeYb63BcWW~5KLrGSEUjWxWRIBrQhzYmkBMEXD1yIXzyBT5Dt7QHvAggXK0EtlrngV7CTtsoJ1p0Apk01I2qumkFz7s0eZkU0OHq1X2dRyzjU40eUorAjzgMrjD8XVIjFLBb7wKW-U-lMAu1Q3Fzq~WlHu7CuY~nEPX7EtnScxQeU6-mqVTzeZbp5Y8frhwnY6~0Pew53f7qIB6DH7CC2xguLG94nPmKm0-Esu-AGfp2~hGiU1h~yvtrdhGAjR3vH7yTL~jSPkOdkzHRrizS0oO568lq-QeVgueZS3Srqr1EKj5xIw65J7Ms9FuaX2~xiRrSJLg__',
      },
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
      Footer view
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
