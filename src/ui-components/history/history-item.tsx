import React, { ComponentType, FC, ReactElement, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { concatTestID } from '../../utils/testID';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';

export type HistoryItemViewProps = {
  first?: boolean;
  icon: ComponentType<any> | ReactElement;
  info?: string;
  label: string;
  last?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  time: string;
};

const HistoryItemView: FC<HistoryItemViewProps> = ({
  first,
  icon,
  label,
  info,
  last,
  style,
  time,
  onPress,
  testID,
}) => {
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
        },
        first && styles.containerFirst,
        last && styles.containerLast,
        style,
      ]}
      testID={testID}>
      <View
        style={[
          styles.historyItemWrapper,
          {
            backgroundColor: colorScheme.white,
            borderColor: colorScheme.background,
          },
          last && styles.wrapperLast,
        ]}>
        {iconView}
        <View style={styles.labelAndInfo}>
          <Typography
            color={colorScheme.text}
            numberOfLines={1}
            preset="s"
            style={styles.label}
            testID={concatTestID(testID, 'label')}>
            {label}
          </Typography>
          {Boolean(info) && (
            <Typography
              color={colorScheme.text}
              numberOfLines={1}
              preset="s/line-height-small"
              style={styles.shaded}
              testID={concatTestID(testID, 'info')}>
              {info}
            </Typography>
          )}
        </View>
        <Typography
          color={colorScheme.text}
          numberOfLines={1}
          preset="xs/line-height-small"
          style={styles.time}
          testID={concatTestID(testID, 'timeLabel')}>
          {time}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerFirst: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 8,
    paddingTop: 12,
  },
  containerLast: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 12,
    paddingBottom: 12,
  },
  historyItemContainer: {
    paddingHorizontal: 12,
  },
  historyItemWrapper: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  label: {
    marginBottom: 2,
  },
  labelAndInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  shaded: {
    opacity: 0.7,
  },
  time: {
    marginRight: 8,
    opacity: 0.7,
  },
  wrapperLast: {
    borderBottomWidth: 0,
  },
});

export default HistoryItemView;
