import React, { FunctionComponent, useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import Avatar, { AvatarProps } from './avatar';

export type EntityClusterProps = ViewProps & {
  avatar?: AvatarProps;
  entityName: string;
  subline?: string;
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=426-25595&mode=design&t=YI1oD2BfBie5HcvJ-0
const EntityCluster: FunctionComponent<EntityClusterProps> = ({ avatar, entityName, subline, style, ...viewProps }) => {
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
    <View style={[styles.entity, style]} {...viewProps}>
      <Avatar {...avatarProps} />
      <View style={styles.labels}>
        <Typography color={colorScheme.text} numberOfLines={2} preset="m">
          {entityName}
        </Typography>
        {subline && (
          <View>
            <Typography color={colorScheme.text} preset="xs">
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
  labels: {
    flex: 1,
    marginLeft: 12,
  },
});

export default EntityCluster;
