import React, { FunctionComponent, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import BlurView from '../blur/blur-view';
import { GhostButton } from '../buttons';
import QRCodeScanner, { QRCodeScannerProps } from '../camera/qr-code-scanner';
import { CloseIcon } from '../icons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { ContrastingStatusBar } from '../utils';
import { colorWithAlphaComponent } from '../utils/color';

export interface QRCodeScannerScreenProps {
  codeTypes?: QRCodeScannerProps['codeTypes'];
  onQRCodeRead: QRCodeScannerProps['onQRCodeRead'];
  onClose: () => void;
  notAuthorizedView?: JSX.Element;
  title: ReactElement | string;
}

const QRCodeScannerScreen: FunctionComponent<QRCodeScannerScreenProps> = ({
  codeTypes,
  onQRCodeRead,
  notAuthorizedView,
  onClose,
  title,
}) => {
  const t = useAccessibilityTranslation();
  const insets = useSafeAreaInsets();
  const colorScheme = useAppColorScheme();

  const { hasPermission, requestPermission } = useCameraPermission();

  if (!hasPermission) {
    requestPermission();
  }

  const device = useCameraDevice('back');

  if (!hasPermission || !device) {
    return notAuthorizedView ?? null;
  }

  return (
    <View style={styles.container}>
      <QRCodeScanner codeTypes={codeTypes} onQRCodeRead={onQRCodeRead} style={StyleSheet.absoluteFill} />
      <ContrastingStatusBar backgroundColor={colorScheme.black} />
      <BlurView
        darkMode={true}
        blurStyle="soft"
        style={[styles.topBlurView, { backgroundColor: colorWithAlphaComponent(colorScheme.black, 0.5) }]}>
        <View style={[styles.headerSection, { top: insets.top }]}>
          <GhostButton
            icon={<CloseIcon color={colorScheme.white} />}
            onPress={onClose}
            accessibilityLabel={t('accessibility.nav.close')}
          />
        </View>
      </BlurView>
      <BlurView
        darkMode={true}
        blurStyle="soft"
        style={[styles.bottomBlurView, { backgroundColor: colorWithAlphaComponent(colorScheme.black, 0.5) }]}>
        <Typography align="center" style={styles.title} color={colorScheme.white}>
          {title}
        </Typography>
      </BlurView>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomBlurView: {
    bottom: 0,
    height: '15%',
    position: 'absolute',
    width: '100%',
  },
  container: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: 22,
    paddingTop: 16,
    position: 'absolute',
  },
  title: {
    marginTop: 32,
  },
  topBlurView: {
    height: '15%',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

export default QRCodeScannerScreen;
