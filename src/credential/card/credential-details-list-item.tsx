import React, { FC, useCallback, useEffect, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native';

import { CredentialCardRatio } from './credential-card';
import CredentialDetailsCard, { CredentialDetailsCardProps } from './credential-details-card';

export type CredentialDetailsCardListItemProps = CredentialDetailsCardProps & {
  lastItem?: boolean;
};

const CredentialDetailsCardListItem: FC<CredentialDetailsCardListItemProps> = ({
  expanded,
  lastItem,
  style,
  ...props
}) => {
  const [animation] = useState(() => new Animated.Value(expanded ? 1 : 0));
  const [minHeight, setMinHeight] = useState<number>();
  const [detailsCardHeight, setDetailsCardHeight] = useState<number>();

  useEffect(() => {
    Animated.timing(animation, {
      duration: 250,
      easing: Easing.quad,
      toValue: expanded ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [expanded, animation]);

  const cardWrapperStyle: Animated.WithAnimatedObject<ViewStyle> = {
    height:
      minHeight && detailsCardHeight
        ? animation.interpolate({
            extrapolate: 'clamp',
            inputRange: [0, 1],
            outputRange: [minHeight, detailsCardHeight],
          })
        : undefined,
  };

  const onContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      if (!minHeight) {
        setMinHeight(lastItem ? width / CredentialCardRatio : 60);
      }
      const borderWidth = StyleSheet.flatten(style).borderWidth ?? 0;
      setDetailsCardHeight(height + 2 * borderWidth);
    },
    [lastItem, minHeight, style],
  );

  return (
    <Animated.View style={[cardWrapperStyle, style]}>
      <View onLayout={onContentLayout} style={styles.cardWrapper}>
        <CredentialDetailsCard expanded={expanded} {...props} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    width: '100%',
  },
});

export default CredentialDetailsCardListItem;
