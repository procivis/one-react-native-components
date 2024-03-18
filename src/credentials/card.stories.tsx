import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { theme } from '../theme';
import Card from './card';

const cardBackground = require('../../storybook/assets/basis-id.png');
const profileImage = require('../../storybook/assets/profile-image.png');

const Basic: ComponentStory<typeof Card> = (args) => (
  <Card {...args} cardImage={{ imageSource: cardBackground }} personalImage={profileImage} />
);

Basic.args = {
  name: 'Name',
  nameColor: 'black',
  cardNumber: 'MA01213343',
  cardNumberColor: 'black',
  detailLayout: false,
  style: { margin: theme.paddingM },
  info: [
    { title: 'Title 1', value: { label: 'Value 1' } },
    { title: 'Title 2', value: { label: 'Value 2' } },
    { title: 'Title 3', value: { label: 'Value 3' } },
    { title: 'Title Wide', value: { label: 'Value Wide' }, wide: true },
  ],
};

export { Basic as Card };

export default {
  title: 'component/credential/Card',
  component: Card,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=34%3A5013&t=PWvHjLWLbXKNDzQF-4',
    },
  },
} as ComponentMeta<typeof Card>;
