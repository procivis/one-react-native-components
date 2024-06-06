import React, { ComponentType, FC, ReactElement, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import { concatTestID } from '../utils/testID';

export type HistoryListItemProps = {
  icon: ComponentType<any> | ReactElement;
  info?: string;
  label: string;
  last?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  time: string;
};

const HistoryListItem: FC<HistoryListItemProps> = ({ icon, label, info, last, style, time, onPress, testID }) => {
  const colorScheme = useAppColorScheme();

  const iconView: ReactElement | undefined = useMemo(() => {
    if (React.isValidElement(icon)) {
      return icon;
    } else if (icon) {
      const IconComponent = icon as ComponentType<any>;
      return <IconComponent />;
    }
  }, [icon]);

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={() => onPress?.()}
      style={[
        styles.historyItemContainer,
        {
          backgroundColor: colorScheme.white,
          borderColor: colorScheme.background,
        },
        last && styles.last,
        style,
      ]}
      testID={testID}>
      {iconView}
      <View style={styles.labelAndInfo}>
        <Typography color={colorScheme.text} preset="s" style={styles.label} testID={concatTestID(testID, 'label')}>
          {label}
        </Typography>
        <Typography
          color={colorScheme.text}
          numberOfLines={1}
          preset="s/line-height-small"
          style={styles.shaded}
          testID={concatTestID(testID, 'info')}>
          {info}
        </Typography>
      </View>
      <Typography
        color={colorScheme.text}
        preset="xs/line-height-small"
        style={styles.shaded}
        testID={concatTestID(testID, 'timeLabel')}>
        {time}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  historyItemContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingRight: 8,
    paddingVertical: 12,
  },
  label: {
    marginBottom: 2,
  },
  labelAndInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  last: {
    borderBottomWidth: 0,
  },
  shaded: {
    opacity: 0.7,
  },
});

export default HistoryListItem;
