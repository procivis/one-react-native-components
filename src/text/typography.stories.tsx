import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import type { ColorValue } from 'react-native';

import ColorSchemes from '../../storybook/colorScheme';
import { ColorScheme, useAppColorScheme } from '../theme';
import Typography from './typography';

type ColorSchemeKey = keyof ColorScheme;

const Basic: ComponentStory<typeof Typography> = ({ color, ...args }) => {
  const colorScheme = useAppColorScheme();
  return <Typography {...args} color={colorScheme[color as ColorSchemeKey] as ColorValue} />;
};

Basic.args = {
  children: 'Text',
  preset: 'regular',
  caps: false,
  color: 'text',
  align: 'left',
  numberOfLines: 1,
  ellipsizeMode: 'tail',
};

export { Basic as Typography };

export default {
  title: 'base/Typography',
  component: Typography,
  argTypes: {
    preset: {
      options: [
        'xl',
        'l',
        'l/line-height-large',
        'regular',
        'm',
        's',
        's/line-height-capped',
        's/line-height-small',
        's/code',
        'xs',
        'xs/line-height-small',
        'xs/code',
      ],
      control: { type: 'radio' },
    },
    color: {
      options: Object.entries(ColorSchemes.procivisLight)
        .filter(([_, value]) => typeof value === 'string')
        .map(([key]) => key),
      control: { type: 'select' },
    },
    align: {
      options: ['left', 'center', 'right'],
      control: { type: 'radio' },
    },
    ellipsizeMode: {
      options: ['head', 'middle', 'tail', 'clip'],
      control: { type: 'select' },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=1045-30326',
    },
  },
} as ComponentMeta<typeof Typography>;
