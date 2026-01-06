import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import type { ColorValue } from 'react-native';

import ColorSchemes from '../../../storybook/colorScheme';
import { ColorScheme, useAppColorScheme } from '../theme';
import Typography, { TypographyProps } from './typography';

type ColorSchemeKey = keyof Omit<ColorScheme, 'darkMode'>;

const Render = ({ color, ...args }: TypographyProps) => {
  const colorScheme = useAppColorScheme();
  return <Typography {...args} color={colorScheme[color as ColorSchemeKey] as ColorValue} />;
};

const Basic: StoryObj<typeof Typography> = {
  args: {
    children: 'Text',
    preset: 'regular',
    caps: false,
    color: 'text',
    align: 'left',
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  render: Render,
};

export { Basic as Typography };

export default {
  title: 'base/Typography',
  component: Typography,
  args: {
    onAnnouncementFinished: fn(),
  },
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
      options: Object.entries(ColorSchemes.procivis)
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
} as Meta<typeof Typography>;
