import React, { FunctionComponent, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppColorScheme } from '../../../ui-components/theme';

export const ProofRequestGroup: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const colorScheme = useAppColorScheme();
  return (
    <View style={styles.group}>
      <View style={[styles.separator, { backgroundColor: colorScheme.grayDark }]} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    marginTop: 16,
  },
  separator: {
    height: 1,
    marginBottom: 16,
    marginHorizontal: 4,
    opacity: 0.5,
  },
});
