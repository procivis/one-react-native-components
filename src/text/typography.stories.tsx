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
  size: 'default',
  caps: false,
  bold: false,
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
    size: {
      options: ['h1', 'h2', 'default', 'sml', 'xs'],
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
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=1%3A4',
    },
  },
} as ComponentMeta<typeof Typography>;
