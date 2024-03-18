import React, { FunctionComponent } from 'react';
import { ImageStyle, StyleProp, StyleSheet, View } from 'react-native';

import { ImageOrComponent, ImageOrComponentSource } from '../image';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export interface EmptyListViewProps {
  icon?: ImageOrComponentSource;
  iconStyle?: StyleProp<ImageStyle>;
  title: string;
  subtitle: string;
}

const EmptyListView: FunctionComponent<EmptyListViewProps> = ({ icon, iconStyle, title, subtitle }) => {
  const colorScheme = useAppColorScheme();
  return (
    <View style={styles.container}>
      {icon ? <ImageOrComponent source={icon} style={[styles.icon, iconStyle]} /> : null}
      <Typography bold={true} color={colorScheme.textSecondary} align="center" size="sml">
        {title}
      </Typography>
      <Typography color={colorScheme.textSecondary} align="center" size="sml" style={styles.subtitle}>
        {subtitle}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    alignItems: 'center',
    height: 64,
    justifyContent: 'center',
    marginBottom: 12,
    width: 64,
  },
  subtitle: {
    marginTop: 2,
  },
});

export default EmptyListView;
