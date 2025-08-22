import React, { ComponentType, FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { ImageSourcePropType, LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { concatTestID } from '../../../utils/testID';
import { Button, ButtonType } from '../../buttons';
import { DownIcon, UpIcon } from '../../icons/credential';
import { useAppColorScheme } from '../../theme/color-scheme-context';
import CredentialAttributeItem, { CredentialAttribute } from '../credential-attribute-item';
import CredentialCard, { CredentialCardProps, CredentialCardRatio } from './credential-card';

export type CredentialDetailsCardProps = ViewProps & {
  animate?: boolean;
  attributes: CredentialAttribute[] | false;
  card: CredentialCardProps;
  expanded?: boolean;
  footer?: ComponentType<any> | ReactElement;
  onImagePreview?: (name: string, image: ImageSourcePropType) => void;
  onAttributeSelected?: (id: string, selected: boolean) => void;
  showAllButtonLabel?: string;
};

const PREVIEW_ATTRIBUTES_COUNT = 3;
const SEE_ALL_BUTTON_HEIGHT = 78;

const CredentialDetailsCard: FC<CredentialDetailsCardProps> = ({
  animate = true,
  attributes,
  card,
  expanded,
  footer,
  onImagePreview,
  onAttributeSelected,
  style,
  showAllButtonLabel,
  testID,
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();
  const [previewAttributesHeight, setPreviewAttributesHeight] = useState<number>();
  const [fullAttributesHeight, setFullAttributesHeight] = useState<number>();

  const [allAttributesRendered, setAllAttributesRendered] = useState<boolean>(
    (attributes && attributes.length <= PREVIEW_ATTRIBUTES_COUNT) || !showAllButtonLabel,
  );

  const CaretIcon = expanded ? UpIcon : DownIcon;

  const cardHeight = Math.ceil(card.width / CredentialCardRatio);
  const currentHeight = useSharedValue<number | undefined>(undefined);

  const previewAttributes = attributes ? attributes.slice(0, PREVIEW_ATTRIBUTES_COUNT) : [];
  const extraAttributes = useMemo(() => (attributes ? attributes.slice(PREVIEW_ATTRIBUTES_COUNT) : []), [attributes]);

  useEffect(() => {
    if (extraAttributes.length === 0) {
      const viewStyle = StyleSheet.flatten([
        styles.allAttributesWrapper,
        footer && styles.allAttributesWrapperWithFooter,
      ]);
      const padding = viewStyle.paddingBottom;
      setFullAttributesHeight(padding);
    }
  }, [extraAttributes, footer]);

  useEffect(() => {
    if (previewAttributesHeight === undefined) {
      return;
    }
    if (allAttributesRendered && fullAttributesHeight === undefined) {
      return;
    }

    const buttonViewHeight = !extraAttributes || allAttributesRendered ? 0 : SEE_ALL_BUTTON_HEIGHT;
    const additionalAttributesHeight = fullAttributesHeight ?? 0;
    const additionalHeight = allAttributesRendered ? additionalAttributesHeight : buttonViewHeight;
    const fullHeight = previewAttributesHeight + additionalHeight;

    if (!animate) {
      currentHeight.value = fullHeight;
      return;
    }

    const newHeight = expanded ? fullHeight : 0;

    if (currentHeight.value === undefined || !animate) {
      currentHeight.value = newHeight;
      return;
    }

    const duration = fullHeight / 5;
    currentHeight.value = withTiming(newHeight, {
      duration,
    });
  }, [
    allAttributesRendered,
    currentHeight,
    animate,
    expanded,
    extraAttributes,
    fullAttributesHeight,
    previewAttributes.length,
    previewAttributesHeight,
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    if (currentHeight.value === undefined) {
      if (expanded) {
        return {};
      }
      return {
        height: cardHeight,
      };
    }
    return {
      height: cardHeight + currentHeight.value,
    };
  }, [expanded, currentHeight]);

  const onPreviewAttrContentLayout = useCallback((event: LayoutChangeEvent) => {
    setPreviewAttributesHeight(event.nativeEvent.layout.height);
  }, []);

  const onFullAttrContentLayout = useCallback((event: LayoutChangeEvent) => {
    setFullAttributesHeight(event.nativeEvent.layout.height);
  }, []);

  const footerView: ReactElement | undefined = useMemo(() => {
    if (!footer) {
      return undefined;
    }
    if (React.isValidElement(footer)) {
      return footer;
    } else {
      const FooterComponent = footer as React.ComponentType<any>;
      return <FooterComponent />;
    }
  }, [footer]);

  const { header, ...cardProps } = card;

  const renderExtraAttributes =
    allAttributesRendered || (previewAttributesHeight !== undefined && currentHeight.value !== undefined);

  const ContainerComponent = animate ? Animated.View : View;
  return (
    <ContainerComponent
      style={[styles.detailsCard, { backgroundColor: colorScheme.white }, animate ? animatedStyle : undefined, style]}
      {...viewProps}
      testID={concatTestID(card.testID, expanded ? 'expanded' : 'collapsed')}>
      <CredentialCard
        {...cardProps}
        header={{ ...header, accessory: header.accessory ?? (cardProps.onHeaderPress ? CaretIcon : undefined) }}
        style={[styles.card, cardProps.style]}
      />
      {previewAttributes.length > 0 && (
        <View>
          <View style={styles.attributesWrapper}>
            <View onLayout={onPreviewAttrContentLayout} style={styles.previewAttributesWrapper}>
              {previewAttributes.map((attribute, idx) => (
                <CredentialAttributeItem
                  key={attribute.id}
                  last={!footerView && !extraAttributes.length && idx === previewAttributes.length - 1}
                  testID={concatTestID(testID, 'attribute', idx.toString())}
                  onImagePreview={onImagePreview}
                  onPress={onAttributeSelected}
                  {...attribute}
                />
              ))}
            </View>
            {!allAttributesRendered && extraAttributes.length > 0 && (
              <View style={styles.buttonWrapper}>
                <Button
                  onPress={() => setAllAttributesRendered(true)}
                  type={ButtonType.Secondary}
                  testID={concatTestID(testID, 'showAllAttributesButton')}
                  title={showAllButtonLabel!}
                />
              </View>
            )}
            {renderExtraAttributes && (
              <View
                style={[styles.allAttributesWrapper, footerView && styles.allAttributesWrapperWithFooter]}
                onLayout={onFullAttrContentLayout}>
                {extraAttributes.map((attribute, index, { length }) => (
                  <CredentialAttributeItem
                    key={attribute.id}
                    last={!footerView && index === length - 1}
                    testID={concatTestID(testID, 'attribute', index.toString())}
                    onImagePreview={onImagePreview}
                    onPress={onAttributeSelected}
                    {...attribute}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      )}
      {footerView ? <View style={styles.footer}>{footerView}</View> : null}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  allAttributesWrapper: {
    paddingBottom: 12,
    paddingHorizontal: 4,
    width: '100%',
  },
  allAttributesWrapperWithFooter: {
    paddingBottom: 0,
  },
  attributesWrapper: {
    paddingTop: 7,
    width: '100%',
  },
  buttonWrapper: {
    height: SEE_ALL_BUTTON_HEIGHT,
    paddingBottom: 12,
    paddingHorizontal: 4,
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
    paddingHorizontal: 4,
    width: '100%',
  },
});

export default CredentialDetailsCard;
