
import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Typography from '../text/typography';
import { useAppColorScheme } from '../theme';

export type BadgeProps = {
  background?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
  type?: 'pill' | 'round' | 'rect';
  value: string;
};

const Badge: FC<BadgeProps> = ({
  background,
  size,
  style,
  type = 'round',
  value,
}) => {
  const colorScheme = useAppColorScheme();

  if (!background) {
    background = type !== 'round';
  }
  if (!size) {
    size = type === 'round' ? 32 : 22;
  }

  const typeStyle: ViewStyle = {
    backgroundColor: background ? colorScheme.background : undefined,
    borderColor: colorScheme.grayDark,
    borderRadius: type === 'rect' ? 4 : size / 2,
    height: size,
    paddingHorizontal: type !== 'round' ? size / 2 : undefined,
    width: type === 'round' ? size : undefined,
  };

  return (
    <View style={[styles.badge, typeStyle, style]}>
      <Typography color={colorScheme.black} preset="xs/line-height-small">
        {value}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
  },
});

export default Badge;
