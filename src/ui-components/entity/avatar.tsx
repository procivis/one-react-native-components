import React, { ComponentType, FunctionComponent, ReactElement, useMemo } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { concatTestID } from '../../utils';
import ImageOrComponent, { ImageOrComponentSource } from '../image/image-or-component';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';

export type AvatarProps = ViewProps & {
  avatar?: ImageOrComponentSource;
  placeholderText?: string;
  statusIcon?: ComponentType<any> | ReactElement;
  testID?: string;
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=426-25581&mode=design&t=YI1oD2BfBie5HcvJ-0
const Avatar: FunctionComponent<AvatarProps> = ({
  avatar,
  placeholderText,
  statusIcon,
  style,
  testID,
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();

  const statusIconView: React.ReactElement | undefined = useMemo(() => {
    if (!statusIcon) {
      return undefined;
    }
    if (React.isValidElement(statusIcon)) {
      return statusIcon;
    } else {
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

  const { borderRadius, ...avatarStyle } = StyleSheet.flatten([styles.avatar, style]) as ViewStyle;
  return (
    <View accessibilityElementsHidden={true} style={avatarStyle} testID={testID} {...viewProps}>
      <View style={[styles.imageWrapper, borderRadius ? { borderRadius } : undefined]}>
        <ImageOrComponent source={imageSource} style={styles.image} testID={concatTestID(testID, 'logo')} />
      </View>
      {statusIconView && (
        <View style={styles.statusIcon} testID={concatTestID(testID, 'statusIcon')}>
          {statusIconView}
        </View>
      )}
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
    height: '100%',
    width: '100%',
  },
  imageWrapper: {
    borderRadius: 36,
    borderWidth: 0,
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
