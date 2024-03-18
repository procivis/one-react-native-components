import React, { FunctionComponent, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableHighlight } from '../accessibility';
import { useAppColorScheme } from '../theme';
import ArrowRightIcon from './arrow-right';
import SettingItem from './SettingItem';

interface Props {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const ButtonSetting: FunctionComponent<Props> = ({ title, onPress, icon, style, testID }) => {
  const colorScheme = useAppColorScheme();
  return (
    <TouchableHighlight
      accessibilityRole="button"
      style={[styles.container, style]}
      onPress={onPress}
      underlayColor={colorScheme.lighterGrey}
      testID={testID}>
      <SettingItem title={title} icon={icon}>
        <View style={styles.arrow}>
          <ArrowRightIcon color={colorScheme.text} />
        </View>
      </SettingItem>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  arrow: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  container: {
    width: '100%',
  },
});

export default ButtonSetting;
