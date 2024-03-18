import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { LanguageIcon } from '../../storybook/assets/LanguageIcon';
import ButtonSetting from './ButtonSetting';

const Basic: ComponentStory<typeof ButtonSetting> = (args) => <ButtonSetting {...args} icon={<LanguageIcon />} />;

Basic.args = {
  title: 'Title',
};

export { Basic as ButtonSetting };

export default {
  title: 'view/settings/Button Setting',
  component: ButtonSetting,
  argTypes: {
    onPress: { action: 'onPress' },
    icon: {
      description: 'Button icon',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=164%3A4502&t=C1P2N9hIFMRhoI88-4',
    },
  },
} as ComponentMeta<typeof ButtonSetting>;
