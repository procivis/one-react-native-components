import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Typography } from '../src/ui-components/text';

interface Props {
  id?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Placeholder component to use in stories for replacable generic content
 */
export const Placeholder: FC<Props> = ({ style, id = 'Placeholder' }) => {
  const colorsStyle: ViewStyle = {
    backgroundColor: '#E6F7FF',
    borderColor: '#1890FF',
  };
  return (
    <View style={[styles.placeholder, colorsStyle, style]}>
      <Typography color="#1890FF" preset="m">
        {id}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    borderRadius: 3,
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
  },
});
