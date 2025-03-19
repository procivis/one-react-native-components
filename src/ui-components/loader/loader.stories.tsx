import type { Meta, StoryObj } from '@storybook/react';

import LoaderView, { LoaderViewProps, LoaderViewState } from './loader';

const Basic: StoryObj<LoaderViewProps> = {
  args: {
    state: LoaderViewState.InProgress,
  },
};

export { Basic as LoaderView };

export default {
  title: 'component/loader/LoaderView',
  component: LoaderView,
  argTypes: {
    state: {
      options: [LoaderViewState.InProgress, LoaderViewState.Success, LoaderViewState.Warning, LoaderViewState.Error],
      control: { type: 'radio' },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=444-44894&mode=design&t=YI1oD2BfBie5HcvJ-0',
    },
  },
} as Meta<typeof LoaderView>;
