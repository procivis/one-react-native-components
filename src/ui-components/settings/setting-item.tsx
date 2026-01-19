import React, { ComponentType, FunctionComponent, PropsWithChildren, ReactElement, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 0,
    height: 36,
    justifyContent: 'center',
    marginRight: 12,
    width: 36,
  },
  label: {
    flex: 1,
    marginBottom: 0,
    marginTop: 0,
  },
  wrapper: {
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 12,
  },
});

export type SettingItemProps = {
  icon?: ComponentType<any> | ReactElement;
  style?: StyleProp<ViewStyle>;
  title: string;
  testID?: string;
};

const SettingItem: FunctionComponent<PropsWithChildren<SettingItemProps>> = ({
  title,
  icon,
  style,
  children,
  testID,
}) => {
  const colorScheme = useAppColorScheme();
  const iconView: React.ReactElement | undefined = useMemo(() => {
    if (!icon) {
      return undefined;
    }
    if (React.isValidElement(icon)) {
      return icon;
    } else {
      const IconComponent = icon as React.ComponentType<any>;
      return <IconComponent />;
    }
  }, [icon]);

  return (
    <View style={[styles.wrapper, { backgroundColor: colorScheme.white }, style]}>
      <View style={styles.container}>
        {iconView && <View style={[styles.icon, { backgroundColor: colorScheme.background }]}>{iconView}</View>}
        <Typography accessible={false} color={colorScheme.text} preset="s" style={styles.label} testID={testID}>
          {title}
        </Typography>
        {children}
      </View>
    </View>
  );
};

export default SettingItem;
