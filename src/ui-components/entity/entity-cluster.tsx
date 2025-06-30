import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { Platform, StyleSheet, View, ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { LoaderView, LoaderViewState } from '../../ui-components/loader';
import { concatTestID } from '../../utils';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import Avatar, { AvatarProps } from './avatar';

export type EntityClusterProps = ViewProps & {
  avatar?: AvatarProps;
  entityName: string;
  subline?: string;
  textColor?: string;
  sublineColor?: string;
  testID?: string;
  isLoading?: boolean;
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=426-25595&mode=design&t=YI1oD2BfBie5HcvJ-0
const EntityCluster: FunctionComponent<EntityClusterProps> = ({
  avatar,
  entityName,
  subline,
  textColor,
  style,
  sublineColor,
  testID,
  isLoading,
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();
  
  const opacity = useSharedValue<number>(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    opacity.value = withRepeat(
      withTiming(0.3, { duration: 1000 }),
      0,
      true
    );
  }, [opacity, isLoading]);

  const avatarProps = useMemo<AvatarProps>(() => {
    if (isLoading) {
      return {
        avatar: {
          component: 
            <View style={[styles.loaderWrapper, { backgroundColor: colorScheme.grayDark }]}>
              <View style={styles.loader}>
                <LoaderView animate={true} state={LoaderViewState.InProgress} />
              </View>
            </View>
        }
      }
    }
    const initials = entityName.split(' ', 3).map((word: string) => word[0]);
    const placeholderText = initials.length > 0 ? initials.join('') : '';
    return {
      ...avatar,
      placeholderText: avatar?.placeholderText ?? placeholderText,
    };
  }, [avatar, entityName, colorScheme.grayDark, isLoading]);

  return (
    <View style={[styles.entity, style]} testID={testID} {...viewProps}>
      <Avatar testID={concatTestID(testID, 'avatar')} {...avatarProps} />
      <View style={styles.labels}>
        {isLoading ? (
          <Animated.View style={[{ backgroundColor: colorScheme.grayDark }, animatedStyle]}>
            <Typography color={colorScheme.grayDark} />
          </Animated.View>
        ) : (
          <Typography
            testID={concatTestID(testID, 'entityName')}
            color={textColor ?? colorScheme.text}
            numberOfLines={1}
            preset="m"
            style={styles.entityName}>
            {!isLoading ? entityName : undefined}
          </Typography>
        )}
        {subline && (
          <View>
            <Typography
              testID={concatTestID(testID, 'subline')}
              color={sublineColor ?? colorScheme.text}
              numberOfLines={1}
              preset="xs">
              {subline}
            </Typography>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  entity: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  entityName: {
    letterSpacing: Platform.OS === 'ios' ? -0.2 : -0.3, // -0.2 breaks layout on Android
  },
  labels: {
    flex: 1,
    marginLeft: 12,
  },
  loader: {
    transform: [{scale: 0.5}],
  },
  loaderWrapper: {
    height: 72,
    paddingLeft: 3,
    paddingTop: 4,
    width: 72,
  }
});

export default EntityCluster;
