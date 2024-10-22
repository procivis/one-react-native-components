import type { ComponentMeta, Story } from '@storybook/react';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '../buttons';
import { Biometry } from './keypad';
import { PinCodeScreen, PinCodeScreenActions, PinCodeScreenProps } from './pin-code-screen';

type Props = PinCodeScreenProps & {
  withBackButton: boolean;
  showActions: boolean;
};

const styles = StyleSheet.create({
  actionButton: { position: 'absolute', right: 24, top: 40 },
});

const Basic: Story<Props> = ({
  title,
  instruction,
  onAccessibilityAnnounced,
  withBackButton,
  onBack,
  showActions,
  ...args
}) => {
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
        <Button style={styles.actionButton} onPress={() => actionsRef.current?.shakeKeypad()} title="shake" />
      )}
    </>
  );
};

Basic.args = {
  length: 6,
  enteredLength: 0,
  withBackButton: true,
  title: 'Title',
  instruction: 'Instruction',
  error: '',
  biometry: Biometry.FaceID,
  showActions: false,
};

export { Basic as PINScreen };

export default {
  title: 'screen/PIN Screen',
  component: PinCodeScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=621-21892&mode=design&t=nCa9UdCDzPYtOPgu-4',
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
