import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ButtonType } from '../buttons';
import BackButton from '../buttons/back-button';
import { LoaderViewState } from './loader';
import LoadingResultScreen from './loading-result';

type Args = {
  label: string;
  state: LoaderViewState;
  withButton1: boolean;
  withButton2: boolean;
  withButton3: boolean;
  withHeader: boolean;
  withShareButton: boolean;
};

const Render = ({
  label,
  state,
  withButton1,
  withButton2,
  withButton3,
  withHeader,
  withShareButton,
}: Args) => {
  return (
    <LoadingResultScreen
      button={withButton1 ? { title: 'Button 1' } : undefined}
      header={
        withHeader
          ? {
              leftItem: BackButton,
              title: 'Title',
            }
          : undefined
      }
      loader={{
        animate: true,
        label,
        state,
      }}
      secondaryButton={
        withButton2
          ? { title: 'Button 2', type: ButtonType.Secondary }
          : undefined
      }
      shareButton={withShareButton ? { title: 'qr-code-date.com' } : undefined}
      tertiaryButton={
        withButton3
          ? { title: 'Button 3', type: ButtonType.Secondary }
          : undefined
      }
    />
  );
};

const Basic: StoryObj<Args> = {
  args: {
    label: 'Loading...',
    state: LoaderViewState.InProgress,
    withButton1: true,
    withButton2: false,
    withButton3: false,
    withHeader: true,
    withShareButton: false,
  },
  render: Render,
};

export { Basic as LoadingResultScreen };

export default {
  argTypes: {
    state: {
      control: { type: 'radio' },
      options: [
        LoaderViewState.InProgress,
        LoaderViewState.Success,
        LoaderViewState.Warning,
      ],
    },
  },
  component: LoadingResultScreen,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=444-44894&mode=design&t=YI1oD2BfBie5HcvJ-0',
    },
  },
  title: 'component/loader/LoadingResultScreen',
} as Meta<typeof LoadingResultScreen>;
