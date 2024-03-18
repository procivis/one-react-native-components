import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { StyleSheet } from 'react-native';

import { useAppColorScheme } from '../../src/theme';
import { Placeholder } from '../../storybook/placeholder';
import type { HeaderActionButton } from '../header';
import FeatureScreen, { FeatureScreenProps } from './feature-screen';

enum ColorVariant {
  NoBackground = 'no background',
  GradientHeader = 'gradient header',
  AccentedHeader = 'accented header',
}

type Args = FeatureScreenProps & {
  numActions?: number;
  withBackButton?: boolean;
  contentHeight?: number;
  colorVariant: ColorVariant;
  onAction: (index: number) => void;
};

const Basic: Story<Args> = ({
  colorVariant,
  numActions = 0,
  contentHeight = 0,
  withBackButton,
  onAction,
  onBack,
  ...args
}) => {
  const actionButtons = Array.from({ length: numActions }).map<HeaderActionButton>((_, index) => ({
    key: String(index),
    onPress: () => onAction(index + 1),
    content: () => <Placeholder id={String(index + 1)} style={styles.actionPlaceholder} />,
  }));

  const colorScheme = useAppColorScheme();
  return (
    <FeatureScreen
      headerTextColor={colorVariant === ColorVariant.AccentedHeader ? colorScheme.accentText : undefined}
      headerBackground={
        colorVariant === ColorVariant.AccentedHeader
          ? colorScheme.accent
          : colorVariant === ColorVariant.GradientHeader
          ? colorScheme.lineargradient
          : undefined
      }
      style={colorVariant === ColorVariant.GradientHeader ? { backgroundColor: colorScheme.background } : undefined}
      onBack={withBackButton ? onBack : undefined}
      {...args}
      actionButtons={actionButtons}
      rightButton={undefined}>
      <Placeholder id="Content" style={contentHeight ? { height: contentHeight } : styles.content} />
    </FeatureScreen>
  );
};

Basic.args = {
  colorVariant: ColorVariant.NoBackground,
  title: 'Title',
  description: 'description',
  withBackButton: false,
  numActions: 0,
  contentHeight: 0,
};

export { Basic as FeatureScreen };

export default {
  title: 'view/Feature Screen',
  component: FeatureScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=39%3A3121&t=TEBDGdEv632ktThZ-4',
    },
  },
  argTypes: {
    colorVariant: {
      options: [ColorVariant.NoBackground, ColorVariant.GradientHeader, ColorVariant.AccentedHeader],
      control: { type: 'radio' },
    },
    onBack: { action: 'onBack' },
    onAction: { action: 'onAction' },
  },
} as ComponentMeta<typeof FeatureScreen>;

const styles = StyleSheet.create({
  actionPlaceholder: {
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
  },
});
