import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

import LoaderView, { LoaderViewState } from '../loader/loader';

type ActivityIndicatorProps = ViewProps & {
  animate?: boolean;
};

const ActivityIndicator: FC<ActivityIndicatorProps> = ({ animate = true, style, ...props }) => {
  return (
    <View {...props} style={[styles.wrapper, style]}>
      <LoaderView animate={animate} state={LoaderViewState.InProgress} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
});

export default ActivityIndicator;
