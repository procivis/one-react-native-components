import type { Meta, StoryObj } from '@storybook/react';

import CredentialAttributeSelector from './selector';
import { SelectorStatus } from './selector-status';

const Basic: StoryObj<typeof CredentialAttributeSelector> = {
  args: {
    status: SelectorStatus.SelectedCheckmark,
    style: { margin: 12 },
  },
};

export { Basic as Selector };

export default {
  argTypes: {
    status: {
      control: { type: 'radio' },
      options: [
        SelectorStatus.Empty,
        SelectorStatus.SelectedRadio,
        SelectorStatus.SelectedCheckmark,
        SelectorStatus.Required,
        SelectorStatus.Disabled,
        SelectorStatus.Rejected,
      ],
    },
  },
  component: CredentialAttributeSelector,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=433-28352&mode=design&t=91K8am4RSNRB8qgZ-0',
    },
  },
  title: 'credential/Selector',
} as Meta<typeof CredentialAttributeSelector>;
