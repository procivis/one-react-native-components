import React, { FunctionComponent, useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Camera, Code, CodeType, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

import CameraOverlay from './camera-overlay';

export type QRCodeScannerProps = ViewProps & {
  cameraOverlay?: React.ComponentType<any> | React.ReactElement;
  codeTypes?: CodeType[];
  noCameraView?: JSX.Element;
  onQRCodeRead: (code: Code[]) => void;
};

const QRCodeScanner: FunctionComponent<QRCodeScannerProps> = ({
  cameraOverlay,
  codeTypes = ['qr'],
  onQRCodeRead,
  noCameraView = null,
  ...viewProps
}) => {
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
    } else {
      const CameraOverlayComponent = cameraOverlay as React.ComponentType<any>;
      return <CameraOverlayComponent />;
    }
  }, [cameraOverlay]);

  if (!device) {
    return noCameraView;
  }

  return (
    <View {...viewProps}>
      <Camera codeScanner={qrCodeScanner} device={device} isActive={true} style={StyleSheet.absoluteFill} />
      {cameraOverlayView}
    </View>
  );
};

export default QRCodeScanner;
