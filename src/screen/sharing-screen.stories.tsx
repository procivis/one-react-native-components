import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import { ReceiverValidity } from '../receiver/Receiver';
import SharingScreen, { SharingScreenProps, SharingScreenVariation } from './sharing-screen';

const profileImage = require('../../storybook/assets/profile-image.png');

const Basic: Story<SharingScreenProps & { contentSize?: number; receiverImage: boolean; customHeader: boolean }> = ({
  contentSize,
  receiverImage,
  customHeader,
  ...args
}) => {
  const props: SharingScreenProps = Object.assign(
    customHeader
      ? {
          header: <Placeholder id="Header" style={styles.defaultPlaceholder} />,
        }
      : {
          receiverIcon: receiverImage ? { imageSource: profileImage } : undefined,
        },
    args,
  );
  return (
    <SharingScreen {...props}>
      <Placeholder id="Content" style={contentSize ? { height: contentSize } : styles.defaultPlaceholder} />
    </SharingScreen>
  );
};

Basic.args = {
  variation: SharingScreenVariation.Neutral,
  title: 'Title',
  customHeader: false,
  receiverTitle: 'Receiver',
  receiverImage: true,
  receiverValidity: ReceiverValidity.Trusted,
  receiverLabel: 'Receiver name',
  notice: { description: 'notice', error: false },
  contentTitle: 'Content title',
  contentSize: 0,
  detailButtonAccessibilityLabel: 'accessibility label',
  cancelLabel: 'Cancel',
  submitLabel: 'Share',
};

export { Basic as SharingScreen };

export default {
  title: 'view/Sharing Screen',
  component: SharingScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=29%3A3319&t=Tj2lfG2CQMudhqJr-4',
    },
  },
  argTypes: {
    variation: {
      options: [SharingScreenVariation.Neutral, SharingScreenVariation.Accent],
      control: { type: 'radio' },
    },
    receiverValidity: {
      options: [ReceiverValidity.Trusted, ReceiverValidity.Safe, ReceiverValidity.Warning],
      control: { type: 'radio' },
    },
    onDetail: { action: 'onDetail' },
    onCancel: { action: 'onCancel' },
    onSubmit: { action: 'onSubmit' },
  },
} as ComponentMeta<typeof SharingScreen>;

const styles = StyleSheet.create({
  defaultPlaceholder: {
    flex: 1,
  },
});
