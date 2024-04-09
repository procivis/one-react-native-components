import React, { FunctionComponent, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Code, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

import BlurView from '../blur/blur-view';
import { GhostButton } from '../buttons';
import { CloseIcon } from '../icons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import CameraOverlay from './camera-overlay';

export interface QRCodeScannerProps {
  onBarCodeRead: (code: Code[]) => void;
  onClose: () => void;
  notAuthorizedView?: JSX.Element;
  title: ReactElement | string;
}

const QRCodeScannerScreen: FunctionComponent<QRCodeScannerProps> = ({
  onBarCodeRead,
  notAuthorizedView,
  onClose,
  title,
}) => {
  const colorScheme = useAppColorScheme();

  const qrCodeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: onBarCodeRead,
  });

  const device = useCameraDevice('back');

  if (!device) {
    return notAuthorizedView ?? null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera codeScanner={qrCodeScanner} style={StyleSheet.absoluteFill} device={device!} isActive={true}>
        <BlurView blurStyle="soft" style={styles.topBlurView} />
        <CameraOverlay />
        <BlurView blurStyle="soft" style={styles.bottomBlurView}>
          <Typography align="center" style={styles.title} color={colorScheme.white}>
            {title}
          </Typography>
        </BlurView>
      </Camera>
      <SafeAreaView>
        <View style={styles.headerSection}>
          <GhostButton icon={CloseIcon} onPress={onClose} accessibilityLabel={'Close'} />
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomBlurView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    height: '15%',
    position: 'absolute',
    width: '100%',
  },
  headerSection: {
    paddingHorizontal: 22,
    paddingTop: 16,
  },
  title: {
    marginTop: 32,
  },
  topBlurView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '15%',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

export default QRCodeScannerScreen;
