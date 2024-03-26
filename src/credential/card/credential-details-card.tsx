import React, { ComponentType, FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Easing,
  ImageSourcePropType,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { DownIcon, UpIcon } from '../../icons/credential';
import { useAppColorScheme } from '../../theme/color-scheme-context';
import { concatTestID } from '../../utils/testID';
import CredentialAttributeItem, { CredentialAttribute } from '../credential-attribute-item';
import CredentialCard, { CredentialCardProps } from './credential-card';

export type CredentialDetailsCardProps = {
  attributes: CredentialAttribute[];
  card: CredentialCardProps;
  expanded?: boolean;
  footer?: ComponentType<any> | ReactElement;
  onImagePreview?: (name: string, image: ImageSourcePropType) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const CredentialDetailsCard: FC<CredentialDetailsCardProps> = ({
  attributes,
  card,
  expanded,
  footer,
  onImagePreview,
  style,
  testID,
}) => {
  const colorScheme = useAppColorScheme();
  const [animation] = useState(() => new Animated.Value(expanded ? 1 : 0));
  const [attributesHeight, setAttributesHeight] = useState<number>();
  const CaretIcon = expanded ? UpIcon : DownIcon;

  useEffect(() => {
    Animated.timing(animation, {
      duration: 250,
      easing: Easing.quad,
      toValue: expanded ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [expanded, animation]);

  const attributesWrapperStyle: Animated.WithAnimatedObject<ViewStyle> = {
    height: attributesHeight
      ? animation.interpolate({
          extrapolate: 'clamp',
          inputRange: [0, 1],
          outputRange: [0, attributesHeight],
        })
      : undefined,
  };

  const onContentLayout = useCallback((event: LayoutChangeEvent) => {
    setAttributesHeight(event.nativeEvent.layout.height);
  }, []);

  const footerView: ReactElement | undefined = useMemo(() => {
    if (!footer) {
      return undefined;
    }
    if (React.isValidElement(footer)) {
      return footer;
    } else if (footer) {
      const FooterComponent = footer as React.ComponentType<any>;
      return <FooterComponent />;
    }
  }, [footer]);

  const { header, ...cardProps } = card;

  return (
    <View style={[styles.detailsCard, { backgroundColor: colorScheme.white }, style]} testID={testID}>
      <CredentialCard
        {...cardProps}
        header={{ ...header, accessory: header.accessory ?? CaretIcon }}
        style={[styles.card, cardProps.style]}
        testID={concatTestID(testID, 'card')}
      />
      <Animated.View style={[styles.attributesAnimatedWrapper, attributesWrapperStyle]}>
        <View onLayout={onContentLayout} style={styles.attributesWrapper}>
          {attributes.map((attribute, index, { length }) => (
            <CredentialAttributeItem
              key={attribute.id}
              last={!footerView && index === length - 1}
              onImagePreview={onImagePreview}
              {...attribute}
            />
          ))}
          {footerView && <View style={styles.footer}>{footerView}</View>}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  attributesAnimatedWrapper: {
    overflow: 'hidden',
  },
  attributesWrapper: {
    paddingBottom: 12,
    paddingHorizontal: 12,
    position: 'absolute',
    width: '100%',
  },
  card: {
    borderRadius: 0,
  },
  detailsCard: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  footer: {
    marginTop: 12,
  },
});

export default CredentialDetailsCard;
