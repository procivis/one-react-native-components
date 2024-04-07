import React, { FunctionComponent, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Code, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { GhostButton } from '../buttons';
import { CloseIcon } from '../icons';
import { Typography } from '../text';
import CameraOverlay from './camera-overlay';
import BlurView from '../blur/blur-view';
import { useAppColorScheme } from '../theme';

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
        <BlurView blurStyle='soft' style={styles.topBlurView} />
        <CameraOverlay />
        <BlurView blurStyle='soft' style={styles.bottomBlurView}>
          <Typography align="center" style={{ marginTop: 32 }} color={colorScheme.white}>
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
  topBlurView: {
    position: 'absolute',
    top: 0,
    height: '15%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomBlurView: {
    position: 'absolute',
    bottom: 0,
    height: '15%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerSection: {
    paddingTop: 16,
    paddingHorizontal: 22,
  },
  title: {
    marginTop: 32
  }
});

export default QRCodeScannerScreen;