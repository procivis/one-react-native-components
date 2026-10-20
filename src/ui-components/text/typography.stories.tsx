import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import type { ColorValue } from 'react-native';
import { fn } from 'storybook/test';

import ColorSchemes from '../../../storybook/colorScheme';
import { ColorScheme, useAppColorScheme } from '../theme';
import Typography, { TypographyProps } from './typography';

type ColorSchemeKey = keyof Omit<ColorScheme, 'darkMode'>;

const Render = ({ color, ...args }: TypographyProps) => {
  const colorScheme = useAppColorScheme();
  return (
    <Typography
      {...args}
      color={colorScheme[color as ColorSchemeKey] as ColorValue}
    />
  );
};

const Basic: StoryObj<typeof Typography> = {
  args: {
    align: 'left',
    caps: false,
    children: 'Text',
    color: 'text',
    ellipsizeMode: 'tail',
    numberOfLines: 1,
    preset: 'regular',
  },
  render: Render,
};

export { Basic as Typography };

export default {
  argTypes: {
    align: {
      control: { type: 'radio' },
      options: ['left', 'center', 'right'],
    },
    color: {
      control: { type: 'select' },
      options: Object.entries(ColorSchemes.procivis)
        .filter(([_, value]) => typeof value === 'string')
        .map(([key]) => key),
    },
    ellipsizeMode: {
      control: { type: 'select' },
      options: ['head', 'middle', 'tail', 'clip'],
    },
    preset: {
      control: { type: 'radio' },
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
    },
  },
  args: {
    onAnnouncementFinished: fn(),
  },
  component: Typography,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=1045-30326',
    },
  },
  title: 'base/Typography',
} as Meta<typeof Typography>;
