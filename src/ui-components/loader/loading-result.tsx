import React, { FC } from 'react';
import { Platform, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, ButtonProps } from '../buttons/button';
import NavigationHeader, { NavigationHeaderProps } from '../header/navigation-header';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import LoaderView, { LoaderViewProps } from './loader';
import ShareButton, { ShareButtonProps } from '../buttons/share-button';

export type LoadingResultScreenProps = ViewProps & {
  button?: ButtonProps;
  header?: NavigationHeaderProps;
  loader: LoaderViewProps & {
    label?: string;
  };
  secondaryButton?: ButtonProps;
  shareButton?: ShareButtonProps;
  tertiaryButton?: ButtonProps;
};

const LoadingResultScreen: FC<LoadingResultScreenProps> = ({
  button,
  header,
  loader: { label, ...loaderProps },
  secondaryButton: button2,
  shareButton,
  style,
  tertiaryButton: button3,
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();
  const { top, bottom } = useSafeAreaInsets();

  let headerPaddingStyle: ViewStyle | undefined;
  if (Platform.OS === 'android') {
    headerPaddingStyle = {
      paddingTop: top,
    };
  } else if (!header?.modalHandleVisible && Platform.OS === 'ios') {
    headerPaddingStyle = styles.modalHeaderWithoutHandle;
  }

  let buttonsWrapperMarginStyle: ViewStyle = {
    marginBottom: bottom,
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.background }, style]} {...viewProps}>
      <View style={[styles.headerWrapper, headerPaddingStyle]}>
        <NavigationHeader {...header} />
      </View>
      <View style={styles.loaderWrapper}>
        <LoaderView {...loaderProps} />
        <Typography align="center" color={colorScheme.text} preset="regular" style={styles.label}>
          {label}
        </Typography>
      </View>
      <View style={[styles.buttonWrapper, buttonsWrapperMarginStyle]}>
        {shareButton && <ShareButton {...shareButton} style={styles.shareButton} />}
        {button && <Button {...button}>{button.title}</Button>}
        {button2 && <Button {...button2}>{button2.title}</Button>}
        {button3 && <Button {...button3}>{button3.title}</Button>}
      </View>
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
    marginHorizontal: 20,
    marginTop: 20,
  },
  loaderWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 108,
    justifyContent: 'space-between',
  },
  modalHeaderWithoutHandle: {
    paddingTop: 15,
  },
  shareButton: {
    alignSelf: 'center',
  },
});

export default LoadingResultScreen;
