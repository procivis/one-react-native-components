import React, { FC, useCallback, useMemo } from 'react';
import { ColorValue, Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { concatTestID } from '../../../utils/testID';
import { TouchableOpacity } from '../../accessibility/accessibilityHistoryWrappers';
import BlurView from '../../blur/blur-view';
import ImageOrComponent, { ImageOrComponentSource } from '../../image/image-or-component';
import Typography from '../../text/typography';
import { useAppColorScheme } from '../../theme/color-scheme-context';
import CredentialHeader, { CredentialHeaderProps } from './credential-header';
import CarouselComponent, { CarouselImage } from './credential-image-carousel';

export const CredentialCardShadow: Pick<ViewStyle, 'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius'> =
  {
    shadowColor: '#10274226',
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 7,
  };

export const CredentialCardRatio = 18 / 11;

export type CredentialCardNotice = {
  noticeIcon?: React.ComponentType<any> | React.ReactElement;
  text: string;
};

export type CredentialCardProps = {
  cardCarouselImages?: CarouselImage[];
  cardImage?: ImageOrComponentSource;
  color?: ColorValue;
  credentialId?: string;
  header: CredentialHeaderProps;
  notice?: CredentialCardNotice;
  onCardPress?: (credentialId?: string) => void;
  onHeaderPress?: (credentialId?: string) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  width: number;
};

const CredentialCard: FC<CredentialCardProps> = ({
  cardCarouselImages = [],
  cardImage,
  color = '#5A69F3',
  credentialId,
  header,
  notice,
  onCardPress,
  onHeaderPress,
  style,
  testID,
  width,
}) => {
  const colorScheme = useAppColorScheme();
  const cardSize = {
    height: Math.ceil(width / CredentialCardRatio),
    width,
  };

  const headerPressHandler = useCallback(() => {
    onHeaderPress?.(credentialId);
  }, [credentialId, onHeaderPress]);

  const cardPressHandler = useCallback(() => {
    onCardPress?.(credentialId);
  }, [credentialId, onCardPress]);

  const noticeIconView: React.ReactElement | undefined = useMemo(() => {
    if (!notice?.noticeIcon) {
      return undefined;
    }
    if (React.isValidElement(notice.noticeIcon)) {
      return notice.noticeIcon;
    } else {
      const NoticeIconComponent = notice.noticeIcon as React.ComponentType<any>;
      return <NoticeIconComponent />;
    }
  }, [notice?.noticeIcon]);

  const shouldShowCarousel = cardSize?.width && cardSize.height;
  return (
    <View style={[styles.card, cardSize, style]} testID={testID}>
      {cardImage ? (
        'imageSource' in cardImage ? (
          <View style={cardSize}>
            <Image source={cardImage.imageSource} style={styles.image} testID={concatTestID(testID, 'imageSource')} />
          </View>
        ) : (
          <ImageOrComponent source={cardImage} style={cardSize} testID={concatTestID(testID, 'cardImage')} />
        )
      ) : (
        <View
          style={[cardSize, { backgroundColor: color }]}
          testID={concatTestID(testID, 'cardBackgroundColor', String(color))}
        />
      )}
      {onCardPress && <TouchableOpacity onPress={cardPressHandler} style={styles.cardButton} />}
      {shouldShowCarousel ? (
        <CarouselComponent
          carouselSize={{
            height: cardSize.height - 60,
            width: cardSize.width,
          }}
          imagesToRender={cardCarouselImages ?? []}
          style={styles.carousel}
          testID={concatTestID(testID, 'carousel')}
        />
      ) : null}
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={!onHeaderPress}
        onPress={headerPressHandler}
        style={styles.header}>
        <CredentialHeader {...header} color={header.color ?? color} testID={concatTestID(testID, 'header')} />
      </TouchableOpacity>
      {notice && (
        <BlurView blurStyle="soft" style={styles.notice} testID={concatTestID(testID, 'notice')}>
          {noticeIconView && <View style={styles.noticeIcon}>{noticeIconView}</View>}
          <View style={styles.noticeTextWrapper}>
            <Typography
              color={colorScheme.text}
              preset="xs/line-height-small"
              style={styles.noticeText}
              testID={concatTestID(testID, 'notice.text')}>
              {notice.text}
            </Typography>
          </View>
        </BlurView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 0,
    overflow: 'hidden',
  },
  cardButton: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  carousel: {
    marginTop: 60,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  notice: {
    bottom: 0,
    columnGap: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 6,
    paddingHorizontal: 12,
    paddingTop: 2,
    position: 'absolute',
    width: '100%',
  },
  noticeIcon: {
    marginTop: 4,
  },
  noticeText: {
    marginVertical: 5,
  },
  noticeTextWrapper: {
    flex: 1,
  },
});

export default CredentialCard;
