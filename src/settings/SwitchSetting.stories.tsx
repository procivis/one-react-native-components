import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { LanguageIcon } from '../../storybook/assets/LanguageIcon';
import SwitchSetting from './SwitchSetting';

const Basic: ComponentStory<typeof SwitchSetting> = (args) => <SwitchSetting {...args} icon={<LanguageIcon />} />;

Basic.args = {
  title: 'Title',
  value: true,
  disabled: false,
};

export { Basic as SwitchSetting };

export default {
  title: 'view/settings/Switch Setting',
  component: SwitchSetting,
  argTypes: {
    onChange: { action: 'onChange' },
    icon: {
      description: 'Control icon',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=164%3A4502&t=C1P2N9hIFMRhoI88-4',
    },
  },
} as ComponentMeta<typeof SwitchSetting>;
