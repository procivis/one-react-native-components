import React, { ComponentType, FC, ReactElement, useCallback, useMemo } from 'react';
import { ColorValue, Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { concatTestID } from '../../../utils/testID';
import { TouchableOpacity } from '../../accessibility/accessibilityHistoryWrappers';
import { Badge } from '../../badge';
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
  count?: number;
  credentialId?: string;
  extra?: ComponentType<any> | ReactElement;
  header: CredentialHeaderProps;
  notice?: CredentialCardNotice;
  onCardPress?: (credentialId?: string) => void;
  onHeaderPress?: (credentialId?: string) => void;
  style?: StyleProp<ViewStyle>;
  tags?: string[];
  testID?: string;
  width: number;
};

const CredentialCard: FC<CredentialCardProps> = ({
  cardCarouselImages = [],
  cardImage,
  color = '#5A69F3',
  count,
  credentialId,
  extra,
  header,
  notice,
  onCardPress,
  onHeaderPress,
  style,
  tags,
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
  
  const extraView: ReactElement | undefined = useMemo(() => {
    if (!extra) {
      return undefined;
    }
    if (React.isValidElement(extra)) {
      return extra;
    } else {
      const ExtraComponent = extra as React.ComponentType<any>;
      return <ExtraComponent />;
    }
  }, [extra]);

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
      <View style={styles.accessories}>
        {extraView}
        {count || tags?.length ? <View style={styles.tagsAndCount}>
          <View style={styles.tags}>
            {tags?.map((t) => (
              <Badge key={t} type='rect' value={t} />
            ))}
          </View>
          {count ? <Badge type="pill" value={count.toString()} /> : undefined}
        </View> : undefined}
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
    </View>
  );
};

const styles = StyleSheet.create({
  accessories: {
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
  },
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
    columnGap: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 6,
    paddingHorizontal: 12,
    paddingTop: 2,
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
  tags: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 4,
    justifyContent: 'flex-start',
  },
  tagsAndCount: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
});

export default CredentialCard;
