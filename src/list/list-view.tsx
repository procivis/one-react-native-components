import React, { FunctionComponent } from 'react';
import { AccessibilityProps, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import type { ImageOrComponentSource } from '../image';
import { useAppColorScheme } from '../theme';
import EmptyListView from './empty-list';
import type { ListItemProps } from './list-item';
import ListSectionHeader from './list-section-header';
import WrappedListItem from './wrapped-list-item';

export interface ListViewProps extends AccessibilityProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<ViewStyle>;
  emptyListIcon?: ImageOrComponentSource;
  emptyListIconStyle?: StyleProp<ImageStyle>;
  emptyListTitle: string;
  emptyListSubtitle: string;
  items: ListItemProps[];
  onItemSelected?: (item: ListItemProps, index: number) => void;
}

/**
 * Legacy list component
 * @deprecated Use `FlatListView` or `SectionListView` component instead
 */
const ListView: FunctionComponent<ListViewProps> = ({
  testID,
  style,
  title,
  titleStyle,
  emptyListIcon,
  emptyListIconStyle,
  emptyListTitle,
  emptyListSubtitle,
  items,
  onItemSelected,
  ...accessibilityProps
}) => {
  const colorScheme = useAppColorScheme();
  return (
    <View
      testID={testID}
      style={[
        styles.content,
        !title ? styles.noTitlePadding : undefined,
        { backgroundColor: colorScheme.white },
        style,
      ]}
      {...accessibilityProps}>
      {title && <ListSectionHeader title={title} titleStyle={titleStyle} />}
      {items.length === 0 ? (
        <EmptyListView
          icon={emptyListIcon}
          iconStyle={emptyListIconStyle}
          title={emptyListTitle}
          subtitle={emptyListSubtitle}
        />
      ) : (
        items.map((item, index) => <WrappedListItem index={index} onItemSelected={onItemSelected} {...item} />)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    borderRadius: 20,
    paddingBottom: 8,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  noTitlePadding: {
    paddingTop: 16,
  },
});

export default ListView;
