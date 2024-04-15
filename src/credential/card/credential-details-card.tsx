import React, { ComponentType, FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { ImageSourcePropType, LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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
  showAllButtonLabel,
}) => {
  const colorScheme = useAppColorScheme();
  const [previewAttributesHeight, setPreviewAttributesHeight] = useState<number>(0);
  const [fullAttributesHeight, setFullAttributesHeight] = useState<number>(0);

  const [buttonViewHeight, setButtonViewHeight] = useState<number>(0);

  const [allAttributesRendered, setAllAttributesRendered] = useState<boolean>(
    attributes.length <= PREVIEW_ATTRIBUTES_COUNT || !showAllButtonLabel,
  );

  const CaretIcon = expanded ? UpIcon : DownIcon;

  const currentHeight = useSharedValue(0);

  const previewAttributes = attributes.slice(0, PREVIEW_ATTRIBUTES_COUNT);
  const extraAttributes = attributes.slice(PREVIEW_ATTRIBUTES_COUNT);

  useEffect(() => {
    if (!expanded) {
      currentHeight.value = withTiming(0, {
        duration: 250,
      });
    } else if (allAttributesRendered) {
      const duration = previewAttributes.length * 50;

      currentHeight.value = withTiming(previewAttributesHeight + fullAttributesHeight, {
        duration,
      });
    } else {
      const duration = extraAttributes.length * 50;
      currentHeight.value = withTiming(previewAttributesHeight + buttonViewHeight, {
        duration,
      });
    }
  }, [
    allAttributesRendered,
    buttonViewHeight,
    currentHeight,
    expanded,
    extraAttributes.length,
    fullAttributesHeight,
    previewAttributes.length,
    previewAttributesHeight,
  ]);

  const credentilAttributesStyle = useAnimatedStyle(() => {
    return {
      height: currentHeight.value,
    };
  });

  const onPreviewAttrContentLayout = useCallback((event: LayoutChangeEvent) => {
    setPreviewAttributesHeight(event.nativeEvent.layout.height);
  }, []);

  const onFullAttrContentLayout = useCallback((event: LayoutChangeEvent) => {
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

  return (
    <View style={[styles.detailsCard, { backgroundColor: colorScheme.white }, style]} testID={testID}>
      <CredentialCard
        {...cardProps}
        header={{ ...header, accessory: header.accessory ?? CaretIcon }}
        style={[styles.card, cardProps.style]}
        testID={concatTestID(testID, 'card')}
      />
      <Animated.View style={[styles.attributesAnimatedWrapper, credentilAttributesStyle]}>
        <View onLayout={onPreviewAttrContentLayout} style={styles.previewAttributesWrapper}>
          {previewAttributes.map((attribute, idx) => (
            <CredentialAttributeItem
              key={attribute.id}
              last={!extraAttributes.length && idx === previewAttributes.length - 1}
              onImagePreview={onImagePreview}
              {...attribute}
            />
          ))}
        </View>
        {!allAttributesRendered && extraAttributes.length > 0 && (
          <View style={styles.attributesWrapper} onLayout={onButtonViewLayout}>
            <Button
              onPress={() => setAllAttributesRendered(true)}
              type={ButtonType.Secondary}
              testID={concatTestID(testID, 'showAllAttributesButton')}
              title={showAllButtonLabel!}
            />
          </View>
        )}
        <View style={styles.attributesWrapper} onLayout={onFullAttrContentLayout}>
          {extraAttributes.map((attribute, index, { length }) => (
            <CredentialAttributeItem
              key={attribute.id}
              last={!footerView && index === length - 1}
              testID={concatTestID(testID, 'attribute', attribute.id)}
              onImagePreview={onImagePreview}
              {...attribute}
            />
          ))}
        </View>
      </Animated.View>
      {(expanded && <View style={styles.footer}>{footerView}</View>) ?? null}
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
  previewAttributesWrapper: {
    paddingHorizontal: 12,
    width: '100%',
  },
});

export default CredentialDetailsCard;
