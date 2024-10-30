import React, { FunctionComponent, memo, ReactElement, useMemo } from 'react';
import { Dimensions, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCameraDevice } from 'react-native-vision-camera';

import { ContrastingStatusBar } from '../../utils';
import { colorWithAlphaComponent } from '../../utils/color';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import BlurView from '../blur/blur-view';
import { GhostButton } from '../buttons';
import CameraOverlay from '../camera/camera-overlay';
import QRCodeScanner, { QRCodeScannerProps } from '../camera/qr-code-scanner';
import { CloseIcon } from '../icons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export interface QRCodeScannerScreenProps {
  codeTypes?: QRCodeScannerProps['codeTypes'];
  footer?: React.ComponentType<any> | React.ReactElement;
  onQRCodeRead: QRCodeScannerProps['onQRCodeRead'];
  onClose: () => void;
  overlayStyle?: StyleProp<ViewStyle>;
  noCameraView?: JSX.Element;
  title: ReactElement | string;
}

const QRCodeScannerScreen: FunctionComponent<QRCodeScannerScreenProps> = ({
  codeTypes,
  footer,
  onQRCodeRead,
  onClose,
  overlayStyle,
  noCameraView = null,
  title,
}) => {
  const t = useAccessibilityTranslation();
  const insets = useSafeAreaInsets();
  const colorScheme = useAppColorScheme();

  const footerView: React.ReactElement | undefined = useMemo(() => {
    if (!footer) {
      return undefined;
    }
    if (React.isValidElement(footer)) {
      return footer;
    } else {
      const FooterComponent = footer as React.ComponentType<any>;
      return <FooterComponent />;
    }
  }, [footer]);

  const minBottomBlurViewHeight = Dimensions.get('window').height * 0.15;

  const device = useCameraDevice('back');
  if (!device) {
    return noCameraView;
  }

  return (
    <View style={styles.container}>
      <QRCodeScanner
        cameraOverlay={<CameraOverlay style={overlayStyle} />}
        codeTypes={codeTypes}
        onQRCodeRead={onQRCodeRead}
        style={StyleSheet.absoluteFill}
      />
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
        style={[
          styles.bottomBlurView,
          {
            backgroundColor: colorWithAlphaComponent(colorScheme.black, 0.5),
            minHeight: minBottomBlurViewHeight,
            paddingBottom: Math.max(insets.bottom, 32),
          },
        ]}>
        <Typography align="center" style={styles.title} color={colorScheme.white}>
          {title}
        </Typography>
        {footerView}
      </BlurView>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomBlurView: {
    bottom: 0,
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

export default memo(QRCodeScannerScreen);
