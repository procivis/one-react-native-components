import React, { ComponentType, FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { ImageSourcePropType, LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { concatTestID } from '../../../utils/testID';
import { Button, ButtonType } from '../../buttons/button';
import { DownIcon, UpIcon } from '../../icons/credential';
import { useAppColorScheme } from '../../theme/color-scheme-context';
import CredentialAttributeItem, { CredentialAttribute } from '../credential-attribute-item';
import CredentialCard, { CredentialCardProps, CredentialCardRatio } from './credential-card';

export type CredentialDetailsCardProps = ViewProps & {
  animate?: boolean;
  attributes: CredentialAttribute[] | false;
  attributesExtra?: ComponentType<any> | ReactElement;
  card: CredentialCardProps;
  expanded?: boolean;
  footer?: ComponentType<any> | ReactElement;
  lessLabel?: string;
  moreLabel?: string;
  onAttributeSelected?: (id: string, selected: boolean) => void;
  onImagePreview?: (name: string, image: ImageSourcePropType) => void;
  showAllButtonLabel?: string;
  showLessButtonLabel?: string;
};

const PREVIEW_ATTRIBUTES_COUNT = 3;
const SEE_ALL_BUTTON_HEIGHT = 78;

const CredentialDetailsCard: FC<CredentialDetailsCardProps> = ({
  animate = true,
  attributes,
  attributesExtra,
  card,
  expanded,
  footer,
  onImagePreview,
  onAttributeSelected,
  style,
  showAllButtonLabel = 'Show all',
  showLessButtonLabel = 'Show less',
  moreLabel = 'More',
  lessLabel = 'Less',
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
  const [animatedHeightSet, setAnimatedHeightSet] = useState(false);
  const previewAttributes = attributes ? attributes.slice(0, PREVIEW_ATTRIBUTES_COUNT) : [];
  const extraAttributes = useMemo(() => (attributes ? attributes.slice(PREVIEW_ATTRIBUTES_COUNT) : []), [attributes]);
  const showSeeAllButton = extraAttributes.length > 0;
  const isExpanded = allAttributesRendered;

  useEffect(() => {
    if (extraAttributes.length === 0) {
      const viewStyle = StyleSheet.flatten([
        styles.allAttributesWrapper,
        footer && styles.allAttributesWrapperWithFooter,
      ]);
      const padding = viewStyle?.paddingBottom;
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

    const buttonViewHeight = showSeeAllButton ? SEE_ALL_BUTTON_HEIGHT : 0;
    const additionalAttributesHeight = fullAttributesHeight ?? 0;
    const additionalHeight = allAttributesRendered ? additionalAttributesHeight + buttonViewHeight : buttonViewHeight;
    const fullHeight = previewAttributesHeight + additionalHeight;

    setAnimatedHeightSet(true);
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
    showSeeAllButton,
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

  const attributesExtraView: ReactElement | undefined = useMemo(() => {
    if (!attributesExtra) {
      return undefined;
    }
    if (React.isValidElement(attributesExtra)) {
      return attributesExtra;
    } else {
      const AttributesExtraComponent = attributesExtra as React.ComponentType<any>;
      return <AttributesExtraComponent />;
    }
  }, [attributesExtra]);

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

  const renderExtraAttributes = allAttributesRendered || (previewAttributesHeight !== undefined && animatedHeightSet);

  return (
    <Animated.View
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
            {attributesExtraView}

            <View onLayout={onPreviewAttrContentLayout} style={styles.previewAttributesWrapper}>
              {previewAttributes.map((attribute, idx) => (
                <CredentialAttributeItem
                  isExpanded={isExpanded}
                  key={attribute.id}
                  last={!footerView && !showSeeAllButton && idx === previewAttributes.length - 1}
                  lessLabel={lessLabel}
                  moreLabel={moreLabel}
                  onImagePreview={onImagePreview}
                  onPress={onAttributeSelected}
                  testID={concatTestID(testID, 'attribute', idx.toString())}
                  {...attribute}
                />
              ))}
            </View>

            {renderExtraAttributes && (
              <View
                onLayout={onFullAttrContentLayout}
                style={[
                  styles.allAttributesWrapper,
                  footerView && styles.allAttributesWrapperWithFooter,
                  showSeeAllButton && styles.allAttributesWrapperWithButton,
                  !allAttributesRendered && styles.hidden,
                ]}>
                {extraAttributes.map((attribute, index, { length }) => (
                  <CredentialAttributeItem
                    isExpanded={isExpanded}
                    key={attribute.id}
                    last={!footerView && !showSeeAllButton && index === length - 1}
                    lessLabel={lessLabel}
                    moreLabel={moreLabel}
                    onImagePreview={onImagePreview}
                    onPress={onAttributeSelected}
                    testID={concatTestID(testID, 'attribute', index.toString())}
                    {...attribute}
                  />
                ))}
              </View>
            )}

            {showSeeAllButton && (
              <View style={styles.buttonWrapper}>
                <Button
                  onPress={() => setAllAttributesRendered((prev) => !prev)}
                  testID={concatTestID(testID, 'showAllAttributesButton')}
                  title={isExpanded ? showLessButtonLabel : showAllButtonLabel}
                  type={ButtonType.Secondary}
                />
              </View>
            )}
          </View>
        </View>
      )}
      {footerView ? <View style={styles.footer}>{footerView}</View> : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  allAttributesWrapper: {
    paddingBottom: 12,
    paddingHorizontal: 4,
    width: '100%',
  },
  allAttributesWrapperWithButton: {
    paddingBottom: 0,
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
    justifyContent: 'flex-end',
    paddingBottom: 12,
    paddingHorizontal: 4,
    paddingTop: 0,
    width: '100%',
  },
  card: {
    borderRadius: 0,
    borderWidth: 0,
  },
  detailsCard: {
    borderRadius: 10,
    borderWidth: 0,
    overflow: 'hidden',
  },
  footer: {
    marginTop: 12,
  },
  hidden: {
    display: 'none',
  },
  previewAttributesWrapper: {
    paddingHorizontal: 4,
    width: '100%',
  },
});

export default CredentialDetailsCard;
