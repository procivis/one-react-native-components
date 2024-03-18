import React, { FunctionComponent, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import Switch from '../input/switch';
import SettingItem from './SettingItem';

interface Props {
  title: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const SwitchSetting: FunctionComponent<Props> = ({ title, value, onChange, icon, style, disabled = false }) => {
  return (
    <SettingItem style={style} title={title} icon={icon}>
      <Switch accessibilityLabel={title} value={value} onChange={onChange} disabled={disabled} />
    </SettingItem>
  );
};

export default SwitchSetting;
