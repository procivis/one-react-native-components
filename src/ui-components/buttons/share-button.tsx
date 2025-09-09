import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { concatTestID } from '../../utils';
import { TouchableHighlight } from '../accessibility';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { LinkIcon } from '../icons';

export type ShareButtonProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  title?: string;
  testID?: string;
};

const ShareButton: FC<ShareButtonProps> = ({
  onPress,
  style,
  title,
  testID,
}) => {
  const colorScheme = useAppColorScheme();

  return (
    <TouchableHighlight onPress={onPress} style={[styles.button, style]} testID={testID}>
      <View style={[styles.container, { backgroundColor: colorScheme.white }]}>
        <LinkIcon color={colorScheme.text} />
        {title && (
          <Typography testID={concatTestID(testID, 'title')} color={colorScheme.text} preset="s">
            {title}
          </Typography>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    height: 32,
    paddingLeft: 4,
    paddingRight: 6,
    paddingVertical: 5,
  },
});

export default ShareButton;
