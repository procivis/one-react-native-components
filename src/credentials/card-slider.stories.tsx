import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import CardSlider from './card-slider';

const cardBackground = require('../../storybook/assets/basis-id.png');
const profileImage = require('../../storybook/assets/profile-image.png');

const styles = StyleSheet.create({
  additionalContent: {
    height: 100,
    width: '100%',
  },
});

const Basic: ComponentStory<typeof CardSlider> = (args) => <CardSlider {...args} />;
Basic.args = {
  cards: Array.from({ length: 3 }).map((_, index) => ({
    name: `Card ${index + 1}`,
    nameColor: 'black',
    cardNumber: `MA000000${index + 1}`,
    cardNumberColor: 'black',
    info: [
      { title: 'Title 1', value: { label: 'Value 1' } },
      { title: 'Title 2', value: { label: 'Value 2' } },
    ],
    cardImage: { imageSource: cardBackground },
    personalImage: profileImage,
    additionalContent: <Placeholder id={`Additional Content ${index + 1}`} style={styles.additionalContent} />,
    accessibilityLabel: `Card ${index + 1}`,
  })),
  width: 0,
  style: { alignSelf: 'center' },
};

export { Basic as CardSlider };

export default {
  title: 'component/gallery/Card Slider',
  component: CardSlider,
  argTypes: {
    onCardSelected: { action: 'onCardSelected' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=35%3A1778&t=g781E5yBTMsqtTIH-4',
    },
  },
} as ComponentMeta<typeof CardSlider>;
