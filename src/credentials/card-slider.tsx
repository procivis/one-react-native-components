import React, { forwardRef, ReactNode, useCallback, useMemo } from 'react';
import {
  Animated,
  FlatList,
  ListRenderItem,
  // eslint-disable-next-line no-restricted-imports
  Pressable,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { useAppColorScheme } from '../theme';
import { useForwardedRef } from '../utils';
import Card, { CardData, CardStyle } from './card';
import CardIndicator from './card-indicator';

export type CardSliderCard = CardData & {
  additionalContent?: ReactNode;
  accessibilityLabel?: string;
};

export interface CardSliderProps {
  cards: CardSliderCard[];
  style?: StyleProp<ViewStyle>;
  onCardSelected?: (cardData: CardData, index: number) => void;
  /**
   * Custom width of the whole component
   *
   * Note that the width provided via style gets overridden by this setting.
   *
   * _(optional)_ default: device screen width
   */
  width?: number;
}

/**
 * Credential/Card gallery slider
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=35%3A1778&t=g781E5yBTMsqtTIH-4
 */

const CardSlider = forwardRef<FlatList<CardSliderCard>, CardSliderProps>(
  ({ cards, style, onCardSelected, width: customWidth }, ref) => {
    const t = useAccessibilityTranslation();
    const colorScheme = useAppColorScheme();

    const [forwardedRef, refObject] = useForwardedRef(ref);
    const scrollOffsetX = useMemo(() => new Animated.Value(0), []);

    const { width: screenWidth } = useWindowDimensions();
    const fullWidth = customWidth ? Math.min(customWidth, screenWidth) : screenWidth;

    const scrollIndex = useMemo(
      () =>
        scrollOffsetX.interpolate({
          inputRange: [0, fullWidth],
          outputRange: [0, 1],
        }),
      [fullWidth, scrollOffsetX],
    );

    const numCards = cards.length;
    const renderItem: ListRenderItem<CardSliderCard> = useCallback(
      ({ item, index }) => {
        const cardWidth = fullWidth * (2 / 3);
        const sideNavWidth = (fullWidth - cardWidth) / 2 - 24;
        const cardStyle: CardStyle = {
          width: cardWidth,
          dataBottomPadding: 20,
        };

        const cardShadow = {
          shadowOpacity: scrollIndex.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, colorScheme.shadow.shadowOpacity, 0],
            extrapolate: 'clamp',
          }),
        };

        const positionOffset = fullWidth - cardWidth - 24;
        const cardWrapperStyle: Animated.WithAnimatedValue<CardStyle> = {
          width: cardWidth,
          transform: [
            {
              translateX: scrollIndex.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-positionOffset, 0, positionOffset],
              }),
            },
          ],
          opacity: scrollIndex.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          }),
        };

        const onSideNavPress = (targetIndex: number) =>
          refObject.current?.scrollToIndex({ animated: true, index: targetIndex });

        return (
          <View style={{ width: fullWidth }}>
            <View style={[styles.centeredContainer, { width: fullWidth }]}>
              <TouchableOpacity
                style={{ width: cardWidth }}
                accessibilityRole="button"
                accessibilityLabel={item.accessibilityLabel}
                accessibilityValue={
                  numCards > 1
                    ? { text: t('accessibility.control.order', { current: index + 1, length: numCards }) }
                    : undefined
                }
                onPress={() => onCardSelected?.(item, index)}>
                <Animated.View style={[styles.centeredContainer, cardWrapperStyle]}>
                  <Animated.View style={[styles.cardShadow, colorScheme.shadow, cardShadow]}>
                    <Card {...item} style={cardStyle} />
                  </Animated.View>
                  <CardIndicator style={styles.cardIndicator} />
                </Animated.View>
              </TouchableOpacity>

              {index > 0 ? (
                // invisible buttons on the sides to navigate to previous/next card
                <>
                  <Pressable
                    accessible={false}
                    style={[styles.sideNav, { width: sideNavWidth, left: -sideNavWidth }]}
                    onPress={() => onSideNavPress(index)}
                  />
                  <Pressable
                    accessible={false}
                    style={[styles.sideNav, styles.sideNavLeft, { width: sideNavWidth }]}
                    onPress={() => onSideNavPress(index - 1)}
                  />
                </>
              ) : null}
            </View>
            <View accessibilityElementsHidden={true} style={styles.additionalContent}>
              {item.additionalContent}
            </View>
          </View>
        );
      },
      [scrollIndex, fullWidth, colorScheme, numCards, t, refObject, onCardSelected],
    );

    return (
      <Animated.FlatList<CardSliderCard>
        ref={forwardedRef}
        style={[style, { width: fullWidth }]}
        data={cards}
        extraData={[fullWidth, colorScheme, onCardSelected]}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled={true}
        scrollEventThrottle={16}
        initialNumToRender={3}
        removeClippedSubviews={false}
        getItemLayout={(_, index) => ({ length: fullWidth, offset: fullWidth * index, index })}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollOffsetX } } }], {
          useNativeDriver: true,
        })}
      />
    );
  },
);

CardSlider.displayName = 'CardSlider';

const styles = StyleSheet.create({
  additionalContent: {
    width: '100%',
  },
  cardIndicator: {
    bottom: 18,
  },
  cardShadow: {
    borderRadius: 20,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 9,
  },
  centeredContainer: {
    alignItems: 'center',
  },
  sideNav: {
    height: '100%',
    position: 'absolute',
  },
  sideNavLeft: {
    left: 0,
  },
});

export default CardSlider;
