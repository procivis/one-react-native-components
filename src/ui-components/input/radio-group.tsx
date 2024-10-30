import React, { FunctionComponent } from 'react';
import { FlatList, FlatListProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import Selector from '../credential/selector';
import { SelectorStatus } from '../credential/selector-status';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';

export type RadioGroupItem = {
  key: React.Key;
  label: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export type RadioGroupProps = {
  containerStyle?: StyleProp<ViewStyle>;
  items: RadioGroupItem[];
  listFooter?: FlatListProps<RadioGroupItem>['ListFooterComponent'];
  listFooterStyle?: FlatListProps<RadioGroupItem>['ListFooterComponentStyle'];
  onEndReached?: FlatListProps<RadioGroupItem>['onEndReached'];
  onGetItemAccessibilityLabel?: (current: number, length: number) => string;
  onSelected: (item: RadioGroupItem, index: number) => void;
  selectedItem?: React.Key;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  scrollEnabled?: boolean;
};

const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  containerStyle,
  items,
  selectedItem,
  onSelected,
  style,
  listFooter,
  listFooterStyle,
  onEndReached,
  onGetItemAccessibilityLabel,
  testID,
  scrollEnabled = true,
}) => {
  const colorScheme = useAppColorScheme();

  return (
    <FlatList<RadioGroupItem>
      scrollEnabled={scrollEnabled}
      ListFooterComponent={listFooter}
      ListFooterComponentStyle={listFooterStyle}
      contentContainerStyle={containerStyle}
      data={items}
      onEndReached={onEndReached}
      renderItem={({ item, index }) => {
        const selected = selectedItem === item.key;
        return (
          <React.Fragment key={item.key}>
            <TouchableOpacity
              accessibilityLabel={item.label}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityValue={
                items.length > 1 && onGetItemAccessibilityLabel
                  ? {
                      text: onGetItemAccessibilityLabel(index + 1, items.length),
                    }
                  : undefined
              }
              activeOpacity={selected ? 1 : undefined}
              onPress={() => {
                onSelected(item, index);
              }}
              style={[styles.item, item.style]}
              testID={item.testID}>
              <Typography color={colorScheme.text}>{item.label}</Typography>
              <Selector
                status={selected ? SelectorStatus.SelectedRadio : SelectorStatus.Empty}
                style={styles.selector}
              />
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: colorScheme.background }]} />
          </React.Fragment>
        );
      }}
      showsVerticalScrollIndicator={false}
      style={style}
      testID={testID}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    width: '100%',
  },
  selector: {
    marginLeft: 4,
    paddingTop: 0,
  },
});

export default RadioGroup;
