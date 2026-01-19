import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { useAppColorScheme } from '../theme/color-scheme-context';
import ButtonSetting, { ButtonSettingProps } from './button-setting';

export type SettingsButtonProps = ButtonSettingProps;

const SettingsButton: FC<SettingsButtonProps> = ({ style, ...props }) => {
  const colorScheme = useAppColorScheme();
  return <ButtonSetting style={[styles.button, { backgroundColor: colorScheme.background }, style]} {...props} />;
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 0,
    height: 68,
    marginHorizontal: 0,
    paddingHorizontal: 12,
  },
});

export default SettingsButton;
