import React, { FunctionComponent, ReactChild } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Typography } from '../text';
import { theme } from '../theme';
import ContrastingStatusBar from '../utils/contrasting-status-bar';
import CameraOverlay from './camera-overlay';

export interface QRCodeScannerProps {
  onBarCodeRead: (event: BarCodeReadEvent) => void;

  androidCameraPermissionOptions?: {
    title: string;
    message: string;
  };
  pictureSize?: string;
  notAuthorizedView?: JSX.Element;
  navBar?: ReactChild;
  title?: ReactChild;
  description?: ReactChild;
  button?: ReactChild;
}

const QRCodeScannerScreen: FunctionComponent<QRCodeScannerProps> = ({
  onBarCodeRead,
  androidCameraPermissionOptions = {
    title: 'Permission to use camera',
    message: 'We need your permission to use your camera',
  },
  pictureSize,
  notAuthorizedView,
  navBar,
  title,
  description,
  button,
}) => {
  return (
    <RNCamera
      style={styles.camera}
      type={RNCamera.Constants.Type.back}
      captureAudio={false}
      androidCameraPermissionOptions={androidCameraPermissionOptions}
      barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      onBarCodeRead={onBarCodeRead}
      pictureSize={pictureSize}
      notAuthorizedView={notAuthorizedView}>
      <ContrastingStatusBar backgroundColor="black" />
      <CameraOverlay />
      <SafeAreaView style={styles.overlay}>
        {navBar}
        <View style={styles.textWrapper}>
          {title ? (
            <Typography
              accessibilityRole="header"
              allowFontScaling={false}
              color="white"
              style={styles.title}
              align="center"
              size="h1"
              bold={true}>
              {title}
            </Typography>
          ) : undefined}
          {description ? (
            <Typography color="white" align="center">
              {description}
            </Typography>
          ) : undefined}
        </View>
        <View style={styles.spacing} />
        <View style={styles.buttonWrapper}>{button}</View>
      </SafeAreaView>
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'column',
    paddingHorizontal: theme.padding,
    paddingVertical: theme.paddingM,
  },
  camera: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  overlay: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
    width: '100%',
  },
  spacing: {
    flex: 1,
  },
  textWrapper: {
    paddingHorizontal: theme.padding,
    paddingVertical: theme.paddingM,
  },
  title: {
    marginBottom: 4,
  },
});

export default QRCodeScannerScreen;
