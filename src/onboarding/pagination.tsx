import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useAppColorScheme } from '../theme';

export interface PaginationProps {
  style?: StyleProp<ViewStyle>;
  currentPage: number;
  totalPages: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({ style, currentPage, totalPages }) => {
  const colorScheme = useAppColorScheme();
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: totalPages }).map((_, i) => {
        const selected = currentPage === i;
        return (
          <View
            key={i}
            style={[
              styles.indicator,
              i === 0 && styles.indicatorFirst,
              { backgroundColor: selected ? colorScheme.text : colorScheme.lighterGrey },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  indicator: {
    height: 3,
    marginLeft: 8,
    width: 24,
  },
  indicatorFirst: {
    marginLeft: 0,
  },
});

export default Pagination;
