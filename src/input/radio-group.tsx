import React, { FunctionComponent } from 'react';
import { FlatList, FlatListProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { Selector, SelectorStatus } from '../buttons';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme';

export type RadioGroupItem = {
  key: React.Key;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
} & (
  | {
      label: string;
    }
  | {
      Component: React.ComponentType<{ selected: boolean }>;
      accessibilityLabel?: string;
    }
);

export interface RadioGroupProps {
  title?: string;
  items: RadioGroupItem[];
  multiselect?: boolean;
  selectedItems: React.Key[];
  onSelected: (item: RadioGroupItem, index: number) => void;
  onDeselected?: (item: RadioGroupItem, index: number) => void;
  style?: StyleProp<ViewStyle>;
  listFooter?: FlatListProps<RadioGroupItem>['ListFooterComponent'];
  listFooterStyle?: FlatListProps<RadioGroupItem>['ListFooterComponentStyle'];
  staticContent?: boolean;
  onEndReachedThreshold?: FlatListProps<RadioGroupItem>['onEndReachedThreshold'];
  onEndReached?: FlatListProps<RadioGroupItem>['onEndReached'];
  showsVerticalScrollIndicator?: FlatListProps<RadioGroupItem>['showsVerticalScrollIndicator'];
}

const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  title,
  items,
  multiselect,
  selectedItems,
  onSelected,
  onDeselected,
  style,
  listFooter,
  listFooterStyle,
  staticContent = true,
  onEndReachedThreshold,
  onEndReached,
  showsVerticalScrollIndicator = false,
}) => {
  const colorScheme = useAppColorScheme();
  const t = useAccessibilityTranslation();

  return (
    <FlatList<RadioGroupItem>
      style={style}
      data={items}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      renderItem={({ item, index }) => {
        const selected = selectedItems.includes(item.key);
        const accessibilityLabel = 'label' in item ? item.label : item.accessibilityLabel;
        return (
          <React.Fragment key={item.key}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={accessibilityLabel}
              accessibilityState={{ selected, disabled: item.disabled }}
              accessibilityValue={
                items.length > 1
                  ? { text: t('accessibility.control.order', { current: index + 1, length: items.length }) }
                  : undefined
              }
              style={[styles.item, item.style]}
              disabled={item.disabled}
              activeOpacity={selected && !multiselect ? 1 : undefined}
              onPress={() => {
                selected ? (multiselect ? onDeselected?.(item, index) : undefined) : onSelected(item, index);
              }}>
              {'label' in item ? (
                <Typography color={item.disabled ? colorScheme.lightGrey : colorScheme.text}>{item.label}</Typography>
              ) : (
                <item.Component selected={selected} />
              )}
              <Selector
                style={styles.selector}
                status={
                  selected
                    ? multiselect
                      ? SelectorStatus.SelectedCheck
                      : SelectorStatus.SelectedRadio
                    : item.disabled
                    ? SelectorStatus.Disabled
                    : SelectorStatus.Unselected
                }
              />
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: colorScheme.lighterGrey }]} />
          </React.Fragment>
        );
      }}
      ListHeaderComponent={
        title ? (
          <Typography
            accessibilityRole="header"
            style={styles.title}
            bold={true}
            caps={true}
            color={colorScheme.text}
            align="left"
            size="sml">
            {title}
          </Typography>
        ) : null
      }
      ListFooterComponent={listFooter}
      ListFooterComponentStyle={listFooterStyle}
      scrollEnabled={!staticContent}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth * Math.ceil(1 / StyleSheet.hairlineWidth),
    marginBottom: 16,
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
  },
  title: {
    marginBottom: 24,
    marginTop: 12,
  },
});

export default RadioGroup;
