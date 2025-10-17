import React, { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { Typography,useAppColorScheme } from '../../ui-components';

export type ShareCredentialCardNoticeProps = {
  testID: string;
  text: string;
};

export const ShareCredentialCardNotice: FC<PropsWithChildren<ShareCredentialCardNoticeProps>> = ({
  children,
  testID,
  text,
}) => {
  const colorScheme = useAppColorScheme();
  return (
    <View style={[styles.notice, { backgroundColor: colorScheme.background }]} testID={testID}>
      <Typography align="center" color={colorScheme.text} preset="s/line-height-capped">
        {text}
      </Typography>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  notice: {
    marginBottom: 22,
    marginHorizontal: 12,
    padding: 12,
  },
});
