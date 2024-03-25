import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Typography } from '../src/text';

interface Props {
  id?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Placeholder component to use in stories for replacable generic content
 */
export const Placeholder: FC<Props> = ({ style, id = 'Placeholder' }) => {
  return (
    <View style={[styles.placeholder, style]}>
      <Typography preset="m" color="#1890FF">
        {id}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    backgroundColor: '#E6F7FF',
    borderColor: '#1890FF',
    borderRadius: 3,
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
  },
});
