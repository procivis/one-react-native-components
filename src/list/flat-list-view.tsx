import React, { FunctionComponent } from 'react';
import { AccessibilityProps, ImageStyle, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import type { ImageOrComponentSource } from '../image';
import type { ListItemProps } from './list-item';
import SectionListView, { SectionListViewProps } from './section-list-view';

type SelectedSectionListProps = Pick<
  SectionListViewProps,
  | 'contentContainerStyle'
  | 'listHeader'
  | 'listFooter'
  | 'listHeaderStyle'
  | 'listFooterStyle'
  | 'staticContent'
  | 'onEndReached'
  | 'onEndReachedThreshold'
  | 'stickySectionHeadersEnabled'
  | 'showsVerticalScrollIndicator'
>;

export interface FlatListViewProps extends AccessibilityProps, SelectedSectionListProps {
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

const FlatListView: FunctionComponent<FlatListViewProps> = ({
  testID,
  style,
  title,
  titleStyle,
  emptyListIcon,
  emptyListIconStyle,
  emptyListTitle,
  emptyListSubtitle,
  items,
  staticContent = true,
  onItemSelected,
  ...otherProps
}) => {
  const sections =
    items.length > 0
      ? [
          {
            data: items,
            title,
            titleStyle,
          },
        ]
      : [];
  const emptyListView = {
    icon: emptyListIcon,
    iconStyle: emptyListIconStyle,
    title: emptyListTitle,
    subtitle: emptyListSubtitle,
  };
  return (
    <SectionListView
      testID={testID}
      style={[!title ? styles.additionalMargin : undefined, style]}
      sections={sections}
      emptyListView={emptyListView}
      staticContent={staticContent}
      onItemSelected={onItemSelected ? (item, _, index) => onItemSelected(item, index) : undefined}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  additionalMargin: {
    paddingTop: 16,
  },
});

export default FlatListView;
