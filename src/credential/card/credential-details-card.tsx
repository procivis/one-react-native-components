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

import { Button, ButtonType } from '../../buttons';
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
  showAllButtonLabel?: string;
};

const PREVIEW_ATTRIBUTES_COUNT = 3;

const CredentialDetailsCard: FC<CredentialDetailsCardProps> = ({
  attributes,
  card,
  expanded,
  footer,
  onImagePreview,
  style,
  testID,
  showAllButtonLabel = 'See all',
}) => {
  const colorScheme = useAppColorScheme();
  const [expandCardAnimation] = useState(() => new Animated.Value(expanded ? 1 : 0));
  const [showAllAttributesAnimation] = useState(() => new Animated.Value(0));

  const [previewAttributesHeight, setPreviewAttributesHeight] = useState<number>(0);
  const [fullAttributesHeight, setFullAttributesHeight] = useState<number>(0);
  const [buttonViewHeight, setButtonViewHeight] = useState<number>();

  const [showAllAttributes, setShowAllAttributes] = useState<boolean>(false);

  const CaretIcon = expanded ? UpIcon : DownIcon;

  useEffect(() => {
    Animated.timing(expandCardAnimation, {
      duration: 250,
      easing: Easing.quad,
      toValue: expanded ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [expanded, expandCardAnimation]);

  useEffect(() => {
    Animated.timing(showAllAttributesAnimation, {
      duration: 200,
      easing: Easing.quad,
      toValue: expanded && showAllAttributes ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [showAllAttributes, showAllAttributesAnimation, expanded]);

  const attributesWrapperStyle: Animated.WithAnimatedObject<ViewStyle> = {
    height:
      previewAttributesHeight &&
      expandCardAnimation.interpolate({
        extrapolate: 'clamp',
        inputRange: [0, 1],
        outputRange: [0, previewAttributesHeight],
      }),
  };

  const fullAttributesWrapperStyle: Animated.WithAnimatedObject<ViewStyle> = {
    height:
      fullAttributesHeight &&
      showAllAttributesAnimation.interpolate({
        extrapolate: 'clamp',
        inputRange: [0, 1],
        outputRange: [0, fullAttributesHeight],
      }),
  };

  const buttonWrapperStyle: Animated.WithAnimatedObject<ViewStyle> = {
    height:
      buttonViewHeight &&
      showAllAttributesAnimation.interpolate({
        extrapolate: 'clamp',
        inputRange: [0, 1],
        outputRange: [buttonViewHeight, 0],
      }),
  };

  const onPreviewAttrContentLayout = useCallback((event: LayoutChangeEvent) => {
    setPreviewAttributesHeight(event.nativeEvent.layout.height);
  }, []);

  const onFullAttributesContentLayout = useCallback((event: LayoutChangeEvent) => {
    setFullAttributesHeight(event.nativeEvent.layout.height);
  }, []);

  const onButtonViewLayout = useCallback((event: LayoutChangeEvent) => {
    setButtonViewHeight(event.nativeEvent.layout.height);
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

  const previewAttributes = attributes.slice(0, PREVIEW_ATTRIBUTES_COUNT);
  const extraAttributes = attributes.slice(PREVIEW_ATTRIBUTES_COUNT);

  return (
    <View style={[styles.detailsCard, { backgroundColor: colorScheme.white }, style]} testID={testID}>
      <CredentialCard
        {...cardProps}
        header={{ ...header, accessory: header.accessory ?? CaretIcon }}
        style={[styles.card, cardProps.style]}
        testID={concatTestID(testID, 'card')}
      />
      <Animated.View style={[styles.attributesAnimatedWrapper, attributesWrapperStyle]}>
        <View onLayout={onPreviewAttrContentLayout} style={styles.attributesWrapper}>
          {previewAttributes.map((attribute) => (
            <CredentialAttributeItem key={attribute.id} last={false} onImagePreview={onImagePreview} {...attribute} />
          ))}
          <Animated.View style={[styles.attributesAnimatedWrapper, buttonWrapperStyle]}>
            <View onLayout={onButtonViewLayout}>
              <Button
                onPress={() => setShowAllAttributes(true)}
                type={ButtonType.Secondary}
                testID={concatTestID(testID, 'show-all-attributes-button')}
                title={showAllButtonLabel}
              />
            </View>
          </Animated.View>
        </View>
      </Animated.View>
      <Animated.View style={[styles.attributesAnimatedWrapper, fullAttributesWrapperStyle]}>
        <View onLayout={onFullAttributesContentLayout} style={styles.attributesWrapper}>
          {extraAttributes.map((attribute, index, { length }) => (
            <CredentialAttributeItem
              key={attribute.id}
              last={!footerView && index === length - 1}
              testID={concatTestID(testID, 'attribute', attribute.id)}
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
