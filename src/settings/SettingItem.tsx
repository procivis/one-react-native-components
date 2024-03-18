import React, { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Typography } from '../text';
import { theme, useAppColorScheme } from '../theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    alignItems: 'center',
    borderRadius: 24,
    height: 32,
    justifyContent: 'center',
    marginRight: theme.paddingM,
    width: 32,
  },
  label: {
    flex: 1,
    marginBottom: 0,
    marginTop: 0,
  },
  wrapper: {
    paddingHorizontal: 24,
  },
});

interface SettingItemProps {
  title: string;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SettingItem: FunctionComponent<PropsWithChildren<SettingItemProps>> = ({ title, icon, style, children }) => {
  const colorScheme = useAppColorScheme();
  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.container, { borderBottomColor: colorScheme.background }]}>
        {icon && <View style={[styles.icon, { backgroundColor: colorScheme.background }]}>{icon}</View>}
        <Typography accessible={false} style={styles.label} color={colorScheme.text}>
          {title}
        </Typography>
        {children}
      </View>
    </View>
  );
};

export default SettingItem;
