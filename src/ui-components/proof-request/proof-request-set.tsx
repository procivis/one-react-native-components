import React, { FunctionComponent, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export type ProofRequestSetProps = {
  headerLabel?: string;
  showHeader?: boolean;
  showSeparator?: boolean;
};

export const ProofRequestSet: FunctionComponent<PropsWithChildren<ProofRequestSetProps>> = ({
  children,
  headerLabel,
  showHeader = false,
  showSeparator = true,
}) => {
  const colorScheme = useAppColorScheme();
  return (
    <View style={styles.set}>
      {showSeparator && <View style={[styles.separator, { backgroundColor: colorScheme.grayDark }]} />}
      {showHeader && headerLabel && (
        <Typography align="left" color={colorScheme.text} preset="m" style={styles.header}>
          {headerLabel}
        </Typography>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  separator: {
    height: 1,
    marginBottom: 16,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  set: {
    marginTop: 16,
  },
});
