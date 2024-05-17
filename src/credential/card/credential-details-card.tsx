import React, { ComponentType, FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { ImageSourcePropType, LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Button, ButtonType } from '../../buttons';
import { DownIcon, UpIcon } from '../../icons/credential';
import { useAppColorScheme } from '../../theme/color-scheme-context';
import { concatTestID } from '../../utils/testID';
import CredentialAttributeItem, { CredentialAttribute } from '../credential-attribute-item';
import CredentialCard, { CredentialCardProps } from './credential-card';

export type CredentialDetailsCardProps = ViewProps & {
  attributes: CredentialAttribute[] | false;
  card: CredentialCardProps;
  expanded?: boolean;
  footer?: ComponentType<any> | ReactElement;
  onImagePreview?: (name: string, image: ImageSourcePropType) => void;
  onAttributeSelected?: (id: string, selected: boolean) => void;
  showAllButtonLabel?: string;
};

const PREVIEW_ATTRIBUTES_COUNT = 3;

const CredentialDetailsCard: FC<CredentialDetailsCardProps> = ({
  attributes,
  card,
  expanded,
  footer,
  onImagePreview,
  onAttributeSelected,
  style,
  testID,
  showAllButtonLabel,
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();
  const [previewAttributesHeight, setPreviewAttributesHeight] = useState<number>();
  const [fullAttributesHeight, setFullAttributesHeight] = useState<number>();
  const [buttonViewHeight, setButtonViewHeight] = useState<number>();
  const [footerViewHeight, setFooterViewHeight] = useState<number>();

  const [allAttributesRendered, setAllAttributesRendered] = useState<boolean>(
    (attributes && attributes.length <= PREVIEW_ATTRIBUTES_COUNT) || !showAllButtonLabel,
  );

  const CaretIcon = expanded ? UpIcon : DownIcon;

  const currentHeight = useSharedValue<number | undefined>(undefined);

  const previewAttributes = attributes ? attributes.slice(0, PREVIEW_ATTRIBUTES_COUNT) : [];
  const extraAttributes = useMemo(() => (attributes ? attributes.slice(PREVIEW_ATTRIBUTES_COUNT) : []), [attributes]);

  useEffect(() => {
    if (!extraAttributes || allAttributesRendered) {
      setButtonViewHeight(0);
    }
  }, [extraAttributes, allAttributesRendered]);

  useEffect(() => {
    if (!footer) {
      setFooterViewHeight(0);
    }
  }, [footer]);

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
    if (previewAttributesHeight === undefined || buttonViewHeight === undefined || footerViewHeight === undefined) {
      return;
    }
    if (allAttributesRendered && fullAttributesHeight === undefined) {
      return;
    }

    const additionalAttributesHeight = fullAttributesHeight ?? 0;
    const additionalHeight = allAttributesRendered ? additionalAttributesHeight + footerViewHeight : buttonViewHeight;
    const newHeight = expanded ? previewAttributesHeight + additionalHeight : 0;

    if (currentHeight.value === undefined) {
      currentHeight.value = newHeight;
      return;
    }

    const duration = !expanded
      ? 250
      : allAttributesRendered
      ? previewAttributes.length * 50
      : extraAttributes.length * 50;
    currentHeight.value = withTiming(newHeight, {
      duration,
    });
  }, [
    allAttributesRendered,
    buttonViewHeight,
    currentHeight,
    expanded,
    extraAttributes.length,
    fullAttributesHeight,
    previewAttributes.length,
    previewAttributesHeight,
    footerViewHeight,
  ]);

  const credentialAttributesStyle = useAnimatedStyle(() => {
    if (currentHeight.value === undefined) {
      if (expanded) {
        return {};
      }
      return {
        height: 0,
      };
    }
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

  const onFooterViewLayout = useCallback((event: LayoutChangeEvent) => {
    setFooterViewHeight(event.nativeEvent.layout.height + styles.footer.marginTop);
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

  const renderExtraAttributes =
    allAttributesRendered || (previewAttributesHeight !== undefined && currentHeight.value !== undefined);
  return (
    <View style={[styles.detailsCard, { backgroundColor: colorScheme.white }, style]} testID={testID} {...viewProps}>
      <CredentialCard
        {...cardProps}
        header={{ ...header, accessory: header.accessory ?? CaretIcon }}
        style={[styles.card, cardProps.style]}
        testID={concatTestID(testID, 'card')}
      />
      {previewAttributes.length > 0 && (
        <Animated.View style={[styles.attributesAnimatedWrapper, credentialAttributesStyle]}>
          <View style={styles.attributesWrapper}>
            <View onLayout={onPreviewAttrContentLayout} style={styles.previewAttributesWrapper}>
              {previewAttributes.map((attribute, idx) => (
                <CredentialAttributeItem
                  key={attribute.id}
                  last={!footerView && !extraAttributes.length && idx === previewAttributes.length - 1}
                  testID={concatTestID(testID, 'attribute', attribute.id)}
                  onImagePreview={onImagePreview}
                  onPress={onAttributeSelected}
                  {...attribute}
                />
              ))}
            </View>
            {!allAttributesRendered && extraAttributes.length > 0 && (
              <View style={styles.allAttributesWrapper} onLayout={onButtonViewLayout}>
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
                    testID={concatTestID(testID, 'attribute', attribute.id)}
                    onImagePreview={onImagePreview}
                    onPress={onAttributeSelected}
                    {...attribute}
                  />
                ))}
              </View>
            )}
            {(footerView && (
              <View onLayout={onFooterViewLayout} style={styles.footer}>
                {footerView}
              </View>
            )) ??
              null}
          </View>
        </Animated.View>
      )}
    </View>
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
  attributesAnimatedWrapper: {
    overflow: 'hidden',
    paddingTop: 7,
  },
  attributesWrapper: {
    flex: 1,
    flexGrow: 1,
    overflow: 'visible',
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
