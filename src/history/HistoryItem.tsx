import React, { FunctionComponent, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableWithoutFeedback } from '../accessibility';
import ArrowRightIcon from '../settings/arrow-right';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

const styles = StyleSheet.create({
  arrow: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    paddingTop: 12,
    width: '100%',
  },
  icon: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginRight: 12,
    width: 48,
  },
  textWrapper: {
    flexDirection: 'column',
    flex: 1,
  },
});

export interface HistoryItemProps {
  title: string;
  details: string;
  onPress: () => void;
  icon: ReactNode;
  containerStyles?: StyleProp<ViewStyle>;
}

const HistoryItem: FunctionComponent<HistoryItemProps> = ({ title, details, icon, containerStyles, onPress }) => {
  const colorScheme = useAppColorScheme();
  return (
    <TouchableWithoutFeedback onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View style={[styles.container, containerStyles]}>
        <View style={[styles.icon, { backgroundColor: colorScheme.background }]}>{icon}</View>
        <View style={styles.textWrapper}>
          <Typography accessible={false} bold color={colorScheme.text}>
            {title}
          </Typography>
          <Typography accessible={false} color={colorScheme.text}>
            {details}
          </Typography>
        </View>
        <View style={styles.arrow}>
          <ArrowRightIcon color={colorScheme.text} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HistoryItem;
