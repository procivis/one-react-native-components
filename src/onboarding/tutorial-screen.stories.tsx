import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { StyleSheet } from 'react-native';

import OnboardingEID_1 from '../../storybook/assets/OnboardingEID_1';
import { Placeholder } from '../../storybook/placeholder';
import type { ImageOrComponentSource } from '../image';
import TutorialScreen, { TutorialIllustrationPosition } from './tutorial-screen';

const ssiImage = require('../../storybook/assets/tutorial_image.png');

const styles = StyleSheet.create({
  illustration: {
    flex: 1,
  },
});

const illustrationPlaceholder: ImageOrComponentSource = {
  component: <Placeholder id="Illustration" style={styles.illustration} />,
};

const Basic: ComponentStory<typeof TutorialScreen> = ({ backAction, pages }) => {
  return <TutorialScreen backAction={backAction} pages={pages} />;
};

Basic.args = {
  backAction: console.log,
  pages: [
    {
      title: 'Title 1\neID+ onboarding image',
      illustration: { component: <OnboardingEID_1 /> },
      description: 'description 1',
      nextButton: {
        label: 'Next',
      },
      prevButton: {
        label: 'Skip',
      },
    },
    {
      title: 'Title 2',
      illustration: { component: <OnboardingEID_1 /> },
      description: 'description 2\nSSI+ onboarding image',
      nextButton: {
        label: 'Next',
      },
      prevButton: {
        label: 'Previous',
      },
    },
    {
      title: 'Title 3',
      illustration: { component: <OnboardingEID_1 /> },
      description: 'description 3',
      nextButton: {
        label: 'Start',
      },
      prevButton: {
        label: 'Previous',
      },
    },
    {
      title: 'Title 4',
      illustration: { imageSource: ssiImage },
      illustrationPosition: TutorialIllustrationPosition.top,
      description: 'description 4',
      nextButton: {
        label: 'Start',
      },
      prevButton: {
        label: 'Previous',
      },
    },
    {
      title: 'Title 5',
      titleSpacer: false,
      illustration: { imageSource: ssiImage },
      illustrationPosition: TutorialIllustrationPosition.middle,
      description: 'description 5',
      nextButton: {
        label: 'Start',
      },
      prevButton: {
        label: 'Previous',
      },
    },
    {
      title: 'Title 6',
      illustration: { imageSource: ssiImage },
      illustrationPosition: TutorialIllustrationPosition.bottom,
      description: 'description 6',
      nextButton: {
        label: 'Start',
      },
      prevButton: {
        label: 'Previous',
      },
    },
    {
      title: 'Title 4',
      illustration: illustrationPlaceholder,
      illustrationPosition: TutorialIllustrationPosition.top,
      description: 'description 4',
      nextButton: {
        label: 'Start',
      },
      prevButton: {
        label: 'Previous',
      },
    },
    {
      title: 'Title 5',
      titleSpacer: false,
      illustration: illustrationPlaceholder,
      illustrationPosition: TutorialIllustrationPosition.middle,
      description: 'description 5',
      nextButton: {
        label: 'Start',
      },
      prevButton: {
        label: 'Previous',
      },
    },
    {
      title: 'Title 6',
      illustration: illustrationPlaceholder,
      illustrationPosition: TutorialIllustrationPosition.bottom,
      description: 'description 6',
      nextButton: {
        label: 'Start',
      },
      prevButton: {
        label: 'Previous',
      },
    },
  ],
};

export { Basic as TutorialScreen };

export default {
  title: 'view/Tutorial Screen',
  component: TutorialScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=34%3A1203&t=uCLXml9vF7JZFXpF-4',
    },
  },
} as ComponentMeta<typeof TutorialScreen>;
