import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonProps } from '../buttons/button';
import NavigationHeader, { NavigationHeaderProps } from '../header/navigation-header';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import LoaderView, { LoaderViewProps } from './loader';

export type LoadingResultScreenProps = ViewProps & {
  button?: ButtonProps;
  header?: NavigationHeaderProps;
  loader: LoaderViewProps & {
    label?: string;
  };
  secondaryButton?: ButtonProps;
  tertiaryButton?: ButtonProps;
};

const LoadingResultScreen: FC<LoadingResultScreenProps> = ({
  button,
  header,
  loader: { label, ...loaderProps },
  secondaryButton: button2,
  style,
  tertiaryButton: button3,
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();
  return (
    <View style={[styles.container, { backgroundColor: colorScheme.background }, style]} {...viewProps}>
      <View style={styles.headerWrapper}>
        <NavigationHeader {...header} />
      </View>
      <View style={styles.loaderWrapper}>
        <LoaderView {...loaderProps} />
        <Typography color={colorScheme.text} preset="regular" style={styles.label}>
          {label}
        </Typography>
      </View>
      <SafeAreaView edges={['bottom']} style={styles.buttonWrapper}>
        {button && <Button {...button}>{button.title}</Button>}
        {button2 && <Button {...button2}>{button2.title}</Button>}
        {button3 && <Button {...button3}>{button3.title}</Button>}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    gap: 12,
    height: 274,
    justifyContent: 'flex-end',
    padding: 12,
  },
  container: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerWrapper: {
    height: 215,
  },
  label: {
    marginTop: 20,
  },
  loaderWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 108,
    justifyContent: 'space-between',
  },
});

export default LoadingResultScreen;
