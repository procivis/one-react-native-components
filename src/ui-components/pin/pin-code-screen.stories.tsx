import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '../buttons';
import { Biometry } from './keypad';
import { PinCodeScreen, PinCodeScreenActions, PinCodeScreenProps } from './pin-code-screen';

type Props = PinCodeScreenProps & {
  showActions: boolean;
  withBackButton: boolean;
};

const styles = StyleSheet.create({
  actionButton: { position: 'absolute', right: 24, top: 40 },
});

const Render = ({
  title,
  instruction,
  onAccessibilityAnnounced,
  withBackButton,
  onBack,
  showActions,
  ...args
}: Props) => {
  const subtitle = instruction ? { instruction, onAccessibilityAnnounced } : {};
  const actionsRef = useRef<PinCodeScreenActions>(null);

  return (
    <>
      <PinCodeScreen
        ref={actionsRef}
        title={title}
        {...subtitle}
        onBack={withBackButton ? onBack : undefined}
        {...args}
      />
      {showActions && (
        <Button onPress={() => actionsRef.current?.shakeKeypad()} style={styles.actionButton} title="shake" />
      )}
    </>
  );
};

const Basic: StoryObj<Props> = {
  args: {
    biometry: Biometry.FaceID,
    enteredLength: 0,
    error: '',
    instruction: 'Instruction',
    length: 6,
    showActions: false,
    title: 'Title',
    withBackButton: true,
  },
  render: Render,
};

export { Basic as PINScreen };

export default {
  argTypes: {
    biometry: {
      control: { type: 'radio' },
      options: [Biometry.FaceID, Biometry.Other],
    },
    onBack: { action: 'onBack' },
    onBiometricPress: { action: 'onBiometricPress' },
    onDeleteAll: { action: 'onDeleteAll' },
    onPressDelete: { action: 'onPressDelete' },
    onPressDigit: { action: 'onPressDigit' },
  },
  args: {
    onAccessibilityAnnounced: () => {},
  },
  component: PinCodeScreen,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=621-21892&mode=design&t=nCa9UdCDzPYtOPgu-4',
    },
    noSafeArea: true,
  },
  title: 'screen/PIN Screen',
} as Meta<typeof PinCodeScreen>;
