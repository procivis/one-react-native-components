import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '../buttons';
import { CredentialWarningIcon } from '../icons';
import { ScrollViewScreen } from '../screens';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export interface ErrorScreenButton {
  testID?: string;
  label: string;
  disabled?: boolean;
  onPress?: () => void;
}

export interface ErrorScreenProps {
  testID?: string;
  title: string;
  subtitle: string;
  button: ErrorScreenButton;
}

const ErrorScreen: FunctionComponent<ErrorScreenProps> = ({ testID, title, subtitle, button }) => {
  const colorScheme = useAppColorScheme();

  return (
    <ScrollViewScreen
      header={{
        static: true,
        title: title,
      }}
      modalPresentation
      scrollView={{
        testID,
      }}>
      <View style={[styles.wrapper, { backgroundColor: colorScheme.background }]}>
        <View style={styles.warning}>
          <CredentialWarningIcon height={42} width={42} />
          <Typography color={colorScheme.text} preset="regular" style={styles.message}>
            {subtitle}
          </Typography>
        </View>

        {button ? (
          <Button disabled={button.disabled} onPress={button.onPress} testID={button.testID} title={button.label} />
        ) : undefined}
      </View>
    </ScrollViewScreen>
  );
};

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
  },
  warning: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingHorizontal: 16,
  },
});

export default ErrorScreen;
