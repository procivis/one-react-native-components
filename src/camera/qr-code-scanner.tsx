import React, { FunctionComponent, useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import {
  Camera,
  Code,
  CodeType,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

import CameraOverlay from './camera-overlay';

export type QRCodeScannerProps = ViewProps & {
  cameraOverlay?: React.ComponentType<any> | React.ReactElement;
  codeTypes?: CodeType[];
  notAuthorizedView?: JSX.Element;
  onQRCodeRead: (code: Code[]) => void;
};

const QRCodeScanner: FunctionComponent<QRCodeScannerProps> = ({
  cameraOverlay,
  codeTypes = ['qr'],
  onQRCodeRead,
  notAuthorizedView,
  ...viewProps
}) => {
  const { hasPermission, requestPermission } = useCameraPermission();

  if (!hasPermission) {
    requestPermission();
  }

  const qrCodeScanner = useCodeScanner({
    codeTypes,
    onCodeScanned: onQRCodeRead,
  });

  const device = useCameraDevice('back');

  const cameraOverlayView: React.ReactElement | undefined = useMemo(() => {
    if (!cameraOverlay) {
      return <CameraOverlay />;
    }
    if (React.isValidElement(cameraOverlay)) {
      return cameraOverlay;
    } else if (cameraOverlay) {
      const CameraOverlayComponent = cameraOverlay as React.ComponentType<any>;
      return <CameraOverlayComponent />;
    }
  }, [cameraOverlay]);

  if (!hasPermission || !device) {
    return notAuthorizedView ?? null;
  }

  return (
    <View {...viewProps}>
      <Camera codeScanner={qrCodeScanner} device={device} isActive={true} style={StyleSheet.absoluteFill} />
      {cameraOverlayView}
    </View>
  );
};

export default QRCodeScanner;
