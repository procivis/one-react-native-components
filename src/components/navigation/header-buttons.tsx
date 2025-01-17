import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { BackButton, BackButtonIcon, GhostButton, InfoIcon, OptionsIcon } from '../../ui-components';

export type HeaderButtonProps = {
  onPress?: () => void;
  testID: string;
};

export const HeaderBackButton: FC<HeaderButtonProps> = ({ onPress, testID }) => {
  const navigation = useNavigation();
  const handleBackButtonPress = useCallback(() => {
    if (onPress) {
      return onPress();
    }
    navigation.goBack();
  }, [onPress, navigation]);
  if (!navigation.canGoBack) {
    return null;
  }
  return <BackButton onPress={handleBackButtonPress} testID={testID} />;
};

export const HeaderCloseButton: FC<HeaderButtonProps> = ({ onPress, testID }) => {
  const navigation = useNavigation();
  const handleCloseButtonPress = useCallback(() => {
    if (onPress) {
      return onPress();
    }
    navigation.goBack();
  }, [onPress, navigation]);
  return <BackButton icon={BackButtonIcon.Close} onPress={handleCloseButtonPress} testID={testID} />;
};

export type HeaderInfoButtonProps = {
  accessibilityLabel: string;
  onPress: () => void;
  testID: string;
};

export const HeaderInfoButton: FC<HeaderInfoButtonProps> = ({ accessibilityLabel, onPress, testID }) => {
  return <GhostButton accessibilityLabel={accessibilityLabel} icon={InfoIcon} onPress={onPress} testID={testID} />;
};

export type HeaderOptionsButtonProps = {
  accessibilityLabel: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  testID: string;
};

export const HeaderOptionsButton: FC<HeaderOptionsButtonProps> = ({ onPress, testID, style, accessibilityLabel }) => {
  return (
    <GhostButton
      accessibilityLabel={accessibilityLabel}
      icon={OptionsIcon}
      onPress={onPress}
      style={style}
      testID={testID}
    />
  );
};
