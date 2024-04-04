import React, { ComponentType, FunctionComponent, ReactElement, useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import ImageOrComponent, { ImageOrComponentSource } from '../image/image-or-component';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';

export type AvatarProps = ViewProps & {
  avatar?: ImageOrComponentSource;
  placeholderText?: string;
  statusIcon?: ComponentType<any> | ReactElement;
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=426-25581&mode=design&t=YI1oD2BfBie5HcvJ-0
const Avatar: FunctionComponent<AvatarProps> = ({ avatar, placeholderText, statusIcon, style, ...viewProps }) => {
  const colorScheme = useAppColorScheme();

  const statusIconView: React.ReactElement | undefined = useMemo(() => {
    if (!statusIcon) {
      return undefined;
    }
    if (React.isValidElement(statusIcon)) {
      return statusIcon;
    } else if (statusIcon) {
      const StatusIconComponent = statusIcon as React.ComponentType<any>;
      return <StatusIconComponent />;
    }
  }, [statusIcon]);

  const imageSource = useMemo<ImageOrComponentSource>(() => {
    if (avatar) {
      return avatar;
    }

    return {
      component: (
        <View style={[styles.avatarPlaceholder, { backgroundColor: colorScheme.accent }]}>
          <Typography color={colorScheme.accentText} style={styles.avatarPlaceholderText}>
            {placeholderText}
          </Typography>
        </View>
      ),
    };
  }, [colorScheme, avatar, placeholderText]);

  return (
    <View accessibilityElementsHidden={true} style={[styles.avatar, style]} {...viewProps}>
      <View style={styles.imageWrapper}>
        <ImageOrComponent source={imageSource} style={styles.image} />
      </View>
      {statusIconView && <View style={styles.statusIcon}>{statusIconView}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 72,
    width: 72,
  },
  avatarPlaceholder: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    textTransform: 'uppercase',
  },
  image: {
    backgroundColor: 'orange',
    height: '100%',
    width: '100%',
  },
  imageWrapper: {
    borderRadius: 36,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  statusIcon: {
    bottom: 4,
    position: 'absolute',
    right: 4,
  },
});

export default Avatar;
