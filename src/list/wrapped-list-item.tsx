import React, { FunctionComponent, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useAppColorScheme } from '../theme';
import ListItem, { ListItemProps } from './list-item';

type WrappedListItemProps = ListItemProps & {
  index: number;
} & (
    | {
        onItemSelected?: (item: ListItemProps, index: number) => void;
      }
    | {
        section: number;
        onSectionItemSelected?: (item: ListItemProps, section: number, index: number) => void;
      }
  );

const WrappedListItem: FunctionComponent<WrappedListItemProps> = ({ index, ...props }) => {
  const colorScheme = useAppColorScheme();

  const onPress = useMemo(() => {
    if (props.onPress) {
      return props.onPress;
    }
    if ('section' in props && 'onSectionItemSelected' in props) {
      const { section, onSectionItemSelected, ...itemProps } = props;
      return onSectionItemSelected ? () => onSectionItemSelected(itemProps, section, index) : undefined;
    }
    if ('onItemSelected' in props) {
      const { onItemSelected, ...itemProps } = props;
      return onItemSelected ? () => onItemSelected(itemProps, index) : undefined;
    }
    return;
  }, [index, props]);

  const listItem = (
    <ListItem
      {...props}
      style={[styles.listItem, styles.listItemWrapper, props.style]}
      iconStyle={[styles.listItemIcon, { borderColor: colorScheme.background }, props.iconStyle]}
      onPress={onPress}
    />
  );
  return listItem;
};

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  listItemIcon: {
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
  },
  listItemWrapper: {
    marginBottom: 16,
  },
});

export default WrappedListItem;
