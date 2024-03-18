import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export type ListSectionHeaderProps = {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
};

const ListSectionHeader: FunctionComponent<ListSectionHeaderProps> = ({ title, titleStyle }) => {
  const colorScheme = useAppColorScheme();

  return (
    <Typography
      accessibilityRole="header"
      style={[styles.title, titleStyle]}
      bold={true}
      caps={true}
      color={colorScheme.text}
      align="left"
      size="sml">
      {title}
    </Typography>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
});

export default ListSectionHeader;
