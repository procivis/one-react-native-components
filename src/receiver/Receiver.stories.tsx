import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';

import Receiver, { BackupStatus, ReceiverProps, ReceiverValidity } from './Receiver';

const profileImage = require('../../storybook/assets/profile-image.png');

const Basic: Story<ReceiverProps & { receiverImage: boolean; detailButton: boolean }> = ({
  receiverImage,
  detailButton,
  onDetail,
  ...args
}) => {
  return (
    <Receiver
      onDetail={detailButton ? onDetail : undefined}
      {...args}
      receiverIcon={receiverImage ? { imageSource: profileImage } : undefined}
    />
  );
};

Basic.args = {
  receiverTitle: 'Receiver',
  receiverImage: true,
  detailButton: true,
  receiverValidity: ReceiverValidity.Trusted,
  receiverLabel: 'Receiver name',
  notice: { description: 'notice', error: false },
  detailButtonAccessibilityLabel: 'accessibility label',
};

export { Basic as Receiver };

export default {
  title: 'component/data-cluster/Receiver',
  component: Receiver,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=29%3A3147&t=xf1zdsVA2Ts1W3Om-4',
    },
  },
  argTypes: {
    receiverValidity: {
      options: [
        ReceiverValidity.Trusted,
        ReceiverValidity.Safe,
        ReceiverValidity.Warning,
        BackupStatus.Good,
        BackupStatus.Syncing,
        BackupStatus.Failure,
      ],
      control: { type: 'radio' },
    },
    onDetail: { action: 'onDetail' },
  },
} as ComponentMeta<typeof Receiver>;
