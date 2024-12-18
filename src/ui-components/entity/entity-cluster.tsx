import React, { FunctionComponent, useMemo } from 'react';
import { Platform, StyleSheet, View, ViewProps } from 'react-native';

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
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();

  const avatarProps = useMemo<AvatarProps>(() => {
    const initials = entityName.split(' ', 3).map((word: string) => word[0]);
    const placeholderText = initials.length > 0 ? initials.join('') : '';
    return {
      ...avatar,
      placeholderText: avatar?.placeholderText ?? placeholderText,
    };
  }, [avatar, entityName]);

  return (
    <View style={[styles.entity, style]} testID={testID} {...viewProps}>
      <Avatar {...avatarProps} />
      <View style={styles.labels}>
        <Typography
          testID={concatTestID(testID, 'entityName')}
          color={textColor ?? colorScheme.text}
          numberOfLines={2}
          preset="m"
          style={styles.entityName}>
          {entityName}
        </Typography>
        {subline && (
          <View>
            <Typography testID={concatTestID(testID, 'subline')} color={sublineColor ?? colorScheme.text} preset="xs">
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
});

export default EntityCluster;
