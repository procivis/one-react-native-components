import React, { ComponentType, FC, ReactElement, useMemo } from 'react';
import { ColorValue, StyleSheet, View, ViewProps } from 'react-native';

import { concatTestID } from '../../utils/testID';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';

export type DataItemProps = ViewProps & {
  attribute: string;
  last?: boolean;
  multiline?: boolean;
  value: string;
  valueColor?: ColorValue;
  valueIcon?: ComponentType<any> | ReactElement;
};

const DataItem: FC<DataItemProps> = ({
  attribute,
  value,
  valueColor,
  valueIcon,
  multiline,
  last,
  testID,
  style,
  ...props
}) => {
  const colorScheme = useAppColorScheme();

  const valueIconView: ReactElement | undefined = useMemo(() => {
    if (React.isValidElement(valueIcon)) {
      return valueIcon;
    } else if (valueIcon) {
      const IconComponent = valueIcon as ComponentType<any>;
      return <IconComponent />;
    }
  }, [valueIcon]);

  return (
    <View
      style={[styles.dataItem, { borderColor: colorScheme.background }, last && styles.last, style]}
      testID={testID}
      {...props}>
      <Typography
        color={colorScheme.text}
        preset="xs/line-height-small"
        style={styles.dataItemLabel}
        testID={concatTestID(testID, 'title')}>
        {attribute}
      </Typography>

      <View style={styles.value}>
        {valueIconView}
        <Typography
          color={valueColor ?? colorScheme.text}
          numberOfLines={multiline ? undefined : 1}
          preset="s"
          style={valueIcon ? styles.valueLabel : undefined}
          testID={concatTestID(testID, 'value')}>
          {value}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dataItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  dataItemLabel: {
    marginBottom: 4,
    opacity: 0.7,
  },
  last: {
    borderBottomWidth: 0,
  },
  value: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  valueLabel: {
    marginLeft: 4,
  },
});

export default DataItem;
