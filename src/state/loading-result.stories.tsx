import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';

import Animations from './loading-animations';
import LoadingResult, { LoadingResultProps, LoadingResultState, LoadingResultVariation } from './loading-result';

const Basic: Story<LoadingResultProps & { buttonDisabled: boolean }> = ({ buttonDisabled, onClose, ...args }) => (
  <LoadingResult onClose={buttonDisabled ? undefined : onClose} {...args} />
);

Basic.args = {
  title: 'Title',
  subtitle: 'Subtitle',
  state: LoadingResultState.InProgress,
  variation: LoadingResultVariation.Neutral,
  inProgressCloseButtonLabel: 'Close',
  successCloseButtonLabel: 'Close',
  failureCloseButtonLabel: 'Close',
  retryButtonLabel: 'Retry',
  ctaButtonLabel: 'CTA',
  buttonDisabled: false,
};

export { Basic as LoadingResult };

console.log(JSON.stringify(Animations.success('#ff0000', '#0000ff'), undefined, 2));

export default {
  title: 'view/loading/Loading Result',
  component: LoadingResult,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=66%3A3656&t=TEBDGdEv632ktThZ-4',
    },
  },
  argTypes: {
    variation: {
      options: [LoadingResultVariation.Neutral, LoadingResultVariation.Accent],
      control: { type: 'radio' },
    },
    state: {
      options: [
        LoadingResultState.InProgress,
        LoadingResultState.Success,
        LoadingResultState.Failure,
        LoadingResultState.Error,
      ],
      control: { type: 'radio' },
    },
    onClose: { action: 'onClose' },
    onRetry: { action: 'onRetry' },
    onCTA: { action: 'onCTA' },
  },
} as ComponentMeta<typeof LoadingResult>;
