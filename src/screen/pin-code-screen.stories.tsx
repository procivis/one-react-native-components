import type { ComponentMeta, Story } from '@storybook/react';
import React, { ReactNode, useRef } from 'react';
import { Image, StyleSheet } from 'react-native';

import { Button } from '../buttons';
import { Biometry } from '../pincode/keypad';
import PinCodeScreen, { PinCodeScreenActions, PinCodeScreenProps } from './pin-code-screen';

const logoImage = require('../../storybook/assets/logo.png');

type Props = Omit<PinCodeScreenProps, 'logo'> & {
  withLogo: boolean;
  withBackButton: boolean;
  showActions: boolean;
};

const styles = StyleSheet.create({
  actionButton: { position: 'absolute', right: 24, top: 40 },
  logo: { height: 44, width: 345 },
});

const Basic: Story<Props> = ({
  withLogo,
  title,
  instruction,
  onAccessibilityAnnounced,
  withBackButton,
  onBack,
  showActions,
  ...args
}) => {
  const header:
    | {
        logo: ReactNode;
      }
    | {
        title: string;
      } = withLogo
    ? { logo: <Image source={logoImage} resizeMode="cover" style={styles.logo} /> }
    : { title: title ?? '' };

  const subtitle = instruction ? { instruction, onAccessibilityAnnounced } : {};
  const actionsRef = useRef<PinCodeScreenActions>(null);

  return (
    <>
      <PinCodeScreen
        ref={actionsRef}
        {...header}
        {...subtitle}
        onBack={withBackButton ? onBack : undefined}
        {...args}
      />
      {showActions && (
        <Button style={styles.actionButton} onPress={() => actionsRef.current?.shakeKeypad()}>
          shake
        </Button>
      )}
    </>
  );
};

Basic.args = {
  length: 6,
  enteredLength: 0,
  withLogo: false,
  withBackButton: true,
  title: 'Title',
  instruction: 'Instruction',
  error: '',
  biometry: Biometry.FaceID,
  showActions: false,
};

export { Basic as PINScreen };

export default {
  title: 'view/PIN Screen',
  component: PinCodeScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=44%3A3218&t=Tj2lfG2CQMudhqJr-4',
    },
  },
  argTypes: {
    onBack: { action: 'onBack' },
    onBiometricPress: { action: 'onBiometricPress' },
    onPressDigit: { action: 'onPressDigit' },
    onPressDelete: { action: 'onPressDelete' },
    onDeleteAll: { action: 'onDeleteAll' },
    biometry: {
      options: [Biometry.FaceID, Biometry.Other],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof PinCodeScreen>;
