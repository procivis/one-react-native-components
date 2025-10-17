import React, { FC, useCallback, useState } from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { CredentialCardRatio, CredentialCardShadow } from './credential-card';
import CredentialDetailsCard, { CredentialDetailsCardProps } from './credential-details-card';

export type CredentialDetailsCardListItemProps = Omit<CredentialDetailsCardProps, 'animate'> & {
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
  const [detailsCardHeight, setDetailsCardHeight] = useState<number>();
  const cardWidth = props.card.width;
  const minHeight = lastItem ? Math.ceil(cardWidth / CredentialCardRatio) : 60;

  const onContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      const borderWidth = StyleSheet.flatten(style)?.borderWidth ?? 0;
      const cardHeight = Math.round(height) + 2 * borderWidth;
      if (cardHeight === detailsCardHeight) {
        return;
      }
      setDetailsCardHeight(cardHeight);
    },
    [style, detailsCardHeight],
  );

  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        styles.animatedWrapper,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          height: expanded ? 'auto' : minHeight,
        },
        style,
      ]}>
      <Animated.View
        layout={LinearTransition}
        style={[
          styles.cardWrapper,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            height: expanded ? 'auto' : Math.ceil(cardWidth / CredentialCardRatio),
          },
        ]}>
        <CredentialDetailsCard
          animate={false}
          expanded={true}
          onLayout={onContentLayout}
          style={detailsCardStyle}
          {...props}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedWrapper: {
    ...CredentialCardShadow,
  },
  cardWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default CredentialDetailsCardListItem;
