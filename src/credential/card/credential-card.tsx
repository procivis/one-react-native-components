import React, { FC, useCallback, useMemo } from 'react';
import { ColorValue, Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from '../../accessibility/accessibilityHistoryWrappers';
import BlurView from '../../blur/blur-view';
import ImageOrComponent, { ImageOrComponentSource } from '../../image/image-or-component';
import Typography from '../../text/typography';
import { useAppColorScheme } from '../../theme/color-scheme-context';
import { concatTestID } from '../../utils/testID';
import CredentialHeader, { CredentialHeaderProps } from './credential-header';

export const CredentialCardRatio = 18 / 11;

export type CredentialCardProps = {
  cardImage?: ImageOrComponentSource;
  color?: ColorValue;
  credentialId?: string;
  header: Omit<CredentialHeaderProps, 'color'>;
  notice?: string;
  noticeIcon?: React.ComponentType<any> | React.ReactElement;
  onHeaderPress?: (credentialId?: string) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const CredentialCard: FC<CredentialCardProps> = ({
  cardImage,
  color = '#5A69F3',
  credentialId,
  header,
  notice,
  noticeIcon,
  onHeaderPress,
  style,
  testID,
}) => {
  const colorScheme = useAppColorScheme();

  const headerPressHandler = useCallback(() => {
    onHeaderPress?.(credentialId);
  }, [credentialId, onHeaderPress]);

  const noticeIconView: React.ReactElement | undefined = useMemo(() => {
    if (!noticeIcon) {
      return undefined;
    }
    if (React.isValidElement(noticeIcon)) {
      return noticeIcon;
    } else {
      const NoticeIconComponent = noticeIcon as React.ComponentType<any>;
      return <NoticeIconComponent />;
    }
  }, [noticeIcon]);

  return (
    <View style={[styles.card, style]} testID={testID}>
      {cardImage ? (
        'imageSource' in cardImage ? (
          <View style={styles.cardImage}>
            <Image source={cardImage.imageSource} style={styles.image} />
          </View>
        ) : (
          <ImageOrComponent source={cardImage} style={styles.cardImage} />
        )
      ) : (
        <View style={[styles.cardImage, { backgroundColor: color }]} />
      )}
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={!onHeaderPress}
        onPress={headerPressHandler}
        style={styles.header}>
        <CredentialHeader {...header} color={color} testID={concatTestID(testID, 'header')} />
      </TouchableOpacity>
      {notice && (
        <BlurView blurStyle="soft" style={[styles.notice, style]} testID={testID}>
          {noticeIconView}
          <Typography color={colorScheme.text} preset="xs/line-height-small" style={styles.noticeText}>
            {notice}
          </Typography>
        </BlurView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    aspectRatio: CredentialCardRatio,
    width: '100%',
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
    columnGap: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: 'absolute',
    width: '100%',
  },
  noticeText: {
    marginVertical: 5,
  },
});

export default CredentialCard;