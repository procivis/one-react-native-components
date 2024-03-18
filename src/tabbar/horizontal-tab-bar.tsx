import { isEqual } from 'lodash';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AccessibilityProps,
  FlatList,
  LayoutChangeEvent,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextLayoutEventData,
  TouchableOpacityProps,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { GradientBackground } from '../gradient';
import { ChevronLeft, ChevronRight } from '../icon/icon';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export interface HorizontalTabBarTab extends AccessibilityProps {
  testID?: string;
  key: React.Key;
  label: string;
  badge?: number;
}

const MIN_BUTTON_WIDTH = 80;
const SIDE_PADDING = 20;

const TabButton: React.FunctionComponent<
  TouchableOpacityProps &
    Omit<HorizontalTabBarTab, 'key'> & {
      onPress?: () => void;
      index: number;
      numButtons: number;
      width?: number;
      selected: boolean;
      onWidth?: (width: number) => void;
    }
> = ({ selected, label, badge, index, numButtons, width, onWidth, ...props }) => {
  const colorScheme = useAppColorScheme();
  const t = useAccessibilityTranslation();
  const { width: screenWidth } = useWindowDimensions();
  const maxWidth = screenWidth * 0.66;

  const labelWidth = useRef<number>();
  const badgeWidth = useRef<number>();

  const onLayoutUpdate = useCallback(() => {
    if (!labelWidth.current) return;
    if (badge && !badgeWidth.current) return;
    const calculatedWidth = 24 + labelWidth.current + (badgeWidth.current ? 12 + badgeWidth.current : 0);
    onWidth?.(Math.min(maxWidth, calculatedWidth));
  }, [badge, onWidth, maxWidth]);

  const onLabelLayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      labelWidth.current = event.nativeEvent.lines?.[0]?.width;
      onLayoutUpdate();
    },
    [onLayoutUpdate],
  );
  const onBadgeLayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      badgeWidth.current = event.nativeEvent.lines?.[0]?.width;
      onLayoutUpdate();
    },
    [onLayoutUpdate],
  );

  return (
    <TouchableOpacity
      // selected item cannot be tapped
      activeOpacity={selected ? 1 : undefined}
      style={[styles.button, { maxWidth, width, borderColor: selected ? colorScheme.accentText : colorScheme.accent }]}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      accessibilityValue={{ text: t('accessibility.control.order', { current: index + 1, length: numButtons }) }}
      {...props}>
      <View style={styles.buttonContent}>
        <Typography
          color={colorScheme.accentText}
          bold={selected}
          numberOfLines={1}
          style={styles.buttonLabel}
          onTextLayout={onLabelLayout}
          ellipsizeMode="tail">
          {label}
        </Typography>
        {badge ? (
          <Typography
            size="xs"
            color={colorScheme.text}
            onTextLayout={onBadgeLayout}
            bold={true}
            numberOfLines={1}
            ellipsizeMode="clip"
            style={[styles.buttonBadge, { backgroundColor: colorScheme.white }]}>
            {badge}
          </Typography>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export interface HorizontalTabBarProps extends ViewProps {
  values: HorizontalTabBarTab[];
  selectedKey: React.Key;
  onSelected: (key: React.Key, value: HorizontalTabBarTab, index: number) => void;
}

/**
 * Header tab bar component
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=22-1235&t=Z18L89ievIUQrZCI-4
 */
const HorizontalTabBar: FunctionComponent<HorizontalTabBarProps> = ({
  values,
  selectedKey,
  onSelected,
  style,
  onLayout,
  ...props
}) => {
  const colorScheme = useAppColorScheme();
  const [leftOverlayVisible, setLeftOverlayVisible] = useState(false);
  const [rightOverlayVisible, setRightOverlayVisible] = useState(true);
  const [scrollInitialized, setScrollInitialized] = useState(false);

  const listRef = useRef<FlatList<HorizontalTabBarTab>>(null);

  const windowDimensions = useWindowDimensions();
  const [screenWidth, setScreenWidth] = useState<number>(windowDimensions.width);
  const layoutHandler = useCallback(
    (event: LayoutChangeEvent) => {
      setScreenWidth(event.nativeEvent.layout.width);
      onLayout?.(event);
    },
    [onLayout],
  );

  const numButtons = values.length;

  const [buttonLabels, setButtonLabels] = useState<string[]>(values.map((value) => value.label));
  const [buttonWidths, setButtonWidths] = useState<number[]>([]);
  useEffect(() => {
    const newValues = values.map((value) => value.label);
    if (!isEqual(buttonLabels, newValues)) {
      setButtonLabels(newValues);
    }
  }, [values, buttonLabels]);
  useEffect(() => {
    setButtonWidths([]);
  }, [buttonLabels]);

  const overlayVisible = useMemo(() => {
    if (buttonWidths.length !== values.length) {
      return false;
    }
    const buttonsWidth = buttonWidths.reduce((a, b) => a + b, 0) + 2 * SIDE_PADDING;
    return buttonsWidth > screenWidth;
  }, [screenWidth, buttonWidths, values.length]);

  // ideal button width if all the buttons fit in the view
  const buttonWidth = useMemo(() => {
    const balancedButtonWidth = (screenWidth - 2 * SIDE_PADDING) / numButtons - 8;
    const allWidthsCollected = Array.from({ length: numButtons }).every(
      (_, index) => buttonWidths[index] !== undefined,
    );
    return allWidthsCollected && buttonWidths.every((w) => w <= balancedButtonWidth) ? balancedButtonWidth : undefined;
  }, [buttonWidths, numButtons, screenWidth]);

  const renderItem = useCallback<ListRenderItem<HorizontalTabBarTab>>(
    ({ item, index }) => {
      const selected = item.key === selectedKey;
      const onButtonWidth = (width: number) => {
        setButtonWidths((prev) => {
          const res = [...prev];
          res[index] = Math.max(MIN_BUTTON_WIDTH, width);
          return res;
        });
      };

      const props = { ...item, selected, index, numButtons };
      return (
        <>
          {
            // in order to prevent jumping when selected, measure the width of the selected (bold) version in a hidden context
            !selected && !buttonWidth && (
              <View style={styles.hidden} accessibilityElementsHidden={true} pointerEvents="none">
                <TabButton {...props} style={styles.hiddenItem} selected={true} onWidth={onButtonWidth} />
              </View>
            )
          }
          <TabButton
            {...props}
            onPress={selected ? undefined : () => onSelected(item.key, item, index)}
            onWidth={selected && !buttonWidth ? onButtonWidth : undefined}
            width={buttonWidth ?? buttonWidths[index]}
          />
        </>
      );
    },
    [selectedKey, numButtons, buttonWidth, buttonWidths, onSelected],
  );

  const scrollPosition = useRef<number>(0);
  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setScrollInitialized(true);
      const oldOffset = scrollPosition.current;
      const newOffset = event.nativeEvent.contentOffset.x;
      scrollPosition.current = newOffset;
      if (values.length === 0) {
        return;
      }
      setLeftOverlayVisible(newOffset > 5);
      if (newOffset < oldOffset) {
        setRightOverlayVisible(true);
      }
    },
    [values],
  );

  const onEndReached = useCallback(() => {
    if (!scrollInitialized) {
      return;
    }
    setRightOverlayVisible(false);
  }, [scrollInitialized]);

  const selectedIndex = values.findIndex(({ key }) => key === selectedKey);
  useEffect(() => {
    if (selectedIndex === -1 || buttonWidths[selectedIndex] === undefined) {
      return;
    }

    // if the selected item is outside of viewport, scroll so that it's in the view
    let leftOffset = SIDE_PADDING;
    for (let i = 0; i < selectedIndex; i++) {
      if (buttonWidths[i] === undefined) {
        return;
      }
      leftOffset += buttonWidths[i] + 8;
    }

    const rightOffset = leftOffset + buttonWidths[selectedIndex] + 8;
    const currLeft = scrollPosition.current;
    const currRight = scrollPosition.current + screenWidth;

    let targetOffset: number | undefined;
    if (currLeft > leftOffset) {
      targetOffset = leftOffset;
    } else if (currRight < rightOffset) {
      targetOffset = rightOffset - screenWidth;
    }

    if (targetOffset !== undefined) {
      listRef.current?.scrollToOffset({
        animated: true,
        offset: targetOffset,
      });
    }
  }, [selectedIndex, screenWidth, buttonWidths]);

  return (
    <View>
      <FlatList<HorizontalTabBarTab>
        ref={listRef}
        data={values}
        extraData={buttonWidth}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        scrollEnabled={true}
        bounces={false}
        style={[styles.container, { backgroundColor: colorScheme.accent }, style]}
        onLayout={layoutHandler}
        contentContainerStyle={styles.content}
        onScroll={onScroll}
        scrollEventThrottle={5}
        onEndReached={onEndReached}
        onEndReachedThreshold={0}
        {...props}
      />
      {values.length && overlayVisible ? (
        <View style={styles.overlay} pointerEvents="box-none">
          {leftOverlayVisible ? (
            <View style={styles.overlayItem}>
              <View style={[styles.chevronWrapper, { backgroundColor: colorScheme.accent }]}>
                <ChevronLeft style={styles.chevronLeft} />
              </View>
              <GradientBackground
                colors={[colorScheme.accent, `${colorScheme.accent}00`]}
                direction="horizontal"
                absoluteFill={false}
                width={24}
                height={46}
              />
            </View>
          ) : (
            <View />
          )}
          {rightOverlayVisible ? (
            <View style={styles.overlayItem}>
              <GradientBackground
                colors={[`${colorScheme.accent}00`, colorScheme.accent]}
                direction="horizontal"
                absoluteFill={false}
                width={24}
                height={46}
              />
              <View style={[styles.chevronWrapper, { backgroundColor: colorScheme.accent }]}>
                <ChevronRight style={styles.chevronRight} />
              </View>
            </View>
          ) : undefined}
        </View>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 4,
    minWidth: MIN_BUTTON_WIDTH,
    paddingHorizontal: 12,
  },
  buttonBadge: {
    borderRadius: 8,
    marginBottom: 14,
    marginLeft: 4,
    overflow: 'hidden',
    paddingHorizontal: 4,
  },
  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    marginBottom: 12,
    marginTop: 8,
  },
  chevronLeft: {
    paddingBottom: 4,
  },
  chevronRight: {
    paddingBottom: 4,
  },
  chevronWrapper: {
    height: 46,
    justifyContent: 'center',
    width: 24,
  },
  container: {
    width: '100%',
  },
  content: {
    paddingHorizontal: SIDE_PADDING,
  },
  hidden: {
    height: 0,
    overflow: 'hidden',
    width: 0,
  },
  hiddenItem: {
    position: 'absolute',
  },
  overlay: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
  },
  overlayItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default HorizontalTabBar;
