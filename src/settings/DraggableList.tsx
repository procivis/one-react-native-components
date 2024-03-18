import React, { FunctionComponent, useCallback, useState } from 'react';
import {
  AccessibilityActionEvent,
  AccessibilityActionInfo,
  FlatListProps,
  // eslint-disable-next-line no-restricted-imports
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import DraggableFlatList, { DragEndParams, RenderItem, ScaleDecorator } from 'react-native-draggable-flatlist';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { focusAccessibility } from '../accessibility';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { ListItem, ListItemProps } from '../list';
import { useAppColorScheme } from '../theme';

const BurgerIcon: React.FunctionComponent<SvgProps> = ({ color, ...props }) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="M18 8H6M18 12H6M18 16H6" stroke={color} />
  </Svg>
);

const arrayMove = <T extends unknown>(arr: readonly T[], fromIndex: number, toIndex: number): T[] => {
  const element: T = arr[fromIndex];
  const newArray = [...arr];
  newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, element);
  return newArray;
};

export interface DraggableListItemProps extends Omit<ListItemProps, 'accessibilityValue'> {
  key: React.Key;
  accessoryAccessibility?: Readonly<{
    actionName: string;
    onAction: () => void;
  }>;
  accessibilityValue?: string;
}

export interface DraggableListProps
  extends Omit<FlatListProps<DraggableListItemProps>, 'data' | 'onDragEnd' | 'keyExtractor' | 'renderItem'> {
  items: DraggableListItemProps[];
  onOrderChange: (items: DraggableListItemProps[]) => void;
}

enum AccessibilityAction {
  MoveUp = 'moveUp',
  MoveDown = 'moveDown',
  Activate = 'activate',
}

const styles = StyleSheet.create({
  accessory: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  burgerButton: {
    padding: 8,
  },
  container: {
    paddingVertical: 18,
  },
  item: {
    marginVertical: 6,
  },
});
const NON_BOLD = { bold: false };

// https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=188%3A9011&t=fRc40JZF3xJhNtiN-4
const DraggableList: FunctionComponent<DraggableListProps> = ({ items, onOrderChange, ...props }) => {
  const t = useAccessibilityTranslation();
  const colorScheme = useAppColorScheme();

  const [rerenderKey, setRerenderKey] = useState<{ key: number; focused?: React.Key }>({ key: 0 });
  const numItems = items.length;

  const keyExtractor = useCallback((item: DraggableListItemProps) => String(item.key), []);

  const onDragEnd = useCallback(
    (params: DragEndParams<DraggableListItemProps>) => {
      onOrderChange(params.data);
    },
    [onOrderChange],
  );

  const renderItem = useCallback<RenderItem<DraggableListItemProps>>(
    (params) => {
      const {
        drag,
        item: { accessibilityValue: itemAccessibilityValue, ...item },
      } = params;

      // v4 of the draggable list library provides a getIndex function - make it work with both v3 and v4
      // @ts-ignore
      const index: number | undefined = 'getIndex' in params ? params.getIndex() : params.index;

      const accessibilityOrderValue =
        numItems > 1 && index !== undefined
          ? t('accessibility.control.order', { current: index + 1, length: numItems })
          : undefined;

      const onAccessibilityMove = (positionDiff: number) => {
        if (index !== undefined) {
          onOrderChange(arrayMove(items, index, index + positionDiff));
          // trigger re-render and focus the same item again after re-render
          setRerenderKey(({ key }) => ({ key: key + 1, focused: item.key }));
        }
      };

      const onAccessibilityAction = (event: AccessibilityActionEvent) => {
        switch (event.nativeEvent.actionName) {
          case AccessibilityAction.Activate:
            item.accessoryAccessibility?.onAction?.();
            break;
          case AccessibilityAction.MoveUp:
            onAccessibilityMove(-1);
            break;
          case AccessibilityAction.MoveDown:
            onAccessibilityMove(1);
            break;
        }
      };

      const accessibilityActions: AccessibilityActionInfo[] = [];
      if (item.accessoryAccessibility) {
        accessibilityActions.push({
          name: AccessibilityAction.Activate,
          label: item.accessoryAccessibility.actionName,
        });
      }
      if (index !== undefined) {
        if (index > 0) {
          accessibilityActions.push({
            name: AccessibilityAction.MoveUp,
            label: t('accessibility.control.list.moveUp'),
          });
        }
        if (index < numItems - 1) {
          accessibilityActions.push({
            name: AccessibilityAction.MoveDown,
            label: t('accessibility.control.list.moveDown'),
          });
        }
      }

      const accessibilityValue = itemAccessibilityValue
        ? accessibilityOrderValue
          ? `${itemAccessibilityValue}, ${accessibilityOrderValue}`
          : itemAccessibilityValue
        : accessibilityOrderValue;

      return (
        <ScaleDecorator>
          <Pressable
            ref={(r) => {
              if (r && rerenderKey.focused === item.key) {
                focusAccessibility(r);
              }
            }}
            onLongPress={drag}
            delayLongPress={200}
            style={styles.item}
            accessible={true}
            accessibilityActions={accessibilityActions}
            accessibilityValue={accessibilityValue ? { text: accessibilityValue } : undefined}
            onAccessibilityAction={onAccessibilityAction}>
            <ListItem
              titleStyle={NON_BOLD}
              {...item}
              rightAccessory={
                <View style={styles.accessory}>
                  {item.rightAccessory}
                  <Pressable accessible={false} onPressIn={drag} style={styles.burgerButton}>
                    <BurgerIcon color={colorScheme.text} />
                  </Pressable>
                </View>
              }
            />
          </Pressable>
        </ScaleDecorator>
      );
    },
    [numItems, t, colorScheme.text, onOrderChange, items, rerenderKey.focused],
  );

  return (
    <DraggableFlatList<DraggableListItemProps>
      data={items}
      onDragEnd={onDragEnd}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      alwaysBounceVertical={false}
      {...props}
      extraData={[rerenderKey.key, props.extraData]}
      contentContainerStyle={[styles.container, props.contentContainerStyle]}
    />
  );
};

export default DraggableList;
