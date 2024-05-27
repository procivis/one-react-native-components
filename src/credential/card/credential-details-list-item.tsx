import React, { FC, useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { concatTestID } from '../../utils';
import { CredentialCardRatio, CredentialCardShadow } from './credential-card';
import CredentialDetailsCard, { CredentialDetailsCardProps } from './credential-details-card';

export type CredentialDetailsCardListItemProps = CredentialDetailsCardProps & {
  detailsCardStyle?: StyleProp<ViewStyle>;
  lastItem?: boolean;
};

const CredentialDetailsCardListItem: FC<CredentialDetailsCardListItemProps> = ({
  detailsCardStyle,
  expanded,
  lastItem,
  style,
  ...props
}) => {
  const [minHeight, setMinHeight] = useState<number>();
  const [detailsCardHeight, setDetailsCardHeight] = useState<number>();

  const cardListItemHeight = useSharedValue<number | undefined>(undefined);

  useEffect(() => {
    if (!detailsCardHeight || !minHeight) {
      return;
    }
    const newValue = expanded ? detailsCardHeight : minHeight;
    if (cardListItemHeight.value === undefined) {
      cardListItemHeight.value = newValue;
      return;
    }
    cardListItemHeight.value = withTiming(newValue, {
      duration: 250,
    });
  }, [cardListItemHeight, detailsCardHeight, minHeight, expanded]);

  const cardWrapperStyle = useAnimatedStyle(() => {
    if (cardListItemHeight.value !== undefined) {
      return {
        height: cardListItemHeight.value,
      };
    }
    if (lastItem || expanded) {
      return {};
    }
    return {
      height: 60,
    };
  });

  const onContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      if (!minHeight) {
        setMinHeight(lastItem ? width / CredentialCardRatio : 60);
      }
      const borderWidth = StyleSheet.flatten(style)?.borderWidth ?? 0;
      setDetailsCardHeight(height + 2 * borderWidth);
    },
    [lastItem, minHeight, style],
  );

  return (
    <Animated.View
      style={[cardWrapperStyle, style]}
      testID={concatTestID(props.testID, expanded ? 'expanded' : 'collapsed')}>
      <View style={styles.cardWrapper}>
        <CredentialDetailsCard
          animate={false}
          expanded={expanded}
          onLayout={onContentLayout}
          style={detailsCardStyle}
          {...props}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    ...CredentialCardShadow,
    overflow: 'visible',
  },
});

export default CredentialDetailsCardListItem;
