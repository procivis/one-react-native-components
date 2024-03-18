import React, { FunctionComponent, useCallback, useState } from 'react';
import {
  AccessibilityProps,
  ColorValue,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { ImageOrComponent, ImageOrComponentSource } from '../image';
import { Typography } from '../text';
import { theme, useAppColorScheme } from '../theme';

const defaultHeightToWidthRatio = 1.1136;
const defaultWidthToHeightRatio = 1 / defaultHeightToWidthRatio;

export interface CardInfo {
  title: string;
  value: { label: string } | { component: React.ReactNode };
  wide?: boolean;
}

export interface CardData {
  cardImage: ImageOrComponentSource;
  personalImage?: ImageSourcePropType;
  name?: string;
  nameColor?: ColorValue;
  cardNumber?: string;
  cardNumberColor?: ColorValue;
  statusBanner?: React.ReactNode;
  info?: CardInfo[];
  accessibilityLabel?: string;
}

export interface CardStyle extends ViewStyle {
  personalImageBorderColor?: ColorValue;
  nameColor?: ColorValue;
  numberColor?: ColorValue;
  dataBottomPadding?: number;
}

export interface CardProps extends CardData, AccessibilityProps {
  cardImageHeight?: number;
  detailLayout?: boolean;
  style?: StyleProp<CardStyle>;
}

const Card: FunctionComponent<CardProps> = ({
  cardImage,
  cardImageHeight,
  personalImage,
  name,
  nameColor,
  cardNumber,
  cardNumberColor,
  statusBanner,
  info,
  style,
  detailLayout,
  ...accessibilityProps
}) => {
  const colorScheme = useAppColorScheme();
  const [cardWidth, setCardWidth] = useState(0);

  const layoutHandler = useCallback((event) => {
    const { width } = event.nativeEvent.layout;
    setCardWidth(width);
  }, []);

  const cardStyle: ViewStyle = {
    ...styles.card,
    height: cardImageHeight ?? (cardWidth !== 0 ? cardWidth * defaultHeightToWidthRatio : undefined),
  };

  const personalImageSize = cardWidth * (detailLayout ? 0.4 : 0.3);
  const personalImageWrapperStyle: ViewStyle = {
    ...styles.personalImage,
    width: personalImageSize,
    height: personalImageSize,
    borderRadius: personalImageSize / 2,
    borderColor: StyleSheet.flatten(style).personalImageBorderColor ?? 'white',
    marginTop: detailLayout ? 0 : 16,
  };

  const personalImageStyle: ImageStyle = {
    width: personalImageSize - 6,
    height: personalImageSize - 6,
  };

  const nameStyle: TextStyle = {
    color: nameColor ?? StyleSheet.flatten(style).nameColor ?? '#333333',
  };

  const numberStyle: TextStyle = {
    ...styles.number,
    color: cardNumberColor ?? StyleSheet.flatten(style).numberColor ?? '#333333',
  };

  const dataStyle: ViewStyle = {
    ...styles.data,
    backgroundColor: colorScheme.white,
    paddingBottom: StyleSheet.flatten(style).dataBottomPadding ?? theme.padding,
  };

  const dataInfoTitleStyle: TextStyle = {
    color: colorScheme.textSecondary,
  };

  const dataInfoValueStyle: TextStyle = {
    color: colorScheme.text,
  };

  return (
    <View style={[styles.cardContainer, style]} onLayout={layoutHandler} {...accessibilityProps}>
      <View style={cardStyle}>
        <ImageOrComponent source={cardImage} style={styles.cardImage} />
        <View style={styles.centerContent}>
          {personalImage && personalImageSize ? (
            <View style={personalImageWrapperStyle}>
              <Image style={personalImageStyle} source={personalImage} resizeMode="cover" resizeMethod="resize" />
            </View>
          ) : undefined}
          {name ? (
            <Typography size="h2" style={nameStyle} align="center">
              {name}
            </Typography>
          ) : undefined}
        </View>
        {cardNumber ? <Typography style={numberStyle}>{cardNumber}</Typography> : undefined}
      </View>
      <View style={dataStyle}>
        {statusBanner ? <View style={styles.statusBanner}>{statusBanner}</View> : null}
        {info?.map((item, i) => {
          const accessibilityLabel = 'label' in item.value ? `${item.title}: ${item.value.label}` : undefined;
          return (
            <View
              accessible={'label' in item.value}
              accessibilityLabel={accessibilityLabel}
              style={[styles.dataItem, item.wide ? styles.dataItemWide : undefined]}
              key={i}>
              <Typography
                size="sml"
                accessible={'label' in item.value}
                style={dataInfoTitleStyle}
                numberOfLines={detailLayout ? undefined : 1}
                ellipsizeMode="tail">
                {item.title}
              </Typography>
              {'label' in item.value ? (
                <Typography
                  size="sml"
                  style={dataInfoValueStyle}
                  numberOfLines={detailLayout ? undefined : 1}
                  ellipsizeMode="tail">
                  {item.value.label}
                </Typography>
              ) : (
                item.value.component
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    aspectRatio: defaultWidthToHeightRatio,
    justifyContent: 'center',
    width: '100%',
  },
  cardContainer: {
    borderRadius: 20,
    height: 'auto',
    overflow: 'hidden',
  },
  cardImage: {
    height: '100%',
    width: '100%',
  },
  centerContent: {
    alignItems: 'center',
    position: 'absolute',
  },
  data: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.padding / 2,
    paddingTop: theme.grid,
    width: '100%',
  },
  dataItem: {
    marginTop: 6,
    paddingHorizontal: theme.padding / 2,
    width: '50%',
  },
  dataItemWide: {
    width: '100%',
  },
  number: {
    bottom: 13,
    position: 'absolute',
    right: 15,
  },
  personalImage: {
    borderWidth: 3,
    overflow: 'hidden',
  },
  statusBanner: {
    width: '100%',
  },
});

export default Card;
